import ApplicationAdapter from 'pompa/adapters/application';
import FileSaver from 'file-saver';

export default ApplicationAdapter.extend({
  download(id) {
    let self = this;
    return this.ajax(this.urlForFilenameAction(id)).then(
      function(response) {
        if (response && response['filename']) {
          let filename = response['filename'];
          return self.authenticateUrl(self.urlForDownloadAction(id)).then(u =>
            FileSaver.saveAs(u, filename));
        }
      }
    );
  },
  urlForFilenameAction(id) {
    return `${this.buildURL('resource', id)}/filename`;
  },
  urlForDownloadAction(id) {
    return `${this.buildURL('resource', id)}/download`;
  },
  upload(id, file) {
    return this.authenticateUrl(this.urlForUploadAction(id)).then(u =>
      file.upload(u));
  },
  urlForUploadAction(id) {
    return `${this.buildURL('resource', id)}/upload`;
  },
});
