angular.module('rutrace.module', [
        'rutrace.top.cell',
        'rutrace.interference',
        'rutrace.trend',
        'rutrace.analyze'
    ])
    .constant('htmlRoot', '/directives/rutrace/');

angular.module('rutrace.top.cell', ['myApp.kpi', 'myApp.region', 'topic.dialog'])
    .directive('topCell', function (workitemService, htmlRoot, networkElementService, neighborDialogService) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                rootPath: '=',
                topCells: '=currentCells',
                beginDate: '=',
                endDate: '=',
                updateMessages: '='
            },
            templateUrl: htmlRoot + 'TopCell.Tpl.html',
            link: function(scope, element, attrs) {
                scope.createWorkitem = function(cell) {
                    workitemService.constructPreciseItem(cell, scope.beginDate.value, scope.endDate.value).then(function(result) {
                        if (result) {
                            scope.updateMessages.push({
                                cellName: result
                            });
                            cell.hasWorkItems = true;
                        }
                    });
                };
                scope.dump = function (cell) {
                    networkElementService.queryCellInfo(cell.cellId, cell.sectorId).then(function (info) {
                        neighborDialogService.dumpMongo({
                            eNodebId: cell.cellId,
                            sectorId: cell.sectorId,
                            pci: info.pci,
                            name: cell.eNodebName
                        }, scope.beginDate.value, scope.endDate.value);
                    });
                };
                scope.showInterference = function(cell) {
                    neighborDialogService.showInterference({
                        cellId: cell.cellId,
                        sectorId: cell.sectorId,
                        name: cell.eNodebName
                    }, scope.beginDate.value, scope.endDate.value);
                };
                scope.showCoverage = function (cell) {
                    neighborDialogService.showCoverage({
                        cellId: cell.cellId,
                        sectorId: cell.sectorId,
                        name: cell.eNodebName
                    }, scope.beginDate.value, scope.endDate.value);
                };
            }
        };
    })

    .controller('DistrictStatController', function ($scope, mapDialogService) {
        $scope.cityFlag = '全网';
        $scope.gridOptions = {
            columnDefs: [
                { field: 'city', name: '城市' },
                {
                    name: '区域',
                    cellTemplate: '<button class="btn btn-sm btn-default" ng-hide="row.entity.district===grid.appScope.cityFlag" ng-click="grid.appScope.overallStat.currentDistrict = row.entity.district">{{row.entity.district}}</button>'
                },
                { field: 'totalMrs', name: 'MR总数' },
                {
                    field: 'preciseRate',
                    name: '精确覆盖率',
                    cellFilter: 'number: 2',
                    cellClass: function (grid, row, col) {
                        if (grid.getCellValue(row, col) < row.entity.objectRate) {
                            return 'text-danger';
                        }
                        return 'text-success';
                    }
                },
                { field: 'objectRate', name: '本区目标值', cellFilter: 'number: 2' },
                { field: 'firstRate', name: '第一精确覆盖率', cellFilter: 'number: 2' },
                { field: 'thirdRate', name: '第三精确覆盖率', cellFilter: 'number: 2' },
                {
                    name: '处理',
                    cellTemplate: '<a class="btn btn-sm btn-primary" ng-hide="row.entity.district===grid.appScope.cityFlag" ng-click="grid.appScope.showWorkItemDistrict(row.entity.district)">工单处理</a>'
                },
                {
                    name: '分析',
                    cellTemplate: '<a class="btn btn-sm btn-default" ng-hide="row.entity.district===grid.appScope.cityFlag" ng-click="grid.appScope.showTopDistrict(row.entity.district)">TOP指标</a>'
                }
            ],
            data: []
        };
        $scope.showWorkItemDistrict = function (district) {
            mapDialogService.showPreciseWorkItemDistrict(district, $scope.endDate);
        };
        $scope.showTopDistrict = function(district) {
            mapDialogService.showPreciseTopDistrict($scope.beginDate, $scope.endDate, district);
        };
    })
    .directive('districtStatTable', function ($compile, calculateService) {
        return calculateService.generateGridDirective({
            controllerName: 'DistrictStatController',
            scope: {
                overallStat: '=',
                beginDate: '=',
                endDate: '='
            },
            argumentName: 'overallStat.districtStats'
        }, $compile);
    })

    .controller('TownStatController', function($scope) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'district', name: '区域' },
                { field: 'town', name: '镇区' },
                { field: 'totalMrs', name: 'MR总数' },
                { field: 'preciseRate', name: '精确覆盖率', cellFilter: 'number: 2' },
                { field: 'firstRate', name: '第一精确覆盖率', cellFilter: 'number: 2' },
                { field: 'thirdRate', name: '第三精确覆盖率', cellFilter: 'number: 2' }
            ],
            data: []
        };
    })
    .directive('townStatTable', function ($compile, filterFilter) {
        return {
            controller: 'TownStatController',
            restrict: 'EA',
            replace: true,
            scope: {
                overallStat: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('overallStat.townStats', function (townStats) {
                    scope.gridOptions.data = filterFilter(townStats, { district: scope.overallStat.currentDistrict });

                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
                scope.$watch('overallStat.currentDistrict', function (currentDistrict) {
                    scope.gridOptions.data = filterFilter(scope.overallStat.townStats, { district: currentDistrict });

                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })

    .directive('dumpForwardNeighbors', function(htmlRoot, neighborDialogService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                neighborCells: '=',
                beginDate: '=',
                endDate: '='
            },
            templateUrl: htmlRoot + 'import/ForwardNeighbors.html',
            link: function(scope, element, attrs) {
                scope.dumpMongo = function(cell) {
                    neighborDialogService.dumpMongo({
                        eNodebId: cell.nearestCellId,
                        sectorId: cell.nearestSectorId,
                        pci: cell.pci,
                        name: cell.nearestENodebName
                    }, scope.beginDate.value, scope.endDate.value);
                };
            }
        };
    })
    .directive('dumpBackwardNeighbors', function(htmlRoot, networkElementService, dumpPreciseService) {
        var dumpSingleCell = function(cell, begin, end) {
            dumpPreciseService.dumpDateSpanSingleNeighborRecords(cell, begin, end);
        };
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                neighborCells: '=',
                beginDate: '=',
                endDate: '='
            },
            templateUrl: htmlRoot + 'import/BackwardNeighbors.html',
            link: function (scope, element, attrs) {
                scope.dumpAll = function() {
                    angular.forEach(scope.neighborCells, function(cell) {
                        dumpSingleCell(cell, new Date(scope.beginDate.value), new Date(scope.endDate.value));
                    });
                };
            }
        };
    })
    .directive('mongoNeighborList', function(htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                mongoNeighbors: '='
            },
            templateUrl: htmlRoot + 'interference/MongoNeighbors.html'
        };
    });

