import ApplicationAdapter from 'pompa/adapters/application';
import FileSaver from 'file-saver';

export default ApplicationAdapter.extend({
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
          let filename = `template-${id}.zip`;

          FileSaver.saveAs(url, filename);
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
