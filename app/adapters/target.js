import ApplicationAdapter from 'pompa/adapters/application';

export default ApplicationAdapter.extend({
  upload(file, params) {
    return this.authenticateUrl(this.urlForUploadAction()).then(u =>
      file.upload(u, { data: params }));
  },
  urlForUploadAction() {
    return `${this.buildURL('target')}/upload`;
  },
  fromVictims(params) {
    return this.ajax(this.urlForFromVictimsAction(), 'POST', { data: params });
  },
  urlForFromVictimsAction() {
    return `${this.buildURL('target')}/from-victims`;
  },
});
