angular.module("myApp", ['app.common'])
    .config(function ($stateProvider, $urlRouterProvider) {
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
            });
        $urlRouterProvider.otherwise('/');
    })
    .run(function ($rootScope, appUrlService, appRegionService) {
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
        $rootScope.closeAlert = function (messages, index) {
            messages.splice(index, 1);
        };
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        $rootScope.statDate = {
            value: yesterday,
            opened: false
        };
        $rootScope.flowDate = {
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
            .then(function (result) {
                $rootScope.city.options = result;
                $rootScope.city.selected = result[0];
            });
    })
.controller("menu.root", function ($scope, appUrlService) {
    var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "覆盖优化",
            subItems: [
                {
                    displayName: "专题覆盖优化",
                    url: "/Evaluation/RegionDef",
                    tooltip: "包括万栋楼宇等室内外场景优化；根据各小区的工程参数模拟覆盖范围，主要覆盖指标（RSRP、SINR）进行分析和呈现"
                }, {
                    displayName: "规划辅助",
                    url: appUrlService.getPlanUrlHost() + 'guihuafuzhu/index/index.php'
                }, {
                    displayName: "路测分析",
                    url: appUrlService.getDtUrlHost() + 'admin'
                }, {
                    displayName: "网络分析",
                    url: "/Parameters/List",
                    tooltip: "全网LTE和CDMA基站、小区列表和地理化显示、对全网的基站按照基站名称、地址等信息进行查询，并进行个别基站小区的增删、修改信息的操作"
                }, {
                    displayName: "负荷评估",
                    url: appUrlService.getParameterUrlHost() + 'ltecapability.html'
                }, {
                    displayName: "传统指标",
                    url: "/Kpi",
                    tooltip: "对传统指标（主要是2G和3G）的监控、分析和地理化呈现"
                }, {
                    displayName: "工单管控",
                    url: "/Kpi/WorkItem",
                    tooltip: "对接本部优化部4G网优平台，结合日常优化，实现对日常工单的监控和分析"
                }, {
                    displayName: "校园网专题优化",
                    url: "/College/Map",
                    tooltip: "校园网专项优化，包括数据管理、指标分析、支撑工作管理和校园网覆盖呈现"
                }, {
                    displayName: "4G网络质量分析",
                    url: appUrlService.getTopnUrlHost(),
                    tooltip: "4G网络质量分析与日常优化"
                }, {
                    displayName: "路测管理",
                    url: appUrlService.getDtUrlHost2(),
                    tooltip: "路测综合管理"
                }, {
                    displayName: "基础信息管理",
                    url: appUrlService.getParameterUrlHost() + 'cellInfo.html'
                }, {
                    displayName: "边界漫游信息",
                    url: appUrlService.getParameterUrlHost() + 'lteboundary.html'
                },
                {
                    displayName: "基础数据总览",
                    url: rootUrl + "/"
                }, {
                    displayName: "小区地图查询",
                    url: rootUrl + "/query"
                }, {
                    displayName: "专题优化管理",
                    url: rootUrl + "/topic"
                }
            ]
        };
    })
.controller("home.kpi2G", function ($scope, appKpiService, appFormatService, kpi2GService, kpiRatingDivisionDefs) {
    kpi2GService.queryDayStats($scope.city.selected || '佛山', $scope.statDate.value || new Date())
        .then(function (result) {
            $scope.statDate.value = appFormatService.getDate(result.statDate);
            var stat = result.statViews[result.statViews.length - 1];
            $scope.dropRate = stat.drop2GRate * 100;
            $scope.dropStar = appKpiService.calculateDropStar($scope.dropRate);
            $scope.connectionRate = stat.connectionRate * 100;
        });
    $scope.dropRating = kpiRatingDivisionDefs.drop;
})
.controller("home.network", function ($scope, appRegionService, networkElementService, baiduMapService, coverageDialogService,
    geometryService) {
    
    baiduMapService.initializeMap("map", 11);
    baiduMapService.addCityBoundary("佛山");
    var colors = ['#40d3c3', '#d340c3', '#d3c340', '#40c3d3', '#c3d340', '#c340d3']
        var city = $scope.city.selected || '佛山';
        appRegionService.queryDistricts(city).then(function(districts) {
            angular.forEach(districts, function (district, $index) {
                networkElementService.queryOutdoorCellSites(city, district).then(function(sites) {
                    geometryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - sites[0].longtitute;
                        var yOffset = coors.y - sites[0].lattitute;
                        baiduMapService.drawMultiPoints(sites, colors[$index], -xOffset, -yOffset);
                    });
                });
            });
        });
        $scope.showLteTownStats = function() {
            coverageDialogService.showTownStats(city);
        };
        $scope.showCdmaTownStats = function () {
            coverageDialogService.showCdmaTownStats(city);
        };
        $scope.showFlow = function() {
            coverageDialogService.showFlowStats($scope.statDate.value || new Date());
        };

    })
