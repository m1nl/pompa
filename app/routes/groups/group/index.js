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
    if (isExiting && transition.targetName !== 'error' &&
      !this.isNestedRoute(transition.targetName)) {
      controller.reset();
    }
  },
  isNestedRoute: function(route) {
    let routeA = this.routeName;
    let routeB = route;

    routeA = routeA.replace(/\.index$/, '');
    routeB = routeB.replace(/\.index$/, '');

    return routeB.startsWith(routeA);
  },
});
