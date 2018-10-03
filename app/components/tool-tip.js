import Component from '@ember/component';

export default Component.extend({
  setup: function() {
    this.$("[rel=tooltip]").tooltip();
  },
  didInsertElement: function() {
    this._super(...arguments);
    this.setup();
  },
});
