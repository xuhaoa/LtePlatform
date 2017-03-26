angular.module("myApp", ['app.common'])
    .config(function($stateProvider, $urlRouterProvider) {
        var viewDir = "/appViews/Home/";
        $stateProvider
            .state('list', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "Network.html",
                        controller: "home.network"
                    }
                },
                url: "/"
            })
            .state('dt', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.dt"
                    },
                    "contents": {
                        templateUrl: viewDir + "Network.html",
                        controller: "home.dt"
                    }
                },
                url: "/dt"
            })
            .state('kpi', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.kpi"
                    },
                    "contents": {
                        templateUrl: viewDir + "Network.html",
                        controller: "home.kpi"
                    }
                },
                url: "/kpi"
            })
            .state('plan', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.plan"
                    },
                    "contents": {
                        templateUrl: viewDir + "Plan.html",
                        controller: "home.plan"
                    }
                },
                url: "/plan"
            })
            .state('complain', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.complain"
                    },
                    "contents": {
                        templateUrl: viewDir + "Complain.html",
                        controller: "home.complain"
                    }
                },
                url: "/complain"
            })
            .state('mr', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.mr"
                    },
                    "contents": {
                        templateUrl: viewDir + "Mr.html",
                        controller: "home.mr"
                    }
                },
                url: "/mr"
            });
        $urlRouterProvider.otherwise('/');
    })
    .run(function ($rootScope, appUrlService, appRegionService) {
        $rootScope.rootPath = "/#/";

        $rootScope.page = {
            title: "基础数据总览"
        };
        appUrlService.initializeAuthorization();
        $rootScope.legend = {
            criteria: 0,
            sign: 0,
            title: ''
        };

        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $rootScope.beginDate = {
            value: new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate(), 8),
            opened: false
        };
        var today = new Date();
        $rootScope.endDate = {
            value: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8),
            opened: false
        };
        $rootScope.closeAlert = function(messages, index) {
            messages.splice(index, 1);
        };
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        $rootScope.statDate = {
            value: yesterday,
            opened: false
        };

        $rootScope.status = {
            isopen: false
        };
        $rootScope.city = {
            selected: "",
            options: []
        };
        appRegionService.initializeCities()
            .then(function(result) {
                $rootScope.city.options = result;
                $rootScope.city.selected = result[0];
            });

        $rootScope.indexedDB = {
            name: 'ouyh18',
            version: 7,
            db: null
        };
    })
    .controller("menu.root", function($scope, appUrlService) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "站点信息",
            subItems: [
                {
                    displayName: "数据总览",
                    url: rootUrl + "/Parameters/List"
                }, {
                    displayName: "数据维护",
                    url: appUrlService.getParameterUrlHost() + 'main-lte-cell-info.php'
                }, {
                    displayName: "数据查询",
                    url: appUrlService.getParameterUrlHost() + 'main-lte-cell-info-check.php'
                }, {
                    displayName: "历史信息查询",
                    url: appUrlService.getParameterUrlHost() + 'cell-modify-record.php'
                }, {
                    displayName: "边界漫游",
                    url: appUrlService.getParameterUrlHost() + 'lteboundary.html'
                }
            ]
        };
    })
    .controller('menu.plan', function($scope, appUrlService) {
        $scope.menuItem = {
            displayName: "规划支撑",
            subItems: [
                {
                    displayName: "规划辅助",
                    url: appUrlService.getPlanUrlHost() + 'guihuafuzhu/index/index.php'
                }, {
                    displayName: "完整准确性保障",
                    url: appUrlService.getParameterUrlHost() + 'zhunquexing2.php'
                }, {
                    displayName: "工程入网",
                    url: appUrlService.getParameterUrlHost() + 'zhunquexing2.php'
                }
            ]
        };
    })
    .controller('menu.complain', function ($scope) {
        $scope.menuItem = {
            displayName: "投诉管理",
            subItems: [
                {
                    displayName: "统计分析",
                    url: '/#/complain/stat'
                }
            ]
        };
    })
    .controller('menu.kpi', function($scope, appUrlService) {
        $scope.menuItem = {
            displayName: "指标优化",
            subItems: [
                {
                    displayName: "质量分析",
                    url: appUrlService.getTopnUrlHost(),
                    tooltip: "4G网络质量分析与日常优化"
                }, {
                    displayName: "负荷评估",
                    url: appUrlService.getParameterUrlHost() + 'ltecapability.html'
                }
            ]
        };
    })
    .controller('menu.mr', function($scope) {
        $scope.menuItem = {
            displayName: "MR分析",
            subItems: [
                {
                    displayName: "工单管控",
                    url: "/Kpi/WorkItem",
                    tooltip: "对接本部优化部4G网优平台，结合日常优化，实现对日常工单的监控和分析"
                }
            ]
        }
    })
    .controller('menu.dt', function($scope, appUrlService) {
        $scope.menuItem = {
            displayName: "路测管理",
            subItems: [
                {
                    displayName: "路测分析",
                    url: appUrlService.getDtUrlHost() + 'admin'
                }, {
                    displayName: "路测管理",
                    url: appUrlService.getDtUrlHost2(),
                    tooltip: "路测综合管理"
                }
            ]
        }
    })
    .controller("home.network", function ($scope, appRegionService, networkElementService, baiduMapService, coverageDialogService, authorizeService,
        geometryService, flowService, parametersDialogService, neGeometryService, baiduQueryService) {
        baiduMapService.initializeMap("map", 11);
        var colors = geometryService.queryMapColors();
        $scope.showOutdoorSites = function () {
            $scope.currentView = "室外站点";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            var city = $scope.city.selected;
            authorizeService.queryCurrentUserName().then(function (userName) {
                authorizeService.queryRolesInUser(userName).then(function (roles) {
                    angular.forEach(roles, function (role, $index) {
                        var district = authorizeService.queryRoleDistrict(role);
                        if (district) {
                            baiduMapService.addDistrictBoundary(district, colors[$index]);
                            networkElementService.queryOutdoorCellSites(city, district).then(function (sites) {
                                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function (coors) {
                                    var xOffset = coors.x - sites[0].longtitute;
                                    var yOffset = coors.y - sites[0].lattitute;
                                    baiduMapService.drawMultiPoints(sites, colors[$index], -xOffset, -yOffset, function(e) {
                                        var xCenter = e.point.lng - xOffset;
                                        var yCenter = e.point.lat - yOffset;
                                        networkElementService.queryRangeSectors(
                                            neGeometryService.queryNearestRange(xCenter, yCenter), []).then(function (sectors) {
                                            parametersDialogService.showCellsInfo(sectors);
                                        });
                                    });
                                });
                            });
                        }

                    });
                });
            });
        };

        $scope.showIndoorSites = function () {
            $scope.currentView = "室内站点";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            var city = $scope.city.selected;
            authorizeService.queryCurrentUserName().then(function (userName) {
                authorizeService.queryRolesInUser(userName).then(function (roles) {
                    angular.forEach(roles, function (role, $index) {
                        var district = authorizeService.queryRoleDistrict(role);
                        if (district) {
                            baiduMapService.addDistrictBoundary(district, colors[$index]);
                            networkElementService.queryIndoorCellSites(city, district).then(function (sites) {
                                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function (coors) {
                                    var xOffset = coors.x - sites[0].longtitute;
                                    var yOffset = coors.y - sites[0].lattitute;
                                    baiduMapService.drawMultiPoints(sites, colors[$index], -xOffset, -yOffset, function (e) {
                                        var xCenter = e.point.lng - xOffset;
                                        var yCenter = e.point.lat - yOffset;
                                        networkElementService.queryRangeSectors(
                                            neGeometryService.queryNearestRange(xCenter, yCenter), []).then(function (sectors) {
                                                parametersDialogService.showCellsInfo(sectors);
                                            });
                                    });
                                });
                            });
                        }

                    });
                });
            });
        };

        $scope.showFeelingRate = function() {
            if (!$scope.flowGeoPoints) {
                alert("计算未完成！请稍后点击。");
                return;
            }
            $scope.currentView = "下行感知速率";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            baiduQueryService.transformToBaidu($scope.flowGeoPoints[0].longtitute, $scope.flowGeoPoints[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.flowGeoPoints[0].longtitute;
                var yOffset = coors.y - $scope.flowGeoPoints[0].lattitute;
                var points = _.map($scope.flowGeoPoints, function (stat) {
                    return { "lng": stat.longtitute+xOffset, "lat": stat.lattitute+yOffset, "count": stat.downlinkFeelingRate };
                });
                var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
                baiduMapService.addOverlays([heatmapOverlay]);
                heatmapOverlay.setDataSet({ data: points, max: 50 });
                heatmapOverlay.show();
            });
            
        };

        $scope.showUplinkFeelingRate = function () {
            if (!$scope.flowGeoPoints) {
                alert("计算未完成！请稍后点击。");
                return;
            }
            $scope.currentView = "上行感知速率";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            baiduQueryService.transformToBaidu($scope.flowGeoPoints[0].longtitute, $scope.flowGeoPoints[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.flowGeoPoints[0].longtitute;
                var yOffset = coors.y - $scope.flowGeoPoints[0].lattitute;
                var points = _.map($scope.flowGeoPoints, function (stat) {
                    return { "lng": stat.longtitute + xOffset, "lat": stat.lattitute + yOffset, "count": stat.uplinkFeelingRate };
                });
                var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
                baiduMapService.addOverlays([heatmapOverlay]);
                heatmapOverlay.setDataSet({ data: points, max: 10 });
                heatmapOverlay.show();
            });

        };

        $scope.showLteTownStats = function () {
            var city = $scope.city.selected;
            coverageDialogService.showTownStats(city);
        };
        $scope.showCdmaTownStats = function () {
            var city = $scope.city.selected;
            coverageDialogService.showCdmaTownStats(city);
        };
        $scope.showFlow = function() {
            coverageDialogService.showFlowStats($scope.statDate.value || new Date());
        };
        $scope.showFlowTrend = function() {
            coverageDialogService.showFlowTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
        };
        $scope.showUsersTrend = function () {
            coverageDialogService.showUsersTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
        };
        $scope.showFeelingRateTrend = function () {
            coverageDialogService.showFeelingRateTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
        };
        flowService.queryENodebGeoFlowByDateSpan($scope.beginDate.value, $scope.endDate.value).then(function (result) {
            $scope.flowGeoPoints = result;
        });
        $scope.$watch('city.selected', function(city) {
            if (city) {
                $scope.showOutdoorSites();
            }
        });
    })
    .controller("home.dt", function ($scope, baiduMapService, coverageService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        coverageService.queryAreaTestDate().then(function(result) {
            console.log(result);
        });

    })
    .controller("home.mr", function ($scope, baiduMapService, coverageService, kpiDisplayService, parametersMapService, appUrlService) {
        baiduMapService.initializeMap("map", 13);
        
        var legend = kpiDisplayService.queryCoverageLegend('RSRP');
        $scope.legend.title = 'RSRP';
        $scope.legend.criteria = legend.criteria;
        $scope.legend.sign = legend.sign;
        $scope.currentDataLabel = "districtPoints";

        $scope.showTelecomCoverage = function () {
            $scope.currentView = "电信";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
            kpiDisplayService.generateTelecomRsrpPoints($scope.coveragePoints, $scope.data);
            parametersMapService.showIntervalPoints($scope.coveragePoints.intervals);
        };
        $scope.showUnicomCoverage = function () {
            $scope.currentView = "联通";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
            kpiDisplayService.generateUnicomRsrpPoints($scope.coveragePoints, $scope.data);
            parametersMapService.showIntervalPoints($scope.coveragePoints.intervals);
        };
        $scope.showMobileCoverage = function () {
            $scope.currentView = "移动";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
            kpiDisplayService.generateMobileRsrpPoints($scope.coveragePoints, $scope.data);
            parametersMapService.showIntervalPoints($scope.coveragePoints.intervals);
        };
        $scope.updateIndexedData = function() {
            var items = [];
            angular.forEach($scope.data, function(data) {
                data['topic'] = data.longtitute + ',' + data.lattitute;
                items.push(data);
            });
            appUrlService.refreshIndexedDb($scope.indexedDB.db, $scope.currentDataLabel, 'topic', items);
        };
        $scope.showDistrictRange = function() {
            coverageService.queryAgisDtPointsByTopic($scope.beginDate.value, $scope.endDate.value, '禅城').then(function (result) {
                $scope.data = result;
                $scope.currentDataLabel = 'districtPoints';
                $scope.updateIndexedData();
                $scope.showTelecomCoverage();
            });
        };
        $scope.showSmallRange = function() {
            coverageService.queryAgisDtPointsByTopic($scope.beginDate.value, $scope.endDate.value, '小范围').then(function(result) {
                $scope.data = result;
                $scope.currentDataLabel = 'rangePoints';
                $scope.updateIndexedData();
                $scope.showTelecomCoverage();
            });
        };
        $scope.switchData = function() {
            if ($scope.currentDataLabel === 'districtPoints') {
                $scope.currentDataLabel = 'rangePoints';
            } else {
                $scope.currentDataLabel = 'districtPoints';
            }
            appUrlService.fetchStoreByCursor($scope.indexedDB.db, $scope.currentDataLabel, function (items) {
                $scope.data = items;
                $scope.showTelecomCoverage();
            });
        };
        appUrlService.initializeIndexedDb($scope.indexedDB, ['districtPoints','rangePoints'], "topic", function () {
            appUrlService.fetchStoreByCursor($scope.indexedDB.db, 'districtPoints', function(items) {
                $scope.data = items;
                $scope.showTelecomCoverage();
            });
        });
    })
    .controller("home.complain", function ($scope, baiduMapService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

    })
    .controller("home.kpi", function ($scope, baiduMapService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

    })
    .controller("home.plan", function ($scope, baiduMapService, authorizeService, networkElementService, geometryService, 
        neGeometryService, parametersDialogService, baiduQueryService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        var colors = geometryService.queryMapColors();
        $scope.showAllSites = function() {
            $scope.currentView = "所有站点";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            var city = $scope.city.selected;

            authorizeService.queryCurrentUserName().then(function (userName) {
                authorizeService.queryRolesInUser(userName).then(function (roles) {
                    angular.forEach(roles, function (role, $index) {
                        var district = authorizeService.queryRoleDistrict(role);
                        if (district) {
                            baiduMapService.addDistrictBoundary(district, colors[$index]);
                            networkElementService.queryPlanningSites(city, district).then(function (sites) {
                                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function (coors) {
                                    var xOffset = coors.x - sites[0].longtitute;
                                    var yOffset = coors.y - sites[0].lattitute;
                                    baiduMapService.drawMultiPoints(sites, colors[$index], -xOffset, -yOffset, function (e) {
                                        var xCenter = e.point.lng - xOffset;
                                        var yCenter = e.point.lat - yOffset;
                                        networkElementService.queryRangePlanningSites(
                                            neGeometryService.queryNearestRange(xCenter, yCenter)).then(function (sectors) {
                                                if (sectors.length > 0) {
                                                    parametersDialogService.showPlanningSitesInfo(sectors[0]);
                                                }
                                                
                                            });
                                    });
                                });
                            });
                        }

                    });
                });
            });
        };
        $scope.showOpenningSites = function() {
            $scope.currentView = "待开通站点";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            var city = $scope.city.selected;

            authorizeService.queryCurrentUserName().then(function(userName) {
                authorizeService.queryRolesInUser(userName).then(function(roles) {
                    angular.forEach(roles, function(role, $index) {
                        var district = authorizeService.queryRoleDistrict(role);
                        if (district) {
                            baiduMapService.addDistrictBoundary(district, colors[$index]);
                            networkElementService.queryOpenningSites(city, district).then(function(sites) {
                                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function (coors) {
                                    var xOffset = coors.x - sites[0].longtitute;
                                    var yOffset = coors.y - sites[0].lattitute;
                                    baiduMapService.drawMultiPoints(sites, colors[$index], -xOffset, -yOffset, function(e) {
                                        var xCenter = e.point.lng - xOffset;
                                        var yCenter = e.point.lat - yOffset;
                                        networkElementService.queryRangePlanningSites(
                                            neGeometryService.queryNearestRange(xCenter, yCenter)).then(function(sectors) {
                                            if (sectors.length > 0) {
                                                parametersDialogService.showPlanningSitesInfo(sectors[0]);
                                            }

                                        });
                                    });
                                });
                            });
                        }

                    });
                });
            });
        };
        $scope.showOpenSites = function() {
            $scope.currentView = "已开通站点";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            var city = $scope.city.selected;

            authorizeService.queryCurrentUserName().then(function(userName) {
                authorizeService.queryRolesInUser(userName).then(function(roles) {
                    angular.forEach(roles, function(role, $index) {
                        var district = authorizeService.queryRoleDistrict(role);
                        if (district) {
                            baiduMapService.addDistrictBoundary(district, colors[$index]);
                            networkElementService.queryOpennedSites(city, district).then(function(sites) {
                                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function (coors) {
                                    var xOffset = coors.x - sites[0].longtitute;
                                    var yOffset = coors.y - sites[0].lattitute;
                                    baiduMapService.drawMultiPoints(sites, colors[$index], -xOffset, -yOffset, function(e) {
                                        var xCenter = e.point.lng - xOffset;
                                        var yCenter = e.point.lat - yOffset;
                                        networkElementService.queryRangePlanningSites(
                                            neGeometryService.queryNearestRange(xCenter, yCenter)).then(function(sectors) {
                                            if (sectors.length > 0) {
                                                parametersDialogService.showPlanningSitesInfo(sectors[0]);
                                            }

                                        });
                                    });
                                });
                            });
                        }

                    });
                });
            });
        };
        $scope.showAllSites();
    });
