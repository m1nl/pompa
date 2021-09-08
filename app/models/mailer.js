import Model from "@ember-data/model";
import { attr } from '@ember-data/model';

import NumericIdModel from 'pompa/decorators/numeric-id-model';
import Validator from 'ember-model-validator/decorators/object-validator';

const validations = {
  name: {
    presence: true,
  },
  host: {
    presence: true,
  },
  port: {
    numericality: {
      allowBlank: true,
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

export default @Validator @NumericIdModel class MailerModel extends Model {
  @attr('string') name;
  @attr('string') host;
  @attr('number') port;
  @attr('string') senderEmail;
  @attr('string') senderName;
  @attr('string') username;
  @attr('string') password;
  @attr('number') perMinute;
  @attr('number') burst;
  @attr('boolean') ignoreCertificate;

  validations = validations;
}
