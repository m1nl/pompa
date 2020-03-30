import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  numericId: computed('id', function() {
    return Number(this.id);
  }),
});

