import Controller from '@ember/controller';
import { sort, alias } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { errorsHashToArray, errorsArrayToHash } from '@ember-data/adapter/error'

export default Controller.extend({
  /* properties */
  groupsSorting: Object.freeze(['numericId']),
  sortedGroups: sort('groups', 'groupsSorting'),
  actions: {

    /* actions */
    groupChanged: function(value) {
      this.model.set('group', this.groups.findBy('id', value));
    },
    cancel: function(deferred) {
      deferred.resolve();
    },
    save: function(deferred) {
      let params = assign(this.model.filter || {});

      if (this.model.group) {
        params['group_id'] = this.model.group.id;
      }

      let adapter = this.store.adapterFor('target');
      let self = this;
      adapter.fromVictims(params).then(function() {
        deferred.resolve();
      }, function(response) {
        if (response.errors) {
          let hash = errorsArrayToHash(response.errors);
          let errors = {};

          Object.keys(hash).forEach(function(k) {
            errors[k] = hash[k].map((v) => { return { message: v } });
          });

          self.set('errors', errors);
        }

        deferred.reject();
      });
    },
  },
});
