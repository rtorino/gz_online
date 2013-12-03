(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/UsersCollection'
		],
		function( Userscollection ) {

			describe('Userscollection Collection', function () {

				it('should be an instance of Userscollection Collection', function () {
					var UsersCollection = new Userscollection();
					expect( UsersCollection ).to.be.an.instanceof( Userscollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );