define( function ( require ) {
	'use strict';

	var Marionette       = require( 'backbone.marionette' );
	var MiddlewareRouter = require( 'MiddlewareRouter' );

	return Marionette.MiddlewareRouter.extend( {
		'appRoutes' : {
			'admin*actions'   : 'bootstrapAdminApp'
		}
	} );

} );
