import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate: function(controller, model) {
    this.render('campaigns.campaign.index');
    this.render('campaigns.campaign.action-panel', {
      into: 'campaigns.campaign',
      outlet: 'action-panel',
      model: model,
      controller: controller,
    });
  },
  model: function () {
    return this.modelFor('campaigns.campaign');
  },
  setupController: function(controller) {
    this._super(...arguments);
    controller.refresh();
  },
  resetController: function(controller, isExiting, transition) {
    if (isExiting && transition.targetName !== 'error') {
      controller.set('autoRefresh', false);
      controller.set('modelDirty', true);
    }
  },
});
