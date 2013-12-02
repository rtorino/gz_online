'use strict';

var Test = require( '../schemas/TestsSchema' );

module.exports = function( baucis ) {
	var controller = baucis.rest( {
		singular: 'Test'
	} );

	// Additional middlewares
	return controller;
}