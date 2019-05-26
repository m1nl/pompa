import { observer, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { task, all } from 'ember-concurrency';

export default Controller.extend({
  modelDirty: true,
  busy: computed('reloadEventsTask.isRunning', function() {
    return this.reloadEventsTask.isRunning;
  }),
  modelObserver: observer('model', function() {
    this.set('modelDirty', true);
    this.set('events', null);
  }),
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
  refresh: function() {
    return this.refreshTask.perform();
  },
  actions: {
    refresh: function() {
      this.refresh();
    },
    close: function(deferred) {
      deferred.resolve();
    },
  },
});
