define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!tmpl/composite/systemContentsView.html' );

	// Return a CompositeView class definition
	return Marionette.CompositeView.extend( {

		initialize : function ( options ) {
			var self = this;

			_.bindAll( this );

			_.each( options, function ( value, key ) {
				self[ key ] = value;
			} );

			return this;
		},

		template : _.template( template ),

		className : 'panel panel-default',

		// ui selector cache
		ui : {},

		// where are we appending the items views
		itemViewContainer : '#accordion',

		// Ui events hash
		events : {},

		// on render callback
		onRender : function () {}

	} );

} );