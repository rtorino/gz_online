(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/SkillsCollection'
		],
		function( Skillscollection ) {

			describe('Skillscollection Collection', function () {

				it('should be an instance of Skillscollection Collection', function () {
					var SkillsCollection = new Skillscollection();
					expect( SkillsCollection ).to.be.an.instanceof( Skillscollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );