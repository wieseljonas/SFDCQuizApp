import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['application'],
	previousQuestion:"",
	nextQuestion: "",
	isSubmitting: false,
	isStopping : false,
	actions: {
		setIndex: function (question){
			var questions = question.get('userexam').get('questions').get('content');
			var nextQuestion = questions.find(function(item){
				return item.get('questionIndex') === question.get('questionIndex')+1;
			});
			var previousQuestion = questions.find(function(item){
				return item.get('questionIndex') === question.get('questionIndex')-1;
			});
			if (previousQuestion === undefined){
			previousQuestion = questions.find(function(item){
				return item.get('questionIndex') === questions.get('length');
			});
			this.set('previousQuestion', previousQuestion.get('id'));
			} else {
			this.set('previousQuestion', previousQuestion.get('id'));
			}
			if (nextQuestion === undefined){
			nextQuestion = questions.find(function(item){
				return item.get('questionIndex') === 1;
			});
			this.set('nextQuestion', nextQuestion.get('id'));
			} else {
			this.set('nextQuestion', nextQuestion.get('id'));	
			}
		},
		submitAnswer: function (){
			var applicationController = this.get('controllers.application');
			var questionController = this;
			questionController.set('isSubmitting', true);
			var userProperties = applicationController.getProperties('useremail','currentToken');
			var answerJSON = JSON.stringify(this.get('model')._relationships.answers.content).replace(/"/g,'\\"');
			var requestdata = '{ "action": "PostAnswer","useremail":"'+userProperties.useremail+'","secretToken":"'+userProperties.currentToken+'","data":"'+answerJSON+'"}';
			Ember.$.ajax({
					url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
					type: "POST",
					contentType: "application/json",
					data: requestdata,
					success : function (data) {
						if (data.hasOwnProperty("Success")) {
							questionController.transitionToRoute('question', questionController.get('nextQuestion'));
							questionController.set('isSubmitting', false);
							console.log(data);
						} else{
							console.log(data);
							questionController.set('isSubmitting', false);
						}
						
					},
					error : function (data) {						
						console.log(data);
						questionController.set('isSubmitting', false);
					}
			});
		}, stopExam: function (){
			var applicationController = this.get('controllers.application');
			var questionController = this;
			questionController.set('isStopping', true);
			var userProperties = applicationController.getProperties('useremail','currentToken');
			var examName = questionController.get('model').get('userexam').get('id');
			console.log(examName);
			var requestdata = '{ "action": "stopExam","useremail":"'+userProperties.useremail+'","secretToken":"'+userProperties.currentToken+'","examName":"'+examName+'"}';
			console.log(requestdata);
			Ember.$.ajax({
					url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
					type: "POST",
					contentType: "application/json",
					data: requestdata,
					success : function (data) {
						if (data.hasOwnProperty("Success")) {
							questionController.transitionToRoute('account');
							questionController.set('isStopping', false);
							console.log(data);
						} else{
							console.log(data);
							questionController.set('isStopping', false);
						}
						
					},
					error : function (data) {						
						console.log(data);
						questionController.set('isStopping', false);
					}
			});
		}
	}
});

