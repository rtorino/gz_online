require.config( {

	baseUrl: '/scripts',

	/* starting point for application */
	deps: [ 'backbone', 'marionette', 'bootstrap', 'main' ],


	shim: {
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},

		bootstrap: {
			deps: [ 'jquery' ],
			exports: 'jquery'
		},

		hmac: {
			deps: [ 'crypto' ],
			exports: 'hmac'
		},
		sha256: {
			deps: [ 'hmac' ],
			exports: 'sha256'
		},
		crypto: {
			exports: 'Crypto'
		},
		bootbox: {
			deps: [ 'jquery', 'bootstrap' ],
			exports: 'bootbox'
		}
	},

	paths: {

		'jquery'              : '../bower_components/jquery/jquery',
		'backbone'            : '../bower_components/backbone-amd/backbone',
		'underscore'          : '../bower_components/underscore-amd/underscore',
		'backbone.validation' : '../bower_components/backbone-validation/dist/backbone-validation-amd',
		'async'               : '../bower_components/async/lib/async',
		'spinjs'              : '../bower_components/spinjs/spin',
		'jquery-cookie'       : '../bower_components/jquery-cookie/jquery.cookie',
		'bootbox'             : '../bower_components/bootbox/bootbox',
		'sinon'               : '../bower_components/sinon/lib/sinon',
		'sinon.chai'          : '../bower_components/sinon/lib/sinon-chai',
		'marionette'          : '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
		'backbone.wreqr'      : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
		'backbone.babysitter' : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
		'base64'              : '../bower_components/base64',
		'bootstrap'           : '../bower_components/bootstrap/dist/js/bootstrap',
		'text'                : '../bower_components/requirejs-text/text',
		'tmpl'                : '../templates',

		'models'              : 'models',
		'collections'         : 'collections',
		'views'               : 'views',
		'controllers'         : 'controllers',
		'routers'             : 'routers'
	}
} );
