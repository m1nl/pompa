import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  tagName: 'table',
  classNames: ['table', 'table-hover'],
  updateComponent: function() {
    let self = this;

    let even = $(this.element).children('tbody').children('tr').filter(':even');
    let odd = $(this.element).children('tbody').children('tr').filter(':odd');

    odd.hide();
    even.unbind('click');

    even.click(function () {
      let e = self.$(this);
      e.next('tr').toggle('fast');
    });
  },
  didReceiveAttrs: function() {
    this._super(...arguments);
    scheduleOnce('render', this, 'updateComponent');
  },
});
