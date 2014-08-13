import Ember from 'ember';

var Router = Ember.Router.extend({
	location: CertificationEmberENV.locationType
});

Router.map(function() {
	this.route('register');
  	this.route('application');
  	this.route('login');
  	this.route('account');
	this.route('exam');
  	this.resource('authenticated', { path: '/' }, function() {
	});
});

export default Router;
