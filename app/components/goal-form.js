import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';

import Component from '@ember/component';

export default Component.extend({
  /* properties */
  classNames: ['form'],
  classNameBindings: ['hasErrors:has-error'],

  /* computed properties */
  hasErrors: computed('model.errors.record', function() {
    return !isEmpty(this.get('model.errors.record'));
  }),

  actions: {

    /* actions */
    phishingReportGoalChanged: function(state) {
      this.phishingReportGoalChanged(state);
    },
  }
});
