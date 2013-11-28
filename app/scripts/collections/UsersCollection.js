define( function( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var UserModel = require( 'models/UserModel' );

	/* Return a collection class definition */
	return Backbone.Collection.extend( {
		initialize: function() {},

		model: UserModel

	} );
} );