// 'use strict';

var request = require( 'supertest' );
var fixtures = require( '../fixtures' );

var app;

describe( 'REST - User', function() {

	before( function( done ) {

		fixtures.init( 'Users', function( error, rest ) {
			app = rest;
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
			request( app )
				.get( '/api/v1/users' )
				.set( 'Accept', 'application/json' )
				.expect( 200, done );
		} );


	} );

	describe( 'POST', function() {

		it( 'should save a user with globalzeal email account', function( done ) {
			request( app )
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