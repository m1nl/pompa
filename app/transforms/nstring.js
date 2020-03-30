import Transform from '@ember-data/serializer/transform';

import { isNone } from '@ember/utils';

export default Transform.extend({
  serialize: function(value) {
    return isNone(value) ? '' : String(value);
  },
  deserialize: function(value) {
    return isNone(value) ? '' : String(value);
  },
});
