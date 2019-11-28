import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import ENV from "../config/environment";

export default Mixin.create({
  /* services */
  authManager: service(),
  transitionHistory: service(),

  /* methods */
  beforeModel: function(transition) {
    this._super(...arguments);

    if (ENV.APP.enforceAuthentication && !this.authManager.isAuthenticated) {
      this.transitionHistory.save(transition);
      this.transitionTo('authentication');
      return false;
    }

    return true;
  },
});
