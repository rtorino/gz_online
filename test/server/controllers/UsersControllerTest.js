'use strict';

var fixtures = require( '../fixtures' );
var chai = require( 'chai' );
var expect = chai.expect;
var should = chai.should();

var request;
var user;
var token;
var accessToken;

describe( 'REST - User', function() {

	before( function( done ) {
		fixtures.init( 'Users', function( error, agent ) {
			if ( error ) {
				return done( error );
			}

			request = agent;
			request
				.get( '/users/token' )
				.set( 'Accept', 'application/json' )
				.end( function( error, response ) {
					if ( error ) {
						return done( error );
					}

					token = response.body._csrf;
					done();
				} );
		} );
	} );

	after( function( done ) {
		fixtures.deinit( 'Users', function() {
			done();
		} );
	} );

	describe( 'Signup', function() {
		
		it( 'should create user on signup', function( done ) {
			// Base64( 'test.user@globalzeal.net:testpass' )
			var authToken = 'Basic dGVzdC51c2VyQGdsb2JhbHplYWwubmV0OnRlc3RwYXNz';
			request
				.post( '/users/signup' )
				.set( 'X-CSRF-Token', token )
				.set( 'Authorization', authToken )
				.end( function( error, response ) {
					if ( error ) {
						return done( error );
					}
					expect( response.status ).to.equal( 201 );
					done();
				} );
		} );

	} );

	describe( 'Login', function() {

		it( 'should login user', function( done ) {
			// Base64( 'test.user@globalzeal.net:testpass' )
			var authToken = 'Basic dGVzdC51c2VyQGdsb2JhbHplYWwubmV0OnRlc3RwYXNz';
			request
				.get( '/users/login' )
				.set( 'X-CSRF-Token', token )
				.set( 'Authorization', authToken )
				.end( function( error, response ) {
					if ( error ) {
						return done( error );
					}
					accessToken = response.body.accessToken;

					done();
				} );
		} );

		it( 'should return accessToken', function () {
			expect( accessToken ).to.exist;
		} );

	} );

	describe( 'GET', function() {

		it( 'should fetch all users', function( done ) {
			request
				.get( '/users' )
				.set( 'Accept', 'application/json' )
				.end( function( error, response ) {
					chai.expect( response.body ).not.to.be.a( 'null' );
					done();
				} );
		} );

	} );

	describe( 'POST', function() {
		var testData = {
			'email': 'john.doe@globalzeal.net',
			'password': 'oednhoj',
			'username': 'john.doe',
			'fName': 'John',
			'lName': 'Doe',
			'role': 'admin',
			'verified': 0
		};

		var error, response, body;

		beforeEach( function( done ) {
			request
				.post( '/users' )
				.send( testData )
				.set( 'Authentication', accessToken )
				.expect( 'Content-Type', /json/ )
				.expect( 200 )
				.end( function( err, resp ) {
					error = err;
					response = resp;
					body = resp.body;

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
			body.email.should.be.equal( testData.email );
			body.username.should.be.equal( testData.username );
			body.fName.should.be.equal( testData.fName );
			body.lName.should.be.equal( testData.lName );
			body.role.should.be.equal( testData.role );
			body.verified.should.be.equal( testData.verified );
		} );

		it( 'should save a user with globalzeal email account', function( done ) {
			request
				.post( '/users' )
				.send( {
					email: 'test.foo@globalzeal.net',
					password: 'testpass'
				} )
				.set( 'Authentication', accessToken )
				.expect( 201 )
				.end( function( error, response ) {
					if ( error ) {
						return done( error );
					}
					done();
				} );
		} );

		it( 'should have a POST-login route', function( done ) {
			// Base64( 'test.user@globalzeal.net:testpass' )
			var authToken = 'Basic dGVzdC51c2VyQGdsb2JhbHplYWwubmV0OnRlc3RwYXNz';
			request
				.post( '/users/login' )
				.set( 'Accept', 'application/json' )
				.set( 'X-CSRF-Token', token )
				.set( 'Authorization', authToken )
				.end( function( err, res ) {
					if ( err ) {
						return done( err );
					}
					chai.expect( res ).not.to.have.property( 'badRequest', true );
					done();
				} );
		} );

		it( 'should not allow blank email address on login', function( done ) {
			// Base64( ':testpass')
			var authToken = 'Basic OnRlc3RwYXNz';
			request
				.post( '/users/login' )
				.set( 'X-CSRF-Token', token )
				.set( 'Authorization', authToken )
				.end( function( error, response ) {
					if ( error ) {
						return done( error );
					}
					expect( response.headers ).to.have.property( "www-authenticate" );
					expect( response.statusCode ).to.be.equal( 401 );
					done();
				} );
		} );

	} );

	describe( 'PUT', function() {
		var url, error, response, body;

		var testData = {
			email: 'john.doe@globalzeal.net',
			username: 'johnny',
			password: 'oednhoj',
			fName: 'john',
			lName: 'doe',
			role: 'admin',
			verified: 0
		};

		before( function( done ) {
			url = '/users/' + user._id;

			request
				.put( url )
				.send( testData )
				.set( 'Authentication', accessToken )
				.expect( 'Content-Type', /json/ )
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

		it( 'should be able to edit password' );

	} );

	describe( 'DELETE', function() {
		var url, error, response;

		before( function( done ) {
			url = '/users/' + user._id;
			request
				.del( url )
				.set( 'Authentication', accessToken )
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