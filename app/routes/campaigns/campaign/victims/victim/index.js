import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'victims.victim.index',
  renderTemplate: function() {
    this.render('campaigns.campaign.index');
    this.render('campaigns.campaign.action-panel', {
      into: 'campaigns.campaign',
      outlet: 'action-panel',
      model: this.modelFor('campaigns.campaign'),
      controller: this.controllerFor('campaigns.campaign.index'),
    });
    this.render('victims.victim.index', {
      into: 'application',
      outlet: 'modal',
    });
  },
  model: function() {
    return this.modelFor('campaigns.campaign.victims.victim');
  },
  setupController: function(controller) {
    this._super(...arguments);
    controller.refresh();
  },
  resetController: function(controller, isExiting, transition) {
    if (transition.targetName !== 'error') {
      controller.set('modelDirty', true);
    }
  },
});
