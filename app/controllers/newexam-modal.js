import Ember from 'ember';

export default Ember.Controller.extend({
	names: ["loading"],
  	actions: {
	    logout: function() {
	      alert('logout');
	    }
  	},
  	init: function () {
  		//console.log(this.store.find('exam-type'));

	}
});

