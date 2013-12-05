define( function( require ) {
	'use strict';

	var AppController = require( 'controllers/AppController' );
	var App = require( 'App' );
	var Vent = require( 'Vent' );

	describe( 'AppController Controller', function() {

		it( 'should be an instance of AppController', function() {
			var appController = new AppController( {
				'App': App,
				'Vent': Vent
			} );

			appController.should.be.an.instanceof( AppController );
		} );

		it( 'should have more test written' );
	} );

} );