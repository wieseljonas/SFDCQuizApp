import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		if (this.store.getById('exam-question', params.question_id) === null){
			this.transitionTo('account');	
		} else {
	    	return this.store.find('exam-question', params.question_id);
		}
	},
	setupController: function(controller, model) {
    	this.controller.set('model', model);
  	},
  	afterModel: function(question) {
		var applicationController = this.controllerFor('application');
		if (!applicationController.isLoggedIn) {
			this.transitionTo('index');	
		} else {
			this.controllerFor('question').send('setIndex', question);
		}
	}

});
