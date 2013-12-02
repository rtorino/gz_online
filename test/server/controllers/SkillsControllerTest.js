'use strict';

var fixtures = require( '../fixtures' );
var request;

describe( 'REST - Skills', function() {

	before( function( done ) {

		fixtures.init( 'Skills', function( error, agent ) {
			request = agent;
			done();
		} );

	} );

	after( function( done ) {

		fixtures.deinit( 'Skills', function() {
			done();
		} );

	} );

	describe( 'GET', function() {

		it( 'respond with json', function( done ) {

			request
				.get( '/api/v1/skills' )
				.set( 'Accept', 'application/json' )
				.expect( 'Content-Type', /json/ )
				.expect( 200, done );

		} );

	} );

} );