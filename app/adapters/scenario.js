import $ from 'jquery';
import ApplicationAdapter from 'pompa/adapters/application';

export default ApplicationAdapter.extend({
  urlForVictimsSummary(id) {
    return `${this.buildURL('scenario', id)}/victims-summary`;
  },
  synchronizeGroup(id) {
    return this.ajax(this.urlForSynchronizeGroupAction(id), 'POST');
  },
  urlForSynchronizeGroupAction(id) {
    return `${this.buildURL('scenario', id)}/synchronize-group`;
  },
  findHasMany(store, snapshot, url, relationship) {
    let id = snapshot.id;
    let type = snapshot.modelName;

    url = this.urlPrefix(url, this.buildURL(type, id, snapshot, 'findHasMany'));

    if (relationship.type === "victim") {
      let params = snapshot.record.get('victim-query-params');

      if (params) {
        url += `&${$.param(params)}`;
      }
    } else if (relationship.type === "event") {
      let params = snapshot.record.get('event-query-params');

      if (params) {
        url += `&${$.param(params)}`;
      }
    }

    return this.ajax(url, 'GET');
  },
});
