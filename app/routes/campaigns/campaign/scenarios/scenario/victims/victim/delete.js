import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'victims.victim.delete',
  renderTemplate: function() {
    this.render('campaigns.campaign.scenarios.scenario.index');
    this.render('campaigns.campaign.scenarios.scenario.action-panel', {
      into: 'campaigns.campaign',
      outlet: 'action-panel',
      model: this.modelFor('campaigns.campaign.scenarios.scenario'),
      controller: this.controllerFor('campaigns.campaign.scenarios.scenario.index'),
    });
    this.render('victims.victim.delete', {
      into: 'application',
      outlet: 'modal',
    });
  },
  model: function() {
    return this.modelFor('campaigns.campaign.scenarios.scenario.victims.victim');
  },
});
