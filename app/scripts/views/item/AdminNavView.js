define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var template = require( 'hbs!tmpl/item/adminNavView' );

	/* Return a Layout class definition */
	return Backbone.Marionette.ItemView.extend( {

		initialize : function() {
			console.log( 'initialize a Adminnavview Layout' );
		},

		template : template,

		/* ui selector cache */
		ui : {},

		/* Ui events hash */
		events : {},

		/* on render callback */
		onRender : function() {}
	} );

} );