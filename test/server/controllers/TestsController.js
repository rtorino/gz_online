'use strict';

var fixtures = require( '../fixtures' );
var request;

describe( 'REST - Test', function() {

	before( function( done ) {

		fixtures.init( 'Tests', function( error, agent ) {
			request = agent;
			done();
		} );

	} );

	after( function( done ) {

		fixtures.deinit( 'Tests', function( error ) {
			done();
		} );

	} );

	it( 'should pass test', function( done ) {

		request
			.get( '/api/v1/tests' )
			.set( 'Accept', 'application/json' )
			.expect( 200 )
			.end( function( err, res ) {
				done();
			} );
			
	} );

} );