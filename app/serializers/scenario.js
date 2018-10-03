import DS from 'ember-data';
import ApplicationSerializer from 'pompa/serializers/application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    report: { serialize: false, deserialize: 'records' },
  }
});
