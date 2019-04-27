import ActiveModelAdapter from 'active-model-adapter';
import ENV from "../config/environment";

export default ActiveModelAdapter.extend({
  namespace: ENV.APP.apiNamespace,
  host: ENV.APP.apiHost,
  handleResponse: function(status, headers, payload) {
    if (status === 202 && payload['status'] === 'pending') {
      let url = this.urlPrefix(payload['tracking']['url']);

      return this.ajax(`${url}?sync=true`);
    }

    return this._super(...arguments);
  },
});
