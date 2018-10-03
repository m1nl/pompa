import { isNone } from '@ember/utils';
import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(value) {
    return isNone(value) ? '' : String(value).trim();
  },
  deserialize: function(value) {
    return isNone(value) ? '' : String(value).trim();
  },
});
