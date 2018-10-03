import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate: function(controller, model) {
    this.render('campaigns.campaign.scenarios.scenario.index');
    this.render('victims.victim.delete', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    return this.modelFor('campaigns.campaign.scenarios.scenario.victims.victim');
  },
});
