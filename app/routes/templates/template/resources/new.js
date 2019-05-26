import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'resources.new',
  renderTemplate: function(controller, model) {
    this.render('templates.template.resources.index', {
      controller: this.controllerFor('resources.index'),
    });
    this.render('templates.template.resources.action-panel', {
      into: 'templates.template',
      outlet: 'action-panel',
      model: this.modelFor('templates.template.resources.index'),
      controller: this.controllerFor('templates.template.resources.index'),
    });
    this.render('resources.new', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    let template = this.modelFor('templates.template');
    return this.store.createRecord('resource', { template: template });
  },
});
