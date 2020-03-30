import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

import ApplicationSerializer from 'pompa/serializers/application';

export default ApplicationSerializer.extend(EmbeddedRecordsMixin, {
  attrs: {
    report: { serialize: false, deserialize: 'records' },
  }
});
