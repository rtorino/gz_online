define( function ( require ) {
	'use strict';

	var UsersCollection = require( 'collections/UsersCollection' );

	describe( 'UsersCollection', function () {

		it('should be an instance of UsersCollection', function () {
			var usersCollection = new UsersCollection();
			usersCollection.should.be.an.instanceof( UsersCollection );
		} );

	} );

} );