import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'goals.goal.delete',
  renderTemplate: function(controller, model) {
    this.render('templates.template.goals.index');
    this.render('templates.template.goals.action-panel', {
      into: 'templates.template',
      outlet: 'action-panel',
      model: this.modelFor('templates.template.goals.index'),
      controller: this.controllerFor('templates.template.goals.index'),
    });
    this.render('goals.goal.delete', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    return this.modelFor('templates.template.goals.goal');
  },
});
