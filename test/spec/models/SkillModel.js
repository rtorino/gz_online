(function() {
	'use strict';

	var root = this;

	root.define([
		'models/SkillModel'
		],
		function( Skillmodel ) {

			describe('Skillmodel Model', function () {

				it('should be an instance of Skillmodel Model', function () {
					var SkillModel = new Skillmodel();
					expect( SkillModel ).to.be.an.instanceof( Skillmodel );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );