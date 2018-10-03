import Component from '@ember/component';

export default Component.extend({
  actions: {
    templateChanged: function(value) {
      this.set('model.template', this.templates.findBy('id', value));
    },
    mailerChanged: function(value) {
      this.set('model.mailer', this.mailers.findBy('id', value));
    },
    groupChanged: function(value) {
      this.set('model.group', this.groups.findBy('id', value));
    },
  }
});
