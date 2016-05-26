angular.module('parameters.module', ['myApp.region', 'parameters.chart'])
    .constant('parametersRoot', '/directives/parameters/')
    .directive('cityInfrastructure', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                districtStats: '=',
                currentDistrict: '='
            },
            templateUrl: parametersRoot + 'CityInfrastructure.Tpl.html',
            link: function(scope, element, attrs) {
                scope.showDistrictDetails = function(district) {
                    scope.currentDistrict = district;
                };
                scope.$watch('districtStats', function(stats) {
                    if (stats === undefined) return;
                    scope.showDistrictDetails(stats[0].district);
                });
            }
        };
    })
    .directive('districtInfrastructure', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                townStats: '=',
                rootPath: '=',
                city: '=',
                currentDistrict: '='
            },
            templateUrl: parametersRoot + 'DistrictInfrastructure.Tpl.html'
        }
    })
    .directive('alarmTable', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                alarms: '='
            },
            templateUrl: parametersRoot + 'kpi/AlarmTable.html'
        }
    })
    .directive('eNodebDetailsTable', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                eNodebDetails: '='
            },
            templateUrl: parametersRoot + 'eNodeb/ENodebDetailsTable.html'
        }
    })
    .directive('lteCellTable', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                cellList: '='
            },
            templateUrl: parametersRoot + 'eNodeb/LteCellTable.html'
        }
    })
    .directive('eNodebIntraFreq', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                intraFreqHo: '='
            },
            templateUrl: parametersRoot + 'eNodeb/ENodebIntraFreq.html'
        }
    })
    .directive('eNodebInterFreq', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'eNodeb/ENodebInterFreq.html'
        }
    })
    .directive('cellDetails', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                lteCellDetails: '=',
                cellMongo: '='
            },
            templateUrl: parametersRoot + 'cell/CellDetails.html'
        }
    });