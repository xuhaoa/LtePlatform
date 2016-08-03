angular.module('precise.interference', ['app.common'])
    .controller("rutrace.interference", function($scope, $timeout, $routeParams,
        networkElementService, topPreciseService, kpiDisplayService, preciseInterferenceService, menuItemService, neighborMongoService) {
        $scope.currentCellName = $routeParams.name + "-" + $routeParams.sectorId;
        $scope.page.title = "TOP指标干扰分析: " + $scope.currentCellName;
        menuItemService.updateMenuItem($scope.menuItems, 1, $scope.page.title,
            $scope.rootPath + "interference/" + $routeParams.cellId + "/" + $routeParams.sectorId + "/" + $routeParams.name);
        $scope.oneAtATime = false;
        $scope.orderPolicy = topPreciseService.getOrderPolicySelection();
        $scope.updateMessages = [];

        $scope.showInterference = function() {
            $scope.interferenceCells = [];
            $scope.victimCells = [];

            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function(result) {
                angular.forEach(result, function(cell) {
                    for (var i = 0; i < $scope.mongoNeighbors.length; i++) {
                        var neighbor = $scope.mongoNeighbors[i];
                        if (neighbor.neighborPci === cell.destPci) {
                            cell.isMongoNeighbor = true;
                            break;
                        }
                    }
                });
                $scope.interferenceCells = result;
                $scope.topStat.interference[$scope.currentCellName] = result;
                preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                    $routeParams.cellId, $routeParams.sectorId).then(function(victims) {
                    angular.forEach(victims, function(victim) {
                        for (var j = 0; j < result.length; j++) {
                            if (result[j].destENodebId === victim.victimENodebId
                                && result[j].destSectorId === victim.victimSectorId) {
                                victim.forwardInterferences6Db = result[j].overInterferences6Db;
                                victim.forwardInterferences10Db = result[j].overInterferences10Db;
                                break;
                            }
                        }
                    });
                    $scope.victimCells = victims;
                    $scope.topStat.victims[$scope.currentCellName] = victims;
                });
                var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                $scope.topStat.pieOptions[$scope.currentCellName] = pieOptions;
                $("#interference-over6db").highcharts(pieOptions.over6DbOption);
                $("#interference-over10db").highcharts(pieOptions.over10DbOption);
                $("#interference-mod3").highcharts(pieOptions.mod3Option);
                $("#interference-mod6").highcharts(pieOptions.mod6Option);
                networkElementService.queryCellInfo($routeParams.cellId, $routeParams.sectorId).then(function(info) {
                    topPreciseService.queryCellStastic($routeParams.cellId, info.pci,
                        $scope.beginDate.value, $scope.endDate.value).then(function(stastic) {
                        var columnOptions = kpiDisplayService.getStrengthColumnOptions(result, stastic.mrCount,
                            $scope.currentCellName);
                        $scope.topStat.columnOptions[$scope.currentCellName] = columnOptions;
                        $("#strength-over6db").highcharts(columnOptions.over6DbOption);
                        $("#strength-over10db").highcharts(columnOptions.over10DbOption);
                    });
                });
            });
        };

        $scope.updateNeighborInfos = function() {
            if ($scope.topStat.updateInteferenceProgress[$scope.currentCellName] !== true) {
                $scope.topStat.updateInteferenceProgress[$scope.currentCellName] = true;
                preciseInterferenceService.updateInterferenceNeighbor($routeParams.cellId, $routeParams.sectorId).then(function(result) {
                    $scope.updateMessages.push({
                        cellName: $scope.currentCellName,
                        counts: result,
                        type: "干扰"
                    });
                    $scope.topStat.updateInteferenceProgress[$scope.currentCellName] = false;
                });
            }

            if ($scope.topStat.updateVictimProgress[$scope.currentCellName] !== true) {
                $scope.topStat.updateVictimProgress[$scope.currentCellName] = true;
                preciseInterferenceService.updateInterferenceVictim($routeParams.cellId, $routeParams.sectorId).then(function(result) {
                    $scope.updateMessages.push({
                        cellName: $scope.currentCellName,
                        counts: result,
                        type: "被干扰"
                    });
                    $scope.topStat.updateVictimProgress[$scope.currentCellName] = false;
                });
            }
        }

        $scope.closeAlert = function(index) {
            $scope.updateMessages.splice(index, 1);
        };

        if ($scope.topStat.interference[$scope.currentCellName] === undefined) {
            neighborMongoService.queryNeighbors($routeParams.cellId, $routeParams.sectorId).then(function(result) {
                $scope.mongoNeighbors = result;
                $scope.topStat.mongoNeighbors[$scope.currentCellName] = result;
                $scope.showInterference();
                $scope.updateNeighborInfos();
            });
        } else {
            $scope.interferenceCells = $scope.topStat.interference[$scope.currentCellName];
            $scope.victimCells = $scope.topStat.victims[$scope.currentCellName];
            $scope.mongoNeighbors = $scope.topStat.mongoNeighbors[$scope.currentCellName];
            var newOptions = $scope.topStat.pieOptions[$scope.currentCellName];
            var newColumnOptions = $scope.topStat.columnOptions[$scope.currentCellName];
            $timeout(function() {
                $("#interference-over6db").highcharts(newOptions.over6DbOption);
                $("#interference-over10db").highcharts(newOptions.over10DbOption);
                $("#interference-mod3").highcharts(newOptions.mod3Option);
                $("#interference-mod6").highcharts(newOptions.mod6Option);
                $("#strength-over6db").highcharts(newColumnOptions.over6DbOption);
                $("#strength-over10db").highcharts(newColumnOptions.over10DbOption);
            }, 1000);
        }
        networkElementService.queryCellInfo($routeParams.cellId, $routeParams.sectorId).then(function(info) {
            $scope.topStat.current = {
                cellId: $routeParams.cellId,
                sectorId: $routeParams.sectorId,
                eNodebName: $routeParams.name,
                longtitute: info.longtitute,
                lattitute: info.lattitute
            };
        });
    })
    .controller('interference.coverage.dialog', function($scope, $uibModalInstance, dialogTitle, preciseCells,
        topPreciseService, networkElementService) {
        $scope.dialogTitle = dialogTitle;
        $scope.preciseCells = preciseCells;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
        $scope.showCoverage = function() {
            $scope.coverageInfos = [];
            angular.forEach($scope.preciseCells, function(cell) {
                networkElementService.queryCellInfo(cell.eNodebId, cell.sectorId).then(function(info) {
                    topPreciseService.queryCellStastic(cell.eNodebId, info.pci, $scope.beginDate.value, $scope.endDate.value).then(function(result) {
                        cell.overCoverageRate = result.overCoverCount * 100 / result.mrCount;
                        cell.weakCoverageRate = result.weakCoverCount * 100 / result.mrCount;
                        $scope.coverageInfos.push({
                            eNodebId: cell.eNodebId,
                            sectorId: cell.sectorId,
                            overCoverageRate: cell.overCoverageRate,
                            weakCoverageRate: cell.weakCoverageRate
                        });
                    });
                });

            });
        };

        $scope.ok = function() {
            $uibModalInstance.close($scope.coverageInfos);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showCoverage();
    })
    .controller('interference.mongo', function($scope, neighborMongoService, neighborDialogService,
        dumpProgress, networkElementService, dumpPreciseService) {
        $scope.progressInfo = {
            dumpCells: [],
            totalSuccessItems: 0,
            totalFailItems: 0,
            cellInfo: ""
        };
        $scope.page.title = "从MongoDB导入";
        $scope.currentPage = 1;

        $scope.reset = function() {
            dumpProgress.resetProgress($scope.beginDate.value, $scope.endDate.value).then(function(result) {
                $scope.progressInfo.dumpCells = result;
                $scope.progressInfo.totalFailItems = 0;
                $scope.progressInfo.totalSuccessItems = 0;
                angular.forEach($scope.progressInfo.dumpCells, function(cell) {
                    networkElementService.queryENodebInfo(cell.eNodebId).then(function(eNodeb) {
                        cell.name = eNodeb.name;
                    });
                    cell.dumpInfo = "未开始";
                });
            });
        };

        $scope.dumpMongo = function(cell) {
            neighborDialogService.dumpMongo(cell, $scope.beginDate.value, $scope.endDate.value);
        };

        $scope.generateDumpRecords = function(dumpRecords, startDate, endDate, eNodebId, sectorId, pci) {
            if (startDate >= endDate) {
                dumpPreciseService.dumpAllRecords(dumpRecords, 0, 0, eNodebId, sectorId, $scope.dump);
                return;
            }
            var date = new Date(startDate);
            dumpProgress.queryExistedItems(eNodebId, sectorId, date).then(function(existed) {
                dumpProgress.queryMongoItems(eNodebId, pci, date).then(function(records) {
                    dumpRecords.push({
                        date: date,
                        existedRecords: existed,
                        mongoRecords: records
                    });
                    startDate.setDate(date.getDate() + 1);
                    $scope.generateDumpRecords(dumpRecords, startDate, endDate, eNodebId, sectorId, pci);
                });
            });
        };

        $scope.dump = function() {
            if ($scope.progressInfo.totalSuccessItems >= $scope.progressInfo.dumpCells.length) return;
            var cell = $scope.progressInfo.dumpCells[$scope.progressInfo.totalSuccessItems];
            cell.dumpInfo = "已导入";
            $scope.progressInfo.totalSuccessItems += 1;
            var eNodebId = cell.eNodebId;
            var sectorId = cell.sectorId;
            var pci = cell.pci;
            var begin = $scope.beginDate.value;
            var startDate = new Date(begin);
            var end = $scope.endDate.value;
            var endDate = new Date(end);
            var dumpRecords = [];
            $scope.generateDumpRecords(dumpRecords, startDate, endDate, eNodebId, sectorId, pci);
        };

        $scope.reset();
    })
    .controller('neighbors.dialog', function($scope, $uibModalInstance, geometryService,
        dialogTitle, candidateNeighbors, currentCell) {
        $scope.pciNeighbors = [];
        $scope.indoorConsidered = false;
        $scope.distanceOrder = "distance";
        $scope.dialogTitle = dialogTitle;
        $scope.candidateNeighbors = candidateNeighbors;
        $scope.currentCell = currentCell;

        var minDistance = 10000;
        for (var i = 0; i < $scope.candidateNeighbors.length; i++) {
            var neighbor = $scope.candidateNeighbors[i];
            neighbor.distance = geometryService.getDistance($scope.currentCell.lattitute, $scope.currentCell.longtitute,
                neighbor.lattitute, neighbor.longtitute);
            if (neighbor.distance < minDistance && (neighbor.indoor === '室外' || $scope.indoorConsidered)) {
                minDistance = neighbor.distance;
                $scope.nearestCell = neighbor;
            }
            $scope.pciNeighbors.push(neighbor);
        }

        $scope.ok = function() {
            $uibModalInstance.close($scope.nearestCell);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('interference.source.db.chart', function($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
        topPreciseService, kpiDisplayService, preciseInterferenceService) {
        $scope.dialogTitle = dialogTitle;
        $scope.currentCellName = name + "-" + sectorId;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
        $scope.showChart = function() {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function(result) {
                var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                $("#interference-over6db").highcharts(pieOptions.over6DbOption);
                $("#interference-over10db").highcharts(pieOptions.over10DbOption);
            });
        };

        $scope.ok = function() {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.source.dialog', function($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId,
        preciseInterferenceService, neighborMongoService) {
        $scope.dialogTitle = dialogTitle;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
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
        $scope.orderPolicy = {
            options: options,
            selected: options[4].value
        };
        $scope.displayItems = {
            options: [5, 10, 15, 20, 30],
            selected: 10
        };

        $scope.showInterference = function() {
            $scope.interferenceCells = [];

            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function(result) {
                angular.forEach(result, function(cell) {
                    for (var i = 0; i < $scope.mongoNeighbors.length; i++) {
                        var neighbor = $scope.mongoNeighbors[i];
                        if (neighbor.neighborPci === cell.destPci) {
                            cell.isMongoNeighbor = true;
                            break;
                        }
                    }
                });
                $scope.interferenceCells = result;
            });
        };

        $scope.ok = function() {
            $uibModalInstance.close($scope.interferenceCells);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        neighborMongoService.queryNeighbors(eNodebId, sectorId).then(function(result) {
            $scope.mongoNeighbors = result;
            $scope.showInterference();
        });
    })
    .controller('interference.source.mod.chart', function($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
        topPreciseService, kpiDisplayService, preciseInterferenceService) {
        $scope.dialogTitle = dialogTitle;
        $scope.currentCellName = name + "-" + sectorId;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
        $scope.showChart = function() {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function(result) {
                var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                $("#interference-mod3").highcharts(pieOptions.mod3Option);
                $("#interference-mod6").highcharts(pieOptions.mod6Option);
            });
        };

        $scope.ok = function() {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.source.strength.chart', function($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
        topPreciseService, kpiDisplayService, preciseInterferenceService, neighborMongoService, networkElementService) {
        $scope.dialogTitle = dialogTitle;
        $scope.currentCellName = name + "-" + sectorId;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
        $scope.showChart = function() {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function(result) {
                networkElementService.queryCellInfo(eNodebId, sectorId).then(function(info) {
                    topPreciseService.queryCellStastic(eNodebId, info.pci,
                        $scope.beginDate.value, $scope.endDate.value).then(function(stastic) {
                        var columnOptions = kpiDisplayService.getStrengthColumnOptions(result, stastic.mrCount,
                            $scope.currentCellName);
                        $("#strength-over6db").highcharts(columnOptions.over6DbOption);
                        $("#strength-over10db").highcharts(columnOptions.over10DbOption);
                    });
                });
            });
        };

        $scope.ok = function() {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.victim.dialog', function($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId,
        topPreciseService, preciseInterferenceService) {
        $scope.dialogTitle = dialogTitle;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
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
        $scope.orderPolicy = {
            options: options,
            selected: options[4].value
        };
        $scope.displayItems = {
            options: [5, 10, 15, 20, 30],
            selected: 10
        };

        $scope.showVictim = function() {
            $scope.victimCells = [];

            preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function(victims) {
                preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                    eNodebId, sectorId).then(function(result) {
                    angular.forEach(victims, function(victim) {
                        for (var j = 0; j < result.length; j++) {
                            if (result[j].destENodebId === victim.victimENodebId
                                && result[j].destSectorId === victim.victimSectorId) {
                                victim.forwardInterferences6Db = result[j].overInterferences6Db;
                                victim.forwardInterferences10Db = result[j].overInterferences10Db;
                                break;
                            }
                        }
                    });
                    $scope.victimCells = victims;
                });
            });
        };

        $scope.ok = function() {
            $uibModalInstance.close($scope.victimCells);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showVictim();
    });