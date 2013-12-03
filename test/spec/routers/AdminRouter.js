(function() {
	'use strict';

	var root = this;

	root.define([
		'routers/AdminRouter'
		],
		function( Adminrouter ) {

			describe('Adminrouter Router', function () {

				it('should be an instance of Adminrouter Router', function () {
					var AdminRouter = new Adminrouter();
					expect( AdminRouter ).to.be.an.instanceof( Adminrouter );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );