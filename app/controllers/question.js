import Ember from 'ember';

export default Ember.ObjectController.extend({
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
			console.log(this.get('model'));
			this.transitionToRoute('question', this.get('nextQuestion'));
		}
	}
});

