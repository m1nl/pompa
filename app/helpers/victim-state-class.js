import { helper } from '@ember/component/helper';

const stateClass = { 'pending': 'label-default', 'queued': 'label-warning', 'sent': 'label-success', 'error': 'label-danger' }

export function victimStateClass(params) {
  return `label ${stateClass[params]}`;
}

export default helper(victimStateClass);
