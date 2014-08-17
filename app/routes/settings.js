import Ember from 'ember';

export default Ember.Route.extend({
	afterModel: function() {
		var applicationController = this.controllerFor('application');
		if (!applicationController.isLoggedIn) {
			this.transitionTo('index');
		}
		this.controllerFor('account').send('loadData');
	}
});
