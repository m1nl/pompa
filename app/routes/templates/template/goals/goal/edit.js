import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'goals.goal.edit',
  renderTemplate: function(controller, model) {
    this.render('templates.template.goals.index');
    this.render('goals.goal.edit', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    return this.modelFor('templates.template.goals.goal');
  },
});
