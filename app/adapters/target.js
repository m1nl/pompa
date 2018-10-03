import ApplicationAdapter from 'pompa/adapters/application';

export default ApplicationAdapter.extend({
  upload(file, params) {
    return file.upload(this.urlForUploadAction(), { data: params });
  },
  urlForUploadAction() {
    return `${this.buildURL('target')}/upload`;
  },
});
