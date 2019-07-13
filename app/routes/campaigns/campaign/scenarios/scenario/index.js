import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate: function(controller, model) {
    this.render('campaigns.campaign.scenarios.scenario.index');
    this.render('campaigns.campaign.scenarios.scenario.action-panel', {
      into: 'campaigns.campaign',
      outlet: 'action-panel',
      model: model,
      controller: controller,
    });
  },
  model: function() {
    return this.modelFor('campaigns.campaign.scenarios.scenario');
  },
  setupController: function(controller, model) {
    this._super(...arguments);

    if (!model || model.get('isDeleted')) {
      this.transitionTo('campaigns.campaign.index');
    } else {
      controller.refresh();
    }
  },
  resetController: function(controller, isExiting, transition) {
    if (transition.targetName !== 'error') {
      controller.set('modelDirty', true);

      controller.set('autoRefresh', false);

      controller.set('requestedGoalFilter', null);
      controller.set('requestedDateFrom', null);
      controller.set('requestedDateTo', null);
    }
  },
});
