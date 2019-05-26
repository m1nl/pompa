import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'attachments.index',
  renderTemplate: function(controller, model) {
    this.render('templates.template.attachments.index');
    this.render('templates.template.attachments.action-panel', {
      into: 'templates.template',
      outlet: 'action-panel',
      model: model,
      controller: controller,
    });
  },
  model: function() {
    return this.modelFor('templates.template').get('attachments');
  },
});
