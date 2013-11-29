(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/AdminUserView'
		],
		function( Adminuserview ) {

			describe('Adminuserview Itemview', function () {

				it('should be an instance of Adminuserview Itemview', function () {
					var AdminUserView = new Adminuserview();
					expect( AdminUserView ).to.be.an.instanceof( Adminuserview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );