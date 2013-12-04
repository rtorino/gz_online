define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'backbone.marionette' );

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

	// require components
	var components = {};

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

			var User = new models.User( { selectedMenu : 'Users' } );

			var view = new views.AdminContentsView( {
				model      : User,
				collection : new collections.Users( {
					model : User
				} ),
				itemView   : views.AdminUserView
			} );

			this.layout.contentRegion.show( view );
		},

		showAssessors : function () {
			this._setActiveMenu();

			var User = new models.User( { selectedMenu : 'Assessors' } );

			var view = new views.AdminContentsView( {
				model      : User,
				collection : new collections.Users( {
					model : User
				} ),
				itemView   : views.AdminAssessorView
			} );

			this.layout.contentRegion.show( view );
		},

		showSkills : function () {
			this._setActiveMenu();

			var User = new models.User( { selectedMenu : 'Skills' } );

			var view = new views.AdminContentsView( {
				model      : User,
				collection : new collections.Users( {
					model : User
				} ),
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
				usersCtr     : 5,
				assessorsCtr : 10,
				skillsCtr    : 20
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