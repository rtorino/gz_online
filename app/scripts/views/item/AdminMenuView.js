define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var template = require( 'hbs!tmpl/item/adminMenu' );

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize : function() {
			console.log( 'initialize a Usermenuview ItemView' );
		},

		template : template,

		/* ui selector cache */
		ui : {},

		/* Ui events hash */
		events : {},

		/* on render callback */
		onRender : function() {}
	});

});
