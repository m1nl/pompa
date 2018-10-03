import { isNone } from '@ember/utils';
import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    discardPlaintext: function(deferred) {
      this.set('draftPlaintext', null);
      deferred.resolve();
    },
    savePlaintext: function(deferred) {
      if (!isNone(this.draftPlaintext)) {
        this.model.set('plaintext', this.draftPlaintext);
      }
      deferred.resolve();
    },
    updatePlaintext: function(value) {
      this.set('draftPlaintext', value);
    },
    discardHtml: function(deferred) {
      this.set('draftPlaintext', null);
      deferred.resolve();
    },
    saveHtml: function(deferred) {
      if (!isNone(this.draftHtml)) {
        this.model.set('html', this.draftHtml);
      }
      deferred.resolve();
    },
    updateHtml: function(value) {
      this.set('draftHtml', value);
    },
    save: function() {
      this.model.save().then(
        function() {
        },
        function() {
        });
    },
    cancel: function() {
      this.model.rollbackAttributes();
      return true;
    },
  },
});
