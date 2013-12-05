define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var Error_tmpl   = require( 'text!tmpl/Error.html' );

	return Marionette.ItemView.extend( {
		'template' : _.template( Error_tmpl ),
		'className': 'alert alert-danger error',
		'tagName'  : 'p'
	} );
} );