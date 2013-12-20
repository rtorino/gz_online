define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var bootbox    = require( 'bootbox' );
	var template   = require( 'text!tmpl/item/systemAssessorView.html' );

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

		template  : _.template( template ),

		className : 'panel panel-warning',

		// ui selector cache
		ui : {
			'kickBtn'   : '#kickBtn',
			'deleteBtn' : '#deleteBtn'
		},

		// Ui events hash
		events : {
			'mouseover a.btn'  : 'showTooltip',
			'click #kickBtn'   : 'kickAssessor',
			'click #deleteBtn' : 'deleteUser'
		},

		// on render callback
		onRender : function () {
			this.ui.kickBtn.tooltip( {
				title : 'Kick as assessor'
			} );

			this.ui.deleteBtn.tooltip( {
				title : 'Delete user'
			} );

		},

		showTooltip : function ( event ) {
			$( event.target ).tooltip( 'show' );
		},

		kickAssessor : function ( ) {
			var self = this;
			bootbox.dialog({
				message : 'Kick ' + self.model.get( 'email' ) + ' as assessor?',
				title   : 'Confirmation Dialog',
				buttons : {
					success : {
						label     : 'Yes',
						className : 'btn-success',
						callback  : function () {
							self.model.set( {role:'users'} ).save( null, {
								wait    : true,
								success : function ( ) {
									self.$el.remove();
								}
							});
						}
					},
					danger :{
						label     : 'No',
						className : 'btn-danger'
					}
				}
			});
			return false;
		},

		deleteUser : function () {
			var self = this;
			bootbox.dialog({
				message : 'Delete ' + self.model.get( 'email' ) + ' account?',
				title   : 'Confirmation Dialog',
				buttons : {
					success : {
						label     : 'Yes',
						className : 'btn-success',
						callback  : function () {
							self.model.destroy({
								wait : true
							});
						}
					},
					danger :{
						label     : 'No',
						className : 'btn-danger'
					}
				}

			});
				return false;

		}

	} );

} );