import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';

import Component from '@ember/component';

const GENDER_LIST = ['male', 'female'];

export default Component.extend({
  classNames: ['form'],
  classNameBindings: ['hasErrors:has-error'],
  hasErrors: computed('model.errors.record', function() {
    return !isEmpty(this.get('model.errors.record'));
  }),
  genderList: GENDER_LIST,
  actions: {
    genderChanged: function(value) {
      if (value === 'null') {
        value = null;
      }
      this.set('model.gender', value);
    },
  },
});
