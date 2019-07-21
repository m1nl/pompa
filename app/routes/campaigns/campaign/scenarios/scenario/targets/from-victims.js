import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { isBlank } from '@ember/utils';

export default Route.extend({
  queryParams: {
    filter: {
      refreshModel: true
    }
  },
  controllerName: 'targets.from-victims',
  renderTemplate: function() {
    this.render('campaigns.campaign.scenarios.scenario.index');
    this.render('campaigns.campaign.scenarios.scenario.action-panel', {
      into: 'campaigns.campaign',
      outlet: 'action-panel',
      model: this.modelFor('campaigns.campaign.scenarios.scenario'),
      controller: this.controllerFor('campaigns.campaign.scenarios.scenario.index'),
    });
    this.render('targets.from-victims', {
      into: 'application',
      outlet: 'modal',
    });
  },
  model: function(params) {
    let scenario = this.modelFor('campaigns.campaign.scenarios.scenario');
    let filter = {};

    if (!isBlank(params['filter'])) {
      filter = JSON.parse(params['filter']);
    }

    if (!filter['filter']) {
      filter['filter'] = {}
    }

    filter['filter']['scenario_id'] = scenario.id;

    return EmberObject.create({
      filter: filter,
      group: null,
      errors: EmberObject.create(),
    });
  },
  setupController: function(controller) {
    this._super(...arguments);

    let groups = this.store.findAll('group');

    controller.set('groups', groups);
  },
});
