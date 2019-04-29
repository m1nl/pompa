import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate: function(controller, model) {
    this.render('templates.index');
    this.render('templates.upload', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  setupController: function(controller) {
    this._super(...arguments);

    controller.set('file', null);
    controller.set('errors', null);
  },
});
