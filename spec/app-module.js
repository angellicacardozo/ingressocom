angular.module('app');

describe('appModule', function() {

	beforeEach(function() {
		module('app'); // Here, we are initializing the module
	});

	/**
	** Testing if the main app has a version
	** @note: Inject is used for resolving references.
	**/
	it('should provide a version', inject(function(version) {
		expect(version).toEqual('v1.0.1');
	}));

});