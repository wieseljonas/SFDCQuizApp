import Ember from 'ember';
import AjaxMixin from 'certification-ember/mixins/ajax';

module('AjaxMixin');

// Replace this with your real tests.
test('it works', function() {
  var AjaxObject = Ember.Object.extend(AjaxMixin);
  var subject = AjaxObject.create();
  ok(subject);
});
