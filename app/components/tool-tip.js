import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({
  tagName: 'span',
  attributeBindings: ['rel', 'title'],
  rel: 'tooltip',
  setup: function() {
    $(this.element).tooltip();
  },
  didInsertElement: function() {
    this._super(...arguments);
    this.setup();
  },
});
