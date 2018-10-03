import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate: function() {
    this.render('templates.index');
    this.render({
      into: 'application',
      outlet: 'modal',
    });
  },
  model: function () {
    return this.modelFor('templates.template');
  },
});
