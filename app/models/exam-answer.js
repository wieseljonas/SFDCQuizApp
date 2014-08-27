import DS from 'ember-data';

export default DS.Model.extend({
	choice : DS.attr('string'),
	name : DS.attr('string'),
  	chosenAnswer : DS.attr('boolean'),
  	isCorrect : DS.attr('boolean'),
    solution : DS.attr('boolean'),
    question : DS.belongsTo('exam-question'),
});
