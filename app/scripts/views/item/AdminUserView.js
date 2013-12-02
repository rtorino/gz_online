define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var template = require( 'hbs!tmpl/item/adminUserView' );
	var Model    = require( 'models/UserModel' );

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend( {

		initialize : function() {
			console.log( 'initialize a Adminuserview ItemView' );
		},

		template : template,

		model : new Model( { countUsers : 10 } ),

		/* ui selector cache */
		ui : {},

		/* Ui events hash */
		events : {},

		/* on render callback */
		onRender : function() {}
	} );

} );