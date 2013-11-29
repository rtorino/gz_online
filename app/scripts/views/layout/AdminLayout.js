define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var template = require( 'hbs!tmpl/layout/adminLayout' );

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend( {

		initialize: function() {
			console.log( 'initialize a Adminlayout Layout' );
		},

		template: template,

		/* Layout sub regions */
		regions: {
			'menuRegion'   : '#admin-menu',
			'contentRegion': '#admin-content'
		},

		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	} );

} );