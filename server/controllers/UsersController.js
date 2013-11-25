var User = require( '../schemas/UserSchema' );

module.exports = function( baucis ) {
	var controller = baucis.rest( {
		singular: 'user'
	} );

	exports.controller = controller;
}