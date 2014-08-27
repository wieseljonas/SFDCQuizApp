import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['application'],
	isLoading: false,
	examID:'',
	questions: (function() {
	    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
		      sortProperties: ['questionIndex'],
		      content: this.get('content.questions')
		});
	}).property('content.questions'),
	actions: {
		loadData: function (examID) {
			var applicationController = this.get('controllers.application');
			var examController = this;
			var store = examController.store;
			examController.setProperties({isLoading: true});
			var userProperties = applicationController.getProperties('useremail','currentToken');
			
			//var date = new Date(2014-08-18T09:26:00.000+0000);
			//console.log(date);
			store.find('user-exam', examID).then(function(exam){
				console.log(exam.get('name'));
				var requestdata = '{ "action": "GetExamQuestions","useremail":"'+userProperties.useremail+'","secretToken":"'+userProperties.currentToken+'","examName":"'+exam.get('name')+'"}';
				window.console.log(requestdata);
				Ember.$.ajax({
					url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
					type: "POST",
					contentType: "application/json",
					data: requestdata,
					success : function (data) {
						console.log(data);
						console.log(exam.get('lastUpdated').format("dddd, MMMM Do YYYY, h:mm:ss a"));
						console.log(moment(data.LastModifiedDate).format("dddd, MMMM Do YYYY, h:mm:ss a"));
						if (exam.get('questions').get('length') === 0) {
							console.log('first load');
							exam.set("lastUpdated", moment(data.LastModifiedDate));
							data.forEach( function(question) {
								console.log(question);
								store.createRecord('exam-question', {
									question : question.Question__r.Question__c,
									name : question.Name,
									questionType : question.Question_Type__c,
									isCorrect: question.Is_Correct__c,
									isCorrectManual : question.Is_Correct_Manual__c,
									numberofAnswers : question.Number_of_Answers__c,
									numberofChoices: question.Number_of_Choices__c,
									examID : question.Exam_Name__c,
									questionIndex : question.Index__c,
									userexam: exam,
									lastUpdated: moment(question.LastModifiedDate)
								});
								console.log(question);
								question.ExamAnswers__r.records.forEach( function(answer) {
									console.log(answer);
									store.createRecord('exam-answer', {
											name : answer.Name,
											choice : answer.Choice__c,
											chosenAnswer : answer.Chosen_Answer__c,
											isCorrect : answer.Is_Correct__c,
											solution : answer.Solution__c
									});

								});

							});
						} else if (!moment(data.LastModifiedDate).isSame(exam.get('lastUpdated'))) {
							console.log('not equal updating');
							exam.set("lastUpdated", moment(data.LastModifiedDate));
							console.log(exam.get('questions'));
							exam.get('questions').get('content').forEach(function (outdatedquestion){
								outdatedquestion.unloadRecord();
							});
							var updateEvent = {
								id: examID, 
								name : data.Name,
								resultPercentage : data.Exam_Result_Percentage__c,
								result : data.Exam_Result__c,
								rightAnswers : data.Right_Answers__c,
								passingPercentage : data.Passing_Percentage__c,
								examTaker: data.Exam_Taker__r.Email__c,
								lastUpdated: moment(data.LastModifiedDate)
							};
							store.update('user-exam', updateEvent);
							data.Exam_Questions__r.records.forEach(function (question){
								store.createRecord('exam-question', {
									question : question.Question__r.Question__c,
									questionID : question.Name,
									answer : question.Answer__c,
									
									solution : question.Solution__c,
									answerArray : question.Answer__c,
									solutionArray: question.Solution__c.replace(/\\/g, ''),
									examID : question.Exam_Name__c,
									isCorrect : question.Is_Correct__c,
									questionIndex : question.Index__c,
									userexam: exam,
									lastUpdated: moment(question.LastModifiedDate)
								});
							});	
						}
						examController.setProperties({isLoading: false});
					},
					error : function (data) {
						console.log(data);
					}
				});
});

},
viewQuestion: function(id){
	console.log(id);
}
}
});

// loadExam: function (params, thisexamid) {
// 			var applicationController = this.get('controllers.application');
// 			var examController = this;
// 			var store = examController.store;
// 			//accountController.setProperties({isLoading: true});
// 			var userProperties = applicationController.getProperties('useremail','currentToken');
// 			var requestdata = '{ "action": "GetExamQuestions","useremail":"'+userProperties.useremail+'","secretToken":"'+userProperties.currentToken+'","examID":"'+params+'"}';
// 			window.console.log(requestdata);
// 			Ember.$.ajax({
// 				url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
// 				type: "POST",
// 				contentType: "application/json",
// 				data: requestdata,
// 				success : function (data) {
// 					window.console.log(data);
// 					data.forEach(function(question){
// 						var examquestion = store.createRecord('exam-question', {
// 							question : question.Question__r.Question__c,
// 							questionID : question.Name,
// 							answer1 : question.Question__r.Answer_1__c,
// 							answer2 : question.Question__r.Answer_2__c,
// 							answer3 : question.Question__r.Answer_3__c,
// 							answer4 : question.Question__r.Answer_4__c,
// 							answer5 : question.Question__r.Answer_5__c,
// 							answer6 : question.Question__r.Answer_6__c,
// 							answer7 : question.Question__r.Answer_7__c,
// 							numberOfAnswers : question.Question__r.Number_of_Answers__c,
// 							solutions : question.Question__r.Solutions__c,
// 							examID : question.Exam_Name__c,
// 							chosenAnswers : question.Answer_Chosen__c,
// 							result : question.Result__c,
// 						}).save().then(function (examques){
// 								store.find('user-exam', thisexamid).then(function(exam){
// 									console.log(exam);
// 									examques.set('userexam', exam);
// 								});
// 							});
// 						});
// 						//accountController.setProperties({isLoading: false});
// 				},
// 				error : function (data) {
// 						console.log(data);
// 				}
// 			});

// 		}