import Controller from '@ember/controller';
import { sort, alias } from '@ember/object/computed';

export default Controller.extend({
  campaigns: alias('model'),
  campaignsSorting: Object.freeze(['stateOrder', 'startedDate:desc', 'finishedDate', 'id']),
  sortedCampaigns: sort('campaigns', 'campaignsSorting'),
});
