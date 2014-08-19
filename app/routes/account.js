import Ember from 'ember';

export default Ember.Route.extend({
	model: function () {
		var applicationController =  this.controllerFor('application');
		return this.store.find('user-exam');
		//console.log(applicationController.useremail);
		// console.log(this.store.find('user-exam', { examTaker: applicationController.useremail }));
		// return this.store.find('user-exam', { examTaker: applicationController.useremail })

	},
	afterModel: function() {
		var applicationController = this.controllerFor('application');
		if (!applicationController.isLoggedIn) {
			this.transitionTo('index');
		}
		this.controllerFor('account').send('loadData');
	}
});
