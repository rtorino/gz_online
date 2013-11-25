var mongoose = require( 'mongoose' ),
	Schema = mongoose.Schema;

var examSchema = new Schema( {
	name: String,
	passingScore: Number,
	urlLink: String,
	score: Number
} );

module.exports = mongoose.model( 'exam', examSchema );