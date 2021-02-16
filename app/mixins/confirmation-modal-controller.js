import Mixin from '@ember/object/mixin';
import { htmlSafe } from '@ember/template';

export default Mixin.create({
  actions: {
    showConfirmation: function(title, text, action, challenge) {
      this.set('confirmationTitle', title);
      this.set('confirmationText', htmlSafe(text));
      this.set('confirmationAction', action);

      this.set('confirmationChallenge', challenge || '');
      this.set('confirmationResponse', '');

      this.send('showModal', 'confirmation-modal', this.model, this);
    },
  },
});
