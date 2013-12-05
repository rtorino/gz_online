require.config( {

	baseUrl: "/scripts",

	/* starting point for application */
	deps: ['backbone', 'marionette', 'bootstrap', 'main'],


	shim: {
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		bootstrap: {
			deps: ['jquery'],
			exports: 'jquery'
		}
	},

	paths: {
		'jquery'                  : '../bower_components/jquery/jquery',
		'backbone'                : '../bower_components/backbone-amd/backbone',
		'underscore'              : '../bower_components/underscore-amd/underscore',
		'backbone.validation'     : '../bower_components/backbone-validation/dist/backbone-validation-amd',

		/* alias all marionette libs */
		'marionette'              : '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
		'backbone.wreqr'          : '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
		'backbone.babysitter'     : '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

		/* alias the bootstrap js lib */
		'bootstrap'               : 'vendor/bootstrap',

		/* Alias text.js for template loading and shortcut the templates dir to tmpl */
		'text'                    : '../bower_components/requirejs-text/text',
		'tmpl'                    : '../templates',

		'models'                  : 'models',
		'collections'             : 'collections',
		'views'                   : 'views',
		'controllers'             : 'controllers'
	}
} );
