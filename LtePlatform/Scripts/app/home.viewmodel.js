angular.module("myApp", ['app.common'])
.controller("homeController", function ($scope, appUrlService, appRegionService) {
    appUrlService.initializeAuthorization();
    $scope.areaItems = [{
        title: "4G指标",
        comments: '/appViews/Home/Kpi4G.html',
        buttonName: "详细",
        url: "/Rutrace"
    }, {
        title: "传统指标",
        comments:  '/appViews/Home/Kpi2G.html',
        buttonName: "指标",
        url: "/Kpi"
    }, {
        title: "工单监控",
        comments:  '/appViews/Home/WorkItem.html',
        buttonName: "工单",
        url: "/Kpi/WorkItem"
    }, {
        title: "网络概况",
        comments: '/appViews/Home/Network.html',
        buttonName: "信息",
        url: "/Parameters/List"
    }];

    $scope.status = {
        isopen: false
    };
    $scope.city = {
        selected: "",
        options: []
    };
    appRegionService.initializeCities()
        .then(function (result) {
            $scope.city.options = result;
            $scope.city.selected = result[0];
        });
    $scope.menuItems = [
        {
            displayName: "覆盖优化",
            isActive: true,
            subItems: [
            {
                displayName: "精确覆盖专题",
                url: "/Rutrace",
                tooltip: "综合分析后台指标、MR、路测信令和小区跟踪数据，挖掘小区的重叠覆盖、过覆盖等问题，对精确覆盖的效果进行模拟，并在百度地图上呈现。"
            }, {
                displayName: "专题覆盖优化",
                url: "/Evaluation/RegionDef",
                tooltip: "包括万栋楼宇等室内外场景优化；根据各小区的工程参数模拟覆盖范围，主要覆盖指标（RSRP、SINR）进行分析和呈现"
            }, {
                displayName: "规划辅助",
                url: appUrlService.getPlanUrlHost() + 'guihuafuzhu/index/index.php'
            }, {
                displayName: "路测管理",
                url: appUrlService.getDtUrlHost() + 'admin'
            }]
        }, {
            displayName: "容量优化",
            isActive: false,
            subItems: [{
                displayName: "网络分析",
                url: "/Parameters/List",
                tooltip: "全网LTE和CDMA基站、小区列表和地理化显示、对全网的基站按照基站名称、地址等信息进行查询，并进行个别基站小区的增删、修改信息的操作"
            }, {
                displayName: "负荷评估",
                url: appUrlService.getParameterUrlHost() + 'ltecapability.html'
            }]
        }, {
            displayName: "质量分析",
            isActive: false,
            subItems: [{
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
            }]
        }, {
            displayName: "基础信息",
            isActive: false,
            subItems: [{
                displayName: "DT基础信息",
                url: "/Dt/List",
                tooltip: "按照区域或专题查看已导入的DT基础信息"
            }, {
                displayName: "基础信息管理",
                url: appUrlService.getParameterUrlHost() + 'cellInfo.html'
            }, {
                displayName: "边界漫游信息",
                url: appUrlService.getParameterUrlHost() + 'lteboundary.html'
            }]
        }
    ];
})
.controller("home.kpi2G", function ($scope, appKpiService, appFormatService, kpi2GService) {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    $scope.statDate = {
        value: yesterday,
        opened: false
    };
    kpi2GService.queryDayStats($scope.city.selected || '佛山', $scope.statDate.value || new Date())
        .then(function (result) {
            $scope.statDate.value = appFormatService.getDate(result.statDate);
            var stat = result.statViews[result.statViews.length - 1];
            $scope.dropRate = stat.drop2GRate * 100;
            $scope.dropStar = appKpiService.calculateDropStar($scope.dropRate);
            $scope.connectionRate = stat.connectionRate * 100;
        });
})
.controller("home.network", function ($scope, appRegionService, parametersChartService) {
    var cityName = $scope.city.selected || '佛山';
    appRegionService.queryDistrictInfrastructures(cityName).then(function (result) {
        appRegionService.accumulateCityStat(result, cityName);
        $("#cityLteENodebConfig").highcharts(
            parametersChartService.getDistrictLteENodebPieOptions(result.slice(0, result.length - 1),
            $scope.city.selected || '佛山'));
    });
})
.controller("home.kpi4G", function ($scope, kpiPreciseService, downSwitchService, appKpiService, appFormatService,
    kpiDisplayService) {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    $scope.statDate = {
        value: yesterday,
        opened: false
    };
    $scope.flowDate = {
        value: yesterday,
        opened: false
    };

    $scope.queryKpi4G = function (city) {
        kpiPreciseService.getRecentPreciseRegionKpi(city, $scope.statDate.value || new Date())
            .then(function (result) {
                $scope.statDate.value = appFormatService.getDate(result.statDate);
                $scope.cityStat = appKpiService.getCityStat(result.districtPreciseViews, city);
                $scope.rate = appKpiService.calculatePreciseRating($scope.cityStat.preciseRate);
                var options = kpiDisplayService.generatePreciseBarOptions(result.districtPreciseViews,
                    $scope.cityStat);
                $("#preciseConfig").highcharts(options);
            });
        downSwitchService.getRecentKpi(city, $scope.statDate.value || new Date())
            .then(function (result) {
                $scope.flowDate.value = appFormatService.getDate(result.statDate);
                $scope.flowStat = appKpiService.getDownSwitchRate(result.downSwitchFlowViews);
                $scope.downRate = appKpiService.calculateDownSwitchRating($scope.flowStat);
                var options = kpiDisplayService.generateDownSwitchOptions(result.downSwitchFlowViews,
                    city, $scope.flowStat);
                $("#downSwitchConfig").highcharts(options);
            });
    };

    $scope.$watch('city.selected', function (city) {
        if (city) {
            $scope.queryKpi4G(city);
        }
    });
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
