import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'goals.goal.delete',
  renderTemplate: function(controller, model) {
    this.render('templates.template.goals.index');
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
