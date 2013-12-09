define( function( require ) {
	'use strict';

	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	var Controller = require( 'controllers/AppController' );
	var Router     = require( 'routers/AppRouter' );

	var App = new Marionette.Application();

	/* Add application regions here */
	App.addRegions( {
		'content' : '#main-content',
		'menu'    : '#navbar'
	} );

	/* Add initializers here */
	App.addInitializer( function() {
		App.Controller = new Controller( {
			'App'  : App,
			'Vent' : Vent
		} );

		Vent.trigger( 'App:start' );
		// Router init
		App.Router = new Router( {
			'controller' : App.Controller
		} );
	} );

	// start history
	App.on( 'initialize:after', function() {
		Backbone.history.start( {
			'pushState' : false
		} );
	} );

	return App;
} );