import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(transition) {
    var applicationController = this.controllerFor('application');
    
    // or check a cookie, or other state
    if (!localStorage.authToken) {
      applicationController.set('savedTransition', transition);
      this.transitionTo('login');
    } else {
      this.controllerFor('application').login();      
    }
  }
});