angular.module('rutrace.interference', ['myApp.region'])
    .directive('interferenceSourceDialogList', function(htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interferenceCells: '=',
                orderPolicy: '=',
                displayItems: '='
            },
            templateUrl: htmlRoot + 'interference/SourceDialogList.html'
        };
    })
    .directive('interferenceSourceCoverageList', function(htmlRoot, coverageDialogService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interferenceCells: '=',
                orderPolicy: '='
            },
            templateUrl: htmlRoot + 'coverage/InterferenceSourceList.html',
            link: function(scope, element, attrs) {
                scope.analyzeTa = function(cell) {
                    coverageDialogService.showDetails(cell.neighborCellName, cell.destENodebId, cell.destSectorId);
                };
            }
        };
    })
    .directive('interferenceSourceList', function (htmlRoot, neighborDialogService, networkElementService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interferenceCells: '=',
                orderPolicy: '=',
                current: '='
            },
            templateUrl: htmlRoot + 'interference/SourceList.html',
            link: function(scope, element, attrs) {
                scope.match = function(candidate) {
                    var center = scope.current;
                    networkElementService.queryNearestCells(center.cellId, center.sectorId, candidate.destPci).then(function (neighbors) {
                        neighborDialogService.matchNeighbor(center, candidate, neighbors);
                    });
                };
            }
        };
    })
    .directive('interferenceVictimList', function(htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                victimCells: '=',
                orderPolicy: '='
            },
            templateUrl: htmlRoot + 'interference/VictimList.html'
        };
    })
    .directive('interferenceVictimDialogList', function(htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                victimCells: '=',
                orderPolicy: '=',
                displayItems: '='
            },
            templateUrl: htmlRoot + 'interference/VictimDialogList.html'
        };
    })
    .directive('interferenceVictimCoverageList', function(htmlRoot, coverageDialogService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                victimCells: '=',
                orderPolicy: '='
            },
            templateUrl: htmlRoot + 'coverage/InterferenceVictimList.html',
            link: function(scope, element, attrs) {
                scope.analyzeTa = function(cell) {
                    coverageDialogService.showDetails(cell.victimCellName, cell.victimENodebId, cell.victimSectorId);
                };
            }
        };
    })
    .directive('mroInterferenceTable', function (htmlRoot) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                currentDetails: '='
            },
            templateUrl: htmlRoot + 'interference/MroInterferenceList.html'
        };
    })
    .directive('mroRsrpTable', function (htmlRoot) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                currentDetails: '='
            },
            templateUrl: htmlRoot + 'interference/MroRsrpList.html'
        };
    })
    .directive('mroTaTable', function (htmlRoot) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                currentDetails: '='
            },
            templateUrl: htmlRoot + 'interference/MroTaList.html'
        };
    })
    .directive('mrsRsrpTable', function (htmlRoot) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                currentDetails: '='
            },
            templateUrl: htmlRoot + 'interference/MrsRsrpList.html',
            link: function (scope, element, attrs) {
                scope.indices1 = _.range(16);
                scope.indices2 = _.range(16, 32);
                scope.indices3 = _.range(32, 48);
            }
        };
    })
    .directive('mrsTaTable', function (htmlRoot) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                currentDetails: '='
            },
            templateUrl: htmlRoot + 'interference/MrsTaList.html',
            link: function (scope, element, attrs) {
                scope.indices1 = _.range(16);
                scope.indices2 = _.range(16, 32);
            }
        };
    });

