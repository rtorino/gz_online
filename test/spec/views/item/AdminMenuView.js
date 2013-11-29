(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/AdminMenuView'
		],
		function( Adminmenuview ) {

			describe('Adminmenuview Itemview', function () {

				it('should be an instance of Adminmenuview Itemview', function () {
					var AdminMenuView = new Adminmenuview();
					expect( AdminMenuView ).to.be.an.instanceof( Adminmenuview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );