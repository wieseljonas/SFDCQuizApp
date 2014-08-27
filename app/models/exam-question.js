import DS from 'ember-data';

export default DS.Model.extend({
  	question : DS.attr('string'),
  	name : DS.attr('string'),
  	questionIndex: DS.attr('number'),
    questionType: DS.attr('string'),
  	examID : DS.attr('string'),  	
  	isCorrect : DS.attr('boolean'),
    isCorrectManual : DS.attr('boolean'),
    numberofAnswers : DS.attr('number'),
    numberofChoices : DS.attr('number'),
    userexam: DS.belongsTo('user-exam'),
    answers: DS.hasMany('exam-answer'),
    lastUpdated: DS.attr('moment')
});                     
