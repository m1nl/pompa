import DS from 'ember-data';
import NumericIdModel from 'pompa/mixins/numeric-id-model';

export default DS.Model.extend(NumericIdModel, {
  name: DS.attr('string'),
  filename: DS.attr('string'),
  template: DS.belongsTo('template', { async: true }),
  resource: DS.belongsTo('resource', { async: true }),
});
