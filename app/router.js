import Ember from 'ember';

var Router = Ember.Router.extend({
	location: CertificationEmberENV.locationType
});

Router.map(function() {
	this.route('register');
  	this.route('application');
  	this.route('account');
  	this.route('exam');
});

export default Router;
