'use strict';

var mongoose  = require( 'mongoose' );
var express   = require( 'express' );
var baucis    = require( 'baucis' );
var path      = require( 'path' );
var config    = require( '../../server/config' ).configs;
var mongoURL  = require( '../../server/config' ).mongoURL;
var helpers   = require( './helpers' );

var fixture = module.exports = {
	init: function( module, fn ) {
		try {
			var request = require( 'supertest' );

			mongoose.connect( mongoURL( config.mongodb ) );

			require( path.resolve( helpers.controller_path, module + 'Controller' ) )( baucis );
			
			var app = express();
			app.use( config.rest, baucis() );

			request = request.agent( app );
			
		} catch ( error ) {
			fn( error );
		}

		fn( null, request );
	},

	deinit: function( module, fn ) {
		mongoose.disconnect();

		// Todo:
		// find a way to remove/drop a module collection

		fn();
	}
}