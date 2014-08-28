import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['application','account'],
	isLoading: false,
	examID:'',
	questions: (function() {
	    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
		      sortProperties: ['questionIndex'],
		      content: this.get('content.questions')
		});
	}).property('content.questions'),
	actions: {
		LoadUserExams: function (examID) {
			var applicationController = this.get('controllers.application');
			var store = this.store;
			var accountController = this.get('controllers.account');
			var examController = this;
			var userexams = store.findAll('user-exam');
			accountController.setProperties ({isLoading: true});
			userexams.then(function() {
				var userProperties = applicationController.getProperties('useremail','currentToken');
				var requestdata = '{ "action": "GetExams","useremail":"'+userProperties.useremail+'","secretToken":"'+userProperties.currentToken+'"}';
				Ember.$.ajax({
					url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
					type: "POST",
					contentType: "application/json",
					data: requestdata,
					success : function (data) {

						//window.console.log(data);
						data.forEach(function (item){
							console.log(store.getById('user-exam', item.Name));
								if (store.getById('user-exam', item.Name) === null) {
										store.createRecord('user-exam', {
											salesforceid : item.Id,
											name : item.Name,
											id: item.Name,
											isCompleted: item.Is_Completed__c,
											timeLeft : item.Time_Left__c,
											resultPercentage : item.Exam_Result_Percentage__c,
											result : item.Exam_Result__c,
											numberOfQuestions : item.Number_of_Questions__c,
											rightAnswers : item.Correct_Answers__c,
											passingPercentage : item.Passing_Percentage__c,
											examType : item.Exam_Type__r.Name,
											examTaker: item.Exam_Taker__r.Email__c,
											lastUpdated: moment(item.LastModifiedDate)
										});
								} else if (!moment(item.LastModifiedDate).isSame(store.getById('user-exam', item.Name).get('lastUpdated'))) {
									store.find('user-exam', item.Name).then(function(exam){
										exam.setProperties({
												isCompleted: item.Is_Completed__c,
												timeLeft : item.Time_Left__c,
												resultPercentage : item.Exam_Result_Percentage__c,
												result : item.Exam_Result__c,
												numberOfQuestions : item.Number_of_Questions__c,
												rightAnswers : item.Right_Answers__c,
												passingPercentage : item.Passing_Percentage__c,
												lastUpdated: moment(item.LastModifiedDate)
										});
									});						
								} 
							});
						accountController.setProperties ({isLoading: false});
						examController.send('loadExamData', examID);
					},
					error : function (data) {
						console.log(data);
					}
				});
			});

		},
		loadData: function (examID) {
			console.log('loadData');
			this.setProperties({isLoading: true});
			console.log(examID);
			if(this.store.getById('user-exam', examID) === null){
				this.send('LoadUserExams', examID);
			} else {
				this.send('loadExamData', examID);
			}
		},
		loadExamData: function (examID){
			console.log('loadData2');
			var applicationController = this.get('controllers.application');
			var examController = this;
			var store = examController.store;
			var userProperties = applicationController.getProperties('useremail','currentToken');
			console.log('loadData2');
			store.find('user-exam', examID).then(function(exam){
				console.log('loadData3');
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
								var questioncreated = store.createRecord('exam-question', {
									question : question.Question__r.Question__c,
									name : question.Name,
									id : question.Name,
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
								question.ExamAnswers__r.records.forEach( function(answer) {
									store.createRecord('exam-answer', {
											name : answer.Name,
											id: answer.Name,
											choice : answer.Choice__c,
											chosenAnswer : answer.Chosen_Answer__c,
											isCorrect : answer.Is_Correct__c,
											solution : answer.Solution__c,
											questionID : question.Name,
											question : questioncreated
									});
								});
								
							});
							if (examController.get('model')=== null){
									console.log('set model');
									examController.set('model', exam );
							}
						}  else {
							console.log('updating');
							//exam.set("lastUpdated", moment(data.LastModifiedDate));
							//console.log(exam.get('questions'));
							//exam.get('questions').get('content').forEach(function (outdatedquestion){
							//	outdatedquestion.unloadRecord();
							//});
							data.forEach( function(question) {
								if (!moment(question.LastModifiedDate).isSame(store.getById('exam-question', question.Name).get('lastUpdated'))) {
									console.log('updating changed question');
									store.find('exam-question', question.Name).then(function(q) {
									  	q.setProperties({ 
											isCorrect: question.Is_Correct__c,
											isCorrectManual : question.Is_Correct_Manual__c,
											lastUpdated: moment(question.LastModifiedDate)
										});
									});	
									question.ExamAnswers__r.records.forEach( function(answer) {
										store.find('exam-answer', answer.Name).then(function(a) {
										  	a.setProperties({ 
												chosenAnswer : answer.Chosen_Answer__c,
												isCorrect : answer.Is_Correct__c,
											});
										});
									});
								}		
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