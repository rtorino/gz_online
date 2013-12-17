'use strict';

var fixtures = require( '../fixtures' );
var chai     = require( 'chai' );
var expect   = chai.expect;
var should   = chai.should();

var request;
var user;
var token;

// Replace token with an api-key of some sort
describe( 'REST - User', function() {

	before( function( done ) {
		fixtures.init( 'Users', function( error, agent ) {
			request = agent;
			request
				.get( '/users/token' )
				.set( 'Accept', 'application/json' )
				.end( function( error, response ) {
					token = response.body.token;
					done();
				} );
		} );
	} );

	after( function( done ) {
		fixtures.deinit( 'Users', function() {
			done();
		} );
	} );

	describe( 'GET', function() {
		var error, response, body;

		beforeEach( function( done ) {
			request
				.get( '/users' )
				.set( 'Accept', 'application/json' )
				.end( function( responseError, responseObject ) {
					error = responseError;
					response = responseObject;
					body = responseObject.body;

					user = body;

					done();
				} );
		} );

		it( 'should fetch all users', function() {
			chai.expect( response.body ).not.to.be.a( 'null' );
		} );
	} );

	describe( 'POST', function() {
		var testData = {
			'email'    : 'john.doe@globalzeal.net',
			'password' : 'oednhoj',
			'username' : 'john.doe',
			'fName'    : 'John',
			'lName'    : 'Doe',
			'role'     : 'admin',
			'verified' : 0
		};

		var error, response, body;

		beforeEach( function( done ) {
			request
				.post( '/users' )
				.send( testData )
				.set( 'X-CSRF-Token', token )
				.expect( 'Content-Type', /json/ )
				.expect( 200 )
				.end( function( responseError, responseObject ) {
					error = responseError;
					response = responseObject;
					body = responseObject.body;

					user = body;

					done();
				} );
		} );


		it( 'should return 201', function() {
			expect( response.statusCode ).to.be.equal( 201 );
		} );

		it( 'should return json', function() {
			expect( response ).to.be.json;
		} );

		it( 'should return object', function() {
			expect( body ).to.be.a( 'object' );
		} );

		it( 'should return the correct object', function() {
			body.should.have.property( '_id' );
			body.should.have.property( 'email' );
			body.should.have.property( 'username' );
			body.should.have.property( 'fName' );
			body.should.have.property( 'lName' );
			body.should.have.property( 'role' );
			body.should.have.property( 'verified' );
		} );

		it( 'should return the correct types', function() {
			body._id.should.be.a( 'string' );
			body.email.should.be.a( 'string' );
			body.username.should.be.a( 'string' );
			body.fName.should.be.a( 'string' );
			body.lName.should.be.a( 'string' );
			body.role.should.be.a( 'string' );
			body.verified.should.be.a( 'Number' );
		} );

		it( 'should return the correct values', function() {
			body.email.should.be.equal( user.email );
			body.username.should.be.equal( user.username );
			body.fName.should.be.equal( user.fName );
			body.lName.should.be.equal( user.lName );
			body.role.should.be.equal( user.role );
			body.verified.should.be.equal( user.verified );
		} );

		it( 'should save a user with globalzeal email account', function( done ) {
			request
				.post( '/users' )
				.send( {
					email: 'test.foo@globalzeal.net',
					password: 'testpass'
				} )
				.set( 'X-CSRF-Token', token )
				.expect( 201 )
				.end( function( error ) {
					if ( error ) {
						return done( error );
					}

					done();
				} );
		} );

		it( 'should have a POST-login route', function( done ) {
			request
				.post( '/users/login' )
				.send( {
					'email': 'test.email@globalzeal.net'
				} )
				.set( 'Accept', 'application/json' )
				.set( 'X-CSRF-Token', token )
				.end( function( err, res ) {
					if ( err ) {
						return done( err );
					}
					chai.expect( res ).not.to.have.property( 'badRequest', true );
					done();
				} );
		} );

		it( 'should not allow blank email address', function( done ) {
			request
				.post( '/users/login' )
				.send( {
					email: '      ',
				} )
				.set( 'X-CSRF-Token', token )
				.end( function( error, response ) {
					if ( error ) {
						return done( error );
					}
					chai.expect( response.statusCode ).to.be.equal( 404 );
					done();
				} );
		} );

	} );

	describe( 'PUT', function() {
		var url, error, response, body;

		var testData = {
			email    : 'john.doe@globalzeal.net',
			username : 'johnny',
			password : 'oednhoj',
			fName    : 'john',
			lName    : 'doe',
			role     : 'admin',
			verified : 0
		};

		before( function( done ) {
			url = '/users/' + user._id;

			request
				.put( url )
				.send( testData )
				.expect( 'Content-Type', /json/ )
				.set( 'X-CSRF-Token', token )
				.expect( 200 )
				.end( function( error, resp ) {
					error = error;
					response = resp;
					body = resp.body;
					done();
				} );
		} );

		it( 'should return 200', function() {
			expect( response.statusCode ).to.be.equal( 200 );
		} );

		it( 'should return json', function() {
			expect( response ).to.be.json;
		} );

		it( 'should return object', function() {
			expect( body ).to.be.a( 'object' );
		} );

		it( 'should return the correct properties', function() {
			body.should.have.property( '_id' );
			body.should.have.property( 'email' );
			body.should.have.property( 'username' );
			body.should.have.property( 'fName' );
			body.should.have.property( 'lName' );
			body.should.have.property( 'role' );
			body.should.have.property( 'verified' );
		} );

		it( 'should return the correct types', function() {
			body.email.should.be.equal( body.email );
			body.username.should.be.equal( body.username );
			body.fName.should.be.equal( body.fName );
			body.lName.should.be.equal( body.lName );
			body.role.should.be.equal( body.role );
			body.verified.should.be.equal( body.verified );
		} );

		// it( 'should be able to edit password', function( done ) {
		// 	var updateUserUrl = '/users/password/' + user._id;

		// 	var updateUser = {
		// 		'password'	: 'hello123'
		// 	};

		// 	request.put( updateUserUrl )
		// 		.send( updateUser )
		// 		.end( function(responseError, responseObject) {
		// 			responseObject.statusCode.should.equal( 200 );
		// 			responseObject.body.message.should.equal( 'Password updated' );

		// 			done();
		// 		} );

		// } );

		describe( 'Errors, Unauthorized', function() {
			// This requires hashing the current previous password
			// Back-end controller needs updating

			// it( 'should not be able to edit password because current password is not correct', function( done ) {
			// 	var updateUserUrl = '/users/password/' + user._id;

			// 	var updateUser = {
			// 		'email'		: 'john.doe@globalzeal.net',
			// 		'username'	: 'john.doe',
			// 		'fName'		: 'john',
			// 		'lName'		: 'doe',
			// 		'role'		: 'admin',
			// 		'verified'	: 0,
			// 		'password1'	: 'thisisold',
			// 		'password2'	: 'thisisold',
			// 		'password'	: 'csdsdfsdfs'

			// 	};

			// 	request.put( updateUserUrl )
			// 		.send( updateUser )
			// 		.end( function(responseError, responseObject) {
			// 			responseObject.statusCode.should.equal( 400 );
			// 			responseObject.body.message.should.equal( 'Incorrect Password');

			// 			done();
			// 		} );
			// } );

			// I think we don't need to check for similar passwords in the server
			// This should be left to the client as part of UX
			// c/o Francis

			// it( 'should not be able to edit password because password1 does not match password2', function( done ) {
			// 	var updateUserUrl = '/users/password/' + user._id;

			// 	var updateUser = {
			// 		'email'		: 'john.doe@globalzeal.net',
			// 		'username'	: 'john.doe',
			// 		'fName'		: 'john',
			// 		'lName'		: 'doe',
			// 		'role'		: 'admin',
			// 		'verified'	: 0,
			// 		'password1'	: 'thisisold',
			// 		'password2'	: 'fddfd',
			// 		'password'	: 'thisisold'

			// 	};

			// 	request
			// 		.put( updateUserUrl )
			// 		.send( updateUser )
			// 		.end( function(responseError, responseObject) {
			// 			responseObject.statusCode.should.equal( 400 );
			// 			responseObject.body.message.should.equal( 'Passwords not match');

			// 			done();
			// 		} );

			// } );
		} );
	} );

	describe( 'DELETE', function() {
		var url, error, response;

		before( function( done ) {
			url = '/users/' + user._id;
			request
				.del( url )
				.set( 'X-CSRF-Token', token )
				.end( function( responseError, responseObject ) {
					error = responseError;
					response = responseObject;

					done();
				} );
		} );

		it( 'should return 200', function() {
			response.statusCode.should.equal( 200 );
		} );
	} );

} );