import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  displayName: computed('firstName', 'lastName', function() {
    return this.firstName + " " + this.lastName;
  }),
  gender: DS.attr('string'),
  department: DS.attr('string'),
  email: DS.attr('string'),
  comment: DS.attr('string'),
  group: DS.belongsTo('group', { async: true }),
});
