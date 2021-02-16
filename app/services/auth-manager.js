/* eslint ember/use-ember-data-rfc-395-imports: "off" */

import Service from '@ember/service';
import Moment from 'moment';
import DS from 'ember-data';
import ENV from "pompa/config/environment"
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import { task } from 'ember-concurrency';
import { isForbiddenError } from 'ember-ajax/errors';

const nonceKey = 'nonce';
const tokenKey = 'token';

export default Service.extend({
  tokenRefreshMargin: ENV.APP.tokenRefreshMargin,

  /* computed properties */
  refreshTokenMarginDuration: computed('tokenRefreshMargin', {
    get() {
      return Moment.duration({ 'seconds': this.tokenRefreshMargin });
    }
  }),

  enabled: computed({
    get() {
      let promise = this.ajax.request('/auth')
        .then(() => true)
        .catch(e => isForbiddenError(e));

      return DS.PromiseObject.create({ promise: promise });
    }
  }),

  token: computed({
    get() {
      return this.storageWrapper.getItem(tokenKey);
    },
    set(key, value) {
      if (isEmpty(value)) {
        this.storageWrapper.removeItem(tokenKey);
      } else { 
        this.storageWrapper.setItem(tokenKey, value);
      }
 
      return value;
    }
  }),

  isAuthenticated: computed('token', {
    get() {
      return !isEmpty(this.token);
    },
  }),

  payload: computed('token', 'isAuthenticated', {
    get() {
      if (this.isAuthenticated) {
        let promise = this.ajax.request('/auth').catch(() => this.invalidate());
        return DS.PromiseObject.create({ promise: promise });
      } else {
        return null;
      }
    }
  }),

  clientId: readOnly('payload.client_id'),

  expiration: computed('payload.exp', function() {
    return this.payload.then(p => Moment.unix(p.exp));
  }),

  /* services */
  ajax: service(),
  storageWrapper: service(),

  /* tasks */
  refreshTokenTask: task(function * () {
    if (!this.isAuthenticated) {
      return;
    }

    let expiration = yield this.expiration;
    let diff = Moment.duration(expiration.diff(Moment()));

    if (diff > this.refreshTokenMarginDuration) {
      return;
    }

    let response = null;

    try {
      response = yield this.ajax.post('/auth/refresh');
    } catch(e) {
      if (isForbiddenError(e)) {
        this.set('token', null);
        return;
      }

      throw e;
    }

    if (!isEmpty(response.token)) {
      this.set('token', response.token);
    }
  }).drop(),
  revokeTokenTask: task(function * () {
    if (!this.isAuthenticated) {
      return;
    }

    let token = this.token;
    this.set('token', null);

    yield this.ajax.post('/auth/revoke', {
      headers: {'Authorization': `Bearer ${token}`}
    });
  }).drop(),

  /* methods */
  authenticate: function(returnUrl, failedUrl, success, failed) {
    this.storageWrapper.removeItem(nonceKey);

    let promise = this.ajax.post('/auth/init', {
      data: { return_url: returnUrl, failed_url: failedUrl }
    }).then(response => {
      this.storageWrapper.setItem(nonceKey, response.nonce);
      success(response.redirect_url);
    }).catch(failed);

    return this.invalidate().then(promise);
  },
  commit: function(code, success, failed) {
    let nonce = this.storageWrapper.getItem(nonceKey);
    this.storageWrapper.removeItem(nonceKey);

    if (isEmpty(nonce) || isEmpty(code)) {
      failed(new Error('Neither nonce nor code can be empty'));
      return;
    }

    let self = this;

    let promise = this.ajax.post('/auth/token', {
      data: { nonce: nonce, code: code }
    }).then(response => {
      self.set('token', response.token);
      success();
    }).catch(failed);

    return this.invalidate().then(promise);
  },
  refresh: function() {
    return new Promise(resolve => {
      if (!this.refreshTokenTask.isRunning) {
        return this.refreshTokenTask.perform().then(resolve);
      } else {
        resolve();
      }
    });
  },
  invalidate: function() {
    return new Promise(resolve  => {
      if (this.isAuthenticated && !this.revokeTokenTask.isRunning) {
        return this.revokeTokenTask.perform().then(resolve);
      } else {
        resolve();
      }
    });
  },
});
