import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    close: function() {
      this.send('closeModal');
    }
  }
});
