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
		ui : {},

		/* Ui events hash */
		events : {
			'click li a' : 'toggleMainContent'
		},

		/* on render callback */
		onRender : function() {},

		toggleMainContent : function ( evt ) {
			evt.preventDefault();
			$(evt.target).parent().siblings().removeClass( 'active' );
			$(evt.target).parent().addClass( 'active' );

			var selectedMenu = $(evt.target).text();

			communicator.mediator.trigger('admin:menu:changed', selectedMenu);
		}
	} );

} );