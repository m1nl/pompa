import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import { isEmpty } from '@ember/utils';

export default Route.extend({
  /* query params */
  queryParams: {
    code: {
      replace: true,
      refreshModel: true,
    },
  },

  /* services */
  authManager: service(),
  transitionHistory: service(),
  router: service(),

  /* methods */
  renderTemplate: function() {
    this.render('authentication', {
      into: 'root',
    });
  },
  model: function(params) {
    return { code: params.code };
  },
  redirect: function(model, transition) {
    this._super(...arguments);

    if (this.authManager.isAuthenticated) {
      transition.then(this._return.bind(this));
      return;
    }

    let code = model.code;

    if (isEmpty(code)) {
      transition.then(this._authenticate.bind(this));
    } else {
      transition.then(this._commit.bind(this, code));
    }
  },
  resetController: function(controller) {
    controller.set('code', null);
  },

  /* callbacks methods */
  _authenticate: function() {
    let returnUrl = `${location.protocol}//${location.host}${location.pathname}`;

    let failedUrl = `${location.protocol}//${location.host}`;
    failedUrl += this.router.urlFor('forbidden');

    scheduleOnce('afterRender', this.authManager, 'authenticate', returnUrl,
      failedUrl, this._redirect.bind(this), this._forbidden.bind(this));
  },
  _commit: function(code) {
    scheduleOnce('afterRender', this.authManager, 'commit', code,
      this._clear.bind(this), this._forbidden.bind(this));
  },
  _return: function() {
    scheduleOnce('afterRender', this.transitionHistory, 'retry', 'index');
  },
  _redirect: function(redirectUrl) {
    this.transitionHistory.commit();

    setTimeout(function () {
      window.location.assign(redirectUrl);
    }, 0);
  },
  _clear: function() {
    this.replaceWith({ queryParams: { code: null } });
  },
  _forbidden: function() {
    this.authManager.invalidate().then(() => this.transitionTo('forbidden'));
  },
});
