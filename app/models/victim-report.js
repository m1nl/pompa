import Model from '@ember-data/model';	
import { attr, belongsTo } from '@ember-data/model';	

export default Model.extend({
  victim: belongsTo('victim', { async: true }),
  goals: attr('raw'),
  total_score: attr('number'),
  max_score: attr('number'),
});
