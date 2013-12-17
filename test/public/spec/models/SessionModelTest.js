define( function( require ) {
	'use strict';

	var Session = require( 'models/SessionModel' );
	var reqres  = require( 'RequestResponse' );

	describe( 'SessionModel', function() {

		it( 'should unbind sessionAuthenticated handler when model is destroyed', function() {
			Session.destroy();

			var handler = reqres._wreqrHandlers[ 'sessionAuthenticated' ];
			expect( handler ).to.be.undefined;
		} );

	} );

} );