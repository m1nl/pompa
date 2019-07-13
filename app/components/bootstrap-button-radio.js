import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEqual } from '@ember/utils';
import { scheduleOnce } from '@ember/runloop';
import $ from 'jquery';

export default Component.extend({
  tagName: 'button',
  classNames: ['btn'],
  classNameBindings: ['checked:active', 'disabled'],
  attributeBindings: ['disabled'],
  checked: computed('groupValue', 'value', function() {
    return isEqual(this.groupValue, this.value);
  }).readOnly(),
  invokeClickedAction: function() {
    if (this.changed) {
      this.changed(this.value);
    }
  },
  click: function() {
    $(this.element).blur();

    if (this.groupValue !== this.value) {
      scheduleOnce('actions', this, 'invokeClickedAction');
    }
  },
});
