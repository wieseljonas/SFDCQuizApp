import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		if ( params.exam_id !== undefined){
			console.log(params.exam_id);
			return this.store.getById('user-exam', params.exam_id);
		}
  		//if (this.store.getById('user-exam', params.exam_id)!== undefined){
  		//	return this.store.getById('user-exam', params.exam_id);
  		//}	
	},
	setupController: function(controller, model) {
		if ( model === undefined ){
			console.log('setupController undefined');
		} else {
			console.log('setupController');
    		this.controller.set('model', model);
    	}	
    	//console.log(controller.get('model').get('name'));
  	},
  	afterModel: function(model, transition) {
  		console.log('afterModel');
  		console.log(model);
		var applicationController = this.controllerFor('application');
		if (!applicationController.isLoggedIn) {
			this.transitionTo('index');	
		} else if ( model === null ){
			console.log(transition.params.exam.exam_id);
			this.controllerFor('exam').send('loadData', transition.params.exam.exam_id);
		} else if ( model !== null){
			this.controllerFor('exam').send('loadData', model.id);
		}
	},
	beforeModel: function(transition){
		// console.log(transition);
		// console.log(transition.params.exam.exam_id);
		// console.log(this.get('model'));
		// console.log(this.store.getById('user-exam', transition.params.exam.exam_id));
	}
});
