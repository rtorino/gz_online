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
	var collections = {};

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
		AdminSkillsView   : require( 'views/item/AdminSkillView' ),
	};

	// require components
	var components = {};

	return Marionette.Controller.extend({
		initialize : function ( options ) {
			var self = this;

			_.bindAll( this );

			_.each( options, function ( value, key, list ) {
				self[ key ] = value;
			});

			this._setLayout();
			this._setMenu();
			this.showMainContent();

			this.Vent.on('admin:menu:changed', function(selectedMenu) {
				var selectedMenu = selectedMenu.replace(/[0-9]/g, '');
				self.showMainContent(selectedMenu);
			});

			return this;
		},

		showMainContent : function ( selectedMenu ) {
			console.log(selectedMenu);
			var User = new models.User();

			this.layout.contentRegion.show(new views.AdminContentsView( { model : User } ));
		},

		_setLayout : function () {
			this.layout = new layouts.Admin();
			this.content.show(this.layout);
		},

		_setMenu : function () {
			var MenuModel = new models.User( { users : 10 } );

			this.layout.menuRegion.show( new views.AdminMenuView( { model : MenuModel } ) );
		},

		_getUsers : function () {},

		_getAssessors : function () {},

		_getSkills : function () {}
	});
} );