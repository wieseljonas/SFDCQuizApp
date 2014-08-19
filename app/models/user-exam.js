import DS from 'ember-data';

export default DS.Model.extend({
  salesforceid : DS.attr('string'),
  name : DS.attr('string'),
  examType: DS.attr('string'),
  resultPercentage : DS.attr('number'),
  result : DS.attr('string'),
  numberOfQuestions : DS.attr('number'),
  rightAnswers : DS.attr('number'),
  passingPercentage : DS.attr('string'),
  questions: DS.hasMany('exam-question'),
  examTaker: DS.attr('string'),
});