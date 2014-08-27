import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){   
    	return this.store.find('exam-question', params.question_id);
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
