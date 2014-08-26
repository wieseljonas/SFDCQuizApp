import DS from 'ember-data';

export default DS.Model.extend({
  	question : DS.attr('string'),
  	questionID : DS.attr('string'),
  	answer : DS.attr('string'),
    answersArray : DS.attr('array'),
  	questionIndex: DS.attr('number'),
  	Solution : DS.attr('string'),
  	solutionArray : DS.attr('array'),
  	examID : DS.attr('string'),  	
  	isCorrect : DS.attr('boolean'),
    userexam: DS.belongsTo('user-exam'),
    lastUpdated: DS.attr('moment')
});