import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    duplicate: function(template) {
      return template.duplicate();
    },
  },
});
