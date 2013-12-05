define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!tmpl/item/adminUserView.html' );

	// Return a ItemView class definition
	return Marionette.ItemView.extend( {

		initialize : function ( options ) {
			var self = this;

			_.bindAll( this );

			_.each( options, function ( value, key ) {
				self[ key ] = value;
			} );

			return this;
		},

		template : _.template( template ),

		className : 'panel panel-warning',

		// ui selector cache
		ui : {
			'assignBtn' : '#assignBtn',
			'deleteBtn' : '#deleteBtn'
		},

		// Ui events hash
		events : {
			'mouseover a.btn' : 'showTooltip',
		},

		// on render callback
		onRender : function () {
			this.ui.assignBtn.tooltip( {
				title : 'Assign as assessor'
			} );

			this.ui.deleteBtn.tooltip( {
				title : 'Delete user'
			} );
		},

		showTooltip : function ( event ) {
			$( event.target ).tooltip('show');
		}

	} );

} );