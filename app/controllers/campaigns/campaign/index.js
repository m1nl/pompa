import ENV from '../../../config/environment';
import Controller from '@ember/controller';
import ConfirmationModalController from 'pompa/mixins/confirmation-modal-controller';
import { sort, alias, readOnly } from '@ember/object/computed';
import { task, all, timeout } from 'ember-concurrency';

const MAX_EVENTS = 10;
const AUTO_REFRESH_DELAY = 3000;

export default Controller.extend(ConfirmationModalController, {
  /* aliases */
  campaign: alias('model'),

  /* properties */
  autoRefresh: false,
  scenariosSorting: Object.freeze(['numericId']),
  sortedScenarios: sort('scenarios', 'scenariosSorting'),

  /* computed properties */
  busy: readOnly('reloadScenariosTask.isRunning'),

  /* tasks */
  reloadScenariosTask: task(function * () {
    if (!this.model) {
      return;
    }

    yield this.model.reload();

    let scenarios = yield this.model.hasMany('scenarios').reload();

    let childTasks = [];

    scenarios.forEach(function(scenario) {
      scenario.set('event-query-params', {
        include: ['victim', 'goal'],
        page: { number: 1, size: MAX_EVENTS },
        sort: ['-reported_date', 'id'],
      });

      childTasks.push(scenario.belongsTo('report').reload());
      childTasks.push(scenario.hasMany('events').reload());
    });

    this.set('scenarios', scenarios);

    yield all(childTasks);
  }).restartable(),
  refreshTask: task(function * () {
    yield all([
      this.reloadScenariosTask.perform(),
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

  /* methods */
  refresh: function() {
    return this.refreshTask.perform();
  },
  reset: function() {
    this.set('scenarios', null);
  },
  init: function() {
    this._super(...arguments);
    this.set('campaignChallenge', ENV.APP.campaignChallenge);
  },
  actions: {

    /* actions */
    refresh: function() {
      this.refresh();
    },
    startCampaign: function(deferred) {
      let self = this;
      this.model.start().then(function() {
        self.refresh().then(() => deferred.resolve());
      });
    },
    pauseCampaign: function(deferred) {
      let self = this;
      this.model.pause().then(function() {
        self.refresh().then(() => deferred.resolve());
      });
    },
    finishCampaign: function(deferred) {
      let self = this;
      this.model.finish().then(function() {
        self.refresh().then(() => deferred.resolve());
      });
    },
    toggleAutoRefresh: function() {
      this.set('autoRefresh', !this.autoRefresh);

      if (this.autoRefresh) {
        this.autoRefreshTask.perform();
      } else {
        this.autoRefreshTask.cancelAll();
      }
    },
  }
});
