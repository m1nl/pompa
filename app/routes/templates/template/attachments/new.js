import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'attachments.new',
  renderTemplate: function(controller, model) {
    this.render('templates.template.attachments.index', {
      controller: this.controllerFor('attachments.index'),
    });
    this.render('templates.template.attachments.action-panel', {
      into: 'templates.template',
      outlet: 'action-panel',
      model: this.modelFor('templates.template.attachments.index'),
      controller: this.controllerFor('templates.template.attachments.index'),
    });
    this.render('attachments.new', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    let template = this.modelFor('templates.template');
    return this.store.createRecord('attachment', { template: template });
  },
  setupController(controller, model) {
    this._super(...arguments);

    let template = model.get('template');
    controller.set('resources', template.get('resources'));
  },
});
