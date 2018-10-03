import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'targets.new',
  renderTemplate: function(controller, model) {
    this.render('groups.group.index');
    this.render('targets.new', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    let group = this.modelFor('groups.group');
    return this.store.createRecord('target', { group: group });
  },
});
