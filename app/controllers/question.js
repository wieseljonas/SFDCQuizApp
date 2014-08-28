import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['application'],
	previousQuestion:"",
	nextQuestion: "",
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
			console.log(this.get('model')._relationships.answers.content);
			var applicationController = this.get('controllers.application');
			var questionController = this;
			console.log('loadData1');
			var userProperties = applicationController.getProperties('useremail','currentToken');
			console.log('loadData1.5');
			var requestdata = '{ "action": "PostAnswer","useremail":"'+userProperties.useremail+'","secretToken":"'+userProperties.currentToken+'","data":"'+JSON.stringify(this.get('model')._relationships.answers.content)+'"}';
			console.log('loadData2');
			Ember.$.ajax({
					url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
					type: "POST",
					contentType: "application/json",
					data: requestdata,
					success : function (data) {
						console.log(data);
						questionController.transitionToRoute('question', questionController.get('nextQuestion'));
					},
					error : function (data) {
						console.log(data);
					}
			});
		}
	}
});

