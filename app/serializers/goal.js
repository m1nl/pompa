import ApplicationSerializer from 'pompa/serializers/application';

export default ApplicationSerializer.extend({
  attrs: {
    code: { serialize: false },
  }
});
