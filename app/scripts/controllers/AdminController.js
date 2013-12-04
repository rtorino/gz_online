define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );

	// require models
	var models = {
		User   : require('models/UserModel'),
		//Skills : require('models/SkillModel'),
	};

	// require collections
	var collections = {
		Users : require( 'collections/UsersCollection' )
	};

	// require layouts
	var layouts = {
		Admin : require( 'views/layout/AdminLayout' )
	};

	// require views
	var views = {
		AdminMenuView     : require( 'views/item/AdminMenuView' ),
		AdminContentsView : require( 'views/composite/AdminContentsView' ),
		AdminUserView     : require( 'views/item/AdminUserView' ),
		AdminAssessorView : require( 'views/item/AdminAssessorView' ),
		AdminSkillView    : require( 'views/item/AdminSkillView' )
	};

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
			this.content.show( this.layout );
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

			var view = new views.AdminContentsView( {
				model      : User,
				collection : new collections.Users( users ),
				itemView   : views.AdminUserView
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

			var view = new views.AdminContentsView( {
				model      : User,
				collection : new collections.Users( assessors ),
				itemView   : views.AdminAssessorView
			} );

			this.layout.contentRegion.show( view );
		},

		showSkills : function () {
			this._setActiveMenu();

			var User = new models.User( { selectedMenu : 'Skills' } );

			var view = new views.AdminContentsView( {
				model      : User,
				collection : new collections.Users(  ),
				itemView   : views.AdminSkillView
			} );

			this.layout.contentRegion.show( view );
		},

		_getLayout : function () {
			var adminLayout = new layouts.Admin();

			this.listenTo( adminLayout, 'render', function () {
				this._showMenuAndContent( adminLayout );
			}, this );

			return adminLayout;
		},

		_showMenuAndContent : function () {
			this._addMenu( this.layout.menuRegion );

			this.showUsers( this.layout.contentRegion, 'Users' );
		},

		_addMenu : function () {
			var User = new models.User( {
				usersCtr     : 3,
				assessorsCtr : 3,
				skillsCtr    : 3
			} );

			this.menu = new views.AdminMenuView( {
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
		}

	} );

} );