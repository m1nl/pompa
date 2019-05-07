import { isNone } from '@ember/utils';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  fileNotEmpty: computed('file', function() {
    return !isNone(this.file);
  }),
  progress: computed('file.queue.progress', function() {
    return this.get('file.queue.progress');
  }),
  actions: {
    enqueue: function(file) {
      this.set('file', file);
    },
    cancel: function(deferred) {
      deferred.resolve();
    },
    upload: function(deferred) {
      let adapter = this.store.adapterFor('template');
      let self = this;
      adapter.upload(this.file, this.params).then(function(response) {
        if (!response.worker_response) {
          deferred.reject();
        }

        let worker_response = response.worker_response;
        let status = worker_response.status;

        if (status === "error") {
          let errors = [{ message: worker_response.value }];
          self.set('errors', errors);
          deferred.reject();
        }

        deferred.resolve();
      }, function() {
        deferred.reject();
      });
    },
  },
});
