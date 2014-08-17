import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],
	actions: {
		login: function() {
		      var username = this.get('loginemail');
		      var password = this.get('loginpassword');
		      var requestdata = '{"action":"Login","useremail":"'+username+'","password":"'+password+'"}';
		      var controller = this.get('controllers.application');
		      controller.send('deleteallusers');
		      var store = this.store;
		      Ember.$.ajax({
		        url: "http://sfdcnodeproxy.herokuapp.com/proxy/Exam",
		        type: "POST",
		        contentType: "application/json",
		        data: requestdata,
		        success : function (data) {
		          if(data.secretToken !== undefined) {
		            window.console.log(data);
		            controller.transitionToRoute('account');
		            store.createRecord('user', {
		              useremail: data.userName,
		              currentToken: data.secretToken,
		              firstName: data.firstName,
		              secondName: data.secondName
		            }).save();
		            controller.setProperties({
		             isLoggedIn: true,
		             firstName: data.firstName,
		             secondName: data.secondName
		           });
		          } else {
		            window.console.log(data);
		          } 
		        },
		        error : function (jqXHR, textStatus, errorThrown) {
		        //window.console.log(jqXHR);
		        //window.console.log(textStatus);
		        window.console.log(errorThrown);
		        } 
		      });
		    }
	}
});
