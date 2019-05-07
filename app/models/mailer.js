import DS from 'ember-data';
import Validator from 'ember-model-validator/mixins/model-validator';

const validations = {
  name: {
    presence: true,
  },
  host: {
    presence: true,
  },
  port: {
    numericality: {
      onlyInteger: true,
    },
  },
  perMinute: {
    numericality: {
      allowBlank: true,
      onlyInteger: true,
    },
  },
  burst: {
    numericality: {
      allowBlank: true,
      onlyInteger: true,
    },
  }
};

export default DS.Model.extend(Validator, {
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
  validations: validations,
});
