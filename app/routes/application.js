import Ember from 'ember';

export default Ember.Route.extend({
    // afterModel: function() {
    //   this.controllerFor('application').send('checkifloggedin');
    // },
    model: function() {
      console.log('fetching lists from store...');
      return this.store.find('user');
    },
    afterModel: function() {
      var applicationController =  this.controllerFor('application');
      this.store.findAll('user').then(function(users) {
         if (users.content.length === 0 ) {
          applicationController.setProperties({
           isLoggedIn: false,
           firstName: "",
           secondName: "",
           useremail: "",
           currentToken: ""
         });
          console.log('checking if route false');
        } else {
          var currentuser = users.get('firstObject');
          applicationController.setProperties({
           isLoggedIn: true,
           firstName: currentuser.get('firstName'),
           secondName: currentuser.get('secondName'),
           useremail: currentuser.get('useremail'),
           currentToken: currentuser.get('currentToken')
         });
          console.log('checking if route true');
        }
      });
    },
    actions: {
      showModal: function(name, content) {
        window.console.log('show modal');
        this.controllerFor(name).set('content', content);
        this.render(name, {
          into: 'application',
          outlet: 'modal'
        });
      },
      removeModal: function() {
        this.disconnectOutlet({
          outlet: 'modal',
          parentView: 'application'
        });
      }
    }
  });