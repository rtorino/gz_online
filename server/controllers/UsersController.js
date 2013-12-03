'use strict';

var User = require( '../schemas/UsersSchema' );

module.exports = function( baucis ) {
	var controller = baucis.rest( {
		singular: 'User'
	} );

	controller.put( '/password/:id', function( request, response, next ) {

		User.findById( request.params.id, function( error, user ) {

			if ( error ) {
				return response.send( 400 ,
					{
						'statusCode' : 400,
						'type'		 : 'Query Error',
						'message'	 : error
					}
				);
			}

			if ( typeof user === 'undefined' ) {
				return response.send( 400,
					{
						'statusCode' : 400,
						'type'		 : 'Match',
						'message'	 : 'Invalid Password'
					}
				);
			}

			var user = user.toObject();

			if ( request.body.password !== user.password ) {
				return response.send( 400,
					{
						'statusCode' : 400,
						'type'		 : 'Match',
						'message'	 : 'Incorrect Password'
					}
				);
			}

			if ( request.body.password1 !== request.body.password2 ) {
				return response.send( 400,
					{
						'statusCode' : 400,
						'type'		 : 'Match',
						'message'	 : 'Passwords not match'
					}
				);
			}

			delete user._id;
			delete user.__v;

			user.password = request.body.password1;

			User.update( { _id : request.params.id }, user, function( error, numberAffected, raw ) {
				return response.send( 200,
					{
						'statusCode' : 200,
						'type'		 : 'Ok',
						'message'	 : 'Password updated',
						'data'		 : user
					}
				);
			} );

		} );

	} );
	
	return controller;
}