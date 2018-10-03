import { computed } from '@ember/object';
import DS from 'ember-data';
import RSVP from 'rsvp';
import Moment from 'moment';

export default DS.Model.extend({
  campaign: DS.belongsTo('campaign', { async: true }),
  template: DS.belongsTo('template', { async: true }),
  mailer: DS.belongsTo('mailer', { async: true }),
  group: DS.belongsTo('group', { async: true }),
  victims: DS.hasMany('victim', { async: true }),
  report: DS.belongsTo('scenario-report', { async: true }),
  events: DS.hasMany('event', { async: true, inverse: null }),
  synchronizeGroup: function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.synchronizeGroup(this.id);
  },
  victimsSummaryUrl: computed('id', function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.urlForVictimsSummary(this.id);
  }),
  eventSeries: function(timespan, dateFrom, dateTo) {
    return RSVP.hash({
      goals: this.template.then(template => template.goals).then(goals => goals.sortBy('id')),
      rawData: this.eventSeriesRawData(timespan, dateFrom, dateTo),
    }).then(rawResult => {
      let goals = rawResult.goals;
      let rawData = rawResult.rawData;

      let result = { series: [], data: [] };

      goals.forEach(goal => {
        let data = this.eventSeriesDataForGoal(goal, rawData, timespan, dateFrom, dateTo);

        result.series.push(goal.name);
        result.data.push(data);
      })

      return result;
    });
  },
  eventSeriesRawData: function(timespan, dateFrom, dateTo) {
    let adapter = this.store.adapterFor('event');
    let query = { filter: { victim: { scenario_id: this.id }, reported_date: [] } };

    if (dateFrom) {
      query.filter.reported_date.push(">=" + dateFrom.toJSON());
    }

    if (dateTo) {
      query.filter.reported_date.push("<=" + dateTo.toJSON());
    }

    return adapter.seriesData(timespan, query);
  },
  eventSeriesDataForGoal: function(goal, rawData, timespan, dateFrom, dateTo) {
    let eventSeries = rawData.event_series;
    let goalRawData = [];

    if (eventSeries) {
      for (let i = 0; i < eventSeries.length; i++) {
        if (eventSeries[i].goal.id == goal.id) {
          goalRawData = eventSeries[i].data;
        }
      }
    }

    let goalData = [];

    Object.entries(goalRawData).forEach( p => {
      goalData.push({ x: Moment(p[0]), y: p[1] });
    });

    let result = [];
    let iterator = Moment(dateFrom);

    while (iterator <= dateTo) {
      let x = iterator.clone();
      let y = 0;

      while (goalData.length > 0 && goalData[0].x <= iterator) {
        y += goalData[0].y;
        goalData.shift();
      }

      result.push({ x: x, y: y});

      iterator.add(1, timespan);
    }

    return result;
  },
});
