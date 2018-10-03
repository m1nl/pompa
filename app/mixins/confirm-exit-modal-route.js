import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    continueTransition: function(deferred) {
      let transition = this.abortedTransition;

      if (transition) {
        deferred.resolve();
        this.set('allowTransition', true);
        transition.retry();
      }
    },
    didTransition: function() {
      this.set('allowTransition', false);
      return true;
    },
    willTransition: function(transition) {
      if (!this.allowTransition && this.get('controller.model.hasDirtyAttributes')) {
        transition.abort();
        this.set('abortedTransition', transition);
        this.send('showModal', 'confirm-exit-modal');
      } else {
        return true;
      }
    }
  }
});
