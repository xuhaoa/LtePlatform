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
    .controller("rutrace.map", function ($scope, $timeout, $routeParams,
        geometryService, baiduMapService, networkElementService, neighborDialogService, parametersDialogService,
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
                                parametersDialogService.showCellInfo, sector);
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
                    baiduMapService.generateNeighborLines($scope.neighborLines, {
                        cell: cell,
                        neighbors: neighbors,
                        xOffset: xOffset,
                        yOffset: yOffset
                    });
                });
                neighborMongoService.queryReverseNeighbors($routeParams.cellId, $routeParams.sectorId).then(function (neighbors) {
                    baiduMapService.generateReverseNeighborLines($scope.reverseNeighborLines, {
                        cell: cell,
                        neighbors: neighbors,
                        xOffset: xOffset,
                        yOffset: yOffset
                    });
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
    .controller('map.source.dialog', function ($scope, $uibModalInstance, neighbor, dialogTitle, topPreciseService, preciseChartService) {
        $scope.neighbor = neighbor;
        $scope.dialogTitle = dialogTitle;
        if (neighbor.cellId !== undefined) {
            $scope.cellId = neighbor.cellId;
            $scope.sectorId = neighbor.sectorId;
        } else {
            $scope.cellId = neighbor.destENodebId;
            $scope.sectorId = neighbor.destSectorId;
        }
        topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
            $scope.cellId, $scope.sectorId).then(function (result) {
            var options = preciseChartService.getCoverageOptions(result);
            $("#coverage-chart").highcharts(options);
        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.neighbor);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
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