angular.module('rutrace.trend', [])
    .directive('trendMrTable', function(htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                trendStat: '=',
                city: '='
            },
            templateUrl: htmlRoot + 'trend/MrTable.html'
        };
    })
    .directive('trendPreciseTable', function(htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                trendStat: '=',
                city: '='
            },
            templateUrl: htmlRoot + 'trend/PreciseTable.html'
        };
    });

angular.module('rutrace.analyze', ['myApp.kpi', 'myApp.region'])
    .directive('analyzeTable', function (htmlRoot, preciseWorkItemGenerator, preciseWorkItemService, coverageDialogService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                currentView: '=',
                serialNumber: '=',
                queryPreciseCells: '&',
                preciseCells: '='
            },
            templateUrl: htmlRoot + 'AnalyzeTable.Tpl.html',
            link: function (scope, element, attrs) {
                scope.analyzeInterferenceSource = function () {
                    coverageDialogService.showSource(scope.currentView, scope.serialNumber, function(info) {
                        scope.interferenceSourceComments = '已完成干扰源分析';
                        var dtos = preciseWorkItemGenerator.generatePreciseInterferenceNeighborDtos(info);
                        preciseWorkItemService.updateInterferenceNeighbor(scope.serialNumber, dtos).then(function(result) {
                            scope.interferenceSourceComments += ";已导入干扰源分析结果";
                            scope.queryPreciseCells();
                        });
                    });
                };
                scope.showSourceDbChart = function () {
                    coverageDialogService.showSourceDbChart(scope.currentView);
                };
                scope.showSourceModChart = function () {
                    coverageDialogService.showSourceModChart(scope.currentView, function(info) {
                        scope.interferenceSourceComments = info;
                    });
                };
                scope.showSourceStrengthChart = function () {
                    coverageDialogService.showSourceStrengthChart(scope.currentView, function(info) {
                        scope.interferenceSourceComments = info;
                    });
                };
                scope.analyzeInterferenceVictim = function () {
                    coverageDialogService.showInterferenceVictim(scope.currentView, scope.serialNumber, function(info) {
                        scope.interferenceVictimComments = '已完成被干扰小区分析';
                        var dtos = preciseWorkItemGenerator.generatePreciseInterferenceVictimDtos(info);
                        preciseWorkItemService.updateInterferenceVictim(scope.serialNumber, dtos).then(function(result) {
                            scope.interferenceVictimComments += ";已导入被干扰小区分析结果";
                            scope.queryPreciseCells();
                        });
                    });
                };
                scope.analyzeCoverage = function () {
                    coverageDialogService.showCoverage(scope.currentView, scope.preciseCells, function(info) {
                        scope.coverageComments = '已完成覆盖分析';
                        preciseWorkItemService.updateCoverage(scope.serialNumber, info).then(function(result) {
                            scope.coverageComments += ";已导入覆盖分析结果";
                            scope.queryPreciseCells();
                        });
                    });
                };
            }
        };
    });