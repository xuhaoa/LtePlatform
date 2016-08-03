angular.module('rutrace.precise', ['app.common'])
    .controller("rutrace.chart", function($scope, $location, $timeout, appKpiService) {
        if ($scope.overallStat.districtStats.length === 0) $location.path($scope.rootPath);

        $scope.showCharts = function() {
            $("#mr-pie").highcharts(appKpiService.getMrPieOptions(
                $scope.overallStat.districtStats.slice(0, $scope.overallStat.districtStats.length - 1),
                $scope.overallStat.townStats));
            $("#precise").highcharts(appKpiService.getPreciseRateOptions($scope.overallStat.districtStats,
                $scope.overallStat.townStats));
        };

        $timeout(function() {
            $scope.showCharts();
        }, 1000);
    })
    .controller("rutrace.top", function($scope, $http, preciseInterferenceService, kpiPreciseService, workitemService) {
        $scope.page.title = "TOP指标分析";
        $scope.topCells = [];
        $scope.orderPolicy = {
            options: [],
            selected: ""
        };
        $scope.topCount = {
            options: [5, 10, 15, 20, 30],
            selected: 15
        };
        $scope.updateMessages = [];

        $scope.query = function() {
            $scope.topCells = [];
            kpiPreciseService.queryTopKpis($scope.beginDate.value, $scope.endDate.value, $scope.topCount.selected,
                $scope.orderPolicy.selected).then(function(result) {
                $scope.topCells = result;
                angular.forEach(result, function(cell) {
                    workitemService.queryByCellId(cell.cellId, cell.sectorId).then(function(items) {
                        if (items.length > 0) {
                            for (var j = 0; j < $scope.topCells.length; j++) {
                                if (items[0].eNodebId === $scope.topCells[j].cellId && items[0].sectorId === $scope.topCells[j].sectorId) {
                                    $scope.topCells[j].hasWorkItems = true;
                                    break;
                                }
                            }
                        }
                    });
                    preciseInterferenceService.queryMonitor(cell.cellId, cell.sectorId).then(function(monitored) {
                        cell.isMonitored = monitored;
                    });
                });
            });
        };
        $scope.monitorAll = function() {
            angular.forEach($scope.topCells, function(cell) {
                if (cell.isMonitored === false) {
                    preciseInterferenceService.addMonitor(cell);
                }
            });
        };

        $scope.closeAlert = function(index) {
            $scope.updateMessages.splice(index, 1);
        };


        kpiPreciseService.getOrderSelection().then(function(result) {
            $scope.orderPolicy.options = result;
            $scope.orderPolicy.selected = result[0];
            $scope.query();
        });
    })
    .controller("rutrace.top.district", function($scope, $routeParams, preciseInterferenceService, kpiPreciseService, workitemService) {
        $scope.page.title = "TOP指标分析-" + $routeParams.district;
        $scope.topCells = [];
        $scope.orderPolicy = {
            options: [],
            selected: ""
        };
        $scope.topCount = {
            options: [5, 10, 15, 20],
            selected: 5
        };
        $scope.updateMessages = [];

        $scope.query = function() {
            $scope.topCells = [];
            kpiPreciseService.queryTopKpisInDistrict($scope.beginDate.value, $scope.endDate.value, $scope.topCount.selected,
                $scope.orderPolicy.selected, $scope.overallStat.city, $routeParams.district).then(function(result) {
                $scope.topCells = result;
                angular.forEach(result, function(cell) {
                    workitemService.queryByCellId(cell.cellId, cell.sectorId).then(function(items) {
                        if (items.length > 0) {
                            for (var j = 0; j < $scope.topCells.length; j++) {
                                if (items[0].eNodebId === $scope.topCells[j].cellId && items[0].sectorId === $scope.topCells[j].sectorId) {
                                    $scope.topCells[j].hasWorkItems = true;
                                    break;
                                }
                            }
                        }
                    });
                    preciseInterferenceService.queryMonitor(cell.cellId, cell.sectorId).then(function(monitored) {
                        cell.isMonitored = monitored;
                    });
                });
            });
        };
        $scope.monitorAll = function() {
            angular.forEach($scope.topCells, function(cell) {
                if (cell.isMonitored === false) {
                    preciseInterferenceService.addMonitor(cell);
                }
            });
        };

        $scope.closeAlert = function(index) {
            $scope.updateMessages.splice(index, 1);
        };

        kpiPreciseService.getOrderSelection().then(function(result) {
            $scope.orderPolicy.options = result;
            $scope.orderPolicy.selected = result[0];
            $scope.query();
        });
    })
    .controller("rutrace.trend", function($scope, appRegionService, appKpiService, kpiPreciseService, appFormatService) {
        $scope.page.title = "指标变化趋势";

        $scope.showTrend = function() {
            kpiPreciseService.getDateSpanPreciseRegionKpi($scope.city.selected, $scope.beginDate.value, $scope.endDate.value)
                .then(function(result) {
                    $scope.trendStat.stats = appKpiService.generateDistrictStats($scope.trendStat.districts, result);
                    if (result.length > 0) {
                        appKpiService.generateTrendStatsForPie($scope.trendStat, result);
                        $scope.trendStat.stats.push(appKpiService.calculateAverageRates($scope.trendStat.stats));
                    }
                    $scope.trendStat.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
                    $scope.trendStat.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
                });
        };
        appRegionService.queryDistricts($scope.city.selected)
            .then(function(districts) {
                $scope.trendStat.districts = districts;
                $scope.showTrend();
            });
    })
    .controller("cell.trend", function($scope, $routeParams, appKpiService, cellPreciseService,
        kpiDisplayService, appFormatService) {
        $scope.page.title = "小区指标变化趋势分析" + "-" + $routeParams.name;
        $scope.showTrend = function() {
            $scope.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
            $scope.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
            cellPreciseService.queryDataSpanKpi($scope.beginDate.value, $scope.endDate.value, $routeParams.cellId,
                $routeParams.sectorId).then(function(result) {
                $scope.mrsConfig = kpiDisplayService.getMrsOptions(result,
                    $scope.beginDateString + "-" + $scope.endDateString + "MR数变化趋势");
                $scope.preciseConfig = kpiDisplayService.getPreciseOptions(result,
                    $scope.beginDateString + "-" + $scope.endDateString + "精确覆盖率变化趋势");
            });
        };
        $scope.showTrend();
    })
    .controller("rutrace.trendchart", function($scope, $location, $timeout, appKpiService) {

        $scope.showCharts = function() {
            $("#mr-pie").highcharts(appKpiService.getMrPieOptions($scope.trendStat.districtStats,
                $scope.trendStat.townStats));
            $("#precise").highcharts(appKpiService.getPreciseRateOptions($scope.trendStat.districtStats,
                $scope.trendStat.townStats));
            $("#time-mr").highcharts(appKpiService.getMrsDistrictOptions($scope.trendStat.stats,
                $scope.trendStat.districts));
            $("#time-precise").highcharts(appKpiService.getPreciseDistrictOptions($scope.trendStat.stats,
                $scope.trendStat.districts));
        };
        $timeout(function() {
            $scope.showCharts();
        }, 500);
    })
    .controller("rutrace.import", function($scope, $http, $routeParams,
        menuItemService, neighborService, neighborMongoService, neighborDialogService,
        preciseInterferenceService, networkElementService) {
        $scope.currentCellName = $routeParams.name + "-" + $routeParams.sectorId;
        $scope.page.title = "TOP指标邻区监控: " + $scope.currentCellName;
        menuItemService.updateMenuItem($scope.menuItems, 1, $scope.page.title,
            $scope.rootPath + "import/" + $routeParams.cellId + "/" + $routeParams.sectorId + "/" + $routeParams.name);
        $scope.currentPage = 1;
        $scope.neighborCells = [];
        $scope.updateMessages = [];
        preciseInterferenceService.queryMonitor($routeParams.cellId, $routeParams.sectorId).then(function(result) {
            $scope.cellMonitored = result;
        });

        $scope.showNeighbors = function() {
            $scope.neighborCells = [];
            neighborService.queryCellNeighbors($routeParams.cellId, $routeParams.sectorId).then(function(result) {
                $scope.neighborCells = result;
                angular.forEach(result, function(neighbor) {
                    preciseInterferenceService.queryMonitor(neighbor.cellId, neighbor.sectorId).then(function(monitored) {
                        neighbor.isMonitored = monitored;
                    });
                });
            });

        };
        $scope.showReverseNeighbors = function() {
            neighborMongoService.queryReverseNeighbors($routeParams.cellId, $routeParams.sectorId).then(function(result) {
                $scope.reverseCells = result;
                angular.forEach(result, function(neighbor) {
                    networkElementService.queryENodebInfo(neighbor.cellId).then(function(info) {
                        neighbor.eNodebName = info.name;
                    });
                    preciseInterferenceService.queryMonitor(neighbor.cellId, neighbor.sectorId).then(function(monitored) {
                        neighbor.isMonitored = monitored;
                    });
                });
            });
        }
        $scope.updatePci = function() {
            var cell = $scope.topStat.current;
            neighborService.updateCellPci(cell).then(function(result) {
                $scope.updateMessages.push({
                    cellName: cell.eNodebName + '-' + cell.sectorId,
                    counts: result
                });
                $scope.showNeighbors();
            });
        };
        $scope.synchronizeNeighbors = function() {
            var count = 0;
            neighborMongoService.queryNeighbors($routeParams.cellId, $routeParams.sectorId).then(function(neighbors) {
                angular.forEach(neighbors, function(neighbor) {
                    if (neighbor.neighborCellId > 0 && neighbor.neighborPci > 0) {
                        neighborService.updateNeighbors(neighbor.cellId, neighbor.sectorId, neighbor.neighborPci,
                            neighbor.neighborCellId, neighbor.neighborSectorId).then(function() {
                            count += 1;
                            if (count === neighbors.length) {
                                $scope.updateMessages.push({
                                    cellName: $scope.currentCellName,
                                    counts: count
                                });
                                $scope.showNeighbors();
                            }
                        });
                    } else {
                        count += 1;
                        if (count === neighbors.length) {
                            $scope.updateMessages.push({
                                cellName: $scope.currentCellName,
                                counts: count
                            });
                            $scope.showNeighbors();
                        }
                    }
                });
            });
        };
        $scope.closeAlert = function(index) {
            $scope.updateMessages.splice(index, 1);
        }
        $scope.addMonitor = function() {
            preciseInterferenceService.addMonitor({
                cellId: $routeParams.cellId,
                sectorId: $routeParams.sectorId
            });
        };
        $scope.monitorNeighbors = function() {
            angular.forEach($scope.neighborCells, function(cell) {
                if (cell.isMonitored === false) {
                    neighborService.monitorNeighbors(cell).then(function() {
                        cell.isMonitored = true;
                    });
                }
            });
            angular.forEach($scope.reverseCells, function(cell) {
                if (cell.isMonitored === false) {
                    neighborService.monitorNeighbors({
                        nearestCellId: cell.cellId,
                        nearestSectorId: cell.sectorId
                    }).then(function() {
                        cell.isMonitored = true;
                    });
                }
            });
        };

        $scope.dump = function() {
            networkElementService.queryCellInfo($routeParams.cellId, $routeParams.sectorId).then(function(info) {
                neighborDialogService.dumpMongo({
                    eNodebId: $routeParams.cellId,
                    sectorId: $routeParams.sectorId,
                    pci: info.pci,
                    name: $routeParams.name
                }, $scope.beginDate.value, $scope.endDate.value);
            });
        };

        $scope.showReverseNeighbors();
        $scope.showNeighbors();
    });
