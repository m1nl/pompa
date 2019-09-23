import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { task, all } from 'ember-concurrency';

export default Controller.extend({
  /* computed properties */
  busy: computed('reloadEventsTask.isRunning', function() {
    return this.reloadEventsTask.isRunning;
  }),

  /* tasks */
  reloadEventsTask: task(function * () {
    if (!this.model) {
      return;
    }

    this.set('model.event-query-params', {
      include: ['victim', 'goal'],
      sort: ['-reported_date', 'id']
    });

    let report = yield this.model.belongsTo('report').reload();

    this.set('report', report);

    let events = yield this.model.hasMany('events').reload();

    this.set('events', events);
  }).restartable(),
  refreshTask: task(function * () {
    yield all([
      this.reloadEventsTask.perform(),
    ]);
  }),

  /* methods */
  refresh: function() {
    return this.refreshTask.perform();
  },
  reset: function() {
    this.set('events', null);
  },
  actions: {

    /* actions */
    refresh: function() {
      this.refresh();
    },
    close: function(deferred) {
      deferred.resolve();
    },
  },
});
