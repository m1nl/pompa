import Model from "@ember-data/model";
import { attr, hasMany } from '@ember-data/model';

import NumericIdModel from 'pompa/mixins/numeric-id-model';
import Moment from 'moment';
import { computed } from '@ember/object';

export default Model.extend(NumericIdModel, {
  name: attr('string'),
  description: attr('string'),
  state: attr('string'),
  stateOrder: attr('number'),
  startDate: attr('date'),
  startedDate: attr('date'),
  finishDate: attr('date'),
  finishedDate: attr('date'),
  scenarios: hasMany('scenario', { async: true }),
  startedDateString: computed('startedDate', function() {
    if (this.startedDate) {
      return String(Moment(this.startedDate).calendar());
    } else {
      return null;
    }
  }),
  finishedDateString: computed('finishedDate', function() {
    if (this.finishedDate) {
      return String(Moment(this.finishedDate).calendar());
    } else {
      return null;
    }
  }),
  start: function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.start(this.id);
  },
  finish: function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.finish(this.id);
  },
  pause: function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.pause(this.id);
  },
  synchronizeEvents: function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.synchronizeEvents(this.id);
  },
});
