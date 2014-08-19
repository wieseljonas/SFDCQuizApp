import Ember from 'ember';

export default Ember.Route.extend({
	examid:'',
	model: function(params){
  		//var store = this.store;
    	
    	// this.store.find('user-exam', { name : params.exam_id}).then( function (data) {
    	// 	console.log(data.get('content')[0]);
    	// 	console.log('test');
    	// 	return data.get('content')[0];
    	// });
    	//this.store.find('user-exam', { name : params.exam_id}).get('content')[0];    
    	return this.store.find('user-exam', params.exam_id);
	},
	// serialize: function(model, params) {
	//     //return { exam_id: model.get('name') };
	// }

	setupController: function(controller, model) {
    	this.controller.set('model', model);
    	//console.log(controller.get('model').get('name'));
  	},
  	afterModel: function(exam) {
  		console.log(exam);
		var applicationController = this.controllerFor('application');
		if (!applicationController.isLoggedIn) {
			this.transitionTo('index');	
		} else {
			this.controllerFor('exam').send('loadData', exam.get('id'));
		}
	},
	beforeModel: function(){

	}
});

  		//this.setProperties({'examID': params.exam_id});
    // 	questions = store.find('user-exam', params.exam_id).then(function(exam){
    // 		console.log(exam)
    // 		return store.find('exam-question', { examID: exam.get('name')}).then( function(question){
    // 			console.log(question);
    // 		});
    // 	});
    	// console.log(examquestions);
    	// var examquestions =

    			//examquestions.reload();
		//console.log(this.store.find('exam-question'));

