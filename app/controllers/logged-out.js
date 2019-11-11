import Controller from '@ember/controller';

export default Controller.extend({
  actions: {

    /* actions */
    reload: function() {
      window.location.assign('/');
    },
  }
});
