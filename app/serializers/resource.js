import ApplicationSerializer from 'pompa/serializers/application';

export default ApplicationSerializer.extend({
  attrs: {
    file: { serialize: false },
    type: { serialize: false },
    code: { serialize: false },
    dynamic: { serialize: false },
  }
});
