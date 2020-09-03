import Model from "@ember-data/model";
import { attr, belongsTo, hasMany } from '@ember-data/model';

import Moment from 'moment';
import { computed } from '@ember/object';

export const STATE_PENDING = 'pending';
export const STATE_QUEUED = 'queued';
export const STATE_SENT = 'sent';
export const STATE_ERROR = 'error';

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  gender: attr('string'),
  department: attr('string'),
  email: attr('string'),
  comment: attr('string'),
  code: attr('string'),
  state: attr('string'),
  stateOrder: attr('number'),
  lastError: attr('string'),
  errorCount: attr('number'),
  sentDate: attr('date'),
  messageId: attr('string'),
  group: belongsTo('group', { async: true }),
  scenario: belongsTo('scenario', { async: true }),
  events: hasMany('event', { async: true }),
  report: belongsTo('victim-report', { async: true }),
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
