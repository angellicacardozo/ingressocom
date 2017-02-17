/**
** master.controller.js
**
** @description Master Controller Class
**/
(function() {
"use strict";

angular
    .module("app.highlights")
    .controller('HighlightsController', ['$rootScope','$scope', 'HighlightsService', _HighlightsController])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('index', {
                url: '/'
                ,templateUrl: 'templates/highlights/index.html'
                ,controller: 'HighlightsController'
                ,controllerAs: 'vmHighlights'
                ,data: {
                    bodyClasses: 'page-home'
                }
            });
    }]);

    function _HighlightsController($rootScope, $scope, HighlightsService) {

        var vmHighlights = this;

        vmHighlights.items  = [];
        vmHighlights.form   = {
            cinema : ''
            ,genero: ''
            ,cidade: 2
        };

        ////

        vmHighlights.filtrar = _filtrar;

        ////

        HighlightsService
            .queryAll(vmHighlights.form.cidade
                ,vmHighlights.form.genero
                ,vmHighlights.form.cinema)
            .then(function(data) {
                vmHighlights.items = angular.copy(data);
            }, function() {
                // fail
            });

        function _filtrar() {
            ///
            HighlightsService
                .queryAll(vmHighlights.form.cidade
                    ,vmHighlights.form.genero
                    ,vmHighlights.form.cinema)
                .then(function(data) {
                    vmHighlights.items = angular.copy(data);
                }, function() {
                    // fail
                });
        }
    }

})();