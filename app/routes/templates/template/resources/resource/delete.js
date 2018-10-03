import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'resources.resource.delete',
  renderTemplate: function(controller, model) {
    this.render('templates.template.resources.index');
    this.render('resources.resource.delete', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    return this.modelFor('templates.template.resources.resource');
  },
});
