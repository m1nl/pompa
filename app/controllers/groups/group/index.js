import { isBlank } from '@ember/utils';
import { observer, computed } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { task, all, timeout } from 'ember-concurrency';

const DEBOUNCE_MS = 1000;

export default Controller.extend({
  queryParams: {
    requestedPage: 'page',
    requestedQuicksearch: 'quicksearch',
  },
  requestedPage: 1,
  requestedQuicksearch: '',
  currentPage: 1,
  totalPages: 1,
  quicksearch: '',
  group: alias('model'),
  modelDirty: true,
  busy: computed('reloadTargetsTask.isRunning', function() {
    return this.get('reloadTargetsTask.isRunning');
  }),
  modelObserver: observer('model', function() {
    this.set('modelDirty', true);
    this.set('targets', null);
  }),
  pageObserver: observer('requestedPage', function() {
    if (this.modelDirty) {
      return;
    }

    this.reloadTargetsTask.perform();
  }),
  filterObserver: observer('requestedQuicksearch', function() {
    if (this.modelDirty) {
      return;
    }

    this.set('requestedPage', 1);
    this.reloadTargetsTask.perform();
  }),
  quicksearchObserver: observer('quicksearch', function() {
    this.quicksearchDebounceTask.perform();
  }),
  reloadTargetsTask: task(function * () {
    if (!this.model) {
      return;
    }

    this.set('model.target-query-params', {
      page: { number: this.requestedPage },
      quicksearch: this.requestedQuicksearch,
      sort: ['id'] });

    let targets = yield this.model.hasMany('targets').reload();

    this.set('targets', targets);
    this.set('totalPages', Math.max(targets.meta.paging.total_pages, 1));
    this.set('currentPage', Math.max(targets.meta.paging.current_page, 1));
    this.set('quicksearch', this.requestedQuicksearch);
  }).restartable(),
  refreshTask: task(function * () {
    yield all([
      this.reloadTargetsTask.perform(),
    ]);

    this.set('modelDirty', false);
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
  actions: {
    pageChanged: function(page) {
      this.set('requestedPage', page);
    },
    clearQuicksearch: function() {
      this.set('quicksearch', '');
    },
  }
});
