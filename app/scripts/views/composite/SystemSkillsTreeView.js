define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!tmpl/composite/systemSkillsTreeView.html' );
	var bootbox    = require( 'bootbox' );


	/* Return a CompositeView class definition */
	return Marionette.CompositeView.extend( {
		'template' : _.template( template ),

		'tagName' : 'li',

		'initialize' : function () {
			this.collection = this.model.children;
		},

		'ui' : {
			'addSkillBtn'    : '#js-add-skill',
			'editSkillBtn'   : '#js-edit-skill',
			'deleteSkillBtn' : '#js-delete-skill'
		},

		'events' : {
			'mouseover .skill-description' : 'showDescription'
		},

		'appendHtml' : function ( collectionView, itemView ) {
			collectionView.$( 'ul:first' ).append( itemView.el );
		},

		'onRender' : function () {
			// remove extra ul tag
			if ( _.isUndefined( this.collection ) ) {
				this.$( 'ul:first' ).remove();
			}
		},

		'showDescription' : function ( event ) {
			event.preventDefault();

			$( event.target ).popover( 'show' );
		},

		'addSkill' : function () {

		},

		'editSkill' : function () {

		},

		'deleteSkill' : function ( event ) {
			var options = {
				'title' : 'Manage Skills',

				'message' : 'Message',

				'buttons' : {
					'success' : {
						'label'     : 'Delete',
						'className' : 'btn-danger',
						'callback'  : function () {
							return console.log( 'test' );
						}
					},

					'cancel' : {
						'label'     : 'Cancel',
						'className' : 'btn-default'
					}
				},

				'closeButton' : false
			};

			bootbox.dialog( options );
		}

	} );

} );
