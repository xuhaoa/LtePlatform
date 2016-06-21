angular.module('rutrace.module', [
        'kpi.workitem',
        'myApp.dumpInterference',
        'myApp.parameters',
        'neighbor.mongo',
        "ui.bootstrap"
    ])
    .constant('htmlRoot', '/directives/rutrace/')
    .directive('topCell', function(workitemService, htmlRoot) {
        return {
            restrict: 'ECMA',
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
            }
        };
    })
    .directive('coverageTable', function (htmlRoot, coverageDialogService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                coverageList: '=',
                dialogTitle: '=',
                cellId: '=',
                sectorId: '='
            },
            templateUrl: htmlRoot + 'CoverageTable.Tpl.html',
            link: function(scope, element, attrs) {
                scope.showDetails = function (date) {
                    coverageDialogService.showDetails(scope.dialogTitle, scope.cellId, scope.sectorId, date);
                };

                scope.analyzeTa = function (date) {
                    coverageDialogService.showTa(scope.dialogTitle, scope.cellId, scope.sectorId, date);
                };
            }
        }
    })
    .directive('districtStatTable', function(htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                overallStat: '=',
                rootPath: '='
            },
            templateUrl: htmlRoot + 'DistrictStatTable.Tpl.html'
        };
    })
    .directive('townStatTable', function(htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                overallStat: '='
            },
            templateUrl: htmlRoot + 'TownStatTable.Tpl.html'
        };
    })
    .directive('dumpForwardNeighbors', function (htmlRoot, neighborDialogService) {
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
            networkElementService.queryCellInfo(cell.cellId, cell.sectorId).then(function(info) {
                dumpPreciseService.dumpDateSpanSingleNeighborRecords(cell.cellId, cell.sectorId, info.pci, cell.neighborCellId,
                    cell.neighborSectorId, cell.neighborPci, begin, end);
            });
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
            link: function(scope, element, attrs) {
                scope.dumpReverseMongo = function(cell) {
                    var begin = new Date(scope.beginDate.value);
                    var end = new Date(scope.endDate.value);
                    dumpSingleCell(cell, begin, end);
                };
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
    })
    .directive('interferenceSourceDialogList', function (htmlRoot) {
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
    .directive('interferenceSourceCoverageList', function (htmlRoot, coverageDialogService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interferenceCells: '=',
                orderPolicy: '='
            },
            templateUrl: htmlRoot + 'coverage/InterferenceSourceList.html',
            link: function (scope, element, attrs) {
                scope.analyzeTa = function(cell) {
                    coverageDialogService.showTaDistribution(cell.neighborCellName, cell.destENodebId, cell.destSectorId);
                };
            }
        };
    })
    .directive('interferenceSourceList', function (htmlRoot, neighborDialogService, neighborService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interferenceCells: '=',
                orderPolicy: '=',
                topStat: '='
            },
            templateUrl: htmlRoot + 'interference/SourceList.html',
            link: function(scope, element, attrs) {
                scope.match = function(candidate) {
                    var center = scope.topStat.current;
                    neighborService.queryNearestCells(center.cellId, center.sectorId, candidate.destPci).then(function(neighbors) {
                        neighborDialogService.matchNeighbor(center, candidate, neighbors);
                    });
                };
            }
        };
    })
    .directive('interferenceVictimList', function (htmlRoot) {
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
    .directive('interferenceVictimDialogList', function (htmlRoot) {
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
    .directive('interferenceVictimCoverageList', function (htmlRoot, coverageDialogService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                victimCells: '=',
                orderPolicy: '='
            },
            templateUrl: htmlRoot + 'coverage/InterferenceVictimList.html',
            link: function (scope, element, attrs) {
                scope.analyzeTa = function (cell) {
                    coverageDialogService.showTaDistribution(cell.victimCellName, cell.victimENodebId, cell.victimSectorId);
                };
            }
        };
    })
    .directive('trendMrTable', function (htmlRoot) {
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
    .directive('trendPreciseTable', function (htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                trendStat: '=',
                city: '='
            },
            templateUrl: htmlRoot + 'trend/PreciseTable.html'
        };
    })
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