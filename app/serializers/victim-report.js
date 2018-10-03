import ApplicationSerializer from 'pompa/serializers/application';

export default ApplicationSerializer.extend({
  primaryKey: 'victim_id',
  attrs: {
    goals: { serialize: false },
    total_score: { serialize: false },
    max_score: { serialize: false },
  }
});
