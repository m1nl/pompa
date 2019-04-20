import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';

import Component from '@ember/component';

export default Component.extend({
  classNames: ['form'],
  classNameBindings: ['hasErrors:has-error'],
  hasErrors: computed('model.errors.record', function() {
    return !isEmpty(this.get('model.errors.record'));
  }),
  actions: {
    startDateChanged: function(value) {
      if (!(value instanceof Date)) {
        value = null;
      }
      this.set('model.startDate', value);
    },
    finishDateChanged: function(value) {
      if (!(value instanceof Date)) {
        value = null;
      }
      this.set('model.finishDate', value);
    },
  },
});
