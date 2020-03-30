import { isNone } from '@ember/utils';
import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  /* computed properties */
  fileNotEmpty: computed('file', function() {
    return !isNone(this.file);
  }),

  progress: readOnly('file.queue.progress'),

  actions: {

    /* actions */
    enqueue: function(file) {
      this.set('file', file);
    },
    cancel: function(deferred) {
      deferred.resolve();
    },
    upload: function(deferred) {
      this.model.upload(this.file).then(function() {
        deferred.resolve();
      }, function() {
        deferred.reject();
      });
    },
  },
});
