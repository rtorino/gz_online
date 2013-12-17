'use strict';

var express = require( 'express' );
var auth	= require( '../middlewares/authentication' );
var User    = require( '../schemas/UsersSchema' );
var config  = require( '../config' ).configs;

module.exports = function( baucis ) {
	var controller = baucis.rest( {
		singular: 'User'
	} );

	controller.use( '/token', express.csrf() );
	controller.use( '/token', auth() );
	controller.use( '/login', express.csrf() );
	controller.use( '/login', auth() );

	controller.get( '/token', function( request, response ) {
		if ( !request.csrfToken ) {
			return response.send( 403 );
		}
		response.send( 200, { 'token': request.csrfToken() } );
	} );

	controller.query( 'collection', 'get', function( request, response, next ) {
		var query = request.baucis.query;
		query.select( 'email username fName lName role verified' );
		next();
	} );

	controller.request( 'collection', 'put', function( request, response, next ) {
		// Remove all password fields to avoid changing passwords in `/users/:id` route
		delete request.body.password;
		next();
	} );

	controller.query( 'collection', 'head', function( request, response, next ) {
		next();
	} );

	controller.documents( 'collection', 'post put', function( request, response, next ) {
		request.baucis.documents.password = undefined;
		request.baucis.documents.salt = undefined;
		next();
	} );

	// Need to refactor and use findByIdAndUpdate instead
	controller.put( '/password/:id', function( request, response ) {
		User.findById( request.params.id, function( error, user ) {

			if ( error ) {
				return response.send( 400, {
					'statusCode': 400,
					'type': 'Query Error',
					'message': error
				} );
			}

			if ( typeof user === 'undefined' ) {
				return response.send( 400, {
					'statusCode': 400,
					'type': 'Match',
					'message': 'Invalid Password'
				} );
			}

			delete user._id;
			delete user.__v;

			User.update( {
				_id: request.params.id
			}, { 'password': request.body.password }, function( error, numberAffected, raw ) {
				if ( error ) {
					return response.send( 400, {
						'statusCode': 400,
						'type': 'Query Error',
						'message': error
					} );
				}

				return response.send( 200, {
					'statusCode': 200,
					'type': 'Ok',
					'message': 'Password updated',
					'data': user,
					'numberAffected': numberAffected,
					'raw': raw
				} );
			} );

		} );

	} );

	controller.post( '/login', function( request, response ) {
		if ( !request.body.email ) {
			return response.send( 500 );
		}

		User.findOne( {
			'email': request.body.email.trim()
		}, function( err, doc ) {
			var user, valid;

			if ( err ) {
				return response.send( 500 );
			}

			if ( !doc ) {
				return response.send( 404 );
			}

			user = new User( doc );
			valid = user.isValidPassword( request.body.password );

			if ( valid ) {
				response.send( 200, { 'accessToken': request.authToken() } );
			} else {
				response.send( 404 );
			}

		} );

	} );

	return controller;
};