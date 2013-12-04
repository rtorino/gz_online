define( function ( require ) {
	'use strict';

	var $            = require( 'jquery' );
	var Backbone     = require( 'backbone' );
	var template     = require( 'text!tmpl/item/adminMenuView.html' );
	var communicator = require( 'communicator' );

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend( {

		initialize : function() {
			console.log( 'initialize a Adminmenuview ItemView' );
		},

		template : _.template(template),

		className : 'panel panel-default',

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