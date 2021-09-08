import { computed } from '@ember/object';

function numericIdModel(Class) {
  return class NumericIdModel extends Class {
    @computed('id')
    get numericId() {
      return Number(this.id);
    }
  }
}

export default numericIdModel;
