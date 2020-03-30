/* eslint ember/no-observers: "off" */

import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import { observer } from '@ember/object';
import $ from 'jquery';

const SHOW = 'show';
const HIDE = 'hide';

export default Component.extend({
  updateComponent: function(transition) {
    let target = $(this.element).children('.collapse');

    if (transition) {
      target.collapse(this.collapsed ? HIDE : SHOW);
    } else {
      if (this.collapsed) {
        target.removeClass('in');
      } else {
        target.addClass('in');
      }
    }
  },
  collapsedObserver: observer('collapsed', function() {
    scheduleOnce('render', this, 'updateComponent', true);
  }),
  didInsertElement: function() {
    scheduleOnce('render', this, 'updateComponent', false);
  },
  actions: {
    trigger: function() {
      if (this.triggered) {
        this.triggered();
      }
    },
  },
});
