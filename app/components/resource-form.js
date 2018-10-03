import { isNone } from '@ember/utils';
import Component from '@ember/component';

export default Component.extend({
  setup: function() {
    this.set('urlResolve', !isNone(this.get('model.url')));
    this.set('transforms', !isNone(this.get('model.transforms')));
  },
  didReceiveAttrs: function() {
    this._super(...arguments);
    this.setup();
  },
  actions: {
    urlResolveChanged: function(state) {
      this.set('urlResolve', state);

      if (!this.urlResolve) {
        this.set('model.url', null);
        this.set('model.dynamicUrl', false);
      }
    },
    transformsChanged: function(state) {
      this.set('transforms', state);

      if (!this.transforms) {
        this.set('model.transforms', null);
      }
    },
    renderTemplateChanged: function(state) {
      this.set('model.renderTemplate', state);
    },
    dynamicUrlChanged: function(state) {
      this.set('model.dynamicUrl', state);
    },
  },
});
