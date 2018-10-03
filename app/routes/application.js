import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    showModal: function(name, model, controller) {
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model,
        controller: controller,
      });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application',
      });
    },
    back: function() {
      if (history.length > 1) {
        history.back();
      } else {
        this.transitionTo('index');
      }
    },
  }
});
