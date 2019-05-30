import DS from 'ember-data';
import Moment from 'moment';
import { computed } from '@ember/object';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  gender: DS.attr('string'),
  department: DS.attr('string'),
  email: DS.attr('string'),
  comment: DS.attr('string'),
  code: DS.attr('string'),
  state: DS.attr('string'),
  stateOrder: DS.attr('number'),
  lastError: DS.attr('string'),
  errorCount: DS.attr('number'),
  sentDate: DS.attr('date'),
  messageId: DS.attr('string'),
  group: DS.belongsTo('group', { async: true }),
  scenario: DS.belongsTo('scenario', { async: true }),
  events: DS.hasMany('event', { async: true }),
  report: DS.belongsTo('victim-report', { async: true }),
  displayName: computed('firstName', 'lastName', function() {
    return this.firstName + ' ' + this.lastName;
  }),
  details: computed('state', 'lastError', 'sentDate', function() {
    switch (this.state) {
      case 'error':
        return String(this.lastError);
      case 'sent':
        return String(Moment(this.sentDate).calendar());
      default:
        return null;
    }
  }),
  sendEmail: function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.sendEmail(this.id);
  },
  resetState: function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.resetState(this.id);
  },
});
