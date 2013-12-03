define( function( require ) {
	'use strict';

	var Marionette    = require( 'marionette' );
	var Communicator  = require( 'Communicator' );
	var RegionManager = require( 'RegionManager' );

	var Controller = require( 'controllers/AppController' );

	var App = new Marionette.Application();

	var App = new Marionette.Application();
	/* Add application regions here */
	App.addRegions( {
		'main': '#main-content'
	} );

	/* Add initializers here */
	App.addInitializer( function() {

	} );

	App.addInitializer( function() {
		App.Controller = new Controller( {
			'App': App,
			'Communicator': Communicator
		} );

		Communicator.mediator.trigger( 'app:start' );
	} );

	return App;
} );
