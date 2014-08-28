import Ember from 'ember';

var Router = Ember.Router.extend({
	location: CertificationEmberENV.locationType
});

Router.map(function() {
	this.route('register');
  	this.route('application');
  	this.route('login');
  	this.route('account');
    this.resource('exam', { path: 'account/exam/:exam_id' });
    this.resource('question', { path: 'account/exam/question/:question_id'});
  	this.route('settings');
});

export default Router;
