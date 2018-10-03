import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'targets.target.edit',
  renderTemplate: function(controller, model) {
    this.render('groups.group.index');
    this.render('targets.target.edit', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    return this.modelFor('groups.group.targets.target');
  },
});
