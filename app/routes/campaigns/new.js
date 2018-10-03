import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate: function() {
    this.render('campaigns.index');
    this.render({
      into: 'application',
      outlet: 'modal',
    });
  },
  model: function() {
    return this.store.createRecord('campaign', {});
  },
});
