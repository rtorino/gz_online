(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/EmptyItemView'
		],
		function( Emptyitemview ) {

			describe('Emptyitemview Itemview', function () {

				it('should be an instance of Emptyitemview Itemview', function () {
					var EmptyItemView = new Emptyitemview();
					expect( EmptyItemView ).to.be.an.instanceof( Emptyitemview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );