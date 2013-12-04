define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var template = require( 'hbs!tmpl/composite/adminContentsView' );
	var itemView = require( 'views/item/AdminUserView' );

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend( {

		initialize : function ( options ) {
			var self = this;

			_.bindAll( this );

			_.each( options, function ( value, key, list ) {
				self[ key ] = value;
			} );

			console.log( 'initialize a AdminContentsView CompositeView' );
		},

		template : template,

		/* ui selector cache */
		ui : {},

		// itemView : itemView,

		/* where are we appending the items views */
		itemViewContainer : '#accordion',

		/* Ui events hash */
		events : {},

		/* on render callback */
		onRender : function () {}

	} );

} );