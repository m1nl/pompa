import Controller from '@ember/controller';
import { sort, alias } from '@ember/object/computed';

export default Controller.extend({
  resources: alias('model'),
  resourcesSorting: Object.freeze(['type', 'numericId']),
  sortedResources: sort('resources', 'resourcesSorting'),
  actions: {

    /* actions */
    download: function(resource) {
      resource.download();
    },
  },
});
