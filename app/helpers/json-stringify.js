import { helper } from '@ember/component/helper';

export function jsonStringify(params) {
  let hash = params[0];

  return JSON.stringify(hash);
}

export default helper(jsonStringify);
