import Service from '@ember/service';

import ENV from "pompa/config/environment";

export default Service.extend({
  /* properties */
  storage: ENV.APP.localStorageCompatiblityMode ? window.localStorage : window.sessionStorage,
  get length() {
    return this.storage.length;
  },

  /* methods */
  getItem: function(key) {
    return this.storage.getItem(key);
  },
  setItem: function(key, value) {
    return this.storage.setItem(key, value);
  },
  removeItem: function(key) {
    return this.storage.removeItem(key);
  },
  clear: function() {
    return this.storage.clear();
  },
  key: function(index) {
    return this.storage.key(index);
  },
});
