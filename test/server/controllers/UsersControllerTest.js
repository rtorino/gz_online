'use strict';

var fixtures = require( '../fixtures' );
var chai = require( 'chai' );

var expect = chai.expect;
var	should = chai.should();

var request;

describe( 'REST - User', function() {

	before( function( done ) {

		fixtures.init( 'Users', function( error, agent ) {
			request = agent;
			done();
		} );

	} );

	after( function( done ) {

		fixtures.deinit( 'Users', function() {
			done();
		} );

	} );

	describe( 'GET', function() {

		it( 'should fetch all users', function( done ) {
			request
				.get( '/users' )
				.set( 'Accept', 'application/json' )
				.end( function ( err, res ){
					if ( err ){
						return done( err );
					}
					chai.expect( res.body ).not.to.be.null;
					done();
				});
		} );


	} );

describe( 'POST', function() {
		var url  = '/users';
		var user = {
			email		: 'johndoe@globalzeal.net',
			username	: 'johndoe',
			password	: 'oednhoj',
			fName		: 'jhon',
			lName		: 'doe',
			role		: 'user',
			verified	: 0
		};

		var error, response, body;

		beforeEach( function( done ) {
				request
					.post( url )
					.send( user )
					.expect( 'Content-Type', /json/ )
					.expect( 200 )
					.end( function( responseError, responseObject) {
						error     = responseError;
						response  = responseObject;
						body      = responseObject.body;

						done();

					} );
		} );


		it( 'should return 201', function( done ) {

			expect( response.statusCode ).to.be.equal( 201 );

			done();
		} );


		it( 'should return json', function( done ) {

			expect( response ).to.be.json;

			done();
		} );

		it( 'should return object', function( done ) {

			expect( body ).to.be.a( 'object' );

			done();
		} );

		it( 'should return the correct object', function( done ) {

			body.should.have.property( '_id' );
			body.should.have.property( 'email' );
			body.should.have.property( 'username' );
			body.should.have.property( 'password' );
			body.should.have.property( 'fName' );
			body.should.have.property( 'lName' );
			body.should.have.property( 'role' );
			body.should.have.property( 'verified' );

			done();
		} );

		it( 'should return the correct types', function( done ) {

			body._id.should.be.a( 'string' );
			body.email.should.be.a( 'string' );
			body.username.should.be.a( 'string' );
			body.password.should.be.a( 'string' );
			body.fName.should.be.a( 'string' );
			body.lName.should.be.a( 'string' );
			body.role.should.be.a( 'string' );
			body.verified.should.be.a( 'Number' );

			done();
		} );

		it( 'should return the correct values', function( done ) {

			body.email.should.be.equal( user.email );
			body.username.should.be.equal( user.username );
			body.password.should.be.equal( user.password );
			body.fName.should.be.equal( user.fName );
			body.lName.should.be.equal( user.lName );
			body.role.should.be.equal( user.role );
			body.verified.should.be.equal( user.verified );

			done();
		} );

		it( 'should save a user with globalzeal email account', function( done ) {
			request.post( '/users' )
				.send( {
					email: 'test.foo@globalzeal.net',
					password: 'testpass'
				} )
				.expect( 201 )
				.end( function( error, response ) {
					if ( error ) return done( error );

					done();
				} );
		} );

		it ( 'should have a POST-login route', function ( done ){
			request
				.post ( '/users/login' )
				.set ( 'Accept', 'application/json' )
				.end ( function ( err, res ){
					if( err ){
						return done (err );
					}
					chai.expect( res ).not.to.have.property( 'badRequest', true );
					done();
				});
		} );

		it( 'should not allow invalid credentials to login', function( done ) {
			request
				.post( '/users/login' )
				.send( {
					email: 'not.valid@globalzeal.net',
					password: 'notvalid'
				} )
				.end( function( error, response ){
					if (error){
						return done(error);
					}
					chai.expect(response.body.statusCode).to.be.equal(0);
					done();
				})
		} );

		it( 'should not allow blank email address', function ( done ){
			request
				.post( '/users/login' )
				.send( {
					email : '      ',
					password : 'notvalid'
				} )
				.end( function ( error, response ){
					if (error){
						return done( error );
					}
					chai.expect(response.body.statusCode).to.be.equal(-1);
					done();
				} );
		} );

	} );


	describe( 'PUT', function () {
		var url  = '/users/529be4f7bae0bdd111000001';
		var user = {
			email		: 'john.doe@globalzeal.net',
			username	: 'john.doe',
			password	: 'thisisnew',
			fName		: 'john',
			lName		: 'doe',
			role		: 'user',
			verified	: 0
		};

		var error, response, body;

		before( function( done ) {
			request
				.put( url )
				.send( user )
				.expect( 'Content-Type', /json/ )
				.expect( 200 )
				.end( function( responseError, responseObject) {
					error     = responseError;
					response  = responseObject;
					body      = responseObject.body;

					done();

				} );
		} );

		it( 'should return 200', function( done ) {

			expect( response.statusCode ).to.be.equal( 200 );

			done();
		} );

		it( 'should return json', function( done ) {

			expect( response ).to.be.json;

			done();
		} );

		it( 'should return object', function( done ) {

			expect( body ).to.be.a( 'object' );

			done();
		} );

		it( 'should return the correct properties', function( done ) {

			body.should.have.property( '_id' );
			body.should.have.property( 'email' );
			body.should.have.property( 'username' );
			body.should.have.property( 'password' );
			body.should.have.property( 'fName' );
			body.should.have.property( 'lName' );
			body.should.have.property( 'role' );
			body.should.have.property( 'verified' );

			done();
		} );

		it( 'should return the correct types', function( done) {

			body.email.should.be.equal( user.email );
			body.username.should.be.equal( user.username );
			body.password.should.be.equal( user.password );
			body.fName.should.be.equal( user.fName );
			body.lName.should.be.equal( user.lName );
			body.role.should.be.equal( user.role );
			body.verified.should.be.equal( user.verified );

			done();
		} );

		it( 'should be able to edit password', function( done ) {
			var updateUserUrl = '/users/password/529be4f7bae0bdd111000001';

			var updateUser = {
				'email'		: 'john.doe@globalzeal.net',
				'username'	: 'john.doe',
				'fName'		: 'john',
				'lName'		: 'doe',
				'role'		: 'user',
				'verified'	: 0,
				'password1'	: 'thisisold',
				'password2'	: 'thisisold',
				'password'	: 'thisisnew'

			};

			request.put( updateUserUrl )
				.send( updateUser )
				.end( function(responseError, responseObject) {
					responseObject.statusCode.should.equal( 200 );

					done();
				} );

		} );

		describe( 'Errors, Unauthorized', function() {

			it( 'should not be able to edit password because current password is not correct', function( done ) {
				var updateUserUrl = '/users/password/529be4f7bae0bdd111000001';

				var updateUser = {
					'email'		: 'john.doe@globalzeal.net',
					'username'	: 'john.doe',
					'fName'		: 'john',
					'lName'		: 'doe',
					'role'		: 'user',
					'verified'	: 0,
					'password1'	: 'thisisold',
					'password2'	: 'thisisold',
					'password'	: 'thisisnew'

				};

				request.put( updateUserUrl )
					.send( updateUser )
					.end( function(responseError, responseObject) {
						responseObject.statusCode.should.equal( 400 );
						responseObject.body.message.should.equal( 'Incorrect Password')

						done();
					} );
			} );

			it( 'should not be able to edit password because password1 does not match password2', function( done ) {
				var updateUserUrl = '/users/password/529be4f7bae0bdd111000001';

				var updateUser = {
					'email'		: 'john.doe@globalzeal.net',
					'username'	: 'john.doe',
					'fName'		: 'john',
					'lName'		: 'doe',
					'role'		: 'user',
					'verified'	: 0,
					'password1'	: 'thisisold',
					'password2'	: 'fddfd',
					'password'	: 'thisisold'

				};

				request
					.put( updateUserUrl )
					.send( updateUser )
					.end( function(responseError, responseObject) {
						responseObject.statusCode.should.equal( 400 );
						responseObject.body.message.should.equal( 'Passwords not match')

						done();
					} );

			} );
		} );
	} );

} );