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
      adapter.upload(this.file, this.params).then(function() {
        deferred.resolve();
      }, function() {
        deferred.reject();
      });
    },
  },
});
