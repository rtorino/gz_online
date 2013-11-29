'use strict';

var path    = require( 'path' );
var config  = require( '../../server/config' ).configs;

exports.controller_path = path.resolve(__dirname, '../../server/controllers');
exports.schema_path     = path.resolve(__dirname, '../../server/schemas');

exports.baseUrl = 'http://' + config.host + ':' + config.port + '/';