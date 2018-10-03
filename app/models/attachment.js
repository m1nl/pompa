import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  filename: DS.attr('string'),
  template: DS.belongsTo('template', { async: true }),
  resource: DS.belongsTo('resource', { async: true }),
});
