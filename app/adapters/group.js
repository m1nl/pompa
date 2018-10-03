import $ from 'jquery';
import ApplicationAdapter from 'pompa/adapters/application';

export default ApplicationAdapter.extend({
  findHasMany(store, snapshot, url, relationship) {
    let id = snapshot.id;
    let type = snapshot.modelName;

    url = this.urlPrefix(url, this.buildURL(type, id, snapshot, 'findHasMany'));

    if (relationship.type === "target") {
      let params = snapshot.record.get('target-query-params');

      if (params) {
        url += `&${$.param(params)}`;
      }
    }

    return this.ajax(url, 'GET');
  }
});
