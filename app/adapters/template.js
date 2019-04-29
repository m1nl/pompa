import ApplicationAdapter from 'pompa/adapters/application';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default ApplicationAdapter.extend(FileSaverMixin, {
  duplicate(id) {
    return this.ajax(this.urlForDuplicateAction(id), 'POST');
  },
  urlForDuplicateAction(id) {
    return `${this.buildURL('template', id)}/duplicate`;
  },
  download(id) {
    let self = this;
    return this.ajax(this.urlForDownloadAction(id), 'POST')
      .then(function(response) {
        if (response['worker_response'] &&
          response['worker_response']['status'] === 'success') {
          let url = self.urlPrefix(
            response['worker_response']['result']['url']);

          return self.ajax(url, 'GET', { blob: true })
            .then(function(content) {
              return self.saveFileAs(`template-${id}.zip`, content, content.type);
            });
        }
      });
  },
  urlForDownloadAction(id) {
    return `${this.buildURL('template', id)}/export`;
  },
  upload(file, params) {
    return file.upload(this.urlForUploadAction(), { data: params });
  },
  urlForUploadAction() {
    return `${this.buildURL('template')}/import`;
  },
});
