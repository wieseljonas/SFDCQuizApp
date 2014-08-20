import Ember from 'ember';

export default Ember.ObjectController.extend({
	previousQuestion:"",
	nextQuestion: "",
	actions: {
		setIndex: function (question){
			var ExamID = question.get('userexam');
			var questions = ExamID.get('questions');
			// var previousQuestion = ExamID.get('questions').get('content').find(function(item, index, enumerable) {
			// 	console.log(item);
			// 	return item.get('questionIndex').match(question.get('questionIndex'));
			// });
			console.log(question.get('questionIndex'));
			console.log(questions);
			//console.log(previousQuestion);
			console.log(ExamID);

		}
	}
});
