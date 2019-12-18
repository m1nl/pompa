import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  /* properties */
  clientId: readOnly('authManager.clientId'),
  isAuthenticated: readOnly('authManager.isAuthenticated'),
  enforceAuthentication: readOnly('authManager.enforceAuthentication'),

  /* services */
  authManager: service(),

  actions: {

    /* actions */
    logOut: function() {
      this.authManager.invalidate()
        .then(() => this.transitionToRoute('logged-out'));
    },
    reload: function() {
      window.location.reload();
    },
  }
});
