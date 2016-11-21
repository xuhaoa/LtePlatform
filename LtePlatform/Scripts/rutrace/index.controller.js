angular.module('myApp', ['app.common'])
    .config([
        '$routeProvider', function($routeProvider) {
            var viewDir = "/appViews/Rutrace/";
            $routeProvider
                .when('/', {
                    templateUrl: viewDir + "Index.html",
                    controller: "rutrace.index"
                })
                .when('/trend', {
                    templateUrl: viewDir + "Trend.html",
                    controller: "rutrace.trend"
                })
                .when('/top', {
                    templateUrl: viewDir + "Top.html",
                    controller: "rutrace.top"
                })
                .when('/topDistrict/:district', {
                    templateUrl: viewDir + "Top.html",
                    controller: "rutrace.top.district"
                })
                .when('/chart', {
                    templateUrl: viewDir + "Chart.html",
                    controller: "rutrace.chart"
                })
                .when('/top', {
                    templateUrl: viewDir + "Top.html",
                    controller: "rutrace.top"
                })
                .when('/import/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + "Import.html",
                    controller: "rutrace.import"
                })
                .when('/interference/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + "Interference/Index.html",
                    controller: "rutrace.interference"
                })
                .when('/coverage/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + "Coverage/Index.html",
                    controller: "rutrace.coverage"
                })
                .when('/baidumap/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + "Map/Index.html",
                    controller: "rutrace.map"
                })
                .when('/details/:number', {
                    templateUrl: viewDir + "WorkItem/AnalyticDetails.html",
                    controller: "workitem.details"
                })
                .when('/workItems/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + 'WorkItem/ForCell.html',
                    controller: "rutrace.workitems"
                })
                .when('/workitemDistrict/:district', {
                    templateUrl: viewDir + "WorkItem/ForCity.html",
                    controller: "workitem.district"
                })
                .when('/workitemCity', {
                    templateUrl: viewDir + "WorkItem/ForCity.html",
                    controller: "workitem.city"
                })
                .when('/cellTrend/:cellId/:sectorId/:name', {
                    templateUrl: viewDir + "WorkItem/CellTrend.html",
                    controller: "cell.trend"
                })
                .when('/mongo', {
                    templateUrl: viewDir + 'FromMongo.html',
                    controller: 'interference.mongo'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ])
    .run(function ($rootScope, kpiPreciseService) {
        var rootUrl = "/Rutrace#";
        $rootScope.menuItems = [
            {
                displayName: "总体情况",
                isActive: true,
                subItems: [
                    {
                        displayName: "指标总体情况",
                        url: rootUrl + "/"
                    }, {
                        displayName: "指标变化趋势",
                        url: rootUrl + "/trend"
                    }
                ]
            }, {
                displayName: "详细查询",
                isActive: false,
                subItems: []
            }, {
                displayName: "TOP指标",
                isActive: true,
                subItems: [
                    {
                        displayName: "分析",
                        url: rootUrl + "/top"
                    }
                ]
            }, {
                displayName: "辅助功能",
                isActive: false,
                subItems: [
                    {
                        displayName: "从MongoDB导入",
                        url: rootUrl + "/mongo"
                    }
                ]
            }
        ];
        $rootScope.rootPath = rootUrl + "/";

        $rootScope.viewData = {
            workItems: []
        };
        var lastSeason = new Date();
        lastSeason.setDate(lastSeason.getDate() - 100);
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $rootScope.beginDate = {
            value: new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate(), 8),
            opened: false
        };
        $rootScope.seasonDate = {
            value: new Date(lastSeason.getFullYear(), lastSeason.getMonth(), lastSeason.getDate(), 8),
            opened: false
        };
        var today = new Date();
        $rootScope.endDate = {
            value: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8),
            opened: false
        };
        $rootScope.orderPolicy = {
            options: [],
            selected: ""
        };
        $rootScope.topCount = {
            options: [5, 10, 15, 20, 30],
            selected: 15
        };
        kpiPreciseService.getOrderSelection().then(function (result) {
            $rootScope.orderPolicy.options = result;
            $rootScope.orderPolicy.selected = result[5];
        });
        $rootScope.closeAlert = function (messages, index) {
            messages.splice(index, 1);
        };

    })
    .controller("rutrace.root", function($scope, appRegionService, menuItemService) {
        $scope.page = { title: "指标总体情况" };
        $scope.overallStat = {
            currentDistrict: "",
            districtStats: [],
            townStats: [],
            cityStat: {},
            dateString: "",
            city: ""
        };
        $scope.trendStat = {
            stats: [],
            districts: [],
            districtStats: [],
            townStats: [],
            beginDateString: "",
            endDateString: ""
        };
        $scope.topStat = {
            current: {},
            cells: {},
            interference: {},
            victims: {},
            coverages: {},
            updateInteferenceProgress: {},
            updateVictimProgress: {},
            mongoNeighbors: {},
            pieOptions: {},
            columnOptions: {}
        };
        $scope.updateTopCells = function(cell) {
            var cellName = cell.eNodebName + "-" + cell.sectorId;
            if ($scope.topStat.cells[cellName] === undefined) {
                $scope.topStat.cells[cellName] = cell;
            }
        };
        $scope.city = {
            selected: "",
            options: []
        };

        appRegionService.initializeCities().then(function(result) {
            $scope.overallStat.city = result[0];
            $scope.city.options = result;
            $scope.city.selected = result[0];
            appRegionService.queryDistricts(result[0]).then(function(districts) {
                angular.forEach(districts, function(district) {
                    menuItemService.updateMenuItem($scope.menuItems, 2,
                        "TOP指标分析-" + district, $scope.rootPath + "topDistrict/" + district);
                });
            });
        });
    })
    .controller("rutrace.index", function($scope, appRegionService, appKpiService, kpiPreciseService, appFormatService) {
        $scope.page.title = "指标总体情况";
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        $scope.statDate = {
            value: yesterday,
            opened: false
        };
        $scope.showKpi = function(city) {
            kpiPreciseService.getRecentPreciseRegionKpi(city, $scope.statDate.value)
                .then(function(result) {
                    $scope.statDate.value = appFormatService.getDate(result.statDate);
                    angular.forEach(result.districtPreciseViews, function(view) {
                        view.objectRate = appKpiService.getPreciseObject(view.district);
                    });
                    $scope.overallStat.districtStats = result.districtPreciseViews;
                    $scope.overallStat.townStats = result.townPreciseViews;
                    $scope.overallStat.currentDistrict = result.districtPreciseViews[0].district;
                    $scope.overallStat.districtStats.push(appKpiService.getCityStat($scope.overallStat.districtStats, city));
                    $scope.overallStat.dateString = appFormatService.getDateString($scope.statDate.value, "yyyy年MM月dd日");
                });
        };
        $scope.$watch('city.selected', function(city) {
            if (city) {
                $scope.showKpi(city);
            }
        });
    })
    .controller('dump.cell.mongo', function($scope, $uibModalInstance, dumpProgress, appFormatService, dumpPreciseService,
        dialogTitle, eNodebId, sectorId, pci, begin, end) {
        $scope.dialogTitle = dialogTitle;

        $scope.dateRecords = [];
        $scope.currentDetails = [];
        $scope.currentIndex = 0;

        $scope.ok = function() {
            $uibModalInstance.close($scope.dateRecords);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.queryRecords = function() {
            $scope.mrsRsrpStats = [];
            $scope.mrsTaStats = [];
            angular.forEach($scope.dateRecords, function(record) {
                dumpProgress.queryExistedItems(eNodebId, sectorId, record.date).then(function(result) {
                    record.existedRecords = result;
                });
                dumpProgress.queryMongoItems(eNodebId, sectorId, record.date).then(function(result) {
                    record.mongoRecords = result;
                });
                dumpProgress.queryMrsRsrpItem(eNodebId, sectorId, record.date).then(function(result) {
                    record.mrsRsrpStats = result;
                    $scope.mrsRsrpStats.push({
                        statDate: result.statDate,
                        data: _.map(_.range(48), function (index) {
                            return result['rsrP_' + appFormatService.prefixInteger(index, 2)];
                        })
                    });
                });
                dumpProgress.queryMrsTadvItem(eNodebId, sectorId, record.date).then(function (result) {
                    record.mrsTaStats = result;
                    $scope.mrsTaStats.push({
                        statDate: result.statDate,
                        data: _.map(_.range(44), function (index) {
                            return result['tadv_' + appFormatService.prefixInteger(index, 2)];
                        })
                    });
                });
                dumpProgress.queryMrsPhrItem(eNodebId, sectorId, record.date).then(function (result) {
                    //console.log(result['powerHeadRoom_00']);
                    record.mrsPhrStats = result;
                });
                dumpProgress.queryMrsTadvRsrpItem(eNodebId, sectorId, record.date).then(function (result) {
                    //console.log(result['tadv00Rsrp00']);
                    record.mrsTaRsrpStats = result;
                });
            });
        };

        $scope.updateDetails = function (index) {
            $scope.currentIndex = index % $scope.dateRecords.length;
        };

        $scope.dumpAllRecords = function() {
            dumpPreciseService.dumpAllRecords($scope.dateRecords, 0, 0, eNodebId, sectorId, $scope.queryRecords);
        };

        var startDate = new Date(begin);
        while (startDate < end) {
            var date = new Date(startDate);
            $scope.dateRecords.push({
                date: date,
                existedRecords: 0,
                existedStat: false
            });
            startDate.setDate(date.getDate() + 1);
        }
        $scope.queryRecords();
    })
    .controller("rutrace.coverage", function ($scope, $routeParams, $uibModal, topPreciseService, preciseInterferenceService,
        preciseChartService, coverageService) {
        $scope.currentCellName = $routeParams.name + "-" + $routeParams.sectorId;
        $scope.page.title = "TOP指标覆盖分析: " + $scope.currentCellName;
        $scope.orderPolicy = topPreciseService.getOrderPolicySelection();
        $scope.detailsDialogTitle = $routeParams.name + "-" + $routeParams.sectorId + "详细小区统计";
        $scope.cellId = $routeParams.cellId;
        $scope.sectorId = $routeParams.sectorId;
        $scope.showCoverage = function () {
            topPreciseService.queryRsrpTa($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function (result) {
                    for (var rsrpIndex = 0; rsrpIndex < 12; rsrpIndex++) {
                        var options = preciseChartService.getRsrpTaOptions(result, rsrpIndex);
                        $("#rsrp-ta-" + rsrpIndex).highcharts(options);
                    }
            });
            topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function (result) {
                    var options = preciseChartService.getCoverageOptions(result);
                $("#coverage-chart").highcharts(options);
                });
            topPreciseService.queryTa($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function (result) {
                    var options = preciseChartService.getTaOptions(result);
                    $("#ta-chart").highcharts(options);
                });
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function (result) {
                    $scope.interferenceCells = result;
                    angular.forEach($scope.interferenceCells, function (neighbor) {
                        if (neighbor.destENodebId > 0) {
                            topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
                                neighbor.destENodebId, neighbor.destSectorId).then(function (coverage) {
                                    if (coverage.length > 0) {
                                        var coverageRate = coverageService.calculateWeakCoverageRate(coverage);
                                        neighbor.weakBelow115 = coverageRate.rate115;
                                        neighbor.weakBelow110 = coverageRate.rate110;
                                        neighbor.weakBelow105 = coverageRate.rate105;
                                    }
                                
                                });
                            topPreciseService.queryTa($scope.beginDate.value, $scope.endDate.value,
                                neighbor.destENodebId, neighbor.destSectorId).then(function(taList) {
                                if (taList.length > 0) {
                                    neighbor.overCover = coverageService.calculateOverCoverageRate(taList);
                                }
                            });
                        }
                    });
                });
            preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function (result) {
                    $scope.interferenceVictims = result;
                angular.forEach($scope.interferenceVictims, function(victim) {
                    if (victim.victimENodebId > 0) {
                        topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
                           victim.victimENodebId, victim.victimSectorId).then(function(coverage) {
                            if (coverage.length > 0) {
                                var coverageRate = coverageService.calculateWeakCoverageRate(coverage);
                                victim.weakBelow115 = coverageRate.rate115;
                                victim.weakBelow110 = coverageRate.rate110;
                                victim.weakBelow105 = coverageRate.rate105;
                            }

                           });
                        topPreciseService.queryTa($scope.beginDate.value, $scope.endDate.value,
                            victim.victimENodebId, victim.victimSectorId).then(function (taList) {
                                if (taList.length > 0) {
                                    victim.overCover = coverageService.calculateOverCoverageRate(taList);
                                }
                            });
                    }
                });
            });
        };
        $scope.showCoverage();
    })
    .controller('coverage.ta.dialog', function ($scope, $uibModalInstance, dialogTitle, cellId, sectorId, date,
        topPreciseService, cellPreciseService, kpiDisplayService) {
        $scope.dialogTitle = dialogTitle;
        $scope.chartView = {
            options: ['平均RSRP', '覆盖率'],
            selected: '平均RSRP'
        };
        topPreciseService.queryAverageRsrpTaStastic(cellId, sectorId, date).then(function (result) {
            var options = kpiDisplayService.getAverageRsrpTaOptions(result, cellId + '-' + sectorId + '平均RSRP统计');
            $("#average-rsrp").highcharts(options);
        });
        topPreciseService.queryAbove110TaRate(cellId, sectorId, date).then(function (above110Stat) {
            topPreciseService.queryAbove105TaRate(cellId, sectorId, date).then(function (above105Stat) {
                var options = kpiDisplayService.getAboveRateTaOptions(above110Stat, above105Stat, cellId + '-' + sectorId + '覆盖率统计');
                $("#coverage-rate").highcharts(options);
            });
        });

        $scope.ok = function () {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('coverage.ta.query.dialog', function ($scope, $uibModalInstance, dialogTitle, cellId, sectorId,
        topPreciseService, cellPreciseService, kpiDisplayService) {
        $scope.dialogTitle = dialogTitle;
        $scope.chartView = {
            options: ['平均RSRP', '覆盖率'],
            selected: '平均RSRP'
        };
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
        $scope.query = function () {
            topPreciseService.queryAverageRsrpTaStastic(cellId, sectorId, $scope.beginDate.value, $scope.endDate.value).then(function (result) {
                var options = kpiDisplayService.getAverageRsrpTaOptions(result, cellId + '-' + sectorId + '平均RSRP统计');
                $("#average-rsrp").highcharts(options);
            });
            topPreciseService.queryAbove110TaRate(cellId, sectorId, $scope.beginDate.value, $scope.endDate.value).then(function (above110Stat) {
                topPreciseService.queryAbove105TaRate(cellId, sectorId, $scope.beginDate.value, $scope.endDate.value).then(function (above105Stat) {
                    var options = kpiDisplayService.getAboveRateTaOptions(above110Stat, above105Stat, cellId + '-' + sectorId + '覆盖率统计');
                    $("#coverage-rate").highcharts(options);
                });
            });
        };

        $scope.ok = function () {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.query();
    })
    .controller("rutrace.chart", function ($scope, $location, $timeout, appKpiService) {
        if ($scope.overallStat.districtStats.length === 0) $location.path($scope.rootPath);

        $scope.showCharts = function () {
            $("#mr-pie").highcharts(appKpiService.getMrPieOptions(
                $scope.overallStat.districtStats.slice(0, $scope.overallStat.districtStats.length - 1),
                $scope.overallStat.townStats));
            $("#precise").highcharts(appKpiService.getPreciseRateOptions($scope.overallStat.districtStats,
                $scope.overallStat.townStats));
        };

        $timeout(function () {
            $scope.showCharts();
        }, 1000);
    })
    .controller("rutrace.top", function ($scope, $http, preciseInterferenceService, kpiPreciseService, workitemService) {
        $scope.page.title = "TOP指标分析";
        $scope.topCells = [];
        $scope.updateMessages = [];

        $scope.query = function () {
            $scope.topCells = [];
            kpiPreciseService.queryTopKpis($scope.beginDate.value, $scope.endDate.value, $scope.topCount.selected,
                $scope.orderPolicy.selected).then(function (result) {
                    $scope.topCells = result;
                    angular.forEach(result, function (cell) {
                        workitemService.queryByCellId(cell.cellId, cell.sectorId).then(function (items) {
                            if (items.length > 0) {
                                for (var j = 0; j < $scope.topCells.length; j++) {
                                    if (items[0].eNodebId === $scope.topCells[j].cellId && items[0].sectorId === $scope.topCells[j].sectorId) {
                                        $scope.topCells[j].hasWorkItems = true;
                                        break;
                                    }
                                }
                            }
                        });
                        preciseInterferenceService.queryMonitor(cell.cellId, cell.sectorId).then(function (monitored) {
                            cell.isMonitored = monitored;
                        });
                    });
                });
        };
        $scope.monitorAll = function () {
            angular.forEach($scope.topCells, function (cell) {
                if (cell.isMonitored === false) {
                    preciseInterferenceService.addMonitor(cell);
                }
            });
        };

        $scope.query();

    })
    .controller("rutrace.top.district", function ($scope, $routeParams, preciseInterferenceService, kpiPreciseService, workitemService) {
        $scope.page.title = "TOP指标分析-" + $routeParams.district;
        $scope.topCells = [];
        $scope.updateMessages = [];

        $scope.query = function () {
            $scope.topCells = [];
            kpiPreciseService.queryTopKpisInDistrict($scope.beginDate.value, $scope.endDate.value, $scope.topCount.selected,
                $scope.orderPolicy.selected, $scope.overallStat.city, $routeParams.district).then(function (result) {
                    $scope.topCells = result;
                    angular.forEach(result, function (cell) {
                        workitemService.queryByCellId(cell.cellId, cell.sectorId).then(function (items) {
                            if (items.length > 0) {
                                for (var j = 0; j < $scope.topCells.length; j++) {
                                    if (items[0].eNodebId === $scope.topCells[j].cellId && items[0].sectorId === $scope.topCells[j].sectorId) {
                                        $scope.topCells[j].hasWorkItems = true;
                                        break;
                                    }
                                }
                            }
                        });
                        preciseInterferenceService.queryMonitor(cell.cellId, cell.sectorId).then(function (monitored) {
                            cell.isMonitored = monitored;
                        });
                    });
                });
        };
        $scope.monitorAll = function () {
            angular.forEach($scope.topCells, function (cell) {
                if (cell.isMonitored === false) {
                    preciseInterferenceService.addMonitor(cell);
                }
            });
        };

        $scope.query();
    })
    .controller("rutrace.trend", function ($scope, appRegionService, appKpiService, kpiPreciseService, appFormatService) {
        $scope.page.title = "指标变化趋势";

        $scope.showCharts = function () {
            $("#mr-pie").highcharts(appKpiService.getMrPieOptions($scope.trendStat.districtStats,
                $scope.trendStat.townStats));
            $("#precise").highcharts(appKpiService.getPreciseRateOptions($scope.trendStat.districtStats,
                $scope.trendStat.townStats));
            $("#time-mr").highcharts(appKpiService.getMrsDistrictOptions($scope.trendStat.stats,
                $scope.trendStat.districts));
            $("#time-precise").highcharts(appKpiService.getPreciseDistrictOptions($scope.trendStat.stats,
                $scope.trendStat.districts));
        };
        $scope.showTrend = function () {
            kpiPreciseService.getDateSpanPreciseRegionKpi($scope.city.selected, $scope.beginDate.value, $scope.endDate.value)
                .then(function (result) {
                    $scope.trendStat.stats = appKpiService.generateDistrictStats($scope.trendStat.districts, result);
                    if (result.length > 0) {
                        appKpiService.generateTrendStatsForPie($scope.trendStat, result);
                        $scope.trendStat.stats.push(appKpiService.calculateAverageRates($scope.trendStat.stats));
                    }
                    $scope.trendStat.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
                    $scope.trendStat.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
                    $scope.showCharts();
                });
        };
        appRegionService.queryDistricts($scope.city.selected)
            .then(function (districts) {
                $scope.trendStat.districts = districts;
                $scope.showTrend();
            });
    })
    .controller("cell.trend", function ($scope, $routeParams, appKpiService, cellPreciseService,
        kpiDisplayService, appFormatService) {
        $scope.page.title = "小区指标变化趋势分析" + "-" + $routeParams.name;
        $scope.showTrend = function () {
            $scope.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
            $scope.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
            cellPreciseService.queryDataSpanKpi($scope.beginDate.value, $scope.endDate.value, $routeParams.cellId,
                $routeParams.sectorId).then(function (result) {
                    $scope.mrsConfig = kpiDisplayService.getMrsOptions(result,
                        $scope.beginDateString + "-" + $scope.endDateString + "MR数变化趋势");
                    $scope.preciseConfig = kpiDisplayService.getPreciseOptions(result,
                        $scope.beginDateString + "-" + $scope.endDateString + "精确覆盖率变化趋势");
                });
        };
        $scope.showTrend();
    })
    .controller("rutrace.import", function ($scope, $http, $routeParams,
        menuItemService, neighborService, neighborMongoService, neighborDialogService,
        preciseInterferenceService, networkElementService) {
        $scope.currentCellName = $routeParams.name + "-" + $routeParams.sectorId;
        $scope.page.title = "TOP指标邻区监控: " + $scope.currentCellName;
        menuItemService.updateMenuItem($scope.menuItems, 1, $scope.page.title,
            $scope.rootPath + "import/" + $routeParams.cellId + "/" + $routeParams.sectorId + "/" + $routeParams.name);
        $scope.currentPage = 1;
        $scope.neighborCells = [];
        $scope.updateMessages = [];
        preciseInterferenceService.queryMonitor($routeParams.cellId, $routeParams.sectorId).then(function (result) {
            $scope.cellMonitored = result;
        });

        $scope.showNeighbors = function () {
            $scope.neighborCells = [];
            neighborService.queryCellNeighbors($routeParams.cellId, $routeParams.sectorId).then(function (result) {
                $scope.neighborCells = result;
                angular.forEach(result, function (neighbor) {
                    preciseInterferenceService.queryMonitor(neighbor.cellId, neighbor.sectorId).then(function (monitored) {
                        neighbor.isMonitored = monitored;
                    });
                });
            });

        };
        $scope.showReverseNeighbors = function () {
            neighborMongoService.queryReverseNeighbors($routeParams.cellId, $routeParams.sectorId).then(function (result) {
                $scope.reverseCells = result;
                angular.forEach(result, function (neighbor) {
                    networkElementService.queryENodebInfo(neighbor.cellId).then(function (info) {
                        neighbor.eNodebName = info.name;
                    });
                    preciseInterferenceService.queryMonitor(neighbor.cellId, neighbor.sectorId).then(function (monitored) {
                        neighbor.isMonitored = monitored;
                    });
                });
            });
        }
        $scope.updatePci = function () {
            var cell = $scope.topStat.current;
            neighborService.updateCellPci(cell).then(function (result) {
                $scope.updateMessages.push({
                    cellName: cell.eNodebName + '-' + cell.sectorId,
                    counts: result
                });
                $scope.showNeighbors();
            });
        };
        $scope.synchronizeNeighbors = function () {
            var count = 0;
            neighborMongoService.queryNeighbors($routeParams.cellId, $routeParams.sectorId).then(function (neighbors) {
                angular.forEach(neighbors, function (neighbor) {
                    if (neighbor.neighborCellId > 0 && neighbor.neighborPci > 0) {
                        neighborService.updateNeighbors(neighbor.cellId, neighbor.sectorId, neighbor.neighborPci,
                            neighbor.neighborCellId, neighbor.neighborSectorId).then(function () {
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
        $scope.addMonitor = function () {
            preciseInterferenceService.addMonitor({
                cellId: $routeParams.cellId,
                sectorId: $routeParams.sectorId
            });
        };
        $scope.monitorNeighbors = function () {
            angular.forEach($scope.neighborCells, function (cell) {
                if (cell.isMonitored === false) {
                    neighborService.monitorNeighbors(cell).then(function () {
                        cell.isMonitored = true;
                    });
                }
            });
            angular.forEach($scope.reverseCells, function (cell) {
                if (cell.isMonitored === false) {
                    neighborService.monitorNeighbors({
                        nearestCellId: cell.cellId,
                        nearestSectorId: cell.sectorId
                    }).then(function () {
                        cell.isMonitored = true;
                    });
                }
            });
        };

        $scope.dump = function () {
            networkElementService.queryCellInfo($routeParams.cellId, $routeParams.sectorId).then(function (info) {
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
    })
    .controller("rutrace.map", function ($scope, $timeout, $routeParams,
        geometryService, baiduMapService, networkElementService, neighborDialogService,
        menuItemService, cellPreciseService, neighborMongoService, preciseInterferenceService) {
        $scope.page.title = "小区地理化分析" + ": " + $routeParams.name + "-" + $routeParams.sectorId;
        $scope.neighborLines = [];
        $scope.displayNeighbors = false;
        $scope.reverseNeighborLines = [];
        $scope.displayReverseNeighbors = false;
        $scope.interferenceLines = [];
        $scope.interferenceCircles = [];
        $scope.displayInterference = false;
        $scope.victimLines = [];
        $scope.victimCircles = [];
        $scope.displayVictims = false;
        menuItemService.updateMenuItem($scope.menuItems, 1,
            $scope.page.title,
            $scope.rootPath + "baidumap/" + $routeParams.cellId + "/" + $routeParams.sectorId + "/" + $routeParams.name);

        baiduMapService.initializeMap("all-map", 12);
        cellPreciseService.queryOneWeekKpi($routeParams.cellId, $routeParams.sectorId).then(function (cellView) {
            networkElementService.queryCellSectors([cellView]).then(function (result) {
                geometryService.transformToBaidu(result[0].longtitute, result[0].lattitute).then(function (coors) {
                    var xOffset = coors.x - result[0].longtitute;
                    var yOffset = coors.y - result[0].lattitute;
                    result[0].longtitute = coors.x;
                    result[0].lattitute = coors.y;

                    var sectorTriangle = baiduMapService.generateSector(result[0], "blue", 1.25);
                    baiduMapService.addOneSectorToScope(sectorTriangle, neighborDialogService.showPrecise, result[0]);

                    baiduMapService.setCellFocus(result[0].longtitute, result[0].lattitute, 15);
                    var range = baiduMapService.getCurrentMapRange(-xOffset, -yOffset);

                    networkElementService.queryRangeSectors(range, []).then(function (sectors) {
                        angular.forEach(sectors, function (sector) {
                            sector.longtitute += xOffset;
                            sector.lattitute += yOffset;
                            baiduMapService.addOneSectorToScope(
                                baiduMapService.generateSector(sector, "green"),
                                neighborDialogService.showNeighbor, sector);
                        });
                    });
                });

            });
        });

        networkElementService.queryCellInfo($routeParams.cellId, $routeParams.sectorId).then(function (cell) {
            if (cell) {
                $scope.generateComponents(cell);
            }
        });

        $scope.generateComponents = function (cell) {
            geometryService.transformToBaidu(cell.longtitute, cell.lattitute).then(function (coors) {
                var xOffset = coors.x - cell.longtitute;
                var yOffset = coors.y - cell.lattitute;
                neighborMongoService.queryNeighbors($routeParams.cellId, $routeParams.sectorId).then(function (neighbors) {
                    baiduMapService.generateNeighborLines($scope.neighborLines, cell, neighbors, xOffset, yOffset);
                });
                neighborMongoService.queryReverseNeighbors($routeParams.cellId, $routeParams.sectorId).then(function (neighbors) {
                    baiduMapService.generateReverseNeighborLines($scope.reverseNeighborLines, cell, neighbors, xOffset, yOffset);
                });
                preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                    $routeParams.cellId, $routeParams.sectorId).then(function (interference) {
                        baiduMapService.generateInterferenceComponents(
                            $scope.interferenceLines, $scope.interferenceCircles, cell,
                            interference, xOffset, yOffset, "orange",
                            neighborDialogService.showInterferenceSource);
                    });
                preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                    $routeParams.cellId, $routeParams.sectorId).then(function (victims) {
                        baiduMapService.generateVictimComponents($scope.victimLines, $scope.victimCircles, cell,
                            victims, xOffset, yOffset, "green",
                            neighborDialogService.showInterferenceVictim);
                    });
            });
        };

        $scope.toggleNeighbors = function () {
            if ($scope.displayNeighbors) {
                baiduMapService.removeOverlays($scope.neighborLines);
                $scope.displayNeighbors = false;
            } else {
                baiduMapService.addOverlays($scope.neighborLines);
                $scope.displayNeighbors = true;
            }
        };

        $scope.toggleReverseNeighbers = function () {
            if ($scope.displayReverseNeighbors) {
                baiduMapService.removeOverlays($scope.reverseNeighborLines);
                $scope.displayReverseNeighbors = false;
            } else {
                baiduMapService.addOverlays($scope.reverseNeighborLines);
                $scope.displayReverseNeighbors = true;
            }
        };

        $scope.toggleInterference = function () {
            if ($scope.displayInterference) {
                baiduMapService.removeOverlays($scope.interferenceLines);
                baiduMapService.removeOverlays($scope.interferenceCircles);
                $scope.displayInterference = false;
            } else {
                baiduMapService.addOverlays($scope.interferenceLines);
                baiduMapService.addOverlays($scope.interferenceCircles);
                $scope.displayInterference = true;
            }
        };

        $scope.toggleVictims = function () {
            if ($scope.displayVictims) {
                baiduMapService.removeOverlays($scope.victimLines);
                baiduMapService.removeOverlays($scope.victimCircles);
                $scope.displayVictims = false;
            } else {
                baiduMapService.addOverlays($scope.victimLines);
                baiduMapService.addOverlays($scope.victimCircles);
                $scope.displayVictims = true;
            }
        };
    })
    .controller('map.precise.dialog', function ($scope, $uibModalInstance, precise, dialogTitle) {
        $scope.preciseSector = precise;
        $scope.dialogTitle = dialogTitle;

        $scope.ok = function () {
            $uibModalInstance.close($scope.preciseSector);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('map.source.dialog', function ($scope, $uibModalInstance, neighbor, dialogTitle) {
        $scope.neighbor = neighbor;
        $scope.dialogTitle = dialogTitle;

        $scope.ok = function () {
            $uibModalInstance.close($scope.neighbor);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("rutrace.interference", function ($scope, $timeout, $routeParams,
        networkElementService, topPreciseService, kpiDisplayService, preciseInterferenceService, menuItemService, neighborMongoService) {
        $scope.currentCellName = $routeParams.name + "-" + $routeParams.sectorId;
        $scope.page.title = "TOP指标干扰分析: " + $scope.currentCellName;
        menuItemService.updateMenuItem($scope.menuItems, 1, $scope.page.title,
            $scope.rootPath + "interference/" + $routeParams.cellId + "/" + $routeParams.sectorId + "/" + $routeParams.name);
        $scope.oneAtATime = false;
        $scope.orderPolicy = topPreciseService.getOrderPolicySelection();
        $scope.updateMessages = [];

        $scope.showInterference = function () {
            $scope.interferenceCells = [];
            $scope.victimCells = [];

            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function (result) {
                    angular.forEach(result, function (cell) {
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
                        $routeParams.cellId, $routeParams.sectorId).then(function (victims) {
                            angular.forEach(victims, function (victim) {
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
                    topPreciseService.queryRsrpTa($scope.beginDate.value, $scope.endDate.value, 
                        $routeParams.cellId, $routeParams.sectorId).then(function (info) {
                    });
                });
        };

        $scope.updateNeighborInfos = function () {
            if ($scope.topStat.updateInteferenceProgress[$scope.currentCellName] !== true) {
                $scope.topStat.updateInteferenceProgress[$scope.currentCellName] = true;
                preciseInterferenceService.updateInterferenceNeighbor($routeParams.cellId, $routeParams.sectorId).then(function (result) {
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
                preciseInterferenceService.updateInterferenceVictim($routeParams.cellId, $routeParams.sectorId).then(function (result) {
                    $scope.updateMessages.push({
                        cellName: $scope.currentCellName,
                        counts: result,
                        type: "被干扰"
                    });
                    $scope.topStat.updateVictimProgress[$scope.currentCellName] = false;
                });
            }
        }

        if ($scope.topStat.interference[$scope.currentCellName] === undefined) {
            neighborMongoService.queryNeighbors($routeParams.cellId, $routeParams.sectorId).then(function (result) {
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
            $timeout(function () {
                $("#interference-over6db").highcharts(newOptions.over6DbOption);
                $("#interference-over10db").highcharts(newOptions.over10DbOption);
                $("#interference-mod3").highcharts(newOptions.mod3Option);
                $("#interference-mod6").highcharts(newOptions.mod6Option);
                $("#strength-over6db").highcharts(newColumnOptions.over6DbOption);
                $("#strength-over10db").highcharts(newColumnOptions.over10DbOption);
            }, 1000);
        }
        networkElementService.queryCellInfo($routeParams.cellId, $routeParams.sectorId).then(function (info) {
            $scope.topStat.current = {
                cellId: $routeParams.cellId,
                sectorId: $routeParams.sectorId,
                eNodebName: $routeParams.name,
                longtitute: info.longtitute,
                lattitute: info.lattitute
            };
        });
    })
    .controller('interference.coverage.dialog', function ($scope, $uibModalInstance, dialogTitle, preciseCells,
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
        $scope.showCoverage = function () {
            $scope.coverageInfos = [];
            angular.forEach($scope.preciseCells, function (cell) {
                networkElementService.queryCellInfo(cell.eNodebId, cell.sectorId).then(function (info) {
                    topPreciseService.queryCellStastic(cell.eNodebId, info.pci, $scope.beginDate.value, $scope.endDate.value).then(function (result) {
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

        $scope.ok = function () {
            $uibModalInstance.close($scope.coverageInfos);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showCoverage();
    })
    .controller('interference.mongo', function ($scope, neighborMongoService, neighborDialogService,
        dumpProgress, networkElementService, dumpPreciseService) {
        $scope.progressInfo = {
            dumpCells: [],
            totalSuccessItems: 0,
            totalFailItems: 0,
            cellInfo: ""
        };
        $scope.page.title = "从MongoDB导入";
        $scope.currentPage = 1;

        $scope.reset = function () {
            dumpProgress.resetProgress($scope.beginDate.value, $scope.endDate.value).then(function (result) {
                $scope.progressInfo.dumpCells = result;
                $scope.progressInfo.totalFailItems = 0;
                $scope.progressInfo.totalSuccessItems = 0;
                angular.forEach($scope.progressInfo.dumpCells, function (cell) {
                    networkElementService.queryENodebInfo(cell.eNodebId).then(function (eNodeb) {
                        cell.name = eNodeb.name;
                    });
                    cell.dumpInfo = "未开始";
                });
            });
        };

        $scope.dumpMongo = function (cell) {
            neighborDialogService.dumpMongo(cell, $scope.beginDate.value, $scope.endDate.value);
        };

        $scope.generateDumpRecords = function (dumpRecords, startDate, endDate, eNodebId, sectorId, pci) {
            if (startDate >= endDate) {
                dumpPreciseService.dumpAllRecords(dumpRecords, 0, 0, eNodebId, sectorId, $scope.dump);
                return;
            }
            var date = new Date(startDate);
            dumpProgress.queryExistedItems(eNodebId, sectorId, date).then(function (existed) {
                dumpProgress.queryMongoItems(eNodebId, pci, date).then(function (records) {
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

        $scope.dump = function () {
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
    .controller('neighbors.dialog', function ($scope, $uibModalInstance, geometryService,
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

        $scope.ok = function () {
            $uibModalInstance.close($scope.nearestCell);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('interference.source.db.chart', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
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
        $scope.showChart = function () {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                    $("#interference-over6db").highcharts(pieOptions.over6DbOption);
                    $("#interference-over10db").highcharts(pieOptions.over10DbOption);
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.source.dialog', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId,
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

        $scope.showInterference = function () {
            $scope.interferenceCells = [];

            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    angular.forEach(result, function (cell) {
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

        $scope.ok = function () {
            $uibModalInstance.close($scope.interferenceCells);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        neighborMongoService.queryNeighbors(eNodebId, sectorId).then(function (result) {
            $scope.mongoNeighbors = result;
            $scope.showInterference();
        });
    })
    .controller('interference.source.mod.chart', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
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
        $scope.showChart = function () {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                    $("#interference-mod3").highcharts(pieOptions.mod3Option);
                    $("#interference-mod6").highcharts(pieOptions.mod6Option);
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.source.strength.chart', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
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
        $scope.showChart = function () {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    networkElementService.queryCellInfo(eNodebId, sectorId).then(function (info) {
                        topPreciseService.queryCellStastic(eNodebId, info.pci,
                            $scope.beginDate.value, $scope.endDate.value).then(function (stastic) {
                                var columnOptions = kpiDisplayService.getStrengthColumnOptions(result, stastic.mrCount,
                                    $scope.currentCellName);
                                $("#strength-over6db").highcharts(columnOptions.over6DbOption);
                                $("#strength-over10db").highcharts(columnOptions.over10DbOption);
                            });
                    });
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.victim.dialog', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId,
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

        $scope.showVictim = function () {
            $scope.victimCells = [];

            preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (victims) {
                    preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                        eNodebId, sectorId).then(function (result) {
                            angular.forEach(victims, function (victim) {
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

        $scope.ok = function () {
            $uibModalInstance.close($scope.victimCells);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showVictim();
    })
    .controller("rutrace.workitems", function ($scope, $routeParams, workitemService, networkElementService) {
        $scope.page.title = $routeParams.name + "-" + $routeParams.sectorId + ":TOP小区工单历史";
        $scope.queryWorkItems = function () {
            workitemService.queryByCellId($routeParams.cellId, $routeParams.sectorId).then(function (result) {
                $scope.viewItems = result;
                $scope.viewData.workItems = result;
            });
            networkElementService.queryCellInfo($routeParams.cellId, $routeParams.sectorId).then(function (result) {
                $scope.lteCellDetails = result;
            });
        };
        $scope.queryWorkItems();
    })
    .controller("workitem.details", function ($scope, $routeParams, $uibModal, $log,
        workitemService, appFormatService, cellPreciseService, kpiDisplayService, preciseWorkItemService, networkElementService) {
        $scope.page.title = "工单编号" + $routeParams.number + "信息";
        $scope.serialNumber = $routeParams.number;
        $scope.initialize = true;
        $scope.queryWorkItems = function () {
            workitemService.querySingleItem($routeParams.number).then(function (result) {
                $scope.currentView = result;
                $scope.beginDate.value = appFormatService.getDate($scope.currentView.beginTime);
                $scope.showTrend();
            });

        };
        $scope.queryPreciseCells = function () {
            preciseWorkItemService.queryBySerial($routeParams.number).then(function (cells) {
                $scope.preciseCells = cells;
                angular.forEach(cells, function (cell) {
                    networkElementService.queryENodebInfo(cell.eNodebId).then(function (info) {
                        cell.cellName = info.name + '-' + cell.sectorId;
                    });
                });
            });
        };
        $scope.showTrend = function () {
            $scope.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
            $scope.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
            cellPreciseService.queryDataSpanKpi($scope.beginDate.value, $scope.endDate.value, $scope.currentView.eNodebId,
                $scope.currentView.sectorId).then(function (result) {
                    $scope.mrsConfig = kpiDisplayService.getMrsOptions(result,
                        $scope.beginDateString + "-" + $scope.endDateString + "MR数变化趋势");
                    $scope.preciseConfig = kpiDisplayService.getPreciseOptions(result,
                        $scope.beginDateString + "-" + $scope.endDateString + "精确覆盖率变化趋势");
                    if ($scope.initialize && result.length > 14) {
                        var output = kpiDisplayService.calculatePreciseChange(result);
                        $scope.preKpi = output.pre;
                        $scope.postKpi = output.post;
                        $scope.initialize = false;
                    }
                });
        };
        $scope.finishItem = function () {
            workitemService.finish('优化前精确覆盖率：' + $scope.preKpi + '%；优化后精确覆盖率：' + $scope.postKpi + '%',
                $scope.serialNumber).then(function (view) {
                    $scope.currentView = view;
                });
        };

        $scope.queryWorkItems();
        $scope.queryPreciseCells();
    })
    .controller("workitem.city", function ($scope, preciseWorkItemService, workItemDialog) {
        $scope.page.title = "精确覆盖优化工单一览";
        $scope.queryWorkItems = function () {
            preciseWorkItemService.queryByDateSpan($scope.seasonDate.value, $scope.endDate.value).then(function (views) {
                angular.forEach(views, function (view) {
                    view.detailsPath = $scope.rootPath + "details/" + view.serialNumber;
                });
                $scope.viewItems = views;
            });
        };
        $scope.showDetails = function (view) {
            workItemDialog.showDetails(view, $scope.queryWorkItems);
        };
        $scope.queryWorkItems();
    })
    .controller("workitem.district", function ($scope, $routeParams, preciseWorkItemService, workItemDialog) {
        $scope.page.title = $routeParams.district + "精确覆盖优化工单一览";
        $scope.queryWorkItems = function () {
            preciseWorkItemService.queryByDateSpanDistrict($scope.seasonDate.value, $scope.endDate.value, $routeParams.district).then(function (views) {
                angular.forEach(views, function (view) {
                    view.detailsPath = $scope.rootPath + "details/" + view.serialNumber;
                });
                $scope.viewItems = views;
            });
        };
        $scope.showDetails = function (view) {
            workItemDialog.showDetails(view, $scope.queryWorkItems);
        };
        $scope.queryWorkItems();
    });
