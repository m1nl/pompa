/* eslint ember/no-observers: "off" */

import { scheduleOnce } from '@ember/runloop';
import { observer } from '@ember/object';
import Component from '@ember/component';
import $ from 'jquery';

const defaults = {
    onText: "On",
    offText: "Off",
    size: 'normal',
    onStyle: 'primary',
    offStyle: 'default',
    style: '',
    width: null,
    height: null,
    checked: false
  };

export default Component.extend({
  invokeChangedAction: function(checked) {
    if (this.changed) {
      this.changed(checked);
    }
  },
  setup: function() {
    let target = $(this.element).children("input[type='checkbox']:first");

    target.unbind('change');

    target.prop('checked', this.checked || defaults.checked).change();

    target.bootstrapToggle({
      on: this.onText || defaults.onText,
      off: this.offText || defaults.offText,
      size: this.size || defaults.size,
      onstyle: this.onStyle || defaults.onStyle,
      offstyle: this.offStyle || defaults.offStyle,
      style: this.style || defaults.style,
      width: this.width || defaults.width,
      height: this.height || defaults.height
    });

    let self = this;

    target.on('change', function() {
      scheduleOnce('actions', self, 'invokeChangedAction', target.prop('checked'));
    });

    this.target = target;
  },
  updateComponent: function() {
    this.target.bootstrapToggle({
      on: this.onText || defaults.onText,
      off: this.offText || defaults.offText,
      size: this.size || defaults.size,
      onstyle: this.onStyle || defaults.onStyle,
      offstyle: this.offStyle || defaults.offStyle,
      style: this.style || defaults.style,
      width: this.width || defaults.width,
      height: this.height || defaults.height
    });

    this.target.prop('checked', this.checked || defaults.checked).change();
  },
  didInsertElement: function() {
    this._super(...arguments);

    this.setup();
  },
  propertiesObserver: observer('on', 'off', 'size', 'onstyle', 'offstyle', 'style', 'width', 'height', function() {
    scheduleOnce('render', this, 'updateComponent');
  }),
  checkedObserver: observer('checked', function() {
    if (typeof this.checked !== 'boolean') {
      return;
    }

    if (this.target.prop('checked') !== this.checked) {
      scheduleOnce('render', this, 'updateComponent');
    }
  }),
});
