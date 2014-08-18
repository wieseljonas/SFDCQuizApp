import Ember from 'ember';

export default Ember.Controller.extend({
	buttonText: "Register",
  	isLoading: false,
	actions: {
		register: function() {
			var registerController = this;
			registerController.setProperties({isLoading: true});
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
						registerController.transitionToRoute('login');
						registerController.setProperties({isLoading: false});
					} else {
						registerController.setProperties({isLoading: false});
					}
				},
				error : function (jqXHR, textStatus, errorThrown) {
		            //window.console.log(jqXHR);
		            //window.console.log(textStatus);
		            window.console.log(errorThrown);
		        } 
			});
		},
	}
	
});
