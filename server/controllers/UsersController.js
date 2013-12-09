'use strict';

var User = require( '../schemas/UsersSchema' );

module.exports = function( baucis ) {
	var controller = baucis.rest( {
		singular: 'User'
	} );

	controller.put( '/password/:id', function( request, response ) {

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

			user = user.toObject();

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

				if( error ) {
					return response.send( 400,
						{
							'statusCode' : 400,
							'type'		 : 'Query Error',
							'message'	 : error
						}
					);
				}

				return response.send( 200,
					{
						'statusCode'		: 200,
						'type'				: 'Ok',
						'message'			: 'Password updated',
						'data'				: user,
						'numberAffected'	: numberAffected,
						'raw'				: raw
					}
				);
			} );

		} );

	} );

	controller.post( '/login', function ( req, res ){

		var email = (req.body.email) ? req.body.email.trim() : '';

		if(email.length <= 0){
			res.send({
				'statusCode' : -1,
				'statusMsg' : 'Username Missing'
			});
		}else {
			User.find({
				email: email,
				password: req.body.password
			}, function ( err, user ){
				if ( err ){
					return  err;
				}else{
					if(user.length <= 0) {
						res.send({
							'statusCode' : 0,
							'statusMsg' : 'Username or password not found',
							'username' : req.body.email
						});
					}else{
						res.send({
							'statusCode' : 1,
							'statusMsg' : 'Welcome',
							'username' : req.body.email
						});
					}
				}
			});
		}
	});

	return controller;
};