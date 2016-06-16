app.controller("home.kpi4G", function ($scope, kpiPreciseService, appKpiService, appFormatService, kpiDisplayService) {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    $scope.statDate = {
        value: yesterday,
        opened: false
    };
    kpiPreciseService.getRecentPreciseRegionKpi($scope.city.selected || '佛山', $scope.statDate.value || new Date())
        .then(function(result) {
            $scope.statDate.value = appFormatService.getDate(result.statDate);
            $scope.cityStat = appKpiService.getCityStat(result.districtPreciseViews, $scope.city.selected);
            $scope.rate = appKpiService.calculatePreciseRating($scope.cityStat.preciseRate);
            $("#preciseConfig").highcharts(kpiDisplayService.generatePreciseBarOptions(result.districtPreciseViews,
                $scope.cityStat));
        });
});