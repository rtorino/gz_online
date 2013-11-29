( function () {
	'use strict';

	var root = this;

	root.define( function ( require ) {

		var AdminLayout = require( 'views/layout/adminLayout' );

		describe( 'AdminLayout Layout', function() {

			it( 'should be an instance of AdminLayout Layout', function() {
				var AdminLayout = new Adminlayout();
				expect( AdminLayout ).to.be.an.instanceof( AdminLayout );
			} );

			it( 'should have more test written', function() {
				expect( false ).to.be.ok;
			} );
		} );

	} );

} ).call( this );