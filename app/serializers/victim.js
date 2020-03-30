import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

import ApplicationSerializer from 'pompa/serializers/application';

export default ApplicationSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    state: { serialize: false },
    lastError: { serialize: false },
    code: { serialize: false },
    messageId: { serialize: false },
    errorCount: { serialize: false },
    sentDate: { serialize: false },
    group: { serialize: false, deserialize: 'records' },
    scenario: { serialize: false, deserialize: 'records' },
    events: { serialize: false, deserialize: 'records' },
    report: { serialize: false, deserialize: 'records' },
  }
});
