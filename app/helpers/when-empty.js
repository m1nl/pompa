import { helper } from '@ember/component/helper';

export function whenEmpty(params) {
  let value = params[0];
  let empty = params[1];

  return !value ? empty : value;
}

export default helper(whenEmpty);
