define( function( require ) {
	'use strict';

	var SignupLayout = require( 'views/layout/SignupLayout' );
	var Marionette = require( 'marionette' );
	var Backbone = require( 'backbone' );
	var Vent = require( 'Vent' );

	describe( 'SignupLayout', function() {
		var view;

		before( function() {
			view = new SignupLayout();
			view.render();
		} );

		it( 'should be an instance of SignupLayout Layout', function() {
			var signupLayout = new SignupLayout();
			signupLayout.should.be.an.instanceof( SignupLayout );
		} );

		describe( 'Errors', function() {

			it( 'should display errors when submitted with invalid attribute', function( done ) {

				var $el = view.$el;
				var email = view.ui.email;
				var password = view.ui.password;

				email.val('test.foo@bar.com'); // Invalid email
				password.val('testpass'); // Invalid password

				$el.submit();

				Vent.on( 'SignupLayout:error', function( errors ) {
					done();
				} );

			} );

		} );

	} );

} );