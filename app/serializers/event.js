import DS from 'ember-data';
import ApplicationSerializer from 'pompa/serializers/application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    victim: { serialize: false, deserialize: 'records' },
    goal: { serialize: false, deserialize: 'records' },
    reportedDate: { serialize: false },
    reportedData: { serialize: false, key: 'data' },
  }
});
