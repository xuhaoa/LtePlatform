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
    .directive('coverageTable', function($uibModal, $log, htmlRoot) {
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
                scope.showDetails = function(date) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/appViews/Rutrace/Coverage/DetailsChartDialog.html',
                        controller: 'coverage.details.dialog',
                        size: 'lg',
                        resolve: {
                            dialogTitle: function() {
                                return scope.dialogTitle;
                            },
                            cellId: function() {
                                return scope.cellId;
                            },
                            sectorId: function() {
                                return scope.sectorId;
                            },
                            date: function() {
                                return date;
                            }
                        }
                    });

                    modalInstance.result.then(function(info) {
                        console.log(info);
                    }, function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                scope.analyzeTa = function(date) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/appViews/Rutrace/Coverage/TaChartDialog.html',
                        controller: 'coverage.ta.dialog',
                        size: 'lg',
                        resolve: {
                            dialogTitle: function() {
                                return scope.dialogTitle;
                            },
                            cellId: function() {
                                return scope.cellId;
                            },
                            sectorId: function() {
                                return scope.sectorId;
                            },
                            date: function() {
                                return date;
                            }
                        }
                    });

                    modalInstance.result.then(function(info) {
                        console.log(info);
                    }, function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
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
    .directive('dumpForwardNeighbors', function(htmlRoot, neighborMongoService) {
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
                    neighborMongoService.dumpMongoDialog({
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
                    var begin = new Date(scope.beginDate.value);
                    var end = new Date(scope.endDate.value);
                    angular.forEach(scope.neighborCells, function(cell) {
                        dumpSingleCell(cell, begin, end);
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
    .directive('interferenceSourceList', function (htmlRoot, $uibModal, $log, neighborService) {
        var matchNearest = function(nearestCell, currentNeighbor, center) {
            neighborService.updateNeighbors(center.cellId, center.sectorId, currentNeighbor.destPci,
                nearestCell.eNodebId, nearestCell.sectorId).then(function() {
                currentNeighbor.neighborCellName = nearestCell.eNodebName + "-" + nearestCell.sectorId;
            });
        };
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
                    neighborService.queryNearestCells(center.cellId, center.sectorId, candidate.destPci).then(function(result) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: '/appViews/Rutrace/Interference/MatchCellDialog.html',
                            controller: 'neighbors.dialog',
                            size: 'lg',
                            resolve: {
                                dialogTitle: function() {
                                    return center.eNodebName + "-" + center.sectorId + "的邻区PCI=" + candidate.destPci + "的可能小区";
                                },
                                candidateNeighbors: function() {
                                    return result;
                                },
                                currentCell: function() {
                                    return center;
                                }
                            }
                        });

                        modalInstance.result.then(function(nearestCell) {
                            matchNearest(nearestCell, candidate, center);
                        }, function() {
                            $log.info('Modal dismissed at: ' + new Date());
                        });


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
                victimCells: '='
            },
            templateUrl: htmlRoot + 'interference/VictimList.html'
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
    });