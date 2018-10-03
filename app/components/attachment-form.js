import Component from '@ember/component';

export default Component.extend({
  actions: {
    resourceChanged: function(value) {
      this.set('model.resource', this.resources.findBy('id', value));
    },
  }
});
