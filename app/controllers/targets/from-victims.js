import Controller from '@ember/controller';
import { assign } from '@ember/polyfills';
import { errorsArrayToHash } from '@ember-data/adapter/error'
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  newGroup: readOnly('model.group.isNew'),

  /* methods */
  reset: function() {
    if (this.newGroup) {
      this.get('model.group').deleteRecord();
    }
  },
  copy: function(deferred) {
    let params = assign(this.model.filter || {});
    let group = this.get('model.group');

    if (group) {
      params['group_id'] = group.id;
    }

    let self = this;
    let adapter = this.store.adapterFor('target');
    adapter.fromVictims(params).then(
      function() {
        deferred.resolve();
      },
      function(response) {
        if (response.errors) {
          let hash = errorsArrayToHash(response.errors);

          Object.keys(hash).forEach(function(k) {
            self.model.errors.set(k, hash[k].map((v) => { return { message: v } }));
          });
        }

        if (this.newGroup && group) {
          group.destroyRecord();
        }

        deferred.reject();
      }
    );
  },

  actions: {

    /* actions */
    groupChanged: function(value) {
      this.set('model.group', this.groups.findBy('id', value));
      this.set('model.errors.group_id', undefined);
    },
    newGroupChanged: function(state) {
      if (state) {
        this.set('model.group', this.store.createRecord('group', { }));
      } else {
        if (this.newGroup) {
          this.get('model.group').deleteRecord();
          this.set('model.group', null);
        }
      }
    },
    cancel: function(deferred) {
      deferred.resolve();
    },
    confirm: function(deferred) {
      if (this.newGroup) {
        let group = this.get('model.group');

        if (group.validate) {
          if (!group.validate()) {
            deferred.reject();
            return;
          }
        }

        let self = this;
        group.save().then(
          function(group) {
            self.copy(deferred);
          },
          function() {
            deferred.reject();
          }
        );
      } else {
        this.copy(deferred);
      }
    },
  },
});
