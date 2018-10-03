import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'targets.target.delete',
  renderTemplate: function(controller, model) {
    this.render('groups.group.index');
    this.render('targets.target.delete', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    return this.modelFor('groups.group.targets.target');
  },
});
