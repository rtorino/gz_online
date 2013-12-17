'use strict';

/*
*	Connect's CSRF middleware
*	
*/

var uid    = require( 'node-uuid' );
var crypto = require( 'crypto' );

function createHash( salt, secret ) {
	return salt + crypto
		.createHash( 'sha1' )
		.update( salt + secret )
		.digest( 'base64' );
}

function saltedToken( salt, secret ) {
	return createHash( salt, secret );
}

function checkToken( token, secret ) {
	if ( 'string' !== typeof token ) {
		return false;
	}
	return token === createHash( token.slice( 0, 10 ), secret );
}

function defaultValue( req ) {
	return ( req.body && req.body._auth ) || ( req.query && req.query._auth ) || ( req.headers[ 'authentication' ] );
}

module.exports = function auth( options ) {
	// Supports user submitted value
	options = options || {};
	var value = options.value || defaultValue;

	return function( req, res, next ) {
		var secret;

		function createToken( secret ) {
			var token;

			if ( !req.csrfToken ) {
				return next( new Error( 403 ) );
			}

			req.authToken = function authToken() {
				var csrf = req.csrfToken();
				return token || ( token = saltedToken( csrf, secret ) );
			};

			// ignore these methods including login and signup
			if ( 'GET' === req.method ||
				 'HEAD' === req.method ||
				 'OPTIONS' === req.method ||
				 ( 'POST' === req.method && ( req.url === '/' || req.url === '/users/login' ) )
				) {
					return next();
			}

			// determine user-submitted value
			var val = value( req );

			// check
			if ( !checkToken( val, secret ) ) {
				return next( new Error( 403 ) );
			}

			next();
		}

		secret = req.session._authSecret;

		if ( secret ) {
			return createToken( secret );
		}

		secret = uid.v4();
		req.session._authSecret = secret;
		createToken( secret );
	};
};