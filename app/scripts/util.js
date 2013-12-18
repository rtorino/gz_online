define( function ( require ) {
	'use strict';

	var _ = require( 'underscore' );

	return {
		'baucisFetch' : function ( options, fetchOptions ) {
			fetchOptions      = _.clone( fetchOptions || {} );
			fetchOptions.data = {};

			if ( options ) {
				Object.keys( options ).forEach( function ( key ) {
					var value = options[ key ];

					if ( typeof value === 'object' ) {
						fetchOptions.data[ key ] = JSON.stringify( value );
					} else {
						fetchOptions.data[ key ] = value;
					}
				} );
			}

			return this.fetch( fetchOptions );
		}
	};
} );