import Ember from 'ember';

var Router = Ember.Router.extend({
	location: CertificationEmberENV.locationType
});

Router.map(function() {
	this.route('register');
	this.route('account');
	this.route('exam');
  	this.route('application');
  	this.route('login');
});

export default Router;
