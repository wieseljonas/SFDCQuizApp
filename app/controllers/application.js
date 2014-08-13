import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: null,
  currentToken: null,
  isLoggedIn: false,
  // when a user enters the app unauthenticated, the transition
  // to where they are going is saved off so it can be retried
  // when they have logged in.
  savedTransition: null,

  login: function() {
    this.setProperties({ savedTransition: null, isLoggedIn: true });
  },
  
  logout: function() {
    this.set('isLoggedIn', true);
  }
});