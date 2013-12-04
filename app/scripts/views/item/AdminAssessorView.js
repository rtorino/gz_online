define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var template = require( 'text!tmpl/item/adminAssessorView.html' );

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend( {

		initialize : function() {
			console.log( 'initialize a AdminAssessorView ItemView' );
		},

		template : _.template(template),

		/* ui selector cache */
		ui : {},

		/* Ui events hash */
		events : {},

		/* on render callback */
		onRender : function() {}
	} );

} );