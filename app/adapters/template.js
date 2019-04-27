import ApplicationAdapter from 'pompa/adapters/application';

export default ApplicationAdapter.extend({
  duplicate(id) {
    return this.ajax(this.urlForDuplicateAction(id), 'POST');
  },
  urlForDuplicateAction(id) {
    return `${this.buildURL('template', id)}/duplicate`;
  },
});
