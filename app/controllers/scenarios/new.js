import Controller from '@ember/controller';
import CreateModalController from 'pompa/mixins/create-modal-controller';

export default Controller.extend(CreateModalController, {
  afterSave: function(deferred) {
    return this.model.belongsTo('campaign').reload().then(function() {
      deferred.resolve();
    });
  },
});
