'use strict';

var User = require( '../schemas/UsersSchema' );

module.exports = function( baucis ) {
	var controller = baucis.rest( {
		singular: 'User'
	} );
	
	return controller;
}