import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate: function() {
    this.render('mailers.index');
    this.render({
      into: 'application',
      outlet: 'modal',
    });
  },
  model: function() {
    return this.store.createRecord('mailer', { });
  },
});
