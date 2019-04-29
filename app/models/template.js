import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  senderEmail: DS.attr('nstring'),
  senderName: DS.attr('nstring'),
  baseUrl: DS.attr('nstring'),
  landingUrl: DS.attr('nstring'),
  reportUrl: DS.attr('nstring'),
  staticResourceUrl: DS.attr('nstring'),
  dynamicResourceUrl: DS.attr('nstring'),
  subject: DS.attr('nstring'),
  plaintext: DS.attr('nstring'),
  html: DS.attr('nstring'),
  goals: DS.hasMany('goal', { async: true }),
  resources: DS.hasMany('resource', { async: true }),
  attachments: DS.hasMany('attachment', { async: true }),
  duplicate: function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.duplicate(this.id);
  },
  download: function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.download(this.id);
  },
});
