import Ember from 'ember';

export default Ember.Controller.extend({
	buttonText: "Login",
  	isLoading: false,
	needs: ['application'],
	actions: {
		login: function() {
			var applicationController = this.get('controllers.application');
			var loginController = this;
			loginController.setProperties({isLoading: true});
			var username = loginController.get('loginemail').toLowerCase();
			var password = loginController.get('loginpassword');
			var requestdata = '{"action":"Login","useremail":"'+username+'","password":"'+password+'"}';
			applicationController.send('deleteallusers');
			var store = loginController.store;
			Ember.$.ajax({
				url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
				type: "POST",
				contentType: "application/json",
				data: requestdata,
				success : function (data) {
					if(data.secretToken !== undefined) {
						window.console.log(data);
						applicationController.transitionToRoute('account');
						store.createRecord('user', {
							useremail: data.userName,
							currentToken: data.secretToken,
							firstName: data.firstName,
							secondName: data.secondName
						}).save();
						applicationController.setProperties({
							isLoggedIn: true,
							firstName: data.firstName,
							secondName: data.secondName,
							useremail: data.userName,
							currentToken: data.secretToken,
						});
						loginController.setProperties({isLoading: false});
					} else {
						window.console.log(data);
						loginController.setProperties({isLoading: false});
					} 
				},
				error : function (jqXHR, textStatus, errorThrown) {
			        //window.console.log(jqXHR);
			        //window.console.log(textStatus);
			        window.console.log(errorThrown);
			        loginController.setProperties({isLoading: false});
    			} 
			});
		}
	}
});