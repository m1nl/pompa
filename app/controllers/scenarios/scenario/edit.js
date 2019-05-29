import Controller from '@ember/controller';
import EditModalController from 'pompa/mixins/edit-modal-controller';

export default Controller.extend(EditModalController, {
  afterSave: function(deferred) {
    return this.model.belongsTo('campaign').reload().then(function() {
      deferred.resolve();
    });
  },
});
