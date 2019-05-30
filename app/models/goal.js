import DS from 'ember-data';
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


export default DS.Model.extend(NumericIdModel, Validator, {
  name: DS.attr('string'),
  description: DS.attr('string'),
  score: DS.attr('number'),
  code: DS.attr('string'),
  template: DS.belongsTo('template', { async: true }),
  validations: validations,
});
