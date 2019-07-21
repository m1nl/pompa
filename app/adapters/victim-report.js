import ApplicationAdapter from 'pompa/adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function() {
    return 'victims';
  },
  buildURL: function() {
    let value = this._super(...arguments);

    return `${value}/report`;
  },
});
