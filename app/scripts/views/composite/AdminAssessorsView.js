define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var template = require( 'hbs!tmpl/composite/adminAssessorsView' );
	var ItemView = require( 'views/item/AdminAssessorView' );

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend( {

		initialize : function() {
			console.log( 'initialize a Adminusersview CompositeView' );
		},

		template : template,

		/* ui selector cache */
		ui : {},

		itemView : ItemView,

		/* where are we appending the items views */
		itemViewContainer : '#accordion',

		/* Ui events hash */
		events : {},

		/* on render callback */
		onRender : function() {}
	} );

} );