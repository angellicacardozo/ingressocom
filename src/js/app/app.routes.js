/** app.routes.js
**
** @description Application routes configuration
**/
(function() {
    "use strict";
    
    angular
        .module('app')
        .config(['$stateProvider', '$urlRouterProvider', _config]);

    function _config($stateProvider, $urlRouterProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
    }

})();