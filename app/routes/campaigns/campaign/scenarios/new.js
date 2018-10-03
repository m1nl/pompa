import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'scenarios.new',
  renderTemplate: function(controller, model) {
    this.render('campaigns.campaign.index');
    this.render('scenarios.new', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    let campaign = this.modelFor('campaigns.campaign');
    return this.store.createRecord('scenario', { campaign: campaign });
  },
  setupController(controller) {
    this._super(...arguments);

    let templates = this.store.findAll('template');
    let mailers = this.store.findAll('mailer');
    let groups = this.store.findAll('group');

    controller.set('templates', templates);
    controller.set('mailers', mailers);
    controller.set('groups', groups);
  },
});
