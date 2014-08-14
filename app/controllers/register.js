import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		register: function() {
			var requestdata = '{"action":"Register","useremail":"'+this.get("useremail")+'","password":"'+this.get("registerpassword")+'","firstName":"'+this.get("firstName")+'","secondName":"'+this.get("secondName")+'"}';
			window.console.log(requestdata);
			Ember.$.ajax({
				url: "http://localhost:3123/proxypublic/Exam",
				type:"POST",
				contentType:"application/json",
				data:requestdata,
				success: function(data){
					window.console.log(data);
					this.transitionToRoute('application');
				},
				error : function (jqXHR, textStatus, errorThrown) {
		            //window.console.log(jqXHR);
		            //window.console.log(textStatus);
		            window.console.log(errorThrown);
		        } 
			});
		},
		test: function() {
			window.console.log('clicked');
		}
	}
	
});
