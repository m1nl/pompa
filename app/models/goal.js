import Model from "@ember-data/model";
import { attr, belongsTo } from '@ember-data/model';

import NumericIdModel from 'pompa/mixins/numeric-id-model';
import Validator from 'ember-model-validator/mixins/model-validator';

const validations = {
  name: {
    presence: true,
  },
  score: {
    numericality: {
      onlyInteger: true,
    },
  }
};


export default Model.extend(NumericIdModel, Validator, {
  name: attr('string'),
  description: attr('string'),
  score: attr('number'),
  code: attr('string'),
  template: belongsTo('template', { async: true }),
  validations: validations,
});
