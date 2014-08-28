import Ember from 'ember';

export default Ember.ArrayController.extend({
	needs: ['application', 'newexam-modal'],
	isLoading: true,
	isDeleting: true,
	actions:{
		loadData: function (){
			console.log(this);
			this.send('loadExamTypes');
			this.send('LoadUserExams');
		},
		loadExamTypes: function () {
			//var newexamController = this.get('controllers.newexam-modal');
			var store = this.store;
			var examtypes = store.findAll('exam-type');
			examtypes.then(function() {
				if (examtypes.get('length') === 0){
					Ember.$.ajax({
						url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
						type: "POST",
						contentType: "application/json",
						data: '{ "action": "GetExamTypes" }',
						success : function (data) {
							window.console.log(data);
							//console.log('store'+store);
							data.forEach(function(item){
								console.log(item);
								store.createRecord('exam-type', {
									name: item.Name
								}).save();
							});
						//newexamController.set('names', data.content);
					},
					error : function (data) {
						console.log(data);
					}
				});
				}
			});
		},
		LoadUserExams: function () {
			var applicationController = this.get('controllers.application');
			var store = this.store;
			var accountController = this;
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
							//console.log(store.getById('user-exam', item.Name));
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
					},
					error : function (data) {
						console.log(data);
					}
				});
			});

		},
		deleteExam: function(exam){
			var applicationController = this.get('controllers.application');
			var store = this.store;
			var accountController = this;
			accountController.setProperties ({isDeleting: true});
			console.log('clicked');
			console.log(exam);
			var userProperties = applicationController.getProperties('useremail','currentToken');
			var requestdata = '{ "action": "DeleteExam","useremail":"'+userProperties.useremail+'","secretToken":"'+userProperties.currentToken+'","examName":"'+exam+'"}';
			console.log(requestdata);
			Ember.$.ajax({
					url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
					type: "POST",
					contentType: "application/json",
					data: requestdata,
					success : function (data) {
						window.console.log(data);
					       	store.find('user-exam',{ name: exam}).then(function(record){
					       		record.content.forEach(function(rec) {
					        		Ember.run.once(this, function() {
					         			rec.deleteRecord();
					         			rec.save();
					       			});
					      		}, this);
					    	});
					    	accountController.setProperties ({isLoading: false});
					},
					error : function (data) {
						console.log(data);
						
					}
			});
		},
		deleteExamData: function() {
			console.log('deleting user exams');
			this.store.findAll('user-exam').then(function(record){
				record.content.forEach(function(rec) {
					console.log('deleting exam'+rec);
					Ember.run.once(this, function() {
						rec.deleteRecord();
						rec.save();
					});
				}, this);
			});

		}		
	}
});