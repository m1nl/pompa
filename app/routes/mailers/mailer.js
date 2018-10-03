import Route from '@ember/routing/route';

export default Route.extend({
  model: function(param) {
    return this.store.findRecord('mailer', param.mailer_id);
  }
});
