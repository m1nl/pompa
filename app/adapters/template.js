import ApplicationAdapter from 'pompa/adapters/application';
import FileSaver from 'file-saver';
import Moment from 'moment';

export default ApplicationAdapter.extend({
  /* methods */
  duplicate(id) {
    return this.ajax(this.urlForDuplicateAction(id), 'POST');
  },
  urlForDuplicateAction(id) {
    return `${this.buildURL('template', id)}/duplicate`;
  },
  download(id) {
    let self = this;
    return this.ajax(this.urlForDownloadAction(id), 'POST').then(
      function(response) {
        if (response && response['worker_response'] &&
          response['worker_response']['status'] === 'success') {
          let url = response['worker_response']['result']['url'];
          let timestamp = Moment.utc().format('YYMMDDhhmmss');
          let filename = `template-${id}-${timestamp}.zip`;

          url = self.urlPrefix(url);

          return self.authenticateUrl(url).then(u =>
            FileSaver.saveAs(u, filename));
        }

        return self;
      }
    );
  },
  urlForDownloadAction(id) {
    return `${this.buildURL('template', id)}/export`;
  },
  upload(file, params) {
    let self = this;
    return this.authenticateUrl(this.urlForUploadAction()).then(u =>
      file.upload(u, { data: params }).then(
        function(response) {
          let status = response.status;
          let payload = response.body;

          if (status === 202 && payload['status'] === 'pending') {
            let url = self.urlPrefix(payload['tracking']['url']);

            return self.ajax(`${url}?sync=true`, 'GET');
          }

          return self;
        }
      )
    );
  },
  urlForUploadAction() {
    return `${this.buildURL('template')}/import`;
  },
});
