define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Skills   = require( 'collections/SkillsCollection' );

	/* Return a model class definition */
	return Backbone.Model.extend( {
		'initialize' : function () {
			var children = this.get( 'children' );

			if ( children ) {
				this.children = new Skills( children );
				this.unset( 'children' );
			}
		},

		'defaults' : {},

	} );

} );
