import { isNone } from '@ember/utils';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { camelize, capitalize } from '@ember/string';
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
      let adapter = this.store.adapterFor('target');
      let self = this;

      adapter.upload(this.file, this.params).then(function() {
        deferred.resolve();
      }, function(response) {
        if (response.body && response.body.errors) {
          let errors = []

          Object.keys(response.body.errors).forEach(function(p) {
            let property = response.body.errors[p];

            if (Array.isArray(property)) {
              property.forEach(function(v) {
                let message = capitalize(camelize(p)) + ": " + v;
                errors.push({ message: message });
              });
            }
          });

          self.set('errors', errors);
        }
        deferred.reject();
      });
    },
  },
});
