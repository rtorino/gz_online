var request = require( 'supertest' );
var helpers = require( '../helpers' );
var baucis = require( 'baucis' );
var fixtures = require( '../fixtures' );

var app;

describe( 'REST - User', function() {

	describe( 'GET', function() {

		before( function( done ) {
			fixtures.init( 'UserController', function( rest ) {
				app = rest;
				done();
			} );
		} );

		it( 'should fetch users', function( done ) {
			request( app )
				.get( '/api/v1/users' )
				.set( 'Accept', 'application/json' )
				.expect( 200, done );
		} );

	} );

} );