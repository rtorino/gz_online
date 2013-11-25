var mongoose = require( 'mongoose' ),
	Schema = mongoose.Schema;

var userSchema = new Schema( {
	email: String,
	username: String,
	password: String, //hash?
	fName: String,
	lName: String,
	// skills: [ Skill.schema ],
	type: String,
	verified: Number
} );

module.exports = mongoose.model( 'user', userSchema );