import Controller from '@ember/controller';
import { sort, alias } from '@ember/object/computed';

export default Controller.extend({
  templates: alias('model'),
  templatesSorting: Object.freeze(['id']),
  sortedTemplates: sort('templates', 'templatesSorting'),
  actions: {
    download: function(template) {
      return template.download();
    },
  },
});
