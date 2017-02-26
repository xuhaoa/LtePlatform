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
        geometryService) {
        baiduMapService.initializeMap("map", 11);
        var colors = ['#10d3c3', '#d310c3', '#d32310', '#10c303', '#c3d320', '#c340d3'];
        $scope.showOutdoorSites = function () {
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
