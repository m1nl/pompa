import ApplicationAdapter from 'pompa/adapters/application';

export default ApplicationAdapter.extend({
  start(id) {
    return this.ajax(this.urlForStartAction(id), 'POST');
  },
  urlForStartAction(id) {
    return `${this.buildURL('campaign', id)}/start`;
  },
  finish(id) {
    return this.ajax(this.urlForFinishAction(id), 'POST');
  },
  urlForFinishAction(id) {
    return `${this.buildURL('campaign', id)}/finish`;
  },
  pause(id) {
    return this.ajax(this.urlForPauseAction(id), 'POST');
  },
  urlForPauseAction(id) {
    return `${this.buildURL('campaign', id)}/pause`;
  },
  synchronizeEvents(id) {
    return this.ajax(this.urlForSynchronizeEventsAction(id), 'POST');
  },
  urlForSynchronizeEventsAction(id) {
    return `${this.buildURL('campaign', id)}/synchronize-events`;
  },
});
