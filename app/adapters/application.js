import ActiveModelAdapter from 'active-model-adapter';

import ENV from "pompa/config/environment";
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends ActiveModelAdapter {
  /* properties */
  get namespace() {
    return ENV.APP.apiNamespace;
  }

  get host() {
    return ENV.APP.apiHost;
  }

  get headers() {
    if (this.authManager.isAuthenticated) {
      return { 'Authorization': `Bearer ${this.authManager.token}` }
    }

    return { };
  }

  get urlForAuthenticateUrlAction() {
    return `${this.buildURL()}/auth/url`;
  }

  /* services */
  @service authManager;

  /* response code handling */
  handleResponse(status, headers, payload) {
    if (this.isSuccess(status, headers, payload)) {
      this.authManager.refresh();
    }

    if (status === 401) {
      this.authManager.invalidate();
    }

    if (status === 202 && payload['status'] === 'pending') {
      let url = this.urlPrefix(payload['tracking']['url']);

      return this.ajax(`${url}?sync=true`, 'GET');
    }

    return super.handleResponse(...arguments);
  }

  /* methods */
  authenticateUrl(url) {
    let self = this;
    return new Promise(resolve => {
      if (self.authManager.isAuthenticated) {
        return self.ajax(self.urlForAuthenticateUrlAction, 'POST',
          { data: { url: url } }).then(r => resolve(r.url));
      } else {
        resolve(url);
      }
    });
  }
}
