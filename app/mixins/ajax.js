import Ember from 'ember';

export default Ember.Mixin.create({
	// Mixin to any Route that you want to be able to send authenticated ajax calls from. Calls that fail for auth
	// reasons will result in a redirect to the 'login' route automatically
	    ajaxSuccessHandler: function (json) {
	        // in my app, error code 201 is reserved for authentication errors that require a login
	        if (json.error != null && json.error.code === 201) {
	            Ember.App.error.set(json.error.message);
	            var self = this;
	            // delay to let current processing finish.
	            setTimeout(function () { self.transitionTo('login'); });
	            // let handlers further down the Promise chain know that we've already handled this one.
	            return null;
	        }
	        return json;
	    },

	    // perform ajax GET call to retrieve json
	    GET: function (url, data) {
	        var settings = {data: data || {}};
	        settings.url = url;
	        settings.dataType = "json";
	        settings.type = "GET";
	        var authToken = Ember.App.get('authToken');
	        if (authToken != null) {
	        	settings.data.authToken = authToken;
	        }
	        return this.ajax(settings);
	    },

	    // perform ajax POST call to retrieve json
	    POST: function (url, data) {
	        var settings = {data: data || {}};
	        settings.url = url;
	        settings.dataType = "json";
	        settings.type = "POST";
	        var authToken = Ember.App.get('authToken');
	        if (authToken != null) {
	        	settings.data.authToken = authToken;
	        }
	        // post our data as a JSON object in the request body
	        settings.data = JSON.stringify(settings.data);
	        return this.ajax(settings);
	    },

	    ajax: function (settings) {
	        var self = this;
	        return Ember.$.ajax(settings).then(function () {
	            // preserve 'this' for the success handler
	            return self.ajaxSuccessHandler.apply(self, Ember.$.makeArray(arguments));
	        });
	    }
});
