import ApplicationAdapter from 'pompa/adapters/application';

export default ApplicationAdapter.extend({
  urlForDownload(id) {
    return `${this.buildURL('resource', id)}/download`;
  },
  upload(id, file) {
    return file.upload(this.urlForUploadAction(id));
  },
  urlForUploadAction(id) {
    return `${this.buildURL('resource', id)}/upload`;
  },
});
