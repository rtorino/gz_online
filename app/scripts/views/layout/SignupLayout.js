define( function( require ) {
	'use strict';

	var _ = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var Marionette = require( 'marionette' );

	var Vent = require( 'Vent' );
	var UserModel = require( 'models/UserModel' );
	var ErrorView = require( 'views/ErrorView' );

	var SignupLayoutTmpl = require( 'text!tmpl/views/layout/SignupLayout_tmpl.html' );

	/* Return a ItemView class definition */
	return Marionette.Layout.extend( {

		'initialize': function() {},

		'template': _.template( SignupLayoutTmpl ),

		'regions': {
			'emailError': '#email-error',
			'passwordError': '#password-error'
		},

		/* ui selector cache */
		'ui': {
			'email': '#input-email',
			'password': '#input-password',
			'verifyPassword': '#input-verify-password'
		},

		/* Ui events hash */
		'events': {
			'submit': 'createUser'
		},

		'createUser': function( event ) {
			var self = this;

			this.regionManager.each( function( region ) {
				region.close();
			} );

			var email = this.ui.email.val();
			var password = this.ui.password.val();

			var user = new UserModel( {
				'email': email,
				'password': password
			} );

			user.save();

			user.on( 'validated:invalid', function( model, errors ) {
				Vent.trigger( 'SignupLayout:error', errors );

				_.each( errors, function( message, attr ) {
					self._setErrors( attr, message );
				} );
			} );

			return false;
		},

		'_setErrors': function( attr, message ) {
			var view = this[ attr + 'Error' ];

			if ( view instanceof Marionette.Region ) {
				var error = {
					'message': message
				}

				view.show( new ErrorView( {
					model: new Backbone.Model( error )
				} ) );
			}
		},

		/* on render callback */
		'onRender': function() {
			console.log( 'SignupLayout rendered' );
		}
	} );

} );