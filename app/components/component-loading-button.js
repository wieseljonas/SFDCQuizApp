import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['button','form-group'],
    buttonText: "Save",
    isLoading:false,
    buttonLoadingText: "Loading",
    actions:{
        showLoading:function(){
            if(!this.get('isLoading')){
                this.set('isLoading', true);
                this.sendAction('action');
            }
        }
    }
});
