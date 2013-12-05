define( function( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var validation = require( 'backbone.validation' );
	var _ = require( 'underscore' );

	_.extend( Backbone.Model.prototype, validation.mixin );
	_.extend( validation.patterns, {
		email: /[a-zA-Z0-9]+\.[a-zA-Z0-9]+@globalzeal\.net/, // Accepts only globalzeal emails,
		password: /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{6,}/
	} );

	/* Return a model class definition */
	return Backbone.Model.extend( {
		'initialize': function() {},

		'defaults': {},

		'validation': {
			'email': {
				'pattern': 'email',
				'required': true,
				'msg': 'Please enter a valid globalzeal email.'
			},

			'password': {
				'pattern': 'password',
				'required': true,
				'msg': 'Invalid password.'
			}
		},

		'url': '/users'

	} );
} );