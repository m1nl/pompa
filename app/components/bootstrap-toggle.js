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
  setup: function() {
    let target = $(this.element).children("input[type='checkbox']");

    target.unbind('change');
    target.prop('checked', this.getWithDefault('checked', defaults.checked)).change();

    target.bootstrapToggle({
      on: this.getWithDefault('onText', defaults.onText),
      off: this.getWithDefault('offText', defaults.offText),
      size: this.getWithDefault('size', defaults.size),
      onstyle: this.getWithDefault('onStyle', defaults.onStyle),
      offstyle: this.getWithDefault('offStyle', defaults.offStyle),
      style: this.getWithDefault('style', defaults.style),
      width: this.getWithDefault('width', defaults.width),
      height: this.getWithDefault('height', defaults.height),
    });

    let self = this;

    target.on('change', function() {
      if (typeof self.get('changed') === 'function') {
        self.get('changed')(target.prop('checked'));
      }
    });

    this._super(...arguments);
  },
  didInsertElement: function() {
    this._super(...arguments);
    this.setup();
  },
  propertiesObserver: observer('on', 'off', 'size', 'onstyle', 'offstyle', 'style', 'width', 'height', function() {
    scheduleOnce('afterRender', this, 'setup');
  }),
  checkedObserver: observer('checked', function() {
    let target = $(this.element).children("input[type='checkbox']");

    if (target.prop('checked') != this.checked) {
      scheduleOnce('afterRender', this, 'setup');
    }
  }),
});
