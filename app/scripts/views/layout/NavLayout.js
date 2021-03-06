define( function ( require ) {
	'use strict';

	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var SystemNavView  = require( 'views/item/SystemNavView' );
	var User           = require( 'models/UserModel' );

	var templates = {
		'loggedIn'  : require( 'text!tmpl/layout/navLoggedIn.html' ),
		'loggedOut' : require( 'text!tmpl/layout/navLoggedOut.html' )
	};

	return Marionette.Layout.extend( {
		'templates' : {
			'loggedIn'  : _.template( templates.loggedIn ),
			'loggedOut' : _.template( templates.loggedOut )
		},

		'regions' : {
			'navMenu'   : '#nav-menu'
		},

		className : 'container',

		'initialize' : function () {
			_.bindAll( this );

			var self = this;

			self.render();
		},

		'onRender' : function () {
			var UserModel = new User( {
				email : ''
			} );

			this.navMenu.show( new SystemNavView( { model : UserModel } ) );

			return this;
		},

		'getTemplate' : function () {
			//return this.templates.loggedOut;
			if ( !window.location.hash ) {
				return this.templates.loggedOut;
			} else {
				return this.templates.loggedIn;
			}
		}

	} );
} );
