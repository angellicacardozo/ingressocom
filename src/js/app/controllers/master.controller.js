/**
** master.controller.js
**
** @description Master Controller Class
**/
(function() {
"use strict";

angular
    .module("app")
    .controller('MasterController', ['$rootScope','$scope', '$cookieStore', '$state', MasterController]);

    function MasterController($rootScope, $scope, $cookieStore, $state) {
        /**
         * Sidebar Toggle & Cookie Control
         */
        var mobileView = 992;

        $scope.hasUserProfileLoaded = true;
        $scope.bodylayout = 'dashboard';

        $scope.getWidth = function() {
            return window.innerWidth;
        };

        $scope.$watch($scope.getWidth, function(newValue, oldValue) {

            if (newValue >= mobileView) {
                if (angular.isDefined($cookieStore.get('toggle'))) {
                    $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
                } else {
                    $scope.toggle = true;
                }
            } else {
                $scope.toggle = false;
            }

        });

        $scope.toggleSidebar = function() {
            $scope.toggle = !$scope.toggle;
            $cookieStore.put('toggle', $scope.toggle);
        };

        window.onresize = function() {
            $scope.$apply();
        };
    }

})();