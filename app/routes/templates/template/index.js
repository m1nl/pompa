import Route from '@ember/routing/route';
import ConfirmExitModalRoute from 'pompa/mixins/confirm-exit-modal-route';

export default Route.extend(ConfirmExitModalRoute, {
  renderTemplate: function(controller, model) {
    this.render('templates.template.index');
    this.render('templates.template.action-panel', {
      into: 'templates.template',
      outlet: 'action-panel',
      model: model,
      controller: controller,
    });
  },
  model: function () {
    return this.modelFor('templates.template');
  },
  actions: {
    cancel: function() {
      this.transitionTo('templates.index');
    },
  },
});
