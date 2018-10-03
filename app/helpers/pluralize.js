import { helper } from '@ember/component/helper';
import { assert } from '@ember/debug';

export function pluralize(params, hash) {
  let number = params[0];
  let phraseMatch = (hash.phrase || '{|s}').match(/(.*?)\{(.*?)\|(.*?)\}/)

  assert('The optional "phrase" hash for {{pluralize}} should be formatted as <phrase to pluralize>{<singular ending>|<plural ending>}', phraseMatch)

  let word = phraseMatch[ 1 ],
      singular = word + phraseMatch[ 2 ],
      plural = word + phraseMatch[ 3 ];

  return number === 1 ? singular : plural;
}

export default helper(pluralize);
