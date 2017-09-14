angular.module('kpi.parameter.rutrace', ['myApp.url', 'myApp.region', "ui.bootstrap"])
    .controller("rutrace.interference",
        function($scope,
            $uibModalInstance,
            cell,
            topPreciseService,
            kpiDisplayService,
            preciseInterferenceService,
            neighborMongoService,
            networkElementService) {
            $scope.currentCellName = cell.name + "-" + cell.sectorId;
            $scope.dialogTitle = "TOP指标干扰分析: " + $scope.currentCellName;
            $scope.oneAtATime = false;
            $scope.orderPolicy = topPreciseService.getOrderPolicySelection();
            $scope.updateMessages = [];

            networkElementService.queryCellInfo(cell.cellId, cell.sectorId).then(function(info) {
                $scope.current = {
                    cellId: cell.cellId,
                    sectorId: cell.sectorId,
                    eNodebName: cell.name,
                    longtitute: info.longtitute,
                    lattitute: info.lattitute
                };
            });

            $scope.showInterference = function() {
                $scope.interferenceCells = [];
                $scope.victimCells = [];

                preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value,
                    $scope.endDate.value,
                    cell.cellId,
                    cell.sectorId).then(function(result) {
                    angular.forEach(result,
                        function(interference) {
                            for (var i = 0; i < $scope.mongoNeighbors.length; i++) {
                                var neighbor = $scope.mongoNeighbors[i];
                                if (neighbor.neighborPci === interference.destPci) {
                                    interference.isMongoNeighbor = true;
                                    break;
                                }
                            }
                        });
                    $scope.interferenceCells = result;
                    preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value,
                        $scope.endDate.value,
                        cell.cellId,
                        cell.sectorId).then(function(victims) {
                        angular.forEach(victims,
                            function(victim) {
                                for (var j = 0; j < result.length; j++) {
                                    if (result[j].destENodebId === victim.victimENodebId &&
                                        result[j].destSectorId === victim.victimSectorId) {
                                        victim.forwardInterferences6Db = result[j].overInterferences6Db;
                                        victim.forwardInterferences10Db = result[j].overInterferences10Db;
                                        break;
                                    }
                                }
                            });
                        $scope.victimCells = victims;
                    });
                    var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                    $("#interference-over6db").highcharts(pieOptions.over6DbOption);
                    $("#interference-over10db").highcharts(pieOptions.over10DbOption);
                    $("#interference-mod3").highcharts(pieOptions.mod3Option);
                    $("#interference-mod6").highcharts(pieOptions.mod6Option);
                    topPreciseService.queryRsrpTa($scope.beginDate.value,
                        $scope.endDate.value,
                        cell.cellId,
                        cell.sectorId).then(function(info) {
                    });
                });
            };

            $scope.updateNeighborInfos = function() {
                preciseInterferenceService.updateInterferenceNeighbor(cell.cellId, cell.sectorId)
                    .then(function(result) {
                        $scope.updateMessages.push({
                            cellName: $scope.currentCellName,
                            counts: result,
                            type: "干扰"
                        });
                    });

                preciseInterferenceService.updateInterferenceVictim(cell.cellId, cell.sectorId).then(function(result) {
                    $scope.updateMessages.push({
                        cellName: $scope.currentCellName,
                        counts: result,
                        type: "被干扰"
                    });
                });
            }

            $scope.ok = function() {
                $uibModalInstance.close($scope.mongoNeighbors);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            neighborMongoService.queryNeighbors(cell.cellId, cell.sectorId).then(function(result) {
                $scope.mongoNeighbors = result;
                $scope.showInterference();
                $scope.updateNeighborInfos();
            });
        })
    .controller("rutrace.coverage",
        function($scope,
            cell,
            $uibModalInstance,
            topPreciseService,
            preciseInterferenceService,
            preciseChartService,
            coverageService,
            kpiDisplayService) {
            $scope.currentCellName = cell.name + "-" + cell.sectorId;
            $scope.dialogTitle = "TOP指标覆盖分析: " + $scope.currentCellName;
            $scope.orderPolicy = topPreciseService.getOrderPolicySelection();
            $scope.detailsDialogTitle = cell.name + "-" + cell.sectorId + "详细小区统计";
            $scope.cellId = cell.cellId;
            $scope.sectorId = cell.sectorId;
            $scope.showCoverage = function() {
                topPreciseService.queryRsrpTa($scope.beginDate.value,
                    $scope.endDate.value,
                    cell.cellId,
                    cell.sectorId).then(function(result) {
                    for (var rsrpIndex = 0; rsrpIndex < 12; rsrpIndex++) {
                        var options = preciseChartService.getRsrpTaOptions(result, rsrpIndex);
                        $("#rsrp-ta-" + rsrpIndex).highcharts(options);
                    }
                });
                topPreciseService.queryCoverage($scope.beginDate.value,
                    $scope.endDate.value,
                    cell.cellId,
                    cell.sectorId).then(function(result) {
                    var options = preciseChartService.getCoverageOptions(result);
                    $("#coverage-chart").highcharts(options);
                });
                topPreciseService.queryTa($scope.beginDate.value,
                    $scope.endDate.value,
                    cell.cellId,
                    cell.sectorId).then(function(result) {
                    var options = preciseChartService.getTaOptions(result);
                    $("#ta-chart").highcharts(options);
                });
                preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value,
                    $scope.endDate.value,
                    cell.cellId,
                    cell.sectorId).then(function(result) {
                    $scope.interferenceCells = result;
                    angular.forEach($scope.interferenceCells,
                        function(neighbor) {
                            if (neighbor.destENodebId > 0) {
                                kpiDisplayService.updateCoverageKpi(neighbor,
                                    {
                                        cellId: neighbor.destENodebId,
                                        sectorId: neighbor.destSectorId
                                    },
                                    {
                                        begin: $scope.beginDate.value,
                                        end: $scope.endDate.value
                                    });
                            }
                        });
                });
                preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value,
                    $scope.endDate.value,
                    cell.cellId,
                    cell.sectorId).then(function(result) {
                    $scope.interferenceVictims = result;
                    angular.forEach($scope.interferenceVictims,
                        function(victim) {
                            if (victim.victimENodebId > 0) {
                                kpiDisplayService.updateCoverageKpi(victim,
                                    {
                                        cellId: victim.victimENodebId,
                                        sectorId: victim.victimSectorId
                                    },
                                    {
                                        begin: $scope.beginDate.value,
                                        end: $scope.endDate.value
                                    });
                            }
                        });
                });
            };

            $scope.ok = function() {
                $uibModalInstance.close($scope.interferenceCells);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.showCoverage();
        })
    .controller('map.source.dialog',
        function($scope, $uibModalInstance, neighbor, dialogTitle, topPreciseService, preciseChartService) {
            $scope.neighbor = neighbor;
            $scope.dialogTitle = dialogTitle;
            if (neighbor.cellId !== undefined) {
                $scope.cellId = neighbor.cellId;
                $scope.sectorId = neighbor.sectorId;
            } else {
                $scope.cellId = neighbor.destENodebId;
                $scope.sectorId = neighbor.destSectorId;
            }
            topPreciseService.queryCoverage($scope.beginDate.value,
                $scope.endDate.value,
                $scope.cellId,
                $scope.sectorId).then(function(result) {
                var options = preciseChartService.getCoverageOptions(result);
                $("#coverage-chart").highcharts(options);
            });
            $scope.ok = function() {
                $uibModalInstance.close($scope.neighbor);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller("cell.info.dialog",
        function($scope, cell, dialogTitle, neighborMongoService, $uibModalInstance) {
            $scope.dialogTitle = dialogTitle;
            $scope.isHuaweiCell = false;
            $scope.eNodebId = cell.eNodebId;
            $scope.sectorId = cell.sectorId;

            $scope.ok = function() {
                $uibModalInstance.close($scope.mongoNeighbors);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            neighborMongoService.queryNeighbors(cell.eNodebId, cell.sectorId).then(function(result) {
                $scope.mongoNeighbors = result;
            });

        });