'use strict';

exports.configs = {
	'port'    : 9000,
	'host'    : '127.0.0.1',
	'rest'    : '/',
	'salt'    : 'd631f66da93c5ff735d5604f0ffc313ff3817a2cf63c4e7b1d003f5675b87698',
	'mongodb' : {
		'hostname' : 'localhost',
		'port'     : 27017,
		'db'       : 'gz'
	}
};

// Helper function for generating mongodb configs
exports.mongoURL = function( obj ) {
	obj.hostname = ( obj.hostname || 'localhost' );
	obj.port = ( obj.port || 'port' );
	obj.db = ( obj.db || 'sample_development' );
	if ( obj.username && obj.password ) {
		return 'mongodb://' + obj.username + ':' + obj.password + '@' + obj.hostname + ':' + obj.port + '/' + obj.db;
	} else {
		return 'mongodb://' + obj.hostname + ':' + obj.port + '/' + obj.db;
	}
};