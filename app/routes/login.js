import Ember from 'ember';

export default Ember.Route.extend({
	actions: {
    login: function() {
      var loginController = this.controllerFor('login'),
      username = loginController.get('username'),
      password = loginController.get('password');

      var requestdata = '{"action":"Login","useremail":"'+username+'","password":"'+password+'"}';
      console.log(requestdata);
      Ember.$.ajax({
        url: "https://certprep-developer-edition.ap1.force.com/services/apexrest/Exam'",
        type: "POST",
        // headers: { 'Access-Control-Allow-Origin': '*' },
        ContentType: "application/json; charset=utf-8",
        //dataType: "jsonp",
        //jsonpCallback: 'process',
        //jsonp: 'callback',
        //crossDomain: true,
        //contentType: "application/json",
        data: requestdata,
        success : function (data) {
          window.console.log('success');
          window.console.log(data);
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
        error : function (jqXHR, textStatus, errorThrown) {
            window.console.log(jqXHR);
            window.console.log(textStatus);
            window.console.log(errorThrown);
        } 
        //beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', '*');    
      });
    }
  }
});
