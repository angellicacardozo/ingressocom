/** app.module.js
**
** @description Application main module configuration
**/
(function() {
    "use strict";
    angular
        .module('app',[
        	'app.constants'
            ,'ui.bootstrap'
            ,'ui.router'
            ,'ngCookies'
            ,'ngAnimate'
            ,'app.highlights'
    	]);
})();