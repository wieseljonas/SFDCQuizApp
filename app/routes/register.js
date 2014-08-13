import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
		register: function() {
			//var registerController = this.controllerFor('register');
			window.console.log('clicked');
			var requestdata = '{"action":"Register","useremail":"'+this.get("useremail")+'","password":"'+this.get("registerpassword")+'","firstName":"'+this.get("firstName")+'","secondName":"'+this.get("secondName")+'"}';
			Ember.$.ajax({
				url: "https://certprep-developer-edition.ap1.force.com/services/apexrest/Exam",
				type:"POST",
				data:requestdata,
				contentType:"application/json; charset=utf-8",
				dataType:"json",
				success: function(data){
					window.console.log(data);
				  	//this.set('controllers.application.currentUser', this.get("useremail"));
				  	//window.console.log(this.get('controllers.application.currentUser'));
				},
				error: function(jqXHR){
				  	window.console.log(jqXHR);
				}
			});
		}
	}
});