(function() {
	'use strict';

	var root = this;

	root.define([
		'controllers/AdminController'
		],
		function( Admincontroller ) {

			describe('Admincontroller Controller', function () {

				it('should be an instance of Admincontroller Controller', function () {
					var AdminController = new Admincontroller();
					expect( AdminController ).to.be.an.instanceof( Admincontroller );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );