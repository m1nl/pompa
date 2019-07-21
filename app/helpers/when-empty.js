import { helper } from '@ember/component/helper';
import { isBlank } from '@ember/utils';

export function whenEmpty(params) {
  let value = params[0];
  let empty = params[1];

  return isBlank(value) ? empty : value;
}

export default helper(whenEmpty);
