define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );

	// require models
	var models = {
		'User'        : require( 'models/UserModel' ),
		'SkillModel'  : require( 'models/SkillModel' )
	};

	// require collections
	var collections = {
		'Users'            : require( 'collections/UsersCollection' ),
		'SkillsCollection' : require( 'collections/SkillsCollection' )
	};

	// require layouts
	var layouts = {
		'System' : require( 'views/layout/SystemLayout' )
	};

	// require views
	var views = {
		'SystemMenuView'           : require( 'views/item/SystemMenuView' ),
		'SystemContentsView'       : require( 'views/composite/SystemContentsView' ),
		'SystemUserView'           : require( 'views/item/SystemUserView' ),
		'SystemAssessorView'       : require( 'views/item/SystemAssessorView' ),
		'SystemSkillView'          : require( 'views/item/SystemSkillView' ),
		'SystemSkillsTreeRootView' : require( 'views/composite/SystemSkillsTreeRootView' ),
		'SystemSkillsTreeView'     : require( 'views/composite/SystemSkillsTreeView' ),
		'ErrorView'                : require( 'views/ErrorView' )
	};

	// reutilsquire utils
	var util = require( 'util' );

	return Marionette.Controller.extend({
		initialize : function ( options ) {
			var self = this;

			_.bindAll( this );

			_.each( options, function ( value, key ) {
				self[ key ] = value;
			});

			this.showDefault();

			return this;
		},

		showDefault : function () {
			this.layout = this._getLayout();
			this.App.content.show( this.layout );
		},

		showUsers : function () {
			this._setActiveMenu();

			var users = [
				{
					_id   : 0,
					fName : 'Jerome',
					lName : 'Ramos'
				},
				{
					_id   : 1,
					fName : 'Rocky',
					lName : 'Coronel'
				},
				{
					_id   : 2,
					fName : 'Raymond',
					lName : 'Torino'
				}
			];

			var User = new models.User( { selectedMenu : 'Users' } );

			var view = new views.SystemContentsView( {
				model      : User,
				collection : new collections.Users( users ),
				itemView   : views.SystemUserView
			} );

			this.layout.contentRegion.show( view );
		},

		showAssessors : function () {
			this._setActiveMenu();

			var assessors = [
				{
					_id   : 0,
					fName : 'James',
					lName : 'Santos'
				},
				{
					_id   : 1,
					fName : 'Elizar',
					lName : 'Pepino'
				},
				{
					_id   : 2,
					fName : 'George',
					lName : 'Cordero'
				}
			];

			var User = new models.User( { selectedMenu : 'Assessors' } );

			var view = new views.SystemContentsView( {
				model      : User,
				collection : new collections.Users( assessors ),
				itemView   : views.SystemAssessorView
			} );

			this.layout.contentRegion.show( view );
		},

		showSkills : function () {
			var self = this;

			var SkillTreeNode = Backbone.Model.extend( {
				'initialize' : function ( ) {
					var children = this.get( 'children' );
					if ( children ) {
						this.children = new SkillTreeNodeCollection( children );
						this.unset( 'children' );
					}
				},

				'defaults' : {
					'name' : 'Skill name',

					'description' : 'Some description'
				}
			});

			var SkillTreeNodeCollection = Backbone.Collection.extend( {
				'model' : SkillTreeNode
			} );

			var skillTreeView = new views.SystemSkillsTreeRootView({
				'itemView' : views.SystemSkillsTreeView
			});

			var SkillsCollection = new collections.SkillsCollection();

			this._setActiveMenu();

			SkillsCollection.baucis().then( function ( collection, response ) {
				if ( response === 'success' ) {
					var skillTree = new SkillTreeNodeCollection( self._buildJSONSkillTree( null, collection, [] ) );

					skillTreeView.collection = skillTree;
				} else {
					skillTreeView.itemView = views.ErrorView;
				}

				self.layout.contentRegion.show( skillTreeView );
			} );
		},

		_getLayout : function () {
			var systemLayout = new layouts.System();

			this.listenTo( systemLayout, 'render', function () {
				this._showMenuAndContent( systemLayout );
			}, this );

			return systemLayout;
		},

		_showMenuAndContent : function () {
			this._addMenu( this.layout.menuRegion );

			this.showUsers( this.layout.contentRegion, 'Users' );
		},

		_addMenu : function () {
			var SkillsCollection = new collections.SkillsCollection();
			var skillsCtr = SkillsCollection.baucis( { count : true } ).then( function ( result ) {
				return result;
			} );

			var User = new models.User( {
				'usersCtr'     : 3,
				'assessorsCtr' : 3,
				'skillsCtr'    : skillsCtr
			} );

			this.menu = new views.SystemMenuView( {
				model : User
			} );

			this.layout.menuRegion.show( this.menu );
		},

		_setActiveMenu : function () {
			var currentRoute = '#' + Backbone.history.fragment;
			var menuOptions  = this.menu.ui.menuOptions;
			var hashes       = [];

			menuOptions.parent().siblings().removeClass( 'active' );

			_.each( menuOptions, function ( value, key ) {
				hashes.push( value.hash );

				if ( currentRoute === value.hash ) {
					$( menuOptions[ key ] ).parent().addClass( 'active' );
				}
			} );

			// Set default active menu if current route has no match in the options hashes
			if ( $.inArray( currentRoute, hashes ) === -1 ) {
				$( menuOptions[ 0 ] ).parent().addClass( 'active' );
			}
		},

		'_buildJSONSkillTree' : function ( parentId, skillCollection, skillTree ) {
			_.each( skillCollection, function ( element, index, list ) {
				if ( element.parent === null ) {
					skillTree.push( element );
				} else {
					var parent = _.findWhere( list, { _id : element.parent } );

					if ( !parent.children ) {
						_.extend( parent, { children : [] } );
					}

					parent.children.push( element );
				}
			} )	;

			return skillTree;
		}

	} );

} );