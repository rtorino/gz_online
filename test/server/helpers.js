var exec = require( 'child_process' ).exec;
var path = require( 'path' );
var fs = require( 'fs' );
var config = require( '../../server/config' ).configs;

function loadJSON( model ) {

}

exports.mongoExport = function() {

}

exports.baseUrl = 'http://' + config.host + ':' + config.port + '/';