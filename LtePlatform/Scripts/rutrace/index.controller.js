angular.module('myApp', ['app.common'])
    .config([
        '$routeProvider', function($routeProvider) {
            var viewDir = "/appViews/Rutrace/";
            $routeProvider
                .when('/', {
                    templateUrl: viewDir + "",
                    controller: ""
                })
                .when('/trend', {
                    templateUrl: viewDir + "Trend.html",
                    controller: "rutrace.trend"
                })
                .when('/traditional', {
                    templateUrl:  '/appViews/BasicKpi/Index.html',
                    controller: "kpi.basic"
                })
                .when('/topDrop2G', {
                    templateUrl: '/appViews/BasicKpi/TopDrop2G.html',
                    controller: 'kpi.topDrop2G'
                })
                .when('/top', {
                    templateUrl: viewDir + "Top.html",
                    controller: "rutrace.top"
                })
                .when('/topDistrict/:district', {
                    templateUrl: viewDir + "Top.html",
                    controller: "rutrace.top.district"
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
                        displayName: "指标总览",
                        url: rootUrl + "/"
                    }, {
                        displayName: "精确覆盖",
                        url: rootUrl + "/trend"
                    }, {
                        displayName: "传统指标",
                        url: rootUrl + "/traditional"
                    }
                ]
            }, {
                displayName: "详细查询",
                isActive: false,
                subItems: []
            }, {
                displayName: "TOP指标",
                isActive: false,
                subItems: [
                    {
                        displayName: "精确覆盖率TOP指标",
                        url: rootUrl + "/top"
                    }, {
                        displayName: "TOP传统指标",
                        url: rootUrl + "/topDrop2G"
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
        $scope.page = { title: $scope.menuItems[0].subItems[0].displayName };
        $scope.overallStat = {
            currentDistrict: "",
            districtStats: [],
            townStats: [],
            cityStat: {},
            dateString: ""
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
    .controller("kpi.basic", function ($scope, appRegionService, appFormatService, kpi2GService, workItemDialog) {
        $scope.page.title = $scope.menuItems[0].subItems[2].displayName;
        $scope.views = {
            options: ['主要', '2G', '3G'],
            selected: '主要'
        };
        $scope.showKpi = function () {
            kpi2GService.queryDayStats($scope.city.selected, $scope.statDate.value).then(function (result) {
                $scope.statDate.value = appFormatService.getDate(result.statDate);
                $scope.statList = result.statViews;
            });
        };
        $scope.showTrend = function() {
            workItemDialog.showBasicTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
        };
        $scope.$watch('city.selected', function (city) {
            if (city) {
                $scope.showKpi();
            }
        });
    })
    .controller('kpi.topDrop2G', function ($scope, appRegionService, appFormatService, drop2GService, connection3GService, workItemDialog) {
        $scope.page.title = $scope.menuItems[2].subItems[1].displayName;
        $scope.topData = {
            drop2G: [],
            connection3G: []
        };
        $scope.showKpi = function () {
            drop2GService.queryDayStats($scope.city.selected, $scope.statDate.value).then(function (result) {
                $scope.statDate.value = appFormatService.getDate(result.statDate);
                $scope.topData.drop2G = result.statViews;
            });
            connection3GService.queryDayStats($scope.city.selected, $scope.statDate.value).then(function (result) {
                $scope.statDate.value = appFormatService.getDate(result.statDate);
                $scope.topData.connection3G = result.statViews;
            });
        };
        $scope.showDropTrend = function() {
            workItemDialog.showTopDropTrend($scope.city.selected, $scope.beginDate, $scope.endDate, $scope.topCount);
        };
        $scope.showConnectionTrend = function () {
            workItemDialog.showTopConnectionTrend($scope.city.selected, $scope.beginDate, $scope.endDate, $scope.topCount);
        };
        $scope.$watch('city.selected', function (city) {
            if (city) {
                $scope.showKpi();
            }
            
        });
    })
.controller("home.workitem", function ($scope, workitemService) {
    
})
    .controller("rutrace.top", function ($scope, $http, preciseInterferenceService, kpiPreciseService, workitemService) {
        $scope.page.title = $scope.menuItems[2].subItems[0].displayName;
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
                $scope.orderPolicy.selected, $scope.city.selected, $routeParams.district).then(function (result) {
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
    .controller("rutrace.trend", function ($scope, appRegionService, appKpiService, kpiPreciseService, appFormatService, workItemDialog) {
        $scope.page.title = $scope.menuItems[0].subItems[1].displayName;

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
        $scope.showChart = function() {
            workItemDialog.showPreciseChart($scope.overallStat);
        };
        $scope.$watch('city.selected', function(city) {
            if (city) {
                $scope.showKpi(city);
            }
        });
        $scope.showTrend = function () {
            workItemDialog.showPreciseTrend($scope.trendStat, $scope.city, $scope.beginDate, $scope.endDate);
        };
        appRegionService.queryDistricts($scope.city.selected)
            .then(function (districts) {
                $scope.trendStat.districts = districts;
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
        baiduQueryService, baiduMapService, networkElementService, neighborDialogService, parametersDialogService,
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
                baiduQueryService.transformToBaidu(result[0].longtitute, result[0].lattitute).then(function (coors) {
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
            baiduQueryService.transformToBaidu(cell.longtitute, cell.lattitute).then(function (coors) {
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
