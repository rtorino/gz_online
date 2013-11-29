var mongoose = require( 'mongoose' );
var express = require( 'express' );
var baucis = require( 'baucis' );
var config = require( '../../server/config' ).configs;
var mongoURL = require( '../../server/config' ).mongoURL;

var app;
var server;
var controller;

var fixture = module.exports = {
	init: function( module, fn ) {
		var Schema = mongoose.Schema;

		mongoose.connect( mongoURL( config.mongodb ) );

		var UserSchema = new Schema( {
			email: String,
			username: String,
			password: String, //hash?
			fName: String,
			lName: String,
			// skills: [ Skill.schema ],
			type: String,
			verified: Number
		} );

		// var Stores = new Schema( {
		// 	name: {
		// 		type: String,
		// 		required: true,
		// 		unique: true
		// 	},
		// 	mercoledi: Boolean
		// } );

		// var Tools = new Schema( {
		// 	name: {
		// 		type: String,
		// 		required: true
		// 	}
		// } );

		// var Cheese = new Schema( {
		// 	name: {
		// 		type: String,
		// 		required: true,
		// 		unique: true
		// 	},
		// 	color: {
		// 		type: String,
		// 		required: true,
		// 		select: false
		// 	},
		// 	molds: [ String ],
		// 	arbitrary: [ {
		// 		goat: Boolean,
		// 		champagne: String,
		// 		llama: [ Number ]
		// 	} ]
		// } );

		// var Beans = new Schema( {
		// 	koji: Boolean
		// } );

		// if ( !mongoose.models[ 'tool' ] ) mongoose.model( 'tool', Tools );
		// if ( !mongoose.models[ 'store' ] ) mongoose.model( 'store', Stores );
		// if ( !mongoose.models[ 'cheese' ] ) mongoose.model( 'cheese', Cheese );
		// if ( !mongoose.models[ 'bean' ] ) mongoose.model( 'bean', Beans );

		mongoose.model( 'user', UserSchema );

		// // Tools embedded controller
		// subcontroller = baucis.rest( {
		// 	singular: 'tool',
		// 	basePath: '/:storeId/tools',
		// 	publish: false
		// } );

		// subcontroller.initialize();

		// // Stores controller
		// controller = baucis.rest( {
		// 	singular: 'store',
		// 	findBy: 'name',
		// 	select: '-mercoledi'
		// } );

		// controller.use( '/binfo', function( request, response, next ) {
		// 	response.json( 'Poncho!' );
		// } );

		// controller.use( function( request, response, next ) {
		// 	response.set( 'X-Poncho', 'Poncho!' );
		// 	next();
		// } );

		// controller.get( '/info', function( request, response, next ) {
		// 	response.json( 'OK!' );
		// } );

		// controller.get( '/:id/arbitrary', function( request, response, next ) {
		// 	response.json( request.params.id );
		// } );

		// controller.use( subcontroller );

		// cheesy = baucis.rest( {
		// 	singular: 'cheese',
		// 	select: '-_id +color name',
		// 	findBy: 'name',
		// 	'allow $push': 'molds arbitrary arbitrary.$.llama',
		// 	'allow $set': 'molds arbitrary.$.champagne',
		// 	'allow $pull': 'molds arbitrary.$.llama'
		// } );

		// baucis.rest( {
		// 	singular: 'bean',
		// 	get: false
		// } );

		baucis.rest( {
			singular: 'user'
		} );

		app = express();
		app.use( '/api/v1', baucis() );

		// server = app.listen( 8012 );
		fn(app);

		// done();
	}
}