define( function( require ) {
	'use strict';

	var _ = require( 'underscore' );
	var $ = require( 'jquery' );
	var Marionette = require( 'marionette' );
	var bootbox = require( 'bootbox' );
	var template = require( 'text!tmpl/item/systemUserView.html' );

	// Return a ItemView class definition
	return Marionette.ItemView.extend( {

		initialize: function( options ) {
			var self = this;

			_.bindAll( this );

			_.each( options, function( value, key ) {
				self[ key ] = value;
			} );

			this.model.bind('change', this.render, this);

			return this;
		},

		template: _.template( template ),

		className: 'panel panel-warning',

		// ui selector cache
		ui: {
			'assignBtn': '#assignBtn',
			'deleteBtn': '#deleteBtn'
		},

		// Ui events hash
		events: {
			'mouseover a.btn': 'showTooltip',
			'click #deleteBtn': 'kickUser',
			'click #assignBtn': 'setAsAssessor'
		},

		// on render callback
		onRender: function() {
			this.ui.assignBtn.tooltip( {
				title: 'Assign as assessor'
			} );

			this.ui.deleteBtn.tooltip( {
				title: 'Delete user'
			} );
		},

		showTooltip: function( event ) {
			$( event.target ).tooltip( 'show' );
		},

		kickUser: function( event ) {
			var self = this;
			bootbox.dialog( {
				message: 'Are you sure you want to kick ' + self.model.get( 'fName' ) + '?',
				title: 'Kick User',
				buttons: {
					'success': {
						label: 'Kick',
						className: 'btn-success',
						callback: function() {
							console.log( self.model.get( '_id' ) );
							self.model.destroy( {
								'success': function( model, response, options ) {},
								'error': function( response ) {
									bootbox.alert( response );
								}
							} );
						}
					},
					'cancel': {
						label: 'Cancel',
						className: 'btn-cancel'
					}
				}
			} );
		},

		setAsAssessor: function( event ) {
			var self = this;
			bootbox.dialog( {
				message: 'Make ' + self.model.get( 'fName' ) + ' as Assessor',
				title: 'Make Assessor',
				buttons: {
					'success': {
						label: 'Confirm',
						className: 'btn-success',
						callback: function(){
							console.log( self.model.get('_id'));
							self.model.set({
								'role': 1
							});
						}
					}
				}
			} );
		}

	} );

} );