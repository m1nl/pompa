import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    cancel: function(deferred) {
      this.model.rollbackAttributes();
      deferred.resolve();
    },
    save: function(deferred) {
      this.model.destroyRecord().then(
        function() {
          deferred.resolve();
        },
        function() {
          deferred.reject();
        });
    },
  },
});
