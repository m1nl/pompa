import Model from "@ember-data/model";
import { attr, belongsTo } from '@ember-data/model';

import Moment from 'moment';
import { computed } from '@ember/object';

export default Model.extend({
  reportedDate: attr('date'),
  reportedData: attr('json'),
  victim: belongsTo('victim', { async: true }),
  goal: belongsTo('goal', { async: true }),
  reportedDateString: computed('reportedDate', function() {
    return String(Moment(this.reportedDate).format('YYYY-MM-DD HH:mm'));
  }),
});
