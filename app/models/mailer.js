import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  host: DS.attr('string'),
  port: DS.attr('number'),
  senderEmail: DS.attr('string'),
  senderName: DS.attr('string'),
  username: DS.attr('string'),
  password: DS.attr('string'),
  perMinute: DS.attr('number'),
  burst: DS.attr('number'),
  ignoreCertificate: DS.attr('boolean'),
});
