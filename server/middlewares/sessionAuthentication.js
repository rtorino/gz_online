'use strict';

/*
*	Implementation is based on connect's CSRF middleware
*/

var uid    = require( 'node-uuid' );
var crypto = require( 'crypto' );

var SALTCHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateSalt( length ) {
	var i, r = [];
	for (i = 0; i < length; ++i) {
		r.push(SALTCHARS[Math.floor(Math.random() * SALTCHARS.length)]);
	}
	return r.join('');
}

function createHash( salt, secret ) {
	return salt + crypto
		.createHash( 'sha1' )
		.update( salt + secret )
		.digest( 'base64' );
}

function saltedToken( secret ) {
	return createHash( generateSalt( 10 ) , secret );
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

function fail( res ) {
	res.statusCode = 403;
	res.end( 'Forbidden' );
}

module.exports = function auth( options ) {
	// Supports user submitted value
	options = options || {};
	var value = options.value || defaultValue;

	return function( req, res, next ) {
		var secret;

		function createToken( secret ) {
			var token;

			req.authToken = function authToken() {
				return token || ( token = saltedToken( secret ) );
			};

			// ignore these methods including login and signup
			if ( 'GET' === req.method ||
				 'HEAD' === req.method ||
				 'OPTIONS' === req.method
				) {
					return next();
			}

			// determine user-submitted value
			var val = value( req );

			// check
			if ( !checkToken( val, secret ) ) {
				return fail( res );
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