import Controller from '@ember/controller';
import { observer, computed } from '@ember/object';
import { task, all } from 'ember-concurrency';

export default Controller.extend({
  /* properties */
  modelDirty: true,

  /* observers */
  modelObserver: observer('model', function() {
    this.set('modelDirty', true);
    this.set('events', null);
  }),

  /* computed properties */
  busy: computed('reloadEventsTask.isRunning', function() {
    return this.reloadEventsTask.isRunning;
  }),

  /* tasks */
  reloadEventsTask: task(function * () {
    if (!this.model) {
      return;
    }

    this.model.set('event-query-params', {
      include: ['victim', 'goal'],
      sort: ['-reported_date', 'id']
    });

    let events = yield this.model.hasMany('events').reload();

    this.set('events', events);
  }).restartable(),
  refreshTask: task(function * () {
    yield all([
      this.reloadEventsTask.perform(),
    ]);

    this.set('modelDirty', false);
  }),

  /* methods */
  refresh: function() {
    return this.refreshTask.perform();
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
