/* eslint ember/no-observers: "off" */

import { scheduleOnce } from '@ember/runloop';
import { observer } from '@ember/object';
import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  tagName: 'ul',
  classNames: ['bootstrap-pagination'],
  classNameBindings: ['baseClass'],
  baseClass: 'pagination-sm',
  totalPages: 1,
  visiblePages: 5,
  currentPage: 1,
  disabled: false,
  invokePageChangedAction: function() {
    if (this.pageChanged) {
      this.pageChanged(this.currentPage);
    }
  },
  updateComponent: function() {
    let self = this;

    this.set('currentPage', Math.min(this.page, this.totalPages));

    $(this.element).twbsPagination('destroy');
    $(this.element).twbsPagination({
      totalPages: this.totalPages,
      visiblePages: this.visiblePages,
      startPage: this.currentPage,
      onPageClick: function(event, page) {
        if (page != self.currentPage) {
          self.set('currentPage', page);
          scheduleOnce('actions', self, 'invokePageChangedAction');
        }
      },
    });

    if (this.disabled) {
      $(this.element).twbsPagination('disable');
    }
  },
  updateDisabled: function() {
    if (this.disabled) {
      $(this.element).twbsPagination('disable');
    } else {
      $(this.element).twbsPagination('enable');
    }
  },
  didInsertElement: function() {
    this._super(...arguments);
    scheduleOnce('render', this, 'updateComponent');
  },
  parametersObserver: observer('visiblePages', 'totalPages', function() {
    scheduleOnce('render', this, 'updateComponent');
  }),
  pageObserver: observer('page', function() {
    if (this.page != this.currentPage) {
      scheduleOnce('render', this, 'updateComponent');
    }
  }),
  disabledObserver: observer('disabled', function() {
    scheduleOnce('render', this, 'updateDisabled');
  }),
});
