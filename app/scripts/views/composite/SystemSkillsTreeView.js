define( function ( require ) {
	'use strict';

	var $               = require( 'jquery' );
	var _               = require( 'underscore' );
	var Backbone        = require( 'backbone' );
	var Marionette      = require( 'marionette' );
	var template        = require( 'text!tmpl/composite/systemSkillsTreeView.html' );
	var bootbox         = require( 'bootbox' );

	var ManageSkillView = require( 'views/item/ManageSkillView' );


	/* Return a CompositeView class definition */
	return Marionette.CompositeView.extend( {
		'template' : _.template( template ),

		'tagName' : 'li',

		'initialize' : function () {
			this.collection = this.model.children;

			this.on( 'item:added', function ( view ) {
				this.bindTo( view, 'refresh', this.renderTree, this );
			} );
		},

		'initialEvents' : function () {
			 // Bind to any changes in the collection and redraw the entire menu chain
			if ( this.collection ) {
				this.bindTo( this.collection, 'add', this.renderTree, this );
				this.bindTo( this.collection, 'remove', this.renderTree, this );
				this.bindTo( this.collection, 'reset', this.renderTree, this );
			}
		},

		'renderTree' : function () {
			this.render();
		},

		'ui' : {
			'addSkillBtn'    : '#js-add-skill',
			'updateSkillBtn' : '#js-update-skill',
			'deleteSkillBtn' : '#js-delete-skill'
		},

		'events' : {
			'mouseover .skill-node'      : 'showDescription',
			'mouseover #js-add-skill'    : 'showTooltip',
			'mouseover #js-update-skill' : 'showTooltip',
			'mouseover #js-delete-skill' : 'showTooltip',
			'click #js-add-skill'        : 'addSkill',
			'click #js-update-skill'     : 'updateSkill',
			'click #js-delete-skill'     : 'deleteSkill'
		},

		'appendHtml' : function ( collectionView, itemView ) {
			collectionView.$( 'ul:first' ).append( itemView.el );
		},

		'onRender' : function () {
			// remove extra ul tag
			if ( _.isUndefined( this.collection ) ) {
				this.$( 'ul:first' ).remove();
			}

			// Button tooltips
			this.ui.addSkillBtn.tooltip( {
				'title' : 'Add'
			} );

			this.ui.updateSkillBtn.tooltip( {
				'title' : 'Update'
			} );

			this.ui.deleteSkillBtn.tooltip( {
				'title' : 'Delete'
			} );
		},

		'showDescription' : function ( event ) {
			event.stopPropagation();

			$( event.target ).popover( 'show' );
		},

		'showTooltip' : function ( event ) {
			event.stopPropagation();

			$( event.target ).tooltip( 'show' );
		},

		'addSkill' : function ( event ) {
			event.stopPropagation();

			this.model.set( {
				'action'      : 'Create',
				'name'        : '',
				'description' : ''
			} );

			var CreateSkillView = new ManageSkillView( {
				'model' : this.model
			} );

			CreateSkillView.render();
		},

		'updateSkill' : function ( event ) {
			event.stopPropagation();

			this.model.set( { 'action' : 'Update' } );

			var UpdateSkillView = new ManageSkillView( {
				'model' : this.model
			} );

			UpdateSkillView.render();
		},

		'deleteSkill' : function ( event ) {
			event.stopPropagation();

			var self = this;

			var options = {
				'title' : 'Delete Skill',

				'message' : 'Are you sure you want to delete ' + this.model.get( 'name' ) + '?',

				'buttons' : {
					'success' : {
						'label'     : 'Delete',
						'className' : 'btn-danger',
						'callback'  : function () {
							self.model.destroy( {
								'wait' : true,

								'success' : function ( model, response ) {
									self.$el.parent().remove();
									console.log(self.$el);
								},

								'error' : function ( model, error ) {
									console.log( 'Error ' + error.responseText );
								}

							} );
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
