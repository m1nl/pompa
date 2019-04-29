import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'targets.upload',
  renderTemplate: function(controller, model) {
    this.render('groups.group.index');
    this.render('targets.upload', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  setupController: function(controller) {
    this._super(...arguments);

    let group = this.modelFor('groups.group');
    let params = { group_id: group.id };

    controller.set('params', params);
    controller.set('file', null);
    controller.set('errors', null);
  },
});
