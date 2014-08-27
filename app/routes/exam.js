import Ember from 'ember';

export default Ember.Route.extend({
	examid:'',
	model: function(params){
		console.log(params);
  		//if (this.store.getById('user-exam', params.exam_id)!== undefined){
  		//	return this.store.getById('user-exam', params.exam_id);
  		//}	
	},
	setupController: function(controller, model) {
		if ( model === undefined ){
		} else {
    		this.controller.set('model', model);
    	}	
    	//console.log(controller.get('model').get('name'));
  	},
  	afterModel: function(model, transition) {
  		console.log(model);
		var applicationController = this.controllerFor('application');
		if (!applicationController.isLoggedIn) {
			this.transitionTo('index');	
		} else {
			this.controllerFor('exam').send('loadData', transition.params.exam.exam_id);
		}
	},
	beforeModel: function(transition){
		console.log(transition);
		console.log(transition.params.exam.exam_id);
		console.log(this.store.getById('user-exam', transition.params.exam.exam_id));
	}
});
