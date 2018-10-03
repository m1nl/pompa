import { scheduleOnce } from '@ember/runloop';
import { observer } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  setup: function() {
    let self = this;

    let even = this.$(".event-list").children('tbody').children('tr').filter(':even');
    let odd = this.$(".event-list").children('tbody').children('tr').filter(':odd');

    odd.hide();
    even.unbind('click');

    even.click(function () {
      let e = self.$(this);
      e.next('tr').toggle('fast');
    });
  },
  didInsertElement: function() {
    this._super(...arguments);
    this.setup();
  },
  parametersObserver: observer('model', 'model.length', function() {
    scheduleOnce('afterRender', this, 'setup');
  }),
});
