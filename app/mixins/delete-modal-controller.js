import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    cancel: function(deferred) {
      this.model.rollbackAttributes();
      deferred.resolve();
    },
    save: function(deferred) {
      let self = this;
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
