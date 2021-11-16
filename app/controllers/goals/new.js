import Controller from '@ember/controller';
import CreateModalController from 'pompa/mixins/create-modal-controller';

export default Controller.extend(CreateModalController, {
  /* properties */
  hasPhishingReportGoalChanged: false,

  /* methods */
  afterSave: function(deferred) {
    if (!this.hasPhishingReportGoalChanged) {
      deferred.resolve();
      return;
    }

    if (this.get('model.isPhishingReportGoal') == this.isPhishingReportGoal) {
      deferred.resolve();
      return;
    }

    let self = this;

    this.model.belongsTo('template').reload().then(function(template) {
      if (self.isPhishingReportGoal) {
        template.phishingReportGoal = self.model;
      } else {
        template.phishingReportGoal = null;
      }

      if (template.validate) {
        if (!template.validate()) {
          deferred.reject();
          return;
        }
      }

      template.save().then(
        function() {
          deferred.resolve();
        },
        function() {
          deferred.reject();
        }
      );
    });
  },

  actions: {

    /* actions */
    phishingReportGoalChanged: function(state) {
      this.set('hasPhishingReportGoalChanged', true);
      this.set('isPhishingReportGoal', state);
    }
  },
});
