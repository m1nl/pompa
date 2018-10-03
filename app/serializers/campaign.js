import ApplicationSerializer from 'pompa/serializers/application';

export default ApplicationSerializer.extend({
  attrs: {
    state: { serialize: false },
    startedDate: { serialize: false },
    finishedDate: { serialize: false },
  }
});
