import Model from '@ember-data/model';	
import { attr, belongsTo } from '@ember-data/model';	

import { computed } from '@ember/object';

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  displayName: computed('firstName', 'lastName', function() {
    return this.firstName + " " + this.lastName;
  }),
  gender: attr('string'),
  department: attr('string'),
  email: attr('string'),
  comment: attr('string'),
  group: belongsTo('group', { async: true }),
});
