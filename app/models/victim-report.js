import DS from 'ember-data';

export default DS.Model.extend({
  victim: DS.belongsTo('victim', { async: true }),
  goals: DS.attr('raw'),
  total_score: DS.attr('number'),
  max_score: DS.attr('number'),
});
