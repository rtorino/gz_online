define( function( require ) {
	'use strict';

	var _ = require( 'underscore' );
	//var $ = require( 'jquery' );
	var Backbone = require( 'backbone' );
	var Marionette = require( 'marionette' );

	var Vent = require( 'Vent' );
	var UserModel = require( 'models/UserModel' );
	var ErrorView = require( 'views/ErrorView' );

	var LoginLayoutTmpl = require( 'text!tmpl/views/layout/LoginLayout_tmpl.html' );

	/* Return a ItemView class definition */
	return Marionette.Layout.extend( {

		'initialize' : function() {},

		'template' : _.template( LoginLayoutTmpl ),

		'regions' : {
			'loginError' : '#login-error',
		},

		/* ui selector cache */
		'ui' : {
			'email'    : '#input-email',
			'password' : '#input-password',
		},

		/* Ui events hash */
		'events' : {
			'submit' : 'login'
		},

		'login' : function( event ) {

			this.regionManager.each( function( region ) {
				region.close();
			} );

			var email = this.ui.email.val();
			var password = this.ui.password.val();

			return false;
		},

		/* on render callback */
		'onRender' : function() {
			console.log( 'Login Layout rendered' );
		}
	} );

} );