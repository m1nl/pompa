import Mixin from '@ember/object/mixin';

export default Mixin.create({
  afterSave: function(deferred) {
    deferred.resolve();
  },
  actions: {
    cancel: function(deferred) {
      this.model.rollbackAttributes();
      deferred.resolve();
    },
    save: function(deferred) {
      let self = this;

      if (this.model.validate) {
        if (!this.model.validate()) {
          deferred.reject();
          return;
        }
      }

      this.model.save().then(
        function() {
          self.afterSave(deferred);
        },
        function() {
          deferred.reject();
        });
    },
  },
});
