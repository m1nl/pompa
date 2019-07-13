import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import $ from 'jquery';

const SHOW = 'show';
const HIDE = 'hide';

export default Component.extend({
  didReceiveAttrs: function() {
    scheduleOnce('render', this, 'update');
  },
  update: function() {
    let target = $(this.element).children('.collapse');
    let state = this.collapsed ? HIDE : SHOW;

    target.collapse(state);
  },
  actions: {
    trigger: function() {
      if (this.triggered) {
        this.triggered();
      }
    },
  },
});
