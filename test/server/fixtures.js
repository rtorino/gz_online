var mongoose = require( 'mongoose' );
var express = require( 'express' );
var baucis = require( 'baucis' );
var path = require( 'path' );
var config = require( '../../server/config' ).configs;
var mongoURL = require( '../../server/config' ).mongoURL;
var helpers = require( './helpers' );

var app;

var fixture = module.exports = {
	init: function( module, fn ) {
		mongoose.connect( mongoURL( config.mongodb ) );

		require( path.resolve( helpers.controller_path, module ) )( baucis );

		app = express();
		app.use( config.rest, baucis() );

		fn( app );
	}
}