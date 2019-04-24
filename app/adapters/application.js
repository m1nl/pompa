import ActiveModelAdapter from 'active-model-adapter';
import ENV from "../config/environment";
import { isBlank } from '@ember/utils';

export default ActiveModelAdapter.extend({
  namespace: ENV.APP.apiNamespace,
  host: ENV.APP.apiHost,
  handleResponse: function(status, headers, payload, requestData) {
    if (status === 202 && payload['status'] === 'pending') {
      let host = this.get('host');
      let namespace = this.get('namespace');

      if (!host || host === '/') {
        host = '';
      }

      let url = payload['tracking']['url'];

      return this.ajax(`${host}${url}?sync=true`);
    }

    return this._super(...arguments);
  },
});
