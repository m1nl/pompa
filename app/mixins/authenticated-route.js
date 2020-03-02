import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  /* services */
  authManager: service(),
  transitionHistory: service(),

  /* methods */
  beforeModel: function(transition) {
    this._super(...arguments);

    let self = this;
    return this.authManager.enabled.then(function(enabled) {
      if (enabled && !self.authManager.isAuthenticated) {
        self.transitionHistory.save(transition);
        self.transitionTo('authentication');
        return false;
      }

      return true;
    });
  },
});
