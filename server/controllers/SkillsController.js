'use strict';

var User = require( '../schemas/SkillsSchema' );

module.exports = function( baucis ) {
	var controller = baucis.rest( {
		singular: 'Skill'
	} );

	return controller;
}