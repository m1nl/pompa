import Model from "@ember-data/model";
import { attr } from '@ember-data/model';

import NumericIdModel from 'pompa/mixins/numeric-id-model';
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

export default Model.extend(NumericIdModel, Validator, {
  name: attr('string'),
  host: attr('string'),
  port: attr('number'),
  senderEmail: attr('string'),
  senderName: attr('string'),
  username: attr('string'),
  password: attr('string'),
  perMinute: attr('number'),
  burst: attr('number'),
  ignoreCertificate: attr('boolean'),
  validations: validations,
});
