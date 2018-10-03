import Component from '@ember/component';

export default Component.extend({
  actions: {
    startDateChanged: function(value) {
      if (!(value instanceof Date)) {
        value = null;
      }
      this.set('model.startDate', value);
    },
    finishDateChanged: function(value) {
      if (!(value instanceof Date)) {
        value = null;
      }
      this.set('model.finishDate', value);
    },
  },
});
