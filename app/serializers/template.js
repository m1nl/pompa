import ApplicationSerializer from 'pompa/serializers/application';

export default ApplicationSerializer.extend({
  attrs: {
    goals: { serialize: false },
    resources: { serialize: false },
  }
});
