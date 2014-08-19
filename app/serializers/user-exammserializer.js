import DS from 'ember-data';

export default DS.LSSerializer.extend({
	primaryKey: 'slug'
});
