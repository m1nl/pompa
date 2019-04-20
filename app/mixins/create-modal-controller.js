import Mixin from '@ember/object/mixin';

export default Mixin.create({
  afterSave: function(deferred) {
    deferred.resolve();
  },
  actions: {
    cancel: function(deferred) {
      this.model.deleteRecord();
      deferred.resolve();
    },
    save: function(deferred) {
      if (this.model.validate) {
        if (!this.model.validate()) {
          deferred.reject();
          return;
        }
      }

      let self = this;
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
