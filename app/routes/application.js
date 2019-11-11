import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { UnauthorizedError, ForbiddenError } from '@ember-data/adapter/error';

export default Route.extend({
  /* services */
  transitionHistory: service(),
  authManager: service(),

  actions: {

    /* actions*/
    showModal: function(name, model, controller) {
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model,
        controller: controller,
      });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application',
      });
    },
    back: function() {
      if (history.length > 1) {
        history.back();
      } else {
        this.transitionTo('index');
      }
    },
    error: function(reason, transition) {
      if (transition) {
        this.transitionHistory.save(transition);
      }

      if (reason instanceof UnauthorizedError) {
        this.transitionTo('/authentication');
        return false;
      }

      if (reason instanceof ForbiddenError) {
        this.transitionTo('/forbidden');
        return false;
      }

      return true;
    },
  }
});
