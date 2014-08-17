import Ember from 'ember';

export default Ember.Controller.extend({
  isLoggedIn: false,
  firstName: "",
  secondName: "",
  useremail: "",
  currentToken:"",
  actions: {
    redirectproctected: function () { 
      if (this.getProperty('isLoggedIn') === false){
        this.transitionToRoute('index');
        console.log('redirect');
      }
    },
    logout: function() {
      this.send('deletealldata');
      this.send('deleteallusers');
      console.log('removed everything from localStorage');
      this.transitionToRoute('index');
      this.setProperties({
        isLoggedIn: false,
        firstName: "",
        secondName: ""
      });
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
    },
    deleteExamdData: function() {
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
      var username = this.get('username');
      var password = this.get('password');
      var requestdata = '{"action":"Login","useremail":"'+username+'","password":"'+password+'"}';
      var controller = this;
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
             secondName: data.secondName,
             useremail: data.userName,
             currentToken: data.secretToken,
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
