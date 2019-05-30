import Controller from '@ember/controller';
import { sort, alias } from '@ember/object/computed';

export default Controller.extend({
  groups: alias('model'),
  groupsSorting: Object.freeze(['numericId']),
  sortedGroups: sort('groups', 'groupsSorting'),
});
