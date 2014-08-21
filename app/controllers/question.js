import Ember from 'ember';

export default Ember.ObjectController.extend({
	previousQuestion:"",
	nextQuestion: "",
	solutions: [],
	chosenAnswers: [],
	isFinished: true,
	// isAnswer1 : (function (){
	// 	if (Ember.$.inArray('Answer 1', this.get('sArray')) > -1){
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }),
	// isAnswer2 : (function (){
	// 	if (Ember.$.inArray('Answer 2', this.get('sArray')) > -1){
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }),
	// isAnswer3 : (function (){
	// 	if (Ember.$.inArray('Answer 3', this.get('sArray')) > -1){
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }),
	// isAnswer4 : (function (){
	// 	if (Ember.$.inArray('Answer 4', this.get('sArray')) > -1){
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }),
	// isAnswer5 : (function (){
	// 	if (Ember.$.inArray('Answer 5', this.get('sArray')) > -1){
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }),
	// isAnswer6 : (function (){
	// 	if (Ember.$.inArray('Answer 6', this.get('sArray')) > -1){
	// 		return true;
	// 	} else {
	// 		return false;
	// 	}
	// }),
	actions: {
		setIndex: function (question){
			this.set('solutions', question.get('solutionsArray'));
			this.set('chosenAnswers', question.get('chosenAnswersArray'));	
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
			console.log(this.get('solutions'));
			console.log(this.get('chosenAnswers'));
		}
	}
});

