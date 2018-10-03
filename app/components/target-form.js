import Component from '@ember/component';

const GENDER_LIST = ['male', 'female'];

export default Component.extend({
  genderList: GENDER_LIST,
  actions: {
    genderChanged: function(value) {
      if (value === 'null') {
        value = null;
      }
      this.set('model.gender', value);
    },
  },
});
