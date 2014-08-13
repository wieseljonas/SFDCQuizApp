import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showModal: function(name, content) {
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
      this.get('session').invalidate();
    },
    setupController: function(controller, model) {
          controller.set('errorMessage', null);
        }
  }

});

import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin);