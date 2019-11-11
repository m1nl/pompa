import Component from '@ember/component';

export default Component.extend({
  /* properties */
  tagName: 'nav',
  classNames: ['navbar', 'navbar-inverse', 'navbar-fixed-top'],

  actions: {

    /* actions */
    logOut: function() {
      this.onLogOut();
    },
  },
});
