import Mixin from '@ember/object/mixin';
import { htmlSafe } from '@ember/string';

export default Mixin.create({
  actions: {
    showConfirmation: function(title, text, action) {
      this.set('confirmationTitle', title);
      this.set('confirmationText', htmlSafe(text));
      this.set('confirmationAction', action);

      this.send('showModal', 'confirmation-modal', null, this);
    },
  },
});
