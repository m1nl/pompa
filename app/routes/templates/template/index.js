import Route from '@ember/routing/route';
import ConfirmExitModalRoute from 'pompa/mixins/confirm-exit-modal-route';

export default Route.extend(ConfirmExitModalRoute, {
  model: function () {
    return this.modelFor('templates.template');
  },
  actions: {
    cancel: function() {
      this.transitionTo('templates.index');
    },
  },
});
