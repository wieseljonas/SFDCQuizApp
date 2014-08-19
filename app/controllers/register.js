import Ember from 'ember';
import Notify from 'ember-notify';


export default Ember.Controller.extend({
	buttonText: "Register",
  	isLoading: false,
	actions: {
		register: function() {
			var registerController = this;
			registerController.setProperties({isLoading: true});

			if (registerController.get("useremail") === undefined || registerController.get("secondName") === undefined|| registerController.get("firstName") === undefined|| registerController.get("registerpassword") === undefined) {

			    Notify.warning("Hmmn, that didn't work out. Please fill every single field!", {
					closeAfter: 10000 // or set to null to disable auto-hiding
				});
				registerController.setProperties({isLoading: false});	
			} else {
				var requestdata = '{"action":"Register","useremail":"'+registerController.get("useremail")+'","password":"'+registerController.get("registerpassword")+'","firstName":"'+registerController.get("firstName")+'","secondName":"'+registerController.get("secondName")+'"}';
				window.console.log(requestdata);	
				Ember.$.ajax({
					url: "http://sfdcnodeproxy.herokuapp.com/proxypublic/Exam",
					type:"POST",
					contentType:"application/json",
					data:requestdata,
					success: function(data){
						window.console.log(data);
						if (data.hasOwnProperty("Success")) {
							Notify.success("Registration Successful Please Login!", {
				                closeAfter: 10000 // or set to null to disable auto-hiding
				            });
							registerController.transitionToRoute('login');
							registerController.setProperties({isLoading: false});
						} else {
							if (data.Error.indexOf("INVALID_EMAIL_ADDRESS") > -1){
								Notify.warning("Hmmn, that didn't work out. Invalid email address please try again!", {
								  closeAfter: 10000 // or set to null to disable auto-hiding
								});
							} else if (data.Error.indexOf("Email__c duplicates value") > -1){
								Notify.warning("Hmmn, that didn't work out. This email address is already registered please choose a different one!", {
								  closeAfter: 10000 // or set to null to disable auto-hiding
								});
							}
							
							registerController.setProperties({isLoading: false});						
						}
					},
					error : function (jqXHR, textStatus, errorThrown) {
			            //window.console.log(jqXHR);
			            //window.console.log(textStatus);
			            window.console.log(errorThrown);
			            Notify.alert("Hmmn, that didn't work out. It's probably as server error try later!", {
			            	closeAfter: 10000
			            });
			            registerController.setProperties({isLoading: false});
			        }
			    
				});
			} 
		},
	}
	
});
