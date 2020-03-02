import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  /* properties */
  isAuthenticationEnabled: readOnly('authManager.enabled'),
  isAuthenticated: readOnly('authManager.isAuthenticated'),
  clientId: readOnly('authManager.clientId'),

  /* services */
  authManager: service(),

  actions: {

    /* actions */
    logOut: function() {
      this.transitionToRoute('logged-out')
        .then(() => this.authManager.invalidate());
    },
    reload: function() {
      window.location.reload();
    },
  }
});
