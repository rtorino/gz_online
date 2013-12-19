'use strict';

function challenge( realm ) {
	return 'Basic realm="' + realm + '"';
}

function fail( res, challenge ) {
	res.statusCode = 401;
	res.setHeader( 'WWW-Authenticate', challenge );
	res.end( 'Unauthorized' );
}

function badRequest() {
	var error = new Error( 'Bad Request' );
	error.status = 400;
	return error;
}

module.exports = function basic( options ) {
	options = options || {};
	var realm = options.realm || 'Users';

	return function( req, res, next ) {
		var authorization = req.headers[ 'authorization' ];

		if ( !authorization ) {
			return fail( res, challenge( realm ) );
		}

		var parts = authorization.split( ' ' );

		var scheme = parts[ 0 ];
		var credentials = new Buffer( parts[ 1 ], 'base64' ).toString().split( ':' );

		// Checks if scheme is Basic authentication
		if ( !/Basic/i.test( scheme ) ) {
			return fail( res, challenge( realm ) );
		}
		// Checks if credentials is complete ( with username, password )
		if ( credentials.length < 2 ) {
			return next( badRequest() );
		}

		var email = credentials[ 0 ];
		var password = credentials[ 1 ];
		if ( !email || !password ) {
			return fail( res, challenge( realm ) );
		}

		req.body.email = email;
		req.body.password = password;

		next();
	};
};