(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/NavLayout'
		],
		function( Navlayout ) {

			describe('Navlayout Layout', function () {

				it('should be an instance of Navlayout Layout', function () {
					var NavLayout = new Navlayout();
					expect( NavLayout ).to.be.an.instanceof( Navlayout );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );