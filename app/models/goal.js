import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  score: DS.attr('number'),
  code: DS.attr('string'),
  template: DS.belongsTo('template', { async: true }),
});
