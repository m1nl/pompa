import Controller from '@ember/controller';
import ConfirmationModalController from 'pompa/mixins/confirmation-modal-controller';
import Moment from 'moment';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import { isBlank, isNone } from '@ember/utils';
import { task, all, timeout } from 'ember-concurrency';

const DEBOUNCE_MS = 1000;
const AUTO_REFRESH_DELAY = 3000;

const MISS = 'miss';
const ANY = 'any';
const HIT = 'hit';

const MAX = 'max';
const MIN = 'min';

export default Controller.extend(ConfirmationModalController, {
  /* aliases */
  scenario: alias('model'),
  campaign: alias('model.campaign'),

  /* query params */
  queryParams: {
    requestedPage: 'page',
    requestedQuicksearch: 'quicksearch',
  },

  /* properties */
  requestedPage: 1,
  requestedQuicksearch: '',
  requestedGoalFilter: null,
  requestedDateFrom: null,
  requestedDateTo: null,
  currentPage: 1,
  totalPages: 1,
  quicksearch: '',
  goalFilter: null,
  dateFrom: null,
  dateTo: null,
  autoRefresh: false,
  advancedFiltering: false,

  /* computed properties */
  busy: computed('reloadVictimsTask.isRunning', 'reloadReportTask.isRunning', 'reloadEventSeriesTask.isRunning', function() {
    return this.reloadVictimsTask.isRunning || this.reloadReportTask.isRunning || this.reloadEventSeriesTask.isRunning;
  }),
  chartDate: computed('dateFrom', function() {
    if (isNone(this.dateFrom)) {
      return "-";
    }
    return this.dateFrom.format('YYYY-MM-DD');
  }),
  goalsExist: computed('scenario.template.goals.length', function() {
    return this.get('scenario.template.goals.length') > 0;
  }),

  /* tasks */
  reloadModelsTask: task(function * () {
    if (!this.model) {
      return;
    }

    yield all([
      this.scenario.reload(),
    ]);

    let template = yield this.scenario.template;
    let goals = yield template.goals;

    let goalFilter = {};
    let requestedGoalFilter = this.requestedGoalFilter || {};

    goals.forEach(function(g) {
      goalFilter[g.id] = requestedGoalFilter[g.id];

      if (!goalFilter[g.id]) {
        goalFilter[g.id] = ANY;
      }
    });

    this.set('requestedGoalFilter', goalFilter);
  }).restartable(),
  reloadVictimsTask: task(function * () {
    if (!this.model) {
      return;
    }

    let goalFilter = this.requestedGoalFilter || {};

    let hitGoals = [];
    let missGoals = [];

    Object.entries(goalFilter).forEach(function(g) {
      if (g[1] === HIT) {
        hitGoals.push(g[0]);
      } else if (g[1] === MISS) {
        missGoals.push(g[0]);
      }
    });

    let victimsFilter = {
      quicksearch: this.requestedQuicksearch,
    };

    let filter = {};

    if (hitGoals.length > 0) {
      filter['events'] = []
      hitGoals.forEach(g => { filter['events'].push({ goal_id: g }) });
    }

    if (missGoals.length > 0) {
      filter['!events'] = { goal_id: missGoals.join(',') };
    }

    victimsFilter['filter'] = filter;

    this.set('victimsFilter', victimsFilter);

    let victimQueryParams = {
      include: 'report',
      page: { number: this.requestedPage },
      sort: ['state_order', 'id'],
      quicksearch: victimsFilter['quicksearch'],
      filter: victimsFilter['filter'],
    };

    this.scenario.set('victim-query-params', victimQueryParams);

    let victims = yield this.model.hasMany('victims').reload();

    this.set('victims', victims);

    this.set('totalPages', Math.max(victims.meta.paging.total_pages, 1));
    this.set('currentPage', Math.max(victims.meta.paging.current_page, 1));

    this.set('quicksearch', this.requestedQuicksearch);
    this.set('goalFilter', this.requestedGoalFilter);

    let goalFilterValues = Object.values(this.goalFilter);
    this.set('advancedFiltering', goalFilterValues.includes(HIT) || goalFilterValues.includes(MISS));
  }).restartable(),
  reloadReportTask: task(function * () {
    if (!this.model) {
      return;
    }

    let report = yield this.scenario.belongsTo('report').reload();

    this.set('report', report);
  }).restartable(),
  reloadEventSeriesTask: task(function * () {
    if (!this.model) {
      return;
    }

    this.seriesDelta(0);

    let eventSeries = yield this.scenario.eventSeries('hour', this.requestedDateFrom, this.requestedDateTo);

    let series = [];
    let data = [];

    if (eventSeries) {
      series = eventSeries.series;
      data = eventSeries.data;
    }

    this.set('chartSeries', series);
    this.set('chartData', data);

    this.set('dateFrom', this.requestedDateFrom);
    this.set('dateTo', this.requestedDateTo);
  }).restartable(),
  refreshTask: task(function * () {
    yield this.reloadModelsTask.perform();

    yield all([
      this.reloadVictimsTask.perform(),
      this.reloadReportTask.perform(),
      this.reloadEventSeriesTask.perform(),
    ]);
  }).restartable(),
  autoRefreshTask: task(function * () {
    while (this.autoRefresh) {
      if (!this.refreshTask.isActive) {
        this.refreshTask.perform();
      }

      yield timeout(AUTO_REFRESH_DELAY);
    }
  }).restartable(),
  quicksearchDebounceTask: task(function * () {
    if (!isBlank(this.quicksearch)) {
      yield timeout(DEBOUNCE_MS);
    }

    this.set('requestedQuicksearch', this.quicksearch);
    this.set('requestedPage', 1);

    this.reloadVictimsTask.perform();
  }).restartable(),
  synchronizeGroupTask: task(function * () {
    yield this.scenario.synchronizeGroup();
    yield this.refreshTask.perform();
  }).restartable(),
  resetVictimStateTask: task(function * (victim) {
    yield victim.resetState();
    yield victim.reload();
  }).restartable(),

  /* methods */
  init: function() {
    this._super(...arguments)
    this.set('requestedGoalFilter', {});
  },
  refresh: function() {
    this.refreshTask.perform();
  },
  reset: function() {
    this.set('victims', null);
    this.set('report', null);

    this.set('goalFilter', {});
    this.set('chartSeries', null);
    this.set('chartData', null);
  },
  seriesDelta: function(diff) {
    let minDateFrom = Moment(this.campaign.get('startedDate') || Moment(0));
    let maxDateFrom = Moment(this.campaign.get('finishedDate') || Moment()).startOf('day');

    let dateFrom = this.requestedDateFrom || minDateFrom;

    if (typeof diff === 'string') {
      if (diff === MIN) {
        dateFrom = minDateFrom;
      }

      if (diff === MAX) {
        dateFrom = maxDateFrom;
      }
    }

    dateFrom = dateFrom.clone().add(diff, 'days').startOf('day');
    dateFrom = Moment.max(minDateFrom, dateFrom);
    dateFrom = Moment.min(dateFrom, maxDateFrom);

    let maxDateTo = Moment(this.campaign.get('finishedDate') || Moment());

    let dateTo = dateFrom.clone().add(1, 'days');

    dateTo = Moment.min(dateTo, maxDateTo);

    this.set('requestedDateFrom', dateFrom);
    this.set('requestedDateTo', dateTo);
  },
  actions: {

    /* actions */
    refresh: function() {
      this.refresh();
    },
    synchronizeGroup: function(deferred) {
      this.synchronizeGroupTask.perform().then(() => deferred.resolve());
    },
    resetVictimState: function(victim) {
      this.resetVictimStateTask.perform(victim);
    },
    pageChanged: function(page) {
      this.set('requestedPage', page);

      this.reloadVictimsTask.perform();
    },
    goalFilterChanged: function(goal_id, value) {
      this.set(`requestedGoalFilter.${goal_id}`, value);
      this.set('requestedPage', 1);

      this.reloadVictimsTask.perform();
    },
    quicksearchChanged: function() {
      this.quicksearchDebounceTask.perform();
    },
    clearQuicksearch: function() {
      this.set('quicksearch', '');

      this.quicksearchDebounceTask.perform();
    },
    toggleAutoRefresh: function() {
      this.set('autoRefresh', !this.autoRefresh);

      if (this.autoRefresh) {
        this.autoRefreshTask.perform();
      } else {
        this.autoRefreshTask.cancelAll();
      }
    },
    toggleAdvancedFiltering: function() {
      this.set('advancedFiltering', !this.advancedFiltering);
    },
    seriesDelta: function(delta) {
      this.seriesDelta(delta);
      this.reloadEventSeriesTask.perform();
    },
  },
});
