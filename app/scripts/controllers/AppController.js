define( function( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone = require( 'backbone' );

	var views = {
		'SignupLayout': require( 'views/layout/SignupLayout' ),
		'ErrorView': require( 'views/ErrorView' )
	}

	return Marionette.Controller.extend( {

		initialize: function( options ) {
			this.App = this.options.App;
			this.Vent = this.options.Vent;
			_.bindAll( this );

			this.Vent.on( 'App:start', this.showSignup );
		},

		showSignup: function( event ) {
			console.log( "Appcontroller showSignup" );

			var signupLayout = new views.SignupLayout();
			this.App.main.show( signupLayout );

		}

	} );

} );