define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var template = require( 'text!tmpl/layout/adminLayout.html' );

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend( {

		initialize : function() {
			console.log( 'initialize a adminLayout Layout' );
		},

		template : _.template(template),

		className : 'row',

		/* Layout sub regions */
		regions : {
			'menuRegion'    : '#menu-region',
			'contentRegion' : '#content-region'
		},

		/* ui selector cache */
		ui : {},

		/* Ui events hash */
		events : {},

		/* on render callback */
		onRender : function() {}
	} );

} );