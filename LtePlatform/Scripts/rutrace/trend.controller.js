
app.controller("rutrace.trend", function ($scope, appRegionService, appKpiService, kpiPreciseService, appFormatService) {
    $scope.page.title = "指标变化趋势";

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
            });
    };
    appRegionService.queryDistricts($scope.city.selected)
        .then(function(districts) {
            $scope.trendStat.districts = districts;
            $scope.showTrend();
        });
})