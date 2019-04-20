import DS from 'ember-data';
import Validator from 'ember-model-validator/mixins/model-validator';

export default DS.Model.extend(Validator,{
  name: DS.attr('string'),
  description: DS.attr('string'),
  score: DS.attr('number'),
  code: DS.attr('string'),
  template: DS.belongsTo('template', { async: true }),
  init: function() {
    this._super(...arguments);

    this.validations = {
      name: {
        presence: true,
      },
      score: {
        numericality: {
          onlyInteger: true,
        },
      }
    }
  },
});
