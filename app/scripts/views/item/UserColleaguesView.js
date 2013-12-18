define( function( require ) {
	'use strict';

	var _ = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template = require( 'text!tmpl/item/userColleaguesView.html' );

	return Marionette.ItemView.extend( {

		initialize : function( options ) {
			var self = this;

			_.bindAll( this );

			_.each( options, function( value, key ) {
				self[ key ] = value;
			} );

			return this;
		},

		template : _.template( template ),

		ui : {},

		className : 'panel panel-warning',

		events : {},

		onRender : function() {
			console.log( 'User Colleague view is rendered' );
		}
	} );
} );