angular.module('parameters.module', ['myApp.region', 'parameters.chart'])
    .constant('parametersRoot', '/directives/parameters/')
    .directive('cityInfrastructure', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                districtStats: '=',
                currentDistrict: '='
            },
            templateUrl: parametersRoot + 'CityInfrastructure.Tpl.html',
            link: function(scope, element, attrs) {
                scope.showDistrictDetails = function (district) {
                    scope.currentDistrict = district;
                };
                scope.$watch('districtStats', function (stats) {
                    if (stats === undefined) return;
                    scope.showDistrictDetails(stats[0].district);
                });
            }
        };
    });