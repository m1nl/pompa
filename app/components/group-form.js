import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';

import Component from '@ember/component';

export default Component.extend({
  classNames: ['form'],
  classNameBindings: ['hasErrors:has-error'],
  hasErrors: computed('model.errors.record', function() {
    return !isEmpty(this.get('model.errors.record'));
  }),
});
