import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

import Component from '@ember/component';

export default Component.extend({
  classNames: ['form-group'],
  classNameBindings: ['hasErrors:has-error'],
  hasErrors: computed('errors', function() {
    return !isEmpty(this.errors);
  }),
});
