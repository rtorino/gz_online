(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/AdminNavView'
		],
		function( Adminnavview ) {

			describe('Adminnavview Layout', function () {

				it('should be an instance of Adminnavview Layout', function () {
					var AdminNavView = new Adminnavview();
					expect( AdminNavView ).to.be.an.instanceof( Adminnavview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );