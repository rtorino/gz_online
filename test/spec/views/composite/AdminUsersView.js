(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/AdminUsersView'
		],
		function( Adminusersview ) {

			describe('Adminusersview Compositeview', function () {

				it('should be an instance of Adminusersview Compositeview', function () {
					var AdminUsersView = new Adminusersview();
					expect( AdminUsersView ).to.be.an.instanceof( Adminusersview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );