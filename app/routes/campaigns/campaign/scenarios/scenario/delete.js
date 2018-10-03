import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'scenarios.scenario.delete',
  renderTemplate: function(controller, model) {
    this.render('campaigns.campaign.scenarios.scenario.index');
    this.render('campaigns.campaign.scenarios.scenario.action-panel', {
      into: 'campaigns.campaign',
      outlet: 'action-panel',
      model: model,
      controller: this.controllerFor('campaigns.campaign.scenarios.scenario.index'),
    });
    this.render('scenarios.scenario.delete', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    return this.modelFor('campaigns.campaign.scenarios.scenario');
  },
});
