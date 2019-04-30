import ApplicationAdapter from 'pompa/adapters/application';
import FileSaver from 'file-saver';
import Moment from 'moment';

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
          let timestamp = Moment.utc().format('YYMMDDhhmmss');
          let filename = `template-${id}-${timestamp}.zip`;

          return FileSaver.saveAs(url, filename);
        }

        return self;
      });
  },
  urlForDownloadAction(id) {
    return `${this.buildURL('template', id)}/export`;
  },
  upload(file, params) {
    let self = this;
    return file.upload(this.urlForUploadAction(), { data: params })
      .then(function(response) {
        let status = response.status;
        let payload = response.body;

        if (status === 202 && payload['status'] === 'pending') {
          let url = self.urlPrefix(payload['tracking']['url']);

          return self.ajax(`${url}?sync=true`, 'GET');
        }

        return self;
      });
  },
  urlForUploadAction() {
    return `${this.buildURL('template')}/import`;
  },
});
