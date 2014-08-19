import Ember from 'ember';
import Notify from 'ember-notify';

Notify.useBootstrap();

export default Ember.Controller.extend({
  isLoggedIn: false,
  firstName: "",
  secondName: "",
  useremail: "",
  currentToken:"",
  buttonText: "Login",
  isLoading: false,
  actions: {
    redirectproctected: function () { 
      if (this.getProperty('isLoggedIn') === false){
        this.transitionToRoute('index');
        console.log('redirect');
      }
    },
    logout: function() {
      Notify.success("Logout Successful! Thank you for using our app.", {
        closeAfter: 10000 // or set to null to disable auto-hiding
      });
      this.setProperties({
        isLoggedIn: false,
        firstName: "",
        secondName: ""
      });
      var applicationController = this;
      
      applicationController.transitionToRoute('index').then(function(){
        applicationController.send('deleteallusers');
        applicationController.send('deletealldata');
      });
      
      console.log('removed everything from localStorage');   
    },
    deleteallusers: function() {
      this.store.findAll('user').then(function(record){
       record.content.forEach(function(rec) {
        Ember.run.once(this, function() {
         rec.deleteRecord();
         rec.save();
       });
      }, this);
     });
    },
    deletealldata: function() {
      this.store.findAll('exam-type').then(function(record){
       record.content.forEach(function(rec) {
        Ember.run.once(this, function() {
         rec.deleteRecord();
         rec.save();
       });
      }, this);
      });
      console.log('deleting user exams');
       this.store.findAll('user-exam').then(function(record){
       record.content.forEach(function(rec) {
        Ember.run.once(this, function() {
         rec.deleteRecord();
         rec.save();
       });
      }, this);
     });
       console.log('deleting user exam questions');
       this.store.findAll('exam-question').then(function(record){
       record.content.forEach(function(rec) {
        Ember.run.once(this, function() {
         rec.deleteRecord();
         rec.save();
       });
      }, this);
     });
    },
    deleteExamData: function() {
      console.log('deleting user exams');
       this.store.findAll('user-exam').then(function(record){
       record.content.forEach(function(rec) {
        Ember.run.once(this, function() {
         rec.deleteRecord();
         rec.save();
       });
      }, this);
     });
    },
    login: function() {
      var applicationController = this;
      applicationController.setProperties({isLoading: true});
      var username = applicationController.get('username');
      var password = applicationController.get('password');
      if ( applicationController.get("username") || applicationController.get("password")  !== undefined) {
        var requestdata = '{"action":"Login","useremail":"'+username+'","password":"'+password+'"}';
        applicationController.send('deleteallusers');
        window.console.log(requestdata);
        var store = this.store;
        Ember.$.ajax({
          url: "http://sfdcnodeproxy.herokuapp.com/proxy",
          type: "POST",
          contentType: "application/json",
          data: requestdata,
          success : function (data) {
            console.log(data);
            Notify.success("Login Successful! Loading your personal data.", {
                      closeAfter: 10000 // or set to null to disable auto-hiding
            }); 
            if(data.secretToken !== undefined) {
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
               isLoading: false
             });
            } else if (data.Error.indexOf("Wrong Password") > -1) {
              Notify.warning("Hmmn, that didn't work out. Invalid password please try again!", {
                    closeAfter: 10000 // or set to null to disable auto-hiding
              });
            } 
                applicationController.setProperties({isLoading: false});           
          },
          error : function (jqXHR, textStatus, errorThrown) {
          //window.console.log(jqXHR);
          //window.console.log(textStatus);
            window.console.log(jqXHR);
            if (jqXHR.responseText.indexOf("has no rows") > -1){
                Notify.warning("Hmmn, that didn't work out. This email address is not registered. Please register or enter a valid email!", {
                      closeAfter: 10000 // or set to null to disable auto-hiding
                });
            }
          }
        });
      } else {
          Notify.warning("Hmmn, that didn't work out. Please fill every single field!", {
            closeAfter: 10000 // or set to null to disable auto-hiding
          });
          applicationController.setProperties({isLoading: false});
      }
    }
  }
});
