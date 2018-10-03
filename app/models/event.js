import { computed } from '@ember/object';
import DS from 'ember-data';
import Moment from 'moment';

export default DS.Model.extend({
  reportedDate: DS.attr('date'),
  reportedData: DS.attr('json'),
  victim: DS.belongsTo('victim', { async: true }),
  goal: DS.belongsTo('goal', { async: true }),
  reportedDateString: computed('reportedDate', function() {
    return String(Moment(this.reportedDate).format('YYYY-MM-DD HH:mm'));
  }),
});
