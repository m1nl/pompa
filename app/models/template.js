import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  senderEmail: DS.attr('string'),
  senderName: DS.attr('string'),
  baseUrl: DS.attr('string'),
  landingUrl: DS.attr('string'),
  reportUrl: DS.attr('string'),
  staticResourceUrl: DS.attr('string'),
  dynamicResourceUrl: DS.attr('string'),
  subject: DS.attr('string'),
  plaintext: DS.attr('nstring'),
  html: DS.attr('nstring'),
  goals: DS.hasMany('goal', { async: true }),
  resources: DS.hasMany('resource', { async: true }),
  attachments: DS.hasMany('attachment', { async: true }),
});
