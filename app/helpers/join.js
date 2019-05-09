import { helper } from '@ember/component/helper';

export function join(params) {
  let array = params[0];
  let delimiter = params[1];
  let property = params[2];

  if (!property) {
    return array.join(delimiter);
  } else {
    return array.map(i => i[property]).join(delimiter);
  }
}

export default helper(join);
