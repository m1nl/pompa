import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    _export: function(template) {
      return template._export();
    },
  },
});
