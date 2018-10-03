/* eslint ember/closure-actions:0 */

import { defer } from 'rsvp';
import Component from '@ember/component';

export default Component.extend({
  actionClass: 'btn-primary',
  cancelClass: 'btn-default',
  actionTitle: 'OK',
  cancelTitle: 'Cancel',
  actionEnabled: true,
  dialogClass: '',
  actions: {
    doAction: function() {
      let deferred = defer();
      let self = this;

      deferred.promise.then(
        function() {
          self.hide();
        },
        function() {
          self.bind();
        });

      this.unbind();

      if (this.action) {
        this.action(deferred);
      } else {
        deferred.resolve();
      }
    },
    doCancel: function() {
      let deferred = defer();
      let self = this;

      deferred.promise.then(
        function() {
          self.hide();
        },
        function() {
          self.bind();
        });

      this.unbind();

      if (this.cancel) {
        this.cancel(deferred);
      } else {
        deferred.resolve();
      }
    },
  },
  show: function() {
    let self = this;

    this.$('.modal').modal({ keyboard: true }).on('hidden.bs.modal',
      function() {
        self.$('.modal').unbind('hidden.bs.modal');

        if (self.close) {
          self.close();
        }
      });
    this.bind();
  },
  hide: function() {
    this.$('.modal').modal('hide');
  },
  bind: function() {
    let self = this;

    this.unbind();
    this.$('.modal').on('hide.bs.modal', function() {
      let deferred = defer();

      self.unbind();

      if (self.cancel) {
        self.cancel(deferred);
      } else {
        deferred.resolve();
      }
    });
  },
  unbind: function() {
    this.$('.modal').unbind('hide.bs.modal');
  },
  didInsertElement: function() {
    this._super(...arguments);
    this.show();
  },
  willDestroyElement: function() {
    this._super(...arguments);
    this.hide();
  },
});
