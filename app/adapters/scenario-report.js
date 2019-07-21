import $ from 'jquery';
import ApplicationAdapter from 'pompa/adapters/application';

export default ApplicationAdapter.extend({
  pathForType: function() {
    return 'scenarios';
  },
  buildURL: function() {
    let value = this._super(...arguments);

    return `${value}/report`;
  },
});
