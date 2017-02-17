/** app.constants.js
**
** @description Application contants module configuration
**/
(function() {
    "use strict";
    angular
        .module('app.constants',[])
        .constant('version', 'v1.0.1')
        .constant('apiUrl', '@@apiUrl');
})();