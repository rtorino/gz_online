define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
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
		AdminMenuView      : require( 'views/item/AdminMenuView' ),
		AdminUsersView     : require( 'views/composite/AdminUsersView' ),
		AdminAssessorsView : require( 'views/composite/AdminAssessorsView' ),
		AdminSkillsView    : require( 'views/composite/AdminSkillsView' )
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

		_getLayout : function () {
			var layout = new layouts.Admin();

			this.listenTo( layout, 'render', function () {
				this._showMenuAndContent( layout );
			}, this );

			return layout;
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

			var menu = new views.AdminMenuView( {
				model : User
			} );

			this.layout.menuRegion.show( menu );

			return menu;
		},

		showUsers : function () {
			var User = new models.User( { selectedMenu : 'Users' } );

			var view = new views.AdminUsersView( {
				model : User,
				collection : new collections.Users( {
					model : User
				} )
			} );

			this.layout.contentRegion.show( view );
		},

		showAssessors : function () {
			var User = new models.User( { selectedMenu : 'Assessors' } );

			var view = new views.AdminAssessorsView( {
				model : User,
				collection : new collections.Users( {
					model : User
				} )
			} );

			this.layout.contentRegion.show( view );
		},

		showSkills : function () {
			var User = new models.User( { selectedMenu : 'Skills' } );

			var view = new views.AdminSkillsView( {
				model : User,
				collection : new collections.Users( {
					model : User
				} )
			} );

			this.layout.contentRegion.show( view );
		}
	});
} );