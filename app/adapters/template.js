import ApplicationAdapter from 'pompa/adapters/application';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default ApplicationAdapter.extend(FileSaverMixin, {
  duplicate(id) {
    return this.ajax(this.urlForDuplicateAction(id), 'POST');
  },
  urlForDuplicateAction(id) {
    return `${this.buildURL('template', id)}/duplicate`;
  },
  _export(id) {
    let self = this;
    return this.ajax(this.urlForExportAction(id), 'POST')
      .then(function(response) {
        if (response['worker_response'] &&
          response['worker_response']['status'] === 'success') {
          let url = self.urlPrefix(
            response['worker_response']['result']['url']);

          return self.ajax(url, 'GET', { blob: true })
            .then(function(content) {
              self.saveFileAs(`template-${id}.zip`, content, content.type);
            });
        }
      });
  },
  urlForExportAction(id) {
    return `${this.buildURL('template', id)}/export`;
  },
});
