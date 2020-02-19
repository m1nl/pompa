import DS from 'ember-data';
import NumericIdModel from 'pompa/mixins/numeric-id-model';

export default DS.Model.extend(NumericIdModel, {
  name: DS.attr('string'),
  description: DS.attr('string'),
  url: DS.attr('string'),
  file: DS.attr('json'),
  contentType: DS.attr('string'),
  type: DS.attr('string'),
  extension: DS.attr('string'),
  dynamicUrl: DS.attr('boolean'),
  renderTemplate: DS.attr('boolean'),
  code: DS.attr('string'),
  transforms: DS.attr('json'),
  dynamic: DS.attr('boolean'),
  template: DS.belongsTo('template', { async: true }),
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
