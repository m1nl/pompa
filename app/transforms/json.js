import Transform from '@ember-data/serializer/transform';

import { isNone } from '@ember/utils';

export default Transform.extend({
  escapeUnicodeControl: function(string) {
    return string
      .replace("\u061c", "\\u061c")
      .replace("\u200e", "\\u200e")
      .replace("\u200f", "\\u200f")
      .replace("\u202a", "\\u202a")
      .replace("\u202b", "\\u202b")
      .replace("\u202c", "\\u202c")
      .replace("\u202d", "\\u202d")
      .replace("\u202e", "\\u202e");
  },
  deserialize: function(serialized) {
    return isNone(serialized) ? null : this.escapeUnicodeControl(JSON.stringify(serialized));
  },
  serialize: function(deserialized) {
    return isNone(deserialized) ? null : JSON.parse(deserialized);
  },
});
