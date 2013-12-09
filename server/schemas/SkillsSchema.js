'use strict';

var mongoose = require( 'mongoose' ),
	Schema = mongoose.Schema;

var SkillSchema = new Schema( {

	name: String,

	description: String,

	child: [ {
		type: Schema.Types.ObjectId
		// ,ref: Skill
	} ],

	parent: {
		type: Schema.Types.ObjectId
		// ,ref: Skill
	},

	openStatus: Number,

	exam: {
		type: Schema.Types.Mixed
		// ,ref: Exam
	},

	version: Number

}, {

	versionKey: 'version'

} );

module.exports = mongoose.model( 'Skill', SkillSchema );