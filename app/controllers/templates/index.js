import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    download: function(template) {
      return template.download();
    },
  },
});
