import { helper } from '@ember/component/helper';

const stateClass = { 'empty': 'label-default', 'url': 'label-warning', 'file': 'label-success' }

export function resourceTypeClass(params) {
  return `label ${stateClass[params]}`;
}

export default helper(resourceTypeClass);
