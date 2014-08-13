import Ember from 'ember';

export default Ember.Controller.extend(SimpleAuth.LoginControllerMixin, {
	authenticator: 'authenticator:custom',
	actions: {
          // display an error when authentication fails
          authenticate: function() {
          	var _this = this;
          	this._super().then(null, function(message) {
          		_this.set('errorMessage', message);
          	});
          }
      }
  });
