define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!tmpl/item/manageSkillView.html' );

	/* Return a ItemView class definition */
	return Marionette.ItemView.extend({

		'template' : _.template( template ),

		'className' : 'modal fade',

		'events' : {
			'click .close'    : 'close',
			'hidden.bs.modal' : 'close',
			'click #js-save'   : 'saveSkill'
		},

		'onRender' : function () {
			this.$el.attr( 'tabindex', '-1' ).modal();
		},

		'close' : function () {
			if ( this.$el.is( ':visible' ) ) {
				this.$el.modal( 'hide' );
			} else {
				Marionette.ItemView.prototype.close.apply( this, arguments );
			}
		},

		'saveSkill' : function ( event ) {
			event.preventDefault();

			var self    = this;
			var action  = this.model.get( 'action' );
			var modelId = this.model.id;

			if ( action === 'Create' ) {
				this.model.clear();

				this.model.set( {
					'parent' : modelId
				} );
			}

			var name        = $( '#name' ).val();
			var description = $( '#description' ).val();

			this.model.set( {
				'name'        : name,
				'description' : description
			} );

			this.model.save( this.model, {
				'wait' : true,

				'success' : function ( model, response ) {
					self.close();
				},

				'error' : function ( model, error ) {
					console.log( 'Error ' + error.responseText );
				}
			} );
		}
	});

});
