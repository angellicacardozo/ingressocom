/**
** highlights.directive.js
**
** @description Highlights Widget Main directive
**/
(function(){
'use strict';

angular
    .module('app.highlights')
    .directive('highlightsWidget', highlightsWidgetDirective);

    function highlightsWidgetDirective() {

        var directive = {
            transclude: true
            ,templateUrl: 'templates/highlights/directives/hightlights.html'
            ,restrict: 'EA'
            ,controller: ['$scope', _controller]
            ,scope: {
                items: '='
            }
        };

        //

        function _controller($scope) {

            $scope.myInterval = 3000;
            $scope.rows = [];

            ///
            $scope.filterNotPresales = _filterNotPresales;
            ///

            $scope.$watch("items" , function(){
               _buildRows($scope.items);
            });

            function _buildRows(data) {
                var i;
                $scope.rows = [];
                for(i=0;i<data.length;i++) {
                    $scope.rows.push({
                        id: i
                        ,image: data[i].event.images[0].url
                        ,title: data[i].event.title
                        ,image: data[i].event.images[1].url
                        ,synopsis: data[i].event.synopsis
                        ,inPreSale: data[i].event.inPreSale
                    });
                }
            }

            function _filterNotPresales(data) {
                return !data.inPreSale;
            }
        }

        return directive;
    }

})();