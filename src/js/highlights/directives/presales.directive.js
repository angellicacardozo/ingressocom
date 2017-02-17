/**
** presales.directive.js
**
** @description Presales Widget Main directive
** Bindings
**      = is two-way binding
**      @ simply reads the value (one-way binding)
**      & is used to bind functions
**/
(function(){
'use strict';

angular
    .module('app.highlights')
    .directive('presalesWidget', presalesWidgetDirective);

    function presalesWidgetDirective() {

        var directive = {
            transclude: true
            ,templateUrl: 'templates/highlights/directives/presales.html'
            ,restrict: 'EA'
            ,controller: ['$scope', _controller]
            ,scope: {
                items: '='
            }
        };

        //

        function _controller($scope) {

            $scope.search = {
                event: {
                    inPreSale: true
                }
            };
            $scope.myInterval = 3000;
            $scope.slides = [];

            ///
            $scope.filterPresales = _filterPresales;
            ///

            $scope.$watch("items" , function(){
               _buildSlides($scope.items);
            });

            function _buildSlides(data) {
                var i;
                $scope.slides=[];
                for(i=0;i<data.length;i++) {
                    $scope.slides.push({
                        id: i
                        ,title: data[i].event.title
                        ,image: data[i].event.images[1].url
                        ,text: data[i].event.synopsis
                        ,inPreSale: data[i].event.inPreSale
                    });
                }
            }

            function _filterPresales(data) {
                return data.inPreSale;
            }
        }

        return directive;
    }

})();