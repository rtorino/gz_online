'use strict';

var fixtures = require( '../fixtures' );
var request;
var should = require( 'chai' ).should();


describe( 'REST - Skills', function() {
	var baseUrl = "/skills";

	before( function( done ) {

		fixtures.init( 'Skills', function( error, agent ) {
			request = agent;
			done();
		} );

	} );

	after( function( done ) {

		fixtures.deinit( 'Skills', function() {
			done();
		} );

	} );

	//-----------------------GET--------------------------------


	describe( 'GET', function() {
		var error, response, body;

		//baucis
		describe( 'get all skills', function() {
			before( function( done ) {
				request
					.get( baseUrl )
					.end( function( err, res ) {
						error = err;
						response = res;
						body = response.body;
						done();
					} );
			} );

			it( 'should return 200', function() {
				response.statusCode.should.equal( 200 );
			} );

			it( 'should be json', function() {
				response.should.be.json;
			} );



			it( 'should return an array', function() {
				body.should.be.an.instanceOf( Array );
			} );

		} );


		//baucis
		describe( 'get skill by id', function() {
			//test data id
			var skill = {
				'name': "HTML",
				'description': "Hypertext Markup Language",
				'parent': null
			};

			before( function( done ) {
				request
					.post( baseUrl + "/addSkill" )
					.send( skill )
					.end( function( err, res ) {
						//console.log( res );
						var id = res.body._id;
						request
							.get( baseUrl + "/" + id )
							.end( function( err, res ) {
								error = err;
								response = res;
								body = response.body;
								done();
							} );
						//done();
					} );

			} );



			it( 'should return 200', function() {
				response.statusCode.should.equal( 200 );
			} );

			it( 'should be json', function() {
				response.should.be.json;
			} );

			it( 'should return an object', function() {
				body.should.be.a( 'object' );
			} );

			it( 'should return the correct properties', function() {
				body.should.have.property( '_id' );
				body.should.have.property( 'name' );
				body.should.have.property( 'description' );
				body.should.have.property( 'parent' );
				body.should.have.property( 'child' );
				body.should.have.property( 'exam' );
				body.should.have.property( 'version' );
				body.should.have.property( 'openStatus' );
			} );

		} );



	} );

	//-----------------------POST

	describe( 'POST', function() {
		//OK adding :D
		//add skill that updates parent's field child
		describe( 'adding a new skill', function() {
			// code
			var skillUrl = baseUrl + '/addSkill';
			//test data
			var skill = {
				name: 'BackBone',
				description: '..bb..',
				parent: null
			};
			//end test data
			var error;
			var response;
			var body;

			before( function( done ) {
				request
					.post( skillUrl )
					.send( skill )
					.end( function( err, res ) {
						error = err;
						response = res;
						body = response.body;
						//console.log( "ERROR: "+err );
						done();
					} );
			} );


			it( 'should return 201', function() {
				response.statusCode.should.equal( 201 );
			} );

			it( 'should return json', function() {
				response.should.be.json;
			} );

			it( 'should return an object', function() {
				body.should.be.an( 'object' );
			} );
		} );

	} );


	//-----------------------PUT
	describe( 'PUT', function() {

		//test data


		var error;
		var response;
		var body;

		//baucis
		describe( 'update skill by id', function() {

			before( function( done ) {

				request
					.get( baseUrl )
					.end( function( err, res ) {
						error = err;
						response = res;
						body = response.body;
						var id = body[ 0 ]._id; //get first data id to update

						request
							.put( baseUrl + "/" + id )
							.send( {
								"openStatus": 1
							} )
							.end( function( err, res ) {
								error = err;
								response = res;
								body = response.body;
								done();
							} );

					} );

			} );

			it( 'GET should return 200', function() {
				response.statusCode.should.equal( 200 );
			} );

			it( 'should be json', function(){
				response.should.be.json;
			})

		} );

	} );


	//-----------------------DELETE
	describe( 'DELETE', function() {


		/*var skill={
			name: "<name of skill>"
			};*/
		var error;
		var response;
		var body;

		describe( 'delete skill by id and its children', function() {

			before( function( done ) {

				request
					.get( baseUrl )
					.end( function( err, res ) {
						error = err;
						response = res;
						body = response.body;
						var id = body[ 0 ]._id; //get first data id to delete
						request
							.del( baseUrl + "/deleteSkill/" + id )
						//.send(skill)
						.end( function( err, res ) {
							error = err;
							response = res;
							body = response.body;
							done();
						} );
					} );
			} );

			it( ' should return 200', function() {
				response.statusCode.should.equal( 200 );
			} );


			it( 'should be json', function() {
				response.should.be.json;
			} );

		} );



		/* baucis delete
		//testdata
		var id = "529ec29fd1f5d57e13000001";
		var error, response, body;
		//delete skill
		//delete skill's child, and delete from parent

		//baucis
		describe( 'delete skill by id', function() {

			before( function( done ) {
				request
					.del( baseUrl + "/" + id )
					.end( function( err, res ) {
						error = err;
						response = res;
						body = response.body;
						done();
					} );
			} );

			it( 'GET should return 200', function() {
				response.statusCode.should.equal( 200 );
			} );

			it( 'should be json', function() {
				response.should.be.json;
			} );



		} );*/



	} );

} );