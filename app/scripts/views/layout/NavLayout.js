define([
	'backbone',
	'hbs!tmpl/layout/NavLayout_tmpl'
],
function( Backbone, NavlayoutTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a Navlayout Layout");
		},

	template: NavlayoutTmpl,


	/* Layout sub regions */
	regions: {},

	/* ui selector cache */
	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
