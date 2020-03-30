import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

import ApplicationSerializer from 'pompa/serializers/application';

export default ApplicationSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    victim: { serialize: false, deserialize: 'records' },
    goal: { serialize: false, deserialize: 'records' },
    reportedDate: { serialize: false },
    reportedData: { serialize: false, key: 'data' },
  }
});
