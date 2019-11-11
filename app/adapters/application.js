import ActiveModelAdapter from 'pompa/adapters/active-model-adapter';
import ENV from "../config/environment";
import { inject as service } from '@ember/service';

export default ActiveModelAdapter.extend({
  namespace: ENV.APP.apiNamespace,
  host: ENV.APP.apiHost,

  /* properties */
  get headers() {
    if (this.authManager.isAuthenticated) {
      return { 'Authorization': `Bearer ${this.authManager.token}` }
    }

    return { };
  },

  /* services */
  authManager: service(),

  /* response code handling */
  handleResponse: function(status, headers, payload) {
    if (this.isSuccess(status, headers, payload)) {
      this.authManager.refresh();
    }

    if (status === 202 && payload['status'] === 'pending') {
      let url = this.urlPrefix(payload['tracking']['url']);

      return this.ajax(`${url}?sync=true`, 'GET');
    }

    return this._super(...arguments);
  },
});
