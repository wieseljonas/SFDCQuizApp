import Ember from 'ember';

var Router = Ember.Router.extend({
	location: CertificationEmberENV.locationType
});

Router.map(function() {
	this.route('register');
  	this.route('application');
  	this.route('exam');
  	this.route('account');
  	this.route('login');
  this.route('settings');
});

export default Router;
