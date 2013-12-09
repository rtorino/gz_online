'use strict';

var Skill = require( '../schemas/SkillsSchema' );
var async = require( 'async' );

module.exports = function( baucis ) {
	var controller = baucis.rest( {
		singular: 'Skill'
	} );

	// using params /:id or request.body depends
	controller['delete']( '/deleteSkill/:id', function( request, response, next ) {

		//var ids = request.params.id;

		var traverse = function( id, done ) {
			var skillsToDelete = [];
			var errorMessage = '';
			var children;
			//skillsToDelete.push( id );


			//get Id
			Skill.findById( id, function( err, result ) {
				//console.log( "traverse err: " + err );
				if ( err ){
					done( {
						'message': 'Id not found.'
					} );
				}


				var hasChild = result.child.length;


				if ( !hasChild ){
					done( null, skillsToDelete );
				}


				children = result.child;

				children.forEach( function( value, index ) {

					// code
					//console.log( " in child" + value );
					skillsToDelete.push( value );

					traverse( value, function( err, result ) {

						//console.log( "result" + result + "dini" );
						skillsToDelete = addToSet( skillsToDelete, result );
						//console.log( skillsToDelete );
						done( null, skillsToDelete );


					} );

				} );

			} );



		};

		//add only unique values
		var addToSet = function( toArray, fromArray ) {
			fromArray.forEach( function( value, index ) {
				// code
				if ( toArray.indexOf( value ) === -1 ){
					toArray.push( value );
				}
			} );

			return toArray;
		};

		async.waterfall( [

			function( callback ) {
				traverse( request.params.id, function( id, result ) {
					callback( null, result, request.params.id );

				} );


			},
			//delete from db children using ids :D
			function( result, id, callback ) {
				//result.push(request.params.id);
				//console.log( "RIGHT: ", result );
				async.eachSeries( result, function( value, cb ) {
					// Code
					Skill.findByIdAndRemove( value, function( err, result ) {
						if ( err !== null ) {
							callback( {
								'message': 'Error on delete subtree.'
							} );
						}
					} );
					//console.log("delete "+value);
					cb();


				}, function() {
					callback( null, id );
				} );

			},
			//delete the skill
			function( id, callback ) {
				//console.log("delete the skill: "+id)

				Skill.findByIdAndRemove( id, function( err, result ) {
					if ( err !== null ){
						callback( {
							'message': 'error on deleting skill.'
						} );
					}
					if ( result !== null ) {
						callback( null, id );
					}
					callback( null, null );
				} );
			},

			//update parent
			function( id, callback ) {
				//console.log(id);
				if ( id === null ) {
					callback( null, {
						'message': 'its the root.'
					} );
				}
				var update = {
					'$pull': {
						'child': id
					}
				};
				//console.log( update );

				Skill.findOneAndUpdate( {
					child: id
				}, update, function( err, skill ) {
					if ( err !== null ) {
						callback( {
							'message': 'Error in updating skill\'s parent' + err
						} );

					}
					callback( null, skill );

				} );
			}

		], function( err, result ) {
			if ( err !== null ) {
				var errorMessage = err;
				//console.log( errorMessage );

				response.send( 400, {
					'message': errorMessage
				} );
			}
			//console.log( "DAPAT: ", result );

			response.send( 200, result );
		} );


	} );


	controller.post( '/addSkill', function( request, response, next ) {
		//console.log(request);
		async.waterfall( [
				//find parents id
				function( callback ) {
					Skill.findOne( {
						name: request.body.parent
					}, function( err, parentSkill ) {
						//console.log( "findOne" + parentSkill );
						if ( err !== null ) {
							callback( {
								'message': 'Skill not found'
							} );

						}
						if ( parentSkill === null ) {
							callback( null, {
								_id: null
							} );
						}
						else{
							callback( null, parentSkill );
						}

					} );

				},
				//save the skill
				function( parentSkill, callback ) {
					//console.log(parentSkill);
					var newSkill = new Skill( {
						name: request.body.name,
						description: request.body.description,
						parent: parentSkill._id,
						child: [],
						exam: null,
						version: 0,
						openStatus: 0
					} );


					newSkill.save( function( err, newSkill ) {
						//console.log(parentSkill);
						//console.log( "save" + err );
						if ( err !== null ) {
							callback( {
								'message': 'Error on saving skill'
							} );
						}

						callback( null, newSkill, parentSkill );

					} );
				},
				//update parent

				function( newSkill, parentSkill, callback ) {
					//console.log( "help"+parentSkill._id );
					if ( parentSkill._id !== null ) {
						var update = {
							'$push': {
								'child': newSkill._id
							}
						};

						Skill.findByIdAndUpdate( parentSkill._id, update, function( err ) {
							if ( !err ) {
								callback( null, newSkill );
							}
							callback( {
								'message': 'Error in updating skill\'s parent'
							} );
						} );
					}
					callback( null, newSkill );
				}

			], //send the response callback

			function( err, skill ) {
				if ( err !== null ) {
					var errorMessage = err.message;
					//console.log(errorMessage);
					//console.log( "Final response: (error: " + err.message + ") (skill: " + skill + ")" );

					response.send( 403, {
						'message': errorMessage
					} );
				}
				//console.log( "Final response: (error: none  ) (skill: " + skill + ")" );

				response.send( 201, skill );

			} );



		//next();
	} );
	return controller;
};