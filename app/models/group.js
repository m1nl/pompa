import DS from 'ember-data';
import NumericIdModel from 'pompa/mixins/numeric-id-model';

export default DS.Model.extend(NumericIdModel, {
  name: DS.attr('string'),
  description: DS.attr('string'),
  targets: DS.hasMany('target', { async: true }),
});
