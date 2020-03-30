import Model from "@ember-data/model";
import { attr, belongsTo } from '@ember-data/model';

import NumericIdModel from 'pompa/mixins/numeric-id-model';

export default Model.extend(NumericIdModel, {
  name: attr('string'),
  filename: attr('string'),
  template: belongsTo('template', { async: true }),
  resource: belongsTo('resource', { async: true }),
});
