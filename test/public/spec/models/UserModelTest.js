define( function( require ) {
	'use strict';

	var UserModel = require( 'models/UserModel' );
	var LocalStorage = require( 'backbone.localStorage' );
	var User;

	describe( 'UserModel', function() {

		before( function() {
			User = UserModel.extend( {
				localStorage: new LocalStorage( 'user-model' )
			} );
		} );

		it( 'should be an instance of UserModel', function() {
			var userModel = new User();
			userModel.should.be.an.instanceof( UserModel );
		} );

		it( 'should save', function( done ) {
			var user = new User( {
				'id': 1,
				'fname': 'Foo',
				'lname': 'Bar'
			} );

			user.save( null, {
				success: function( model, response ) {
					expect( model.get( 'fname' ) ).to.equal( 'Foo' );
					expect( model.get( 'lname' ) ).to.equal( 'Bar' );

					done();
				}
			} );

		} );

		it( 'should fetch', function( done ) {
			var user = new User( {
				'id': 1
			} );

			user.fetch( {
				'success': function( model, response ) {
					expect( model.get( 'fname' ) ).to.equal( 'Foo' );
					expect( model.get( 'lname' ) ).to.equal( 'Bar' );

					done();
				}
			} );
			
		} );

	} );

} );