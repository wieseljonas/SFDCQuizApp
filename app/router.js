import Ember from 'ember';

var Router = Ember.Router.extend({
	location: CertificationEmberENV.locationType
});

Router.map(function() {
	this.route('register');
  	this.route('application');
  	this.route('login');
  	this.route('account');
    this.resource('exam', { path: 'account/:exam_id' });
    this.resource('takeExam', { path: 'account/exam' });
  	this.route('settings');
});

export default Router;
