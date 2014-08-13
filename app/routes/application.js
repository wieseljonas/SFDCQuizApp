import Ember from 'ember';

export default Ember.Route.extend({
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
      },
      logout: function() {
          this.controllerFor('application').logout();
          delete localStorage.authToken;
          this.transitionTo('login');
      }
    }
});


