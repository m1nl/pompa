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
      let adapter = this.store.adapterFor('target');
      let self = this;
      adapter.upload(this.file, this.params).then(function() {
        deferred.resolve();
      }, function(response) {
        if (response.body && response.body.errors && response.body.errors.file) {
          let errors = response.body.errors.file.map((v) => { return { message: v } })
          self.set('errors', errors);
        }
        deferred.reject();
      });
    },
  },
});
