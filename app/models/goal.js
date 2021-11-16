import Model from "@ember-data/model";
import { attr, belongsTo } from '@ember-data/model';
import { get } from '@ember/object';

import NumericIdModel from 'pompa/decorators/numeric-id-model';
import Validator from 'ember-model-validator/decorators/object-validator';

const validations = {
  name: {
    presence: true,
  },
  score: {
    numericality: {
      onlyInteger: true,
    },
  }
};

export default @Validator @NumericIdModel class GoalModel extends Model {
  @attr('string') name;
  @attr('string') description;
  @attr('number') score;
  @attr('string') code;
  @belongsTo('template', { async: true }) template;

  get isPhishingReportGoal() {
    if (this.isNew) {
      return false;
    }

    return get(this, 'template.phishingReportGoal.id') == this.id;
  }

  validations = validations;
}
