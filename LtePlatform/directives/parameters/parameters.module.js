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
    .directive('flowTable', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                flowList: '='
            },
            templateUrl: parametersRoot + 'kpi/FlowTable.html'
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
    .directive('cdmaCellTable', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                cdmaCellList: '='
            },
            templateUrl: parametersRoot + 'cdma/CellTable.html'
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
    })
    .directive('lteCellBasicInfo', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                neighbor: '='
            },
            templateUrl: parametersRoot + 'cell/BasicInfo.html'
        }
    })
    .directive('cellIntraFreq', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                intraFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/CellIntraFreq.html'
        }
    })
    .directive('a1InterFreq', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A1InterFreq.html'
        }
    })
    .directive('a2InterFreq', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A2InterFreq.html'
        }
    })
    .directive('a3InterFreq', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A3InterFreq.html'
        }
    })
    .directive('a4InterFreq', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A4InterFreq.html'
        }
    })
    .directive('a5InterFreq', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A5InterFreq.html'
        }
    })
    .directive('cellInterFreq', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/CellInterFreq.html'
        }
    })
    .directive('cellChannelPower', function (parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                cellPower: '='
            },
            templateUrl: parametersRoot + 'cell/Power.html'
        }
    });