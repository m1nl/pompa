import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    showConfirmation: function(title, text, action) {
      this.set('confirmationTitle', title);
      this.set('confirmationText', text);
      this.set('confirmationAction', action);

      this.send('showModal', 'confirmation-modal', null, this);
    },
  },
});
