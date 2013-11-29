(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/AdminLayout'
		],
		function( Adminlayout ) {

			describe('Adminlayout Layout', function () {

				it('should be an instance of Adminlayout Layout', function () {
					var AdminLayout = new Adminlayout();
					expect( AdminLayout ).to.be.an.instanceof( Adminlayout );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );