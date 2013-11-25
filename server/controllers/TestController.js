var Test = require( '../schemas/TestSchema' );

module.exports = function( baucis ) {
	var controller = baucis.rest( {
		singular: 'test'
	} );

	// Additional middlewares
}