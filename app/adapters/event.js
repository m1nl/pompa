import ApplicationAdapter from 'pompa/adapters/application';

export default ApplicationAdapter.extend({
  seriesData(timespan, query) {
    return this.ajax(this.urlForSeriesData(timespan), 'GET', { data: query });
  },
  urlForSeriesData(timespan) {
    return `${this.buildURL('event')}/series/${timespan}`;
  },
});
