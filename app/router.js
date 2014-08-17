import Ember from 'ember';

var Router = Ember.Router.extend({
	location: CertificationEmberENV.locationType
});

Router.map(function() {
	this.route('register');
  	this.route('application');
  	this.route('exam');
  	this.resource('settings');
  	this.route('account');
  this.route('login');
});

export default Router;
