
import Ember from 'ember';
// import Notify from 'ember-notify';

export default Ember.Controller.extend({
	needs: ['application'],
	names: [],
	selectedname: '',
	isLoading: false,
	isNull: false,
	isChanged: function() {
		if (this.get('selectedname') === null){
			this.set('isNull', true);
		}else{
			this.set('isNull', false);
		}
	    console.log(this.get('selectedname'));
	}.observes('selectedname.length'),
  	actions: {
	    logout: function() {
	      alert('logout');
	  	},
		startExam: function () {
			// if (this.get('selectedname') === null){
			// 	this.set('isNull', true);
			// }
			console.log(this.get('selectedname'));
			// this.setProperties({isLoading: false});
			if (this.get('selectedname') !== null) {
				var applicationController = this.get('controllers.application');
				var modalController = this;
				var store = modalController.store;
				//accountController.setProperties({isLoading: true});
				var userProperties = applicationController.getProperties('useremail','currentToken');
				var requestdata = '{ "action": "NewExam","useremail":"'+userProperties.useremail+'","secretToken":"'+userProperties.currentToken+'","examType":"'+this.get('selectedname')+'"}';
				window.console.log(requestdata);
				Ember.$.ajax({
					url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
					type: "POST",
					contentType: "application/json",
					data: requestdata,
					success : function (data) {
						window.console.log(data);
							store.createRecord('user-exam', {
											salesforceid : data.Id,
											name : data.Name,
											resultPercentage : data.Exam_Result_Percentage__c,
											result : data.Exam_Result__c,
											numberOfQuestions : data.Number_of_Questions__c,
											rightAnswers : data.Right_Answers__c,
											passingPercentage : data.Passing_Percentage__c,
											examType : data.Exam_Type__r.Name,
											examTaker: data.Exam_Taker__r.Email__c
										}).save().then(function (createdexam){
											console.log(data.Exam_Questions__r.records);
											data.Exam_Questions__r.records.forEach(function (question){
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
													result : question.Result__c,
													userexam : createdexam
													//store.find('user-exam', {name: item.Name})
												}).save();
											});

										});

						//accountController.setProperties({isLoading: false});
					},
					error : function (data) {
							console.log(data);
					}
				});
			}

		}
	},
	init: function () {
	  		var modal = this;
	  		this.store.find('exam-type').then(function(examtype){
	  			examtype.forEach(function(type){
	  				modal.names.push(type.get('name'));
	  			});
	  		});

	}
});




