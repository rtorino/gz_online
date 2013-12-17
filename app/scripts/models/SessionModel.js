define( function( require ) {
	'use strict';

	/*
		Implementation of this module is copied from platform
		with a little variation.
	*/

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Cookie     = require( 'jquery-cookie' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var reqres     = require( 'RequestResponse' );
	var Vent       = require( 'Vent' );

	var Session = Backbone.Model.extend( {

		'idAttribute' : '_id',

		// currently only read and update are possible
		'methodToURL' : {
			'create' : '/users/login',
			'update' : '/users/5048d2e5fbdac48208000034'
		},

		// create and stores the authorization token in the `$.ajaxSettings`
		'_setupAjaxHeaders' : function ( token ) {
			$.ajaxSetup( { 'headers' : { 'Authorization' : token } } );
		},

		// set values as cookies in the `/` path
		'_setCookie' : function ( obj ) {
			// necessary for consistency across session cookies
			var options = {
				'path' : '/'
			};
			_.each( obj, function ( value, key, list ) {
				$.cookie( key, value, options );
			} );
		},

		'initialize': function() {
			// This will respond a boolean (true/false) if a module
			// fires a request( 'sessionAuthenticated' )
			reqres.setHandler( 'sessionAuthenticated', this.isAuthenticated );

			// Unbind to global RequestResponse
			this.listenTo( this, 'destroy', this.unbindHandlers );
		},

		'isAuthenticated': function() {
			return Boolean( this.get( 'accessToken' ) );
		},

		'unbindHandlers': function() {
			reqres.removeHandler( 'sessionAuthenticated' );
		},

		'validate': function( options ) {
			var model = this;

			if ( this.csrfToken && ( options.username || options.email ) && options.password ) {

				var done = options.success;
				options.parse = options.parse !== void 0;

				this.set( 'username', options.username || '' );
				this.set( 'email', options.email );
				this.set( 'password', options.password );

				delete options.username;
				delete options.password;

				options.beforeSend = function( xhr ) {
					xhr.setRequestHeader( 'X-CSRF-Token',  model.csrfToken );
				};

				options.success = function( resp ) {
					if ( !model.set( model.parse( resp, options ), options ) ) {
						return false;
					}

					if ( done ) {
						done( model, resp, options );
					}

					Vent.trigger( 'Session:save', model );

					// session persistence accessToken
					model.persistSession( model.get( 'accessToken' ) );
				};

				return this.sync( 'create', this, options );
			} else {
				this.trigger( 'error', { 'message' : 'No credentials provided' } );
			}
		},

		// override to use alternate URLs per method
		'sync': function( method, model, options ) {
			options = options || {};
			options.url = model.methodToURL[ method.toLowerCase() ];

			return Backbone.sync.apply( this, arguments );
		},

		// override to inject accessToken from options into the response
		'parse' : function ( resp, options ) {
			resp.accessToken = options.accessToken;
			return resp;
		},

		'token': function( options ) {
			var self = this;

			options = options || {};

			$.get( '/users/token' )
				.done( options.success )
				.fail( options.fail )
				.always( function ( response ) {
					self.csrfToken = response.token;
				} );
		},

		// set the headers and cookie
		'persistSession' : function ( token ) {
			this._setupAjaxHeaders( token );
			this._setCookie( { 'accessToken' : token } );
		}
	} );

	return new Session();
} );