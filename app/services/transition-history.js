import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

const transitionUrlKey = 'transitionUrl';

export default Service.extend({
  /* properties */
  transitionUrl: null,

  /* services */
  router: service(),

  /* methods */
  save: function(transition) {
    if (transition && !isEmpty(transition.intent.url)) {
      this.transitionUrl = transition.intent.url;
    }
  },
  commit: function() {
    if (!isEmpty(this.transitionUrl)) {
      window.sessionStorage.setItem(transitionUrlKey, this.transitionUrl);
    }

    this.transitionUrl = null;
  },
  retry: function(fallback) {
    let savedTransitionUrl = window.sessionStorage.getItem(transitionUrlKey);
    window.sessionStorage.removeItem(transitionUrlKey);

    if (isEmpty(savedTransitionUrl)) {
      return this.router.transitionTo(fallback || 'index');
    }

    return this.router.transitionTo(savedTransitionUrl);
  }
});
