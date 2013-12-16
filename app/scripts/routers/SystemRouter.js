define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	return Marionette.AppRouter.extend( {
		'appRoutes' : {
			'system/users'         : 'showUsers',
			'system/assessors'     : 'showAssessors',
			'system/skills/create' : 'createSkill',
			'system/skills*action' : 'showSkills',
			'system*action'        : 'showUsers'
		}
	} );

} );
