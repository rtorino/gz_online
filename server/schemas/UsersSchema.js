'use strict';

var mongoose = require( 'mongoose' ),
	Schema = mongoose.Schema;

var UserSchema = new Schema( {

	email: {
		type: String,
		required: true
	},

	username: {
		type: String,
		require: true
	},

	password: {
		type: String,
		required: true
	},

	fName: String,

	lName: String,

	// skills: [ Skill.schema ],

	role: String,

	verified: Number

} );


UserSchema.pre( 'save', function( next ) {

	var emailArray;
	var domain;

	emailArray = this.email.split( '@' );
	domain = emailArray[ emailArray.length - 1 ];

	if ( domain !== 'globalzeal.net' ) {
		next( new Error( 'Invalid email account.' ) );
	}

	// Set email user field as temporary username
	if ( !this.username ) {
		this.username = emailArray[ 0 ];
	}

	next();
} );

module.exports = mongoose.model( 'User', UserSchema );