import Ember from 'ember';

var CustomAuthenticator = SimpleAuth.Authenticators.Base.extend({
	tokenEndpoint: '/v4/session',

	restore: function(data) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			if (!Ember.isEmpty(data.token)) {
				resolve(data);
			} else {
				reject();
			}
		});
	},

	authenticate: function(credentials) {
		var _this = this;
		return new Ember.RSVP.Promise(function(resolve, reject) {
			Ember.$.ajax({
				url:         _this.tokenEndpoint,
				type:        'POST',
				data:        JSON.stringify({ session: { identification: credentials.identification, password: credentials.password } }),
				contentType: 'application/json'
			}).then(function(response) {
				Ember.run(function() {
					resolve({ token: response.session.token });
				});
			}, function(xhr, status, error) {
				var response = JSON.parse(xhr.responseText);
				Ember.run(function() {
					reject(response.error);
				});
			});
		});
	},

	invalidate: function() {
		var _this = this;
		return new Ember.RSVP.Promise(function(resolve) {
			Ember.$.ajax({ url: _this.tokenEndpoint, type: 'DELETE' }).always(function() {
				resolve();
			})
		});
	},
});

      // the custom authorizer that authorizes requests against the custom server
var CustomAuthorizer = SimpleAuth.Authorizers.Base.extend({
      	authorize: function(jqXHR, requestOptions) {
      		if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.token'))) {
      			jqXHR.setRequestHeader('Authorization', 'Token: ' + this.get('session.token'));
      		}
      	}
});

      export default {
      	name:       'simple-auth-config',
      	before:     'simple-auth',
      	initialize: function() {
      		window.ENV = CertificationEmberENV;
      	}
      };