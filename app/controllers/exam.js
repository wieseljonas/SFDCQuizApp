import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],
	isLoading: true,
	examID: "",
	actions: {
		LoadExam: function () {
			var applicationController = this.get('controllers.application');
			var store = this.store;
			var examController = this;
			var userexams = store.findAll('user-exam');
			//accountController.setProperties({isLoading: true});
			userexams.then(function() {
				var userProperties = applicationController.getProperties('useremail','currentToken');
				var requestdata = '{ "action": "GetExams","useremail":"'+userProperties.useremail+'","secretToken":"'+userProperties.currentToken+'"}';
				Ember.$.ajax({
					url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
					type: "POST",
					contentType: "application/json",
					data: requestdata,
					success : function (data) {
						window.console.log(data);
						data.forEach(function(question){
							window.console.log(question);
							store.createRecord('exam-question', {
								question : question.Question__r.Question__c,
								questionID : question.Name,
								answer1 : question.Question__r.Answer_1__c,
								answer2 : question.Question__r.Answer_2__c,
								answer3 : question.Question__r.Answer_3__c,
								answer4 : question.Question__r.Answer_4__c,
								answer5 : question.Question__r.Answer_5__c,
								answer6 : question.Question__r.Answer_6__c,
								answer7 : question.Question__r.Answer_7__c,
								numberOfAnswers : question.Question__r.Number_of_Answers__c,
								solutions : question.Question__r.Solutions__c,
								examID : question.Exam_Name__c,
								chosenAnswers : question.Answer_Chosen__c,
								result : question.Result__c
							}).save();		
						});
						//accountController.setProperties({isLoading: false});
					},
					error : function (data) {
						console.log(data);
					}
				});
			});
		}
	}
});