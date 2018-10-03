import DS from 'ember-data';

export default DS.Model.extend({
  scenario: DS.belongsTo('scenario', { async: true }),
  goals: DS.attr('raw'),
  victims: DS.attr('raw'),
});
