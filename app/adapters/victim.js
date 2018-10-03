import $ from 'jquery';
import ApplicationAdapter from 'pompa/adapters/application';

export default ApplicationAdapter.extend({
  sendEmail(id) {
    return this.ajax(this.urlForSendEmailAction(id), 'POST');
  },
  urlForSendEmailAction(id) {
    return `${this.buildURL('victim', id)}/send-email`;
  },
  resetState(id) {
    return this.ajax(this.urlForResetStateAction(id), 'POST');
  },
  urlForResetStateAction(id) {
    return `${this.buildURL('victim', id)}/reset-state`;
  },
  findHasMany(store, snapshot, url, relationship) {
    let id = snapshot.id;
    let type = snapshot.modelName;

    url = this.urlPrefix(url, this.buildURL(type, id, snapshot, 'findHasMany'));

    if (relationship.type === "event") {
      let params = snapshot.record.get('event-query-params');

      if (params) {
        url += `&${$.param(params)}`;
      }
    }

    return this.ajax(url, 'GET');
  },
});
