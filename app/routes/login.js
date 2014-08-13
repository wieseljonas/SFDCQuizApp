import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
    login: function() {
      window.console.log('clicked');

      var loginController = this.controllerFor('login'),
      username = loginController.get('username'),
      password = loginController.get('password');

      var requestdata = '{"action":"Login","useremail":"'+username+'","password":"'+password+'"}';
      window.console.log(requestdata);
      Ember.$.ajax({
        url: 'https://certprep-developer-edition.ap1.force.com/services/apexrest/Exam',
        type: 'POST',
        dataType: 'jsonp', 
        data:requestdata,
        headers: {"Content-Type":"application/json; charset=utf-8"},
        success: function(resp){
          window.console.log('success');
          window.console.log(resp);
          localStorage.authToken = "auth-token-here";
          console.log(localStorage.authToke);
          var applicationController = this.controllerFor('application');
          var transition = applicationController.get('savedTransition');
          applicationController.login();
          if (transition) {
            transition.retry();
          } else {
            this.transitionTo('posts');
          }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            alert('Error: '+jqXHR.status);
            window.console.log(textStatus);
            window.console.log(errorThrown);
        } 
      });
    }
  }
});
