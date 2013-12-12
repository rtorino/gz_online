(function() {
	'use strict';

	var root = this;

	root.define([
		'views/collection/SystemSkillsTreeRootView'
		],
		function( Systemskillstreerootview ) {

			describe('Systemskillstreerootview Collectionview', function () {

				it('should be an instance of Systemskillstreerootview Collectionview', function () {
					var SystemSkillsTreeRootView = new Systemskillstreerootview();
					expect( SystemSkillsTreeRootView ).to.be.an.instanceof( Systemskillstreerootview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );