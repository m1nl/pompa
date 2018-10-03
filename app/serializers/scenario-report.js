import ApplicationSerializer from 'pompa/serializers/application';

export default ApplicationSerializer.extend({
  primaryKey: 'scenario_id',
  attrs: {
    goals: { serialize: false },
    victims: { serialize: false },
  }
});
