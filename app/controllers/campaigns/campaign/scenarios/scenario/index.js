import { isBlank, isNone } from '@ember/utils';
import { observer, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import ConfirmationModalController from 'pompa/mixins/confirmation-modal-controller';
import { task, all, timeout } from 'ember-concurrency';
import Moment from 'moment';

const DEBOUNCE_MS = 1000;
const AUTO_REFRESH_DELAY = 3000;

export default Controller.extend(ConfirmationModalController, {
  queryParams: {
    requestedPage: 'page',
    requestedQuicksearch: 'quicksearch',
    requestedJoinEvents: 'joinEvents'
  },
  requestedPage: 1,
  requestedQuicksearch: '',
  requestedJoinEvents: false,
  currentPage: 1,
  totalPages: 1,
  quicksearch: '',
  autoRefresh: false,
  scenario: alias('model'),
  campaign: alias('model.campaign'),
  modelDirty: true,
  busy: computed('reloadVictimsTask.isRunning', 'reloadReportTask.isRunning', 'reloadEventSeriesTask.isRunning', function() {
    return this.reloadVictimsTask.isRunning || this.reloadReportTask.isRunning || this.reloadEventSeriesTask.isRunning;
  }),
  chartDate: computed('dateFrom', function() {
    if (isNone(this.dateFrom)) {
      return "-";
    }
    return this.dateFrom.format('YYYY-MM-DD');
  }),
  modelObserver: observer('model', function() {
    this.set('modelDirty', true);
    this.set('report', null);
    this.set('victims', null);
    this.set('chartSeries', null);
    this.set('chartData', null);
  }),
  pageObserver: observer('requestedPage', function() {
    if (this.modelDirty) {
      return;
    }

    this.reloadVictimsTask.perform();
  }),
  filterObserver: observer('requestedQuicksearch', 'requestedJoinEvents', function() {
    if (this.modelDirty) {
      return;
    }

    this.set('requestedPage', 1);
    this.reloadVictimsTask.perform();
  }),
  quicksearchObserver: observer('quicksearch', function() {
    this.quicksearchDebounceTask.perform();
  }),
  eventSeriesObserver: observer('eventSeries', 'dateFrom', 'dateTo', function() {
    let series = [];
    let data = [];

    if (this.eventSeries) {
      series = this.eventSeries.series;
      data = this.eventSeries.data;
    }

    this.set('chartSeries', series);
    this.set('chartData', data);

    this.set('chartXMin', this.dateFrom);
    this.set('chartXMax', this.dateTo);
  }),
  autoRefreshObserver: observer('autoRefresh', function() {
    if (this.autoRefresh) {
      this.autoRefreshTask.perform();
    } else {
      this.autoRefreshTask.cancelAll();
    }
  }),
  reloadVictimsTask: task(function * () {
    if (!this.model) {
      return;
    }

    this.model.set('victim-query-params', {
        include: 'report',
        page: { number: this.requestedPage },
        sort: ['state_order', 'id'],
        quicksearch: this.requestedQuicksearch,
        join: ( this.requestedJoinEvents ? 'events' : '' ),
        distinct: ( this.requestedJoinEvents ? true : false ),
      });

    let victims = yield this.model.hasMany('victims').reload();

    this.set('victims', victims);
    this.set('totalPages', Math.max(victims.meta.paging.total_pages, 1));
    this.set('currentPage', Math.max(victims.meta.paging.current_page, 1));
    this.set('quicksearch', this.requestedQuicksearch);
  }).restartable(),
  reloadReportTask: task(function * () {
    if (!this.model) {
      return;
    }

    let report = yield this.model.belongsTo('report').reload();

    this.set('report', report);
  }).restartable(),
  reloadEventSeriesTask: task(function * () {
    if (!this.model) {
      return;
    }

    this.seriesDelta(0);

    let eventSeries = yield this.model.eventSeries('hour', this.requestedDateFrom, this.requestedDateTo);

    this.set('eventSeries', eventSeries);
    this.set('dateFrom', this.requestedDateFrom);
    this.set('dateTo', this.requestedDateTo);
  }).restartable(),
  refreshTask: task(function * () {
    yield all([
      this.reloadReportTask.perform(),
      this.reloadVictimsTask.perform(),
      this.reloadEventSeriesTask.perform(),
    ]);

    this.set('modelDirty', false);
  }).restartable(),
  autoRefreshTask: task(function * () {
    while (this.autoRefresh) {
      if (!this.refreshTask.isActive) {
        this.refreshTask.perform();
      }

      yield timeout(AUTO_REFRESH_DELAY);
    }
  }).restartable(),
  synchronizeGroupTask: task(function * () {
    yield this.scenario.synchronizeGroup();
    yield this.refreshTask.perform();
  }).restartable(),
  resetVictimStateTask: task(function * (victim) {
    yield victim.resetState();
    yield victim.reload();
  }).restartable(),
  quicksearchDebounceTask: task(function * () {
    if (!isBlank(this.quicksearch)) {
      yield timeout(DEBOUNCE_MS);
    }

    this.set('requestedQuicksearch', this.quicksearch);
  }).restartable(),
  refresh: function() {
    return this.refreshTask.perform();
  },
  seriesDelta: function(diff) {
    let minDateFrom = Moment(this.campaign.get('startedDate') || Moment(0));
    let maxDateTo = Moment(this.campaign.get('finishedDate') || Moment());

    let dateFrom = this.requestedDateFrom || Moment(0);

    dateFrom = dateFrom.clone().add(diff, 'days').startOf('day');
    dateFrom = Moment.max(minDateFrom, dateFrom);
    dateFrom = Moment.min(dateFrom, maxDateTo);

    let dateTo = dateFrom.clone().add(1, 'days');

    dateTo = Moment.min(maxDateTo, dateTo);

    this.set('requestedDateFrom', dateFrom);
    this.set('requestedDateTo', dateTo);
  },
  actions: {
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
    },
    joinEventsChanged: function(joinEvents) {
      this.set('requestedJoinEvents', joinEvents);
    },
    clearQuicksearch: function() {
      this.set('quicksearch', '');
    },
    toggleAutoRefresh: function() {
      this.set('autoRefresh', !this.autoRefresh);
    },
    seriesDelta: function(delta) {
      this.seriesDelta(delta);
      this.reloadEventSeriesTask.perform();
    },
  },
});
