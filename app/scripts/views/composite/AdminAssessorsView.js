define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var template = require( 'hbs!tmpl/composite/adminUsersView' );
	var ItemView = require( 'views/item/AdminUsersView' );

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend( {

		initialize : function() {
			console.log( 'initialize a Adminusersview CompositeView' );
		},

		template : template,

		/* ui selector cache */
		ui : {},

		itemView : ItemView,

		/* where are we appending the items views */
		itemViewContainer : '#accordion',

		/* Ui events hash */
		events : {},

		/* on render callback */
		onRender : function() {}
	} );

} );