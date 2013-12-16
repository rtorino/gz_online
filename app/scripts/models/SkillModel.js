define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	/* Return a model class definition */
	return Backbone.Model.extend( {
		'initialize' : function () {
			var children = this.get( 'children' );

			if ( children ) {
				var Skills = require( 'collections/SkillsCollection' );

				this.children = new Skills( children );
				this.unset( 'children' );
			}
		},

		'defaults' : {
			'name'        : '',
			'description' : ''
		},

		'idAttribute' : '_id',

		'urlRoot' : '/skills'

	} );

} );
