// 'use strict';

var fixtures = require( '../fixtures' );
var request;

describe( 'REST - User', function() {

	before( function( done ) {

		fixtures.init( 'Users', function( error, agent ) {
			request = agent;
			done();
		} );

	} );

	after( function( done ) {

		fixtures.deinit( 'Users', function() {
			done();
		} );

	} );

	describe( 'GET', function() {

		it( 'should fetch users', function( done ) {
			request
				.get( '/api/v1/users' )
				.set( 'Accept', 'application/json' )
				.expect( 200, done );
		} );


	} );

	describe( 'POST', function() {

		it( 'should save a user with globalzeal email account', function( done ) {
			request
				.post( '/api/v1/users' )
				.send( {
					email: 'test.foo@globalzeal.com',
					password: 'testpass'
				} )
				.expect( 201 )
				.end( function( error, response ) {
					if ( error ) return done( error );

					done();
				} );
		} );

	} );

} );