.controller("home.kpi4G", function ($scope, kpiPreciseService, downSwitchService, appKpiService, appFormatService,
    kpiDisplayService, kpiRatingDivisionDefs) {
    $scope.statDate.value = $scope.statDate.value || new Date();
        $scope.queryKpi4G = function(city) {
            kpiPreciseService.getRecentPreciseRegionKpi(city, $scope.statDate.value)
                .then(function(result) {
                    $scope.statDate.value = appFormatService.getDate(result.statDate);
                    $scope.cityStat = appKpiService.getCityStat(result.districtPreciseViews, city);
                    $scope.rate = appKpiService.calculatePreciseRating($scope.cityStat.preciseRate);
                    var options = kpiDisplayService.generatePreciseBarOptions(result.districtPreciseViews,
                        $scope.cityStat);
                    $("#preciseConfig").highcharts(options);
                });
            downSwitchService.getRecentKpi(city, $scope.flowDate.value)
                .then(function(result) {
                    $scope.flowDate.value = appFormatService.getDate(result.statDate);
                    $scope.flowStat = appKpiService.getDownSwitchRate(result.downSwitchFlowViews);
                    $scope.downRate = appKpiService.calculateDownSwitchRating($scope.flowStat);
                    var options = kpiDisplayService.generateDownSwitchOptions(result.downSwitchFlowViews,
                        city, $scope.flowStat);
                    $("#downSwitchConfig").highcharts(options);
                });
        };

        $scope.$watch('city.selected', function(city) {
            if (city) {
                $scope.queryKpi4G(city);
            }
        });
        $scope.preciseRating = kpiRatingDivisionDefs.precise;
        $scope.downSwitchRating = kpiRatingDivisionDefs.downSwitch;
    })
.controller("home.workitem", function ($scope, workitemService) {
    workitemService.queryCurrentMonth().then(function (result) {
        $scope.totalItems = result.item1;
        $scope.finishedItems = result.item2;
        $scope.lateItems = result.item3;
        var finishedGauge = new GaugeMeter();
        var inTimeGauge = new GaugeMeter();
        finishedGauge.title.text = '完成工单情况';
        finishedGauge.yAxis.max = $scope.totalItems;
        finishedGauge.yAxis.plotBands[0].to = $scope.totalItems * 0.6;
        finishedGauge.yAxis.plotBands[1].from = $scope.totalItems * 0.6;
        finishedGauge.yAxis.plotBands[1].to = $scope.totalItems * 0.8;
        finishedGauge.yAxis.plotBands[2].from = $scope.totalItems * 0.8;
        finishedGauge.yAxis.plotBands[2].to = $scope.totalItems;
        finishedGauge.series[0].name = '完成工单数';
        finishedGauge.series[0].data[0] = $scope.finishedItems;
        finishedGauge.yAxis.title.text = '工单数';
        inTimeGauge.title.text = '工单及时性';
        inTimeGauge.yAxis.max = $scope.totalItems;
        inTimeGauge.yAxis.plotBands[0].to = $scope.totalItems * 0.6;
        inTimeGauge.yAxis.plotBands[1].from = $scope.totalItems * 0.6;
        inTimeGauge.yAxis.plotBands[1].to = $scope.totalItems * 0.8;
        inTimeGauge.yAxis.plotBands[2].from = $scope.totalItems * 0.8;
        inTimeGauge.yAxis.plotBands[2].to = $scope.totalItems;
        inTimeGauge.series[0].name = '未超时工单数';
        inTimeGauge.series[0].data[0] = $scope.totalItems - $scope.lateItems;
        inTimeGauge.yAxis.title.text = '工单数';
        $("#workitemFinished").highcharts(finishedGauge.options);
        $("#workitemInTime").highcharts(inTimeGauge.options);
    });
});
