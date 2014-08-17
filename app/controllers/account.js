import Ember from 'ember';

export default Ember.ArrayController.extend({
	needs: ['application', 'newexam-modal'],
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
							console.log('store'+store);
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
			//var accountController = this;
			var userexams = store.findAll('user-exam');
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
						if (userexams.content.get('length') !== data.get('length')){
							data.forEach(function(item){
								var examname = item.Name;
								store.find('user-exam', { name: examname }).then(function(){
								},function() {
										store.createRecord('user-exam', {
											salesforceid : item.Id,
											name : item.Name,
											resultPercentage : item.Exam_Result_Percentage__c,
											result : item.Exam_Result__c,
											numberOfQuestions : item.Number_of_Questions__c,
											rightAnswers : item.Right_Answers__c,
											passingPercentage : item.Passing_Percentage__c,
											examType : item.Exam_Type__r.Name
										}).save();
								});
							});
						}
					},
					error : function (data) {
						console.log(data);
					}
				});
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