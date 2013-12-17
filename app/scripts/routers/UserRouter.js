define( function( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	return Marionette.AppRouter.extend( {
		'appRoutes': {
			'user/colleagues': '',
			'user/skills': 'showSkills',
			'user/update': ''
		}
	} );

} );