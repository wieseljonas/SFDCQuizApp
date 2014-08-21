import Ember from 'ember';

export default Ember.ObjectController.extend({
	previousQuestion:"",
	nextQuestion: "",
	actions: {
		setIndex: function (question){
			var ExamID = question.get('userexam');
			var questions = ExamID.get('questions');
			var questionID = question.get('questionIndex');
			var previousQuestion = this.store.find('exam-question', { questionIndex: questionID})[0];
			console.log(question.get('questionIndex'));
			console.log(questions);
			console.log(previousQuestion);
			console.log(ExamID);

		}
	}
});
