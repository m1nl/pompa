import Ajax from 'ember-ajax/services/ajax';
import ENV from "../config/environment";
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Ajax.extend({
  /* properties */
  namespace: ENV.APP.apiNamespace,
  host: ENV.APP.apiHost,
  headers: computed('authManager.token', {
    get() {
      let headers = {};

      if (this.authManager.isAuthenticated) {
        headers['Authorization'] = `Bearer ${this.authManager.token}`
      }

      return headers;
    }
  }),

  /* services */
  authManager: service(),

  /* methods */
  blob: function(url) {
    return this.request(url, {
      type: 'GET',
      cache: false,
      dataType: 'binary',
      xhr: function() { let xhr = new XMLHttpRequest(); xhr.responseType = 'blob'; return xhr; },
    });
  },
});
