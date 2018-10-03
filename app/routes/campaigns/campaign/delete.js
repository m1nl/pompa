import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate: function(controller, model) {
    this.render('campaigns.index', {
      into: 'application',
    });
    this.render({
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function () {
    return this.modelFor('campaigns.campaign');
  },
});
