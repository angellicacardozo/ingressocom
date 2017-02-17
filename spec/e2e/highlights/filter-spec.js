/**
** filter-spec.js
**
** @describe This is an E2E test specification for the module Autenticacao with tests cases 
**           wich reflects uses interaction and spectation.
**           Usage recommendation: This class is meant to be a guide for FE code reviews in first place.
**			 If a team developer is not able to understand the story implementation by its tests,
**			 so it cannot be understood at all. Cause of tests are the reflection of a developer 
**			 interpretation of the problem. Code implemented must be testable and readable by 
**			 anyone who undestands the basic of its domain.
**
**			 Protractor adapts Jasmine so that each spec automatically waits until the control flow 
**			 is empty before exiting.
**
**/
describe('Filter screen Test Suite', function() {
	/**
	** Perform Act and Assertion principle
	**/

	describe('When filtering', function() {
		beforeAll(function() {
			browser.get('http://localhost:8888/#/');
			browser.waitForAngular();
		});

		describe('and attempts to filter using empty query', function() {
			beforeAll(function() {
				///
			});
			it('should list all highlights', function() {
				///
			});
		});
	});
});