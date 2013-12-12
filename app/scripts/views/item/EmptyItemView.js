define( function ( require  ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!tmpl/item/emptyItemView.html' );

	/* Return a ItemView class definition */
	return Marionette.ItemView.extend({

		template: template,

	});

});
