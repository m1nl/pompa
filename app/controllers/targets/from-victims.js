import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { errorsArrayToHash } from '@ember-data/adapter/error'

export default Controller.extend({
  /* properties */
  groupsSorting: Object.freeze(['numericId']),
  sortedGroups: sort('groups', 'groupsSorting'),
  actions: {

    /* actions */
    groupChanged: function(value) {
      this.set('model.group', this.groups.findBy('id', value));
      this.set('model.errors.group_id', undefined);
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

          Object.keys(hash).forEach(function(k) {
            self.model.errors.set(k, hash[k].map((v) => { return { message: v } }));
          });
        }

        deferred.reject();
      });
    },
  },
});
