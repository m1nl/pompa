import Route from '@ember/routing/route';

export default Route.extend({
  controllerName: 'attachments.attachment.delete',
  renderTemplate: function(controller, model) {
    this.render('templates.template.attachments.index');
    this.render('attachments.attachment.delete', {
      into: 'application',
      outlet: 'modal',
      model: model,
    });
  },
  model: function() {
    return this.modelFor('templates.template.attachments.attachment');
  },
});
