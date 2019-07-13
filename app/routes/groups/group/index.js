import Route from '@ember/routing/route';

export default Route.extend({
  model: function () {
    return this.modelFor('groups.group');
  },
  setupController: function(controller) {
    this._super(...arguments);
    controller.refresh();
  },
  resetController: function(controller, isExiting, transition) {
    if (transition.targetName !== 'error') {
      controller.set('modelDirty', true);
    }
  },
});
