import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'goals.index',
  renderTemplate: function(controller, model) {
    this.render('templates.template.goals.index');
    this.render('templates.template.goals.action-panel', {
      into: 'templates.template',
      outlet: 'action-panel',
      model: model,
      controller: controller,
    });
  },
  model: function() {
    return this.modelFor('templates.template').get('goals');
  }
});
