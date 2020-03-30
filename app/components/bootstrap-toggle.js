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
  };

export default Component.extend({
  invokeChangedAction: function(checked) {
    if (this.changed) {
      this.changed(checked);
    }
  },
  updateComponent: function() {
    let target = $(this.element).children("input[type='checkbox']");

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
  },
  didInsertElement: function() {
    this._super(...arguments);
    scheduleOnce('render', this, 'updateComponent');
  },
  propertiesObserver: observer('on', 'off', 'size', 'onstyle', 'offstyle', 'style', 'width', 'height', function() {
    scheduleOnce('render', this, 'updateComponent');
  }),
  checkedObserver: observer('checked', function() {
    let target = $(this.element).children("input[type='checkbox']");

    if (target.prop('checked') !== this.checked) {
      scheduleOnce('render', this, 'updateComponent');
    }
  }),
});
