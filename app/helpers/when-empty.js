import { helper } from '@ember/component/helper';
import { isEmpty } from '@ember/utils';

export function whenEmpty(params) {
  let value = params[0];
  let empty = params[1];

  return isEmpty(value) ? empty : value;
}

export default helper(whenEmpty);
