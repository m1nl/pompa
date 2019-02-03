import Controller from '@ember/controller';
import ConfirmationModalController from 'pompa/mixins/confirmation-modal-controller';
import { computed, observer } from '@ember/object';
import { alias } from '@ember/object/computed';
import { task, all, timeout } from 'ember-concurrency';

const MAX_EVENTS = 10;
const AUTO_REFRESH_DELAY = 3000;

export default Controller.extend(ConfirmationModalController, {
  autoRefresh: false,
  campaign: alias('model'),
  modelDirty: true,
  busy: computed('reloadScenariosTask.isRunning', function() {
    return this.get('reloadScenariosTask.isRunning');
  }),
  modelObserver: observer('model', function() {
    this.set('modelDirty', true);
    this.set('scenarios', null);
  }),
  autoRefreshObserver: observer('autoRefresh', function() {
    if (this.autoRefresh) {
      this.autoRefreshTask.perform();
    } else {
      this.autoRefreshTask.cancelAll();
    }
  }),
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
  refresh: function() {
    return this.refreshTask.perform();
  },
  actions: {
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
    },
  }
});
