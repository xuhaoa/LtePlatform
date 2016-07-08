app.controller("home.kpi4G", function ($scope, kpiPreciseService, downSwitchService, appKpiService, appFormatService,
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
            .then(function(result) {
                $scope.statDate.value = appFormatService.getDate(result.statDate);
                $scope.cityStat = appKpiService.getCityStat(result.districtPreciseViews, city);
                $scope.rate = appKpiService.calculatePreciseRating($scope.cityStat.preciseRate);
                $("#preciseConfig").highcharts(kpiDisplayService.generatePreciseBarOptions(result.districtPreciseViews,
                    $scope.cityStat));
            });
        downSwitchService.getRecentKpi(city, $scope.statDate.value || new Date())
            .then(function (result) {
                $scope.flowDate.value = appFormatService.getDate(result.statDate);
                $scope.flowStat = appKpiService.getDownSwitchRate(result.downSwitchFlowViews);
                $scope.downRate = appKpiService.calculateDownSwitchRating($scope.flowStat);
                $("#downSwitchConfig").highcharts(kpiDisplayService.generateDownSwitchOptions(result.downSwitchFlowViews,
                    city, $scope.flowStat));
            });
    };

    $scope.$watch('city.selected', function (city) {
        if (city) {
            $scope.queryKpi4G(city);
        }
    });
});