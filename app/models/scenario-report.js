import Model from '@ember-data/model';
import { attr, belongsTo } from '@ember-data/model';	

export default Model.extend({
  scenario: belongsTo('scenario', { async: true }),
  goals: attr('raw'),
  victims: attr('raw'),
});
