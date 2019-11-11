import Route from '@ember/routing/route';

export default Route.extend({
  /* methods */
  renderTemplate: function() {
    this.render('logged-out', {
      into: 'root',
    });
  },
});
