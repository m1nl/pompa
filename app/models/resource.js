import Model from '@ember-data/model';
import { attr, belongsTo } from '@ember-data/model';

import NumericIdModel from 'pompa/mixins/numeric-id-model';

export default Model.extend(NumericIdModel, {
  name: attr('string'),
  description: attr('string'),
  url: attr('string'),
  file: attr('json'),
  contentType: attr('string'),
  type: attr('string'),
  extension: attr('string'),
  dynamicUrl: attr('boolean'),
  renderTemplate: attr('boolean'),
  code: attr('string'),
  transforms: attr('json'),
  dynamic: attr('boolean'),
  template: belongsTo('template', { async: true }),
  download: function(){
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.download(this.id);
  },
  upload: function(file, params) {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    let self = this;
    return adapter.upload(this.id, file, params).then(function() {
      return self.reload();
    });
  },
});
