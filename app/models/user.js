import DS from 'ember-data';

export default DS.Model.extend({
  useremail : DS.attr('string'),
  currentToken : DS.attr('string'),
  firstName: DS.attr('string'),
  secondName:  DS.attr('string'),
  fullName: (function() {
    return "" + (this.get('firstName')) + " " + (this.get('secondName'));
  }).property('firstName', 'secondName')
});
