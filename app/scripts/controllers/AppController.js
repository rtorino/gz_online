define( function( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var _          = require('underscore');

	var views = {
		'SignupLayout' : require( 'views/layout/SignupLayout' ),
		'ErrorView'    : require( 'views/ErrorView' ),
		'NavLayout'    : require( 'views/layout/NavLayout' )
	};

	var applications = {
		'AdminApp' : require( 'Admin' )
	};

	return Marionette.Controller.extend( {

		initialize: function( options ) {
			this.App = this.options.App;
			this.Vent = this.options.Vent;
			_.bindAll( this );

			this.Vent.on( 'App:start', this.showSignup );
		},

		showSignup: function( event ) {
			var signupLayout = new views.SignupLayout();
			this.App.content.show( signupLayout );
			this._setMenu();
		},

		// sub applications bootstrap
		bootstrapAdminApp : function () {
			this.bootstrapApp( 'Admin', applications.AdminApp );
		},

		// app helper function
		bootstrapApp : function ( appName, app ) {
			var self = this;

			if ( !self[ appName ] ) {
				self[ appName ] = app;
				self[ appName ].start( {
					'regions' : {
						'content' : self.content
					},
					'Vent' : self.Vent
				} );
			}
		},

		_setMenu : function () {
			this.App.menu.show( new views.NavLayout() );
		}

	} );

} );