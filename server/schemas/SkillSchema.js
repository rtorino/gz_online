var mongoose = require( 'mongoose' ),
	Schema = mongoose.Schema;

var skillSchema = new Schema( {
	name: String,
	description: String,
	child: [ Skill.schema ],
	openStatus: boolean,
	exam: Exam.schema
} );

module.exports = mongoose.model( 'skill', skillSchema );