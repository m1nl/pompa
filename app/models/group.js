import Model from "@ember-data/model";
import { attr, hasMany } from '@ember-data/model';

import NumericIdModel from 'pompa/mixins/numeric-id-model';

export default Model.extend(NumericIdModel, {
  name: attr('string'),
  description: attr('string'),
  targets: hasMany('target', { async: true }),
});
