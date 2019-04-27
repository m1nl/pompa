import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    duplicate: function(deferred) {
      return this.model.duplicate().then(function () {
        deferred.resolve();
      }, function() {
        deferred.reject();
      });
    },
    cancel: function(deferred) {
      deferred.resolve();
    },
  },
});
