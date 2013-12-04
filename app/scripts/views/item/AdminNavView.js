define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var template = require( 'text!tmpl/item/adminNavView.html' );

	/* Return a Layout class definition */
	return Backbone.Marionette.ItemView.extend( {

		initialize : function() {
			console.log( 'initialize a Adminnavview ItemView' );
		},

		template : _.template(template),

		tagName : 'ul',

		className : 'nav navbar-nav navbar-right',

		/* ui selector cache */
		ui : {},

		/* Ui events hash */
		events : {},

		/* on render callback */
		onRender : function() {}
	} );

} );