angular.module('parameters.module', ['parameters.infrastructure', 'parameters.list', 'parameters.handoff', 'parameters.power'])
    .constant('parametersRoot', '/directives/parameters/');

angular.module('parameters.infrastructure', [])
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
    });

angular.module('parameters.list', ['myApp.parameters', 'huawei.mongo.parameters'])
    .directive('alarmTable', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                alarms: '='
            },
            templateUrl: parametersRoot + 'kpi/AlarmTable.html'
        }
    })
    .directive('flowTable', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                flowList: '='
            },
            templateUrl: parametersRoot + 'kpi/FlowTable.html'
        }
    })
    .directive('eNodebDetailsTable', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                eNodebDetails: '='
            },
            templateUrl: parametersRoot + 'eNodeb/ENodebDetailsTable.html'
        }
    })
    .directive('lteCellTable', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                cellList: '='
            },
            templateUrl: parametersRoot + 'eNodeb/LteCellTable.html'
        }
    })
    .directive('cdmaCellTable', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                cdmaCellList: '='
            },
            templateUrl: parametersRoot + 'cdma/CellTable.html'
        }
    })

    .controller('CellDetailsController', function ($scope, networkElementService, cellHuaweiMongoService) {
        networkElementService.queryCellInfo($scope.eNodebId, $scope.sectorId).then(function (result) {
            $scope.lteCellDetails = result;
        });
        cellHuaweiMongoService.queryCellParameters($scope.eNodebId, $scope.sectorId).then(function (info) {
            $scope.cellMongo = info;
        });
    })
    .directive('cellDetails', function(parametersRoot) {
        return {
            controller: 'CellDetailsController',
            restrict: 'EA',
            replace: true,
            scope: {
                eNodebId: '=',
                sectorId: '='
            },
            templateUrl: parametersRoot + 'cell/CellDetails.html'
        }
    })
    .directive('lteCellBasicInfo', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                neighbor: '='
            },
            templateUrl: parametersRoot + 'cell/BasicInfo.html'
        }
    });

angular.module('parameters.handoff', ['handoff.parameters'])
    .directive('eNodebIntraFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                intraFreqHo: '='
            },
            templateUrl: parametersRoot + 'eNodeb/ENodebIntraFreq.html'
        }
    })
    .directive('eNodebInterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'eNodeb/ENodebInterFreq.html'
        }
    })
    .controller('CellIntraFreqController', function($scope, intraFreqHoService) {
        intraFreqHoService.queryCellParameters($scope.eNodebId, $scope.sectorId).then(function(result) {
            $scope.intraFreqHo = result;
        });
    })
    .directive('cellIntraFreq', function(parametersRoot) {
        return {
            restrict: 'EA',
            controller: 'CellIntraFreqController',
            replace: true,
            scope: {
                eNodebId: '=',
                sectorId: '='
            },
            templateUrl: parametersRoot + 'cell/CellIntraFreq.html'
        }
    })
    .directive('a1InterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A1InterFreq.html'
        }
    })
    .directive('a2InterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A2InterFreq.html'
        }
    })
    .directive('a3InterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A3InterFreq.html'
        }
    })
    .directive('a4InterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A4InterFreq.html'
        }
    })
    .directive('a5InterFreq', function(parametersRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interFreqHo: '='
            },
            templateUrl: parametersRoot + 'cell/A5InterFreq.html'
        }
    })
    .controller('CellInterFreqController', function($scope, interFreqHoService) {
        interFreqHoService.queryCellParameters($scope.eNodebId, $scope.sectorId).then(function(result) {
            $scope.interFreqHo = result;
        });
    })
    .directive('cellInterFreq', function(parametersRoot) {
        return {
            restrict: 'EA',
            controller: 'CellInterFreqController',
            replace: true,
            scope: {
                eNodebId: '=',
                sectorId: '='
            },
            templateUrl: parametersRoot + 'cell/CellInterFreq.html'
        }
    });

angular.module('parameters.power', ['huawei.mongo.parameters'])
    .controller('CellChannelPowerControl', function($scope, cellPowerService) {
        cellPowerService.queryCellParameters($scope.eNodebId, $scope.sectorId).then(function(result) {
            $scope.cellPower = result;
        });
    })
    .directive('cellChannelPower', function(parametersRoot) {
        return {
            restrict: 'EA',
            controller: 'CellChannelPowerControl',
            replace: true,
            scope: {
                eNodebId: '=',
                sectorId: '='
            },
            templateUrl: parametersRoot + 'cell/Power.html'
        }
    })
    .controller('UplinkOpenLoopPowerControl', function($scope, cellPowerService) {
        cellPowerService.queryUlOpenLoopPowerControll($scope.eNodebId, $scope.sectorId).then(function(result) {
            $scope.item = result;
        });
    })
    .directive('uplinkOpenLoopPower', function(parametersRoot) {
        return {
            restrict: 'EA',
            controller: 'UplinkOpenLoopPowerControl',
            replace: true,
            scope: {
                eNodebId: '=',
                sectorId: '='
            },
            templateUrl: parametersRoot + 'cell/UlOpenLoopPowerControl.html'
        }
    });