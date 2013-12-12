(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/SystemSkillTreeView'
		],
		function( Systemskilltreeview ) {

			describe('Systemskilltreeview Compositeview', function () {

				it('should be an instance of Systemskilltreeview Compositeview', function () {
					var SystemSkillTreeView = new Systemskilltreeview();
					expect( SystemSkillTreeView ).to.be.an.instanceof( Systemskilltreeview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );