import Helper from '@ember/component/helper';
import { defineProperty } from '@ember/object';
import { filter } from '@ember/object/computed';
import { observer } from '@ember/object';

export default Helper.extend({
  compute(params) {
    this.set('records', params[0]);
    return this.get('content');
  },
  isNewObserver: observer('records', function() {
    defineProperty(this, 'content', filter('records.@each.isNew', record => !record.isNew));
  }),
  contentObserver: observer('content', function() {
    this.recompute();
  }),
});
