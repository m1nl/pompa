import { helper } from '@ember/component/helper';

const stateClass = { 'created': 'label-default', 'started': 'label-success', 'finished': 'label-danger', 'paused': 'label-warning' }

export function campaignStateClass(params) {
  return `label ${stateClass[params]}`;
}

export default helper(campaignStateClass);
