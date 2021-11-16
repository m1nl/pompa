import Model from '@ember-data/model';	
import { attr, hasMany, belongsTo } from '@ember-data/model';

import NumericIdModel from 'pompa/mixins/numeric-id-model';

export default Model.extend(NumericIdModel, {
  name: attr('string'),
  description: attr('string'),
  senderEmail: attr('nstring'),
  senderName: attr('nstring'),
  baseUrl: attr('nstring'),
  landingUrl: attr('nstring'),
  reportUrl: attr('nstring'),
  staticResourceUrl: attr('nstring'),
  dynamicResourceUrl: attr('nstring'),
  subject: attr('nstring'),
  plaintext: attr('nstring'),
  html: attr('nstring'),
  goals: hasMany('goal', { async: true }),
  resources: hasMany('resource', { async: true }),
  attachments: hasMany('attachment', { async: true }),
  phishingReportGoal: belongsTo('goal', { inverse: null, async: true }),
  duplicate: function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.duplicate(this.id);
  },
  download: function() {
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    return adapter.download(this.id);
  },
});
