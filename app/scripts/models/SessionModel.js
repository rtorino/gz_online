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
	var Base64     = require( 'base64' );
	var Reqres     = require( 'RequestResponse' );
	var Vent       = require( 'Vent' );

	var Session = Backbone.Model.extend( {

		'idAttribute' : '_id',

		'methodToURL' : {
			'read'   : '/users/login',
			'create' : '/users/signup'
		},

		// create and stores the authentication token generated in the server in `$.ajaxSettings`
		'_setupAjaxHeaders' : function ( token ) {
			$.ajaxSetup( { 'headers' : { 'Authentication' : token } } );
		},

		// creates and returns Base64 encoded hash
		'_createBase64Hash' : function ( user, password ) {
			return Base64.encode( user + ':' + password );
		},

		'_createBasicAuthHeader': function( authBasicToken ) {
			if ( authBasicToken ) {
				return 'Basic ' + authBasicToken;
			} else {
				return '';
			}
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
			Reqres.setHandler( 'sessionAuthenticated', this.isAuthenticated, this );

			// Unbind to global RequestResponse
			this.listenTo( this, 'destroy', this.unbindHandlers );
		},

		'isAuthenticated': function() {
			return Boolean( this.get( 'accessToken' ) );
		},

		'unbindHandlers': function() {
			Reqres.removeHandler( 'sessionAuthenticated' );
		},

		'fetch': function( options ) {
			var model = this;

			if ( this.get( 'csrfToken' ) && ( options.username || options.email ) && options.password ) {

				var done = options.success;
				options.parse = options.parse !== void 0;
				options.authBasicToken = options.authBasic || this._createBase64Hash( options.email, options.password );

				delete options.username;
				delete options.password;

				options.beforeSend = function( xhr ) {
					xhr.setRequestHeader( 'X-CSRF-Token',  model.get( 'csrfToken' ) );
					xhr.setRequestHeader( 'Authorization', model._createBasicAuthHeader( options.authBasicToken ) );
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

				if ( options.signup ) {
					this.sync( 'create', this, options );
				} else {
					this.sync( 'read', this, options );
				}
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

		'parse' : function ( resp, options ) {
			return resp;
		},

		'token': function( options ) {
			var self = this;

			options = options || {};

			$.get( '/users/token' )
				.done( options.success )
				.fail( options.fail )
				.always( function ( response ) {
					self.set( 'csrfToken', response._csrf );
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