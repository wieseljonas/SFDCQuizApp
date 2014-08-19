import DS from 'ember-data';

export default DS.Model.extend({
  	question : DS.attr('string'),
  	questionID : DS.attr('string'),
  	answer1 : DS.attr('string'),
  	answer2 : DS.attr('string'),
  	answer3 : DS.attr('string'),
  	answer4 : DS.attr('string'),
  	answer5 : DS.attr('string'),
  	answer6 : DS.attr('string'),
  	answer7 : DS.attr('string'),
  	numberOfAnswers : DS.attr('number'),
  	solutions : DS.attr('string'),
  	examID : DS.attr('string'),
  	chosenAnswers : DS.attr('string'),
  	result : DS.attr('string'),
    userexam: DS.belongsTo('user-exam')
});