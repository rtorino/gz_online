define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	return Marionette.AppRouter.extend( {
		'appRoutes' : {
			'admin/users'     : 'showUsers',
			'admin/assessors' : 'showAssessors',
			'admin/skills'    : 'showSkills',
			'admin*action'    : 'showUsers'
		}
	} );

} );
