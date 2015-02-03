import Ember from 'ember';

export default Ember.Controller.extend({
  today: Ember.computed(function() {
    return new Date();
  })
});
