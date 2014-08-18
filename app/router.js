import Ember from 'ember';

var Router = Ember.Router.extend({
	location: CertificationEmberENV.locationType
});

Router.map(function() {
	this.route('register');
  	this.route('application');
  	this.resource('exam', { path: '/exam/:exam_id' });
  	this.route('account');
  	this.route('login');
  this.route('settings');
});

export default Router;
