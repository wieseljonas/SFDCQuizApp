import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: null,
  currentToken: null,
  isLoggedIn: false,
  savedTransition: null,
  actions: {
    logout: function() {
      this.controllerFor('application').logout();
      delete localStorage.authToken;
      this.set('isLoggedIn', false);
      this.transitionToRoute('index');
    },
    login: function() {
      var username = this.get('username');
      var password = this.get('password');
      var requestdata = '{"action":"Login","useremail":"'+username+'","password":"'+password+'"}';
      console.log(requestdata);
      Ember.$.ajax({
        url: "http://localhost:3123/proxypublic/Exam",
        type: "POST",
        contentType: "application/json",
        data: requestdata,
        success : function (data) {
          if(data.Success !== undefined) {
            window.console.log(data);
            var transition = this.get('savedTransition');
            localStorage.authToken = data.Success;
            this.setProperties({ savedTransition: null, isLoggedIn: true, currentUser: username , currentToken: data.Success });
            if (this.get('savedTransition')) {
              transition.retry();
            } else {
              this.transitionToRoute('account');
            }
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