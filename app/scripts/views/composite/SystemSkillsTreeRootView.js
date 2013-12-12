define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var itemView   = require( 'views/composite/SystemSkillsTreeView' );
	var template   = require( 'text!tmpl/composite/systemSkillsTreeRootView.html' );

	/* Return a ItemView class definition */
	return Marionette.CompositeView.extend( {

		'itemView' : itemView,

		'template' : _.template( template ),

		'className' : 'panel panel-default',

		// ui selector cache
		'ui' : {},

		// where are we appending the items views
		'itemViewContainer' : '#skill-tree',

		// Ui events hash
		'events' : {},

		// on render callback
		'onRender' : function () {}

	} );

} );
