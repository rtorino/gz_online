define( function ( require ) {
	'use strict';

	var $            = require( 'jquery' );
	var Backbone     = require( 'backbone' );
	var template     = require( 'hbs!tmpl/item/adminMenuView' );
	var communicator = require( 'communicator' );

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend( {

		initialize : function() {
			console.log( 'initialize a Adminmenuview ItemView' );
		},

		template : template,

		/* ui selector cache */
		ui : {
			'menuOptions' : 'li a'
		},

		/* Ui events hash */
		events : {},

		/* on render callback */
		onRender : function() {},

		setActiveMenu : function () {}
	} );

} );