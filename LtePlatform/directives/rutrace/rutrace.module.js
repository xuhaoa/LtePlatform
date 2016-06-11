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
    .directive('interferenceSourceCoverageList', function (htmlRoot, $uibModal, $log) {
        var options = [
            {
                name: "模3干扰数",
                value: "mod3Interferences"
            }, {
                name: "模6干扰数",
                value: "mod6Interferences"
            }, {
                name: "6dB干扰数",
                value: "overInterferences6Db"
            }, {
                name: "10dB干扰数",
                value: "overInterferences10Db"
            }, {
                name: "总干扰水平",
                value: "interferenceLevel"
            }
        ];
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                interferenceCells: '='
            },
            templateUrl: htmlRoot + 'coverage/InterferenceSourceList.html',
            link: function (scope, element, attrs) {
                scope.orderPolicy = {
                    options: options,
                    selected: options[4].value
                };
                scope.analyzeTa = function(cell) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/appViews/Rutrace/Coverage/TaQueryChartDialog.html',
                        controller: 'coverage.ta.query.dialog',
                        size: 'lg',
                        resolve: {
                            dialogTitle: function () {
                                return cell.neighborCellName + 'TA分布';
                            },
                            cellId: function () {
                                return cell.destENodebId;
                            },
                            sectorId: function () {
                                return cell.destSectorId;
                            }
                        }
                    });

                    modalInstance.result.then(function (info) {
                        console.log(info);
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };
            }
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
    .directive('interferenceVictimCoverageList', function (htmlRoot, $uibModal, $log) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                victimCells: '='
            },
            templateUrl: htmlRoot + 'coverage/InterferenceVictimList.html',
            link: function (scope, element, attrs) {
                scope.analyzeTa = function (cell) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/appViews/Rutrace/Coverage/TaQueryChartDialog.html',
                        controller: 'coverage.ta.query.dialog',
                        size: 'lg',
                        resolve: {
                            dialogTitle: function () {
                                return cell.neighborCellName + 'TA分布';
                            },
                            cellId: function () {
                                return cell.destENodebId;
                            },
                            sectorId: function () {
                                return cell.destSectorId;
                            }
                        }
                    });

                    modalInstance.result.then(function (info) {
                        console.log(info);
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
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
    .directive('analyzeTable', function (htmlRoot, preciseWorkItemGenerator, preciseWorkItemService, $uibModal, $log) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                currentView: '=',
                serialNumber: '='
            },
            templateUrl: htmlRoot + 'AnalyzeTable.Tpl.html',
            link: function (scope, element, attrs) {
                scope.analyzeInterferenceSource = function () {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/appViews/Rutrace/Interference/SourceDialog.html',
                        controller: 'interference.source.dialog',
                        size: 'lg',
                        resolve: {
                            dialogTitle: function () {
                                return scope.currentView.eNodebName + "-" + scope.currentView.sectorId + "干扰源分析";
                            },
                            eNodebId: function () {
                                return scope.currentView.eNodebId;
                            },
                            sectorId: function () {
                                return scope.currentView.sectorId;
                            },
                            serialNumber: function() {
                                return scope.serialNumber;
                            }
                        }
                    });

                    modalInstance.result.then(function (info) {
                        scope.interferenceSourceComments = '已完成干扰源分析';
                        var dtos = preciseWorkItemGenerator.generatePreciseInterferenceNeighborDtos(info);
                        preciseWorkItemService.updateInterferenceNeighbor(scope.serialNumber, dtos).then(function(result) {
                            scope.interferenceSourceComments += ";已导入干扰源分析结果";
                        });
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };
                scope.showSourceDbChart = function () {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/appViews/Rutrace/Interference/SourceDbChartDialog.html',
                        controller: 'interference.source.db.chart',
                        size: 'lg',
                        resolve: {
                            dialogTitle: function () {
                                return scope.currentView.eNodebName + "-" + scope.currentView.sectorId + "干扰源图表";
                            },
                            eNodebId: function () {
                                return scope.currentView.eNodebId;
                            },
                            sectorId: function () {
                                return scope.currentView.sectorId;
                            },
                            name: function () {
                                return scope.currentView.eNodebName;
                            }
                        }
                    });

                    modalInstance.result.then(function (info) {
                        console.log(info);
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };
                scope.showSourceModChart = function () {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/appViews/Rutrace/Interference/SourceModChartDialog.html',
                        controller: 'interference.source.mod.chart',
                        size: 'lg',
                        resolve: {
                            dialogTitle: function () {
                                return scope.currentView.eNodebName + "-" + scope.currentView.sectorId + "MOD3/MOD6干扰图表";
                            },
                            eNodebId: function () {
                                return scope.currentView.eNodebId;
                            },
                            sectorId: function () {
                                return scope.currentView.sectorId;
                            },
                            name: function () {
                                return scope.currentView.eNodebName;
                            }
                        }
                    });

                    modalInstance.result.then(function (info) {
                        scope.interferenceSourceComments = info;
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };
                scope.showSourceStrengthChart = function () {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/appViews/Rutrace/Interference/SourceStrengthChartDialog.html',
                        controller: 'interference.source.strength.chart',
                        size: 'lg',
                        resolve: {
                            dialogTitle: function () {
                                return scope.currentView.eNodebName + "-" + scope.currentView.sectorId + "干扰强度图表";
                            },
                            eNodebId: function () {
                                return scope.currentView.eNodebId;
                            },
                            sectorId: function () {
                                return scope.currentView.sectorId;
                            },
                            name: function () {
                                return scope.currentView.eNodebName;
                            }
                        }
                    });

                    modalInstance.result.then(function (info) {
                        scope.interferenceSourceComments = info;
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };
                scope.analyzeInterferenceVictim = function () {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/appViews/Rutrace/Interference/VictimDialog.html',
                        controller: 'interference.victim.dialog',
                        size: 'lg',
                        resolve: {
                            dialogTitle: function () {
                                return scope.currentView.eNodebName + "-" + scope.currentView.sectorId + "干扰小区分析";
                            },
                            eNodebId: function () {
                                return scope.currentView.eNodebId;
                            },
                            sectorId: function () {
                                return scope.currentView.sectorId;
                            },
                            serialNumber: function () {
                                return scope.serialNumber;
                            }
                        }
                    });

                    modalInstance.result.then(function (info) {
                        scope.interferenceVictimComments = '已完成被干扰小区分析';
                        var dtos = preciseWorkItemGenerator.generatePreciseInterferenceVictimDtos(info);
                        preciseWorkItemService.updateInterferenceVictim(scope.serialNumber, dtos).then(function (result) {
                            scope.interferenceVictimComments += ";已导入被干扰小区分析结果";
                        });
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };
            }
        };
    });