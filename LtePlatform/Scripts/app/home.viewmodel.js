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
                        templateUrl: viewDir + "Network.html",
                        controller: "home.plan"
                    }
                },
                url: "/plan"
            });
        $urlRouterProvider.otherwise('/');
    })
    .run(function($rootScope, appUrlService, appRegionService) {
        $rootScope.rootPath = "/#/";

        $rootScope.page = {
            title: "基础数据总览"
        };
        appUrlService.initializeAuthorization();

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
    })
    .controller("menu.root", function($scope, appUrlService) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "射频优化",
            subItems: [
                {
                    displayName: "校园网专题优化",
                    url: "/College/Map",
                    tooltip: "校园网专项优化，包括数据管理、指标分析、支撑工作管理和校园网覆盖呈现"
                },
                {
                    displayName: "基础数据总览",
                    url: rootUrl + "/Parameters/List"
                }, {
                    displayName: "基础信息管理",
                    url: appUrlService.getParameterUrlHost() + 'cellInfo.html'
                }, {
                    displayName: "边界漫游信息",
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
                }
            ]
        };
    })
    .controller('menu.kpi', function($scope, appUrlService) {
        $scope.menuItem = {
            displayName: "指标优化",
            subItems: [
                {
                    displayName: "4G网络质量分析",
                    url: appUrlService.getTopnUrlHost(),
                    tooltip: "4G网络质量分析与日常优化"
                }, {
                    displayName: "指标总览",
                    url: "/Rutrace",
                    tooltip: "对指标的监控、分析和地理化呈现"
                }, {
                    displayName: "负荷评估",
                    url: appUrlService.getParameterUrlHost() + 'ltecapability.html'
                }, {
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
    .controller("home.network", function($scope, appRegionService, networkElementService, baiduMapService, coverageDialogService,
        geometryService, flowService) {
        baiduMapService.initializeMap("map", 11);
        var colors = ['#10d3c3', '#d310c3', '#d32310', '#10c303', '#c3d320', '#c340d3'];
        $scope.showOutdoorSites = function () {
            $scope.currentView = "室外站点";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            var city = $scope.city.selected;
            appRegionService.queryDistricts(city).then(function(districts) {
                angular.forEach(districts, function(district, $index) {
                    networkElementService.queryOutdoorCellSites(city, district).then(function(sites) {
                        geometryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                            var xOffset = coors.x - sites[0].longtitute;
                            var yOffset = coors.y - sites[0].lattitute;
                            baiduMapService.drawMultiPoints(sites, colors[$index], -xOffset, -yOffset);
                        });
                    });
                });
            });
        };

        $scope.showIndoorSites = function () {
            $scope.currentView = "室内站点";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            var city = $scope.city.selected;
            appRegionService.queryDistricts(city).then(function (districts) {
                angular.forEach(districts, function (district, $index) {
                    networkElementService.queryIndoorCellSites(city, district).then(function (sites) {
                        geometryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function (coors) {
                            var xOffset = coors.x - sites[0].longtitute;
                            var yOffset = coors.y - sites[0].lattitute;
                            baiduMapService.drawMultiPoints(sites, colors[$index], -xOffset, -yOffset);
                        });
                    });
                });
            });
        };

        $scope.showFeelingRate = function() {
            $scope.currentView = "感知速率";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            flowService.queryENodebGeoFlowByDateSpan($scope.beginDate.value, $scope.endDate.value).then(function(result) {
                console.log(result);
            });
            var points = [
                { "lng": 112.418261, "lat": 22.921984, "count": 50.2 },
                { "lng": 112.423332, "lat": 22.916532, "count": 51 },
                { "lng": 112.419787, "lat": 22.930658, "count": 15 },
                { "lng": 112.418455, "lat": 22.920921, "count": 40.4 },
                { "lng": 112.418843, "lat": 22.915516, "count": 100 },
                { "lng": 112.42546, "lat": 22.918503, "count": 6 },
                { "lng": 112.423289, "lat": 22.919989, "count": 18 },
                { "lng": 112.418162, "lat": 22.915051, "count": 80 },
                { "lng": 112.422039, "lat": 22.91782, "count": 11 },
                { "lng": 112.41387, "lat": 22.917253, "count": 7 },
                { "lng": 112.41773, "lat": 22.919426, "count": 42 },
                { "lng": 112.421107, "lat": 22.916445, "count": 4 },
                { "lng": 112.417521, "lat": 22.917943, "count": 27 },
                { "lng": 112.419812, "lat": 22.920836, "count": 23 },
                { "lng": 112.420682, "lat": 22.91463, "count": 60 },
                { "lng": 112.415424, "lat": 22.924675, "count": 8.3 },
                { "lng": 112.419242, "lat": 22.914509, "count": 15 },
                { "lng": 112.422766, "lat": 22.921408, "count": 25 },
                { "lng": 112.421674, "lat": 22.924396, "count": 21 },
                { "lng": 112.427268, "lat": 22.92267, "count": 1 },
                { "lng": 112.417721, "lat": 22.920034, "count": 51 },
                { "lng": 112.412456, "lat": 22.92667, "count": 7 },
                { "lng": 112.420432, "lat": 22.919114, "count": 11 },
                { "lng": 112.425013, "lat": 22.921611, "count": 35 },
                { "lng": 112.418733, "lat": 22.931037, "count": 22 },
                { "lng": 112.419336, "lat": 22.931134, "count": 4 },
                { "lng": 112.413557, "lat": 22.923254, "count": 5 },
                { "lng": 112.418367, "lat": 22.92943, "count": 3 },
                { "lng": 112.424312, "lat": 22.919621, "count": 100 },
                { "lng": 112.423874, "lat": 22.919447, "count": 87 },
                { "lng": 112.424225, "lat": 22.923091, "count": 32 },
                { "lng": 112.417801, "lat": 22.921854, "count": 44 },
                { "lng": 112.417129, "lat": 22.928227, "count": 21 },
                { "lng": 112.426426, "lat": 22.922286, "count": 80 },
                { "lng": 112.421597, "lat": 22.91948, "count": 32 },
                { "lng": 112.423895, "lat": 22.920787, "count": 26 },
                { "lng": 112.423563, "lat": 22.921197, "count": 17 },
                { "lng": 112.417982, "lat": 22.922547, "count": 17 },
                { "lng": 112.426126, "lat": 22.921938, "count": 25 },
                { "lng": 112.42326, "lat": 22.915782, "count": 100 },
                { "lng": 112.419239, "lat": 22.916759, "count": 39 },
                { "lng": 112.417185, "lat": 22.929123, "count": 11 },
                { "lng": 112.417237, "lat": 22.927518, "count": 9 },
                { "lng": 112.417784, "lat": 22.915754, "count": 47 },
                { "lng": 112.420193, "lat": 22.917061, "count": 52 },
                { "lng": 112.422735, "lat": 22.915619, "count": 100 },
                { "lng": 112.418495, "lat": 22.915958, "count": 46 },
                { "lng": 112.416292, "lat": 22.931166, "count": 9 },
                { "lng": 112.419916, "lat": 22.924055, "count": 8 },
                { "lng": 112.42189, "lat": 22.921308, "count": 11 },
                { "lng": 112.413765, "lat": 22.929376, "count": 3 },
                { "lng": 112.418232, "lat": 22.920348, "count": 50 },
                { "lng": 112.417554, "lat": 22.930511, "count": 15 },
                { "lng": 112.418568, "lat": 22.918161, "count": 23 },
                { "lng": 112.413461, "lat": 22.926306, "count": 3 },
                { "lng": 112.42232, "lat": 22.92161, "count": 13 },
                { "lng": 112.4174, "lat": 22.928616, "count": 6 },
                { "lng": 112.424679, "lat": 22.915499, "count": 21 },
                { "lng": 112.42171, "lat": 22.915738, "count": 29 },
                { "lng": 112.417836, "lat": 22.916998, "count": 99 },
                { "lng": 112.420755, "lat": 22.928001, "count": 10 },
                { "lng": 112.414077, "lat": 22.930655, "count": 14 },
                { "lng": 112.426092, "lat": 22.922995, "count": 16 },
                { "lng": 112.41535, "lat": 22.931054, "count": 15 },
                { "lng": 112.413022, "lat": 22.921895, "count": 13 },
                { "lng": 112.415551, "lat": 22.913373, "count": 17 },
                { "lng": 112.421191, "lat": 22.926572, "count": 1 },
                { "lng": 112.419612, "lat": 22.917119, "count": 9 },
                { "lng": 112.418237, "lat": 22.921337, "count": 54 },
                { "lng": 112.423776, "lat": 22.921919, "count": 26 },
                { "lng": 112.417694, "lat": 22.92536, "count": 17 },
                { "lng": 112.415377, "lat": 22.914137, "count": 19 },
                { "lng": 112.417434, "lat": 22.914394, "count": 43 },
                { "lng": 112.42588, "lat": 22.922622, "count": 27 },
                { "lng": 112.418345, "lat": 22.919467, "count": 8 },
                { "lng": 112.426883, "lat": 22.917171, "count": 3 },
                { "lng": 112.423877, "lat": 22.916659, "count": 34 },
                { "lng": 112.415712, "lat": 22.915613, "count": 14 },
                { "lng": 112.419869, "lat": 22.931416, "count": 12 },
                { "lng": 112.416956, "lat": 22.925377, "count": 11 },
                { "lng": 112.42066, "lat": 22.925017, "count": 38 },
                { "lng": 112.416244, "lat": 22.920215, "count": 91 },
                { "lng": 112.41929, "lat": 22.915908, "count": 54 },
                { "lng": 112.422116, "lat": 22.919658, "count": 21 },
                { "lng": 112.4183, "lat": 22.925015, "count": 15 },
                { "lng": 112.421969, "lat": 22.913527, "count": 3 },
                { "lng": 112.422936, "lat": 22.921854, "count": 24 },
                { "lng": 112.41905, "lat": 22.929217, "count": 12 },
                { "lng": 112.424579, "lat": 22.914987, "count": 57 },
                { "lng": 112.42076, "lat": 22.915251, "count": 70 },
                { "lng": 112.425867, "lat": 22.918989, "count": 8 }
            ];
            var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
            baiduMapService.addOverlays([heatmapOverlay]);            heatmapOverlay.setDataSet({ data: points, max: 100 });
            heatmapOverlay.show();
        };

        $scope.showLteTownStats = function() {
            coverageDialogService.showTownStats(city);
        };
        $scope.showCdmaTownStats = function() {
            coverageDialogService.showCdmaTownStats(city);
        };
        $scope.showFlow = function() {
            coverageDialogService.showFlowStats($scope.statDate.value || new Date());
        };

        $scope.$watch('city.selected', function(city) {
            if (city) {
                $scope.showOutdoorSites();
            }
        });
    })
    .controller("home.dt", function ($scope, baiduMapService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

    })
    .controller("home.kpi", function ($scope, baiduMapService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

    })
    .controller("home.plan", function ($scope, baiduMapService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

    });
