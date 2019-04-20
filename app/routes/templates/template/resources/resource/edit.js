import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'resources.resource.edit',
  renderTemplate: function(controller, model) {
    this.render('templates.template.resources.index');
    this.render('templates.template.resources.action-panel', {
      into: 'templates.template',
      outlet: 'action-panel',
      model: this.modelFor('templates.template.resources.index'),
      controller: this.controllerFor('templates.template.resources.index'),
    });
    this.render('resources.resource.edit', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    return this.modelFor('templates.template.resources.resource');
  },
});
