// 'use strict';

var request = require( 'supertest' );
var fixtures = require( '../fixtures' );

var app;
var skillUrl;

describe( 'REST - Skill', function() {

	before( function( done ) {
		skillUrl = '/api/v1/skills';
		fixtures.init( 'Skills', function( error, rest ) {
			app = rest;
			done();
		} );

	} );

	after( function( done ) {

		fixtures.deinit( 'Skills', function() {
			done();
		} );

	} );

	describe( 'GET', function() {
		//it( 'should do something' );
		it( 'respond with json', function( done ) {

			request( app )
				.get( skillUrl )
				.set( 'Accept', 'application/json' )
				.expect( 'Content-Type', /json/ )
				.expect( 200, done );


		} );


	} );



} );