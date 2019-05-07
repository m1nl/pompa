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
    templateChanged: function(value) {
      this.set('model.template', this.templates.findBy('id', value));
    },
    mailerChanged: function(value) {
      this.set('model.mailer', this.mailers.findBy('id', value));
    },
    groupChanged: function(value) {
      this.set('model.group', this.groups.findBy('id', value));
    },
  }
});
