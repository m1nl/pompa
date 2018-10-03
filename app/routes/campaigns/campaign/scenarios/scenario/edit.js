import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'scenarios.scenario.edit',
  renderTemplate: function(controller, model) {
    this.render('campaigns.campaign.scenarios.scenario.index');
    this.render('campaigns.campaign.scenarios.scenario.action-panel', {
      into: 'campaigns.campaign',
      outlet: 'action-panel',
      model: model,
      controller: this.controllerFor('campaigns.campaign.scenarios.scenario.index'),
    });
    this.render('scenarios.scenario.edit', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    return this.modelFor('campaigns.campaign.scenarios.scenario');
  },
  setupController: function(controller) {
    this._super(...arguments);

    let templates = this.store.findAll('template');
    let mailers = this.store.findAll('mailer');
    let groups = this.store.findAll('group');

    controller.set('templates', templates);
    controller.set('mailers', mailers);
    controller.set('groups', groups);
  },
});
