
app.controller("rutrace.trendchart", function ($scope, $location, $timeout, appKpiService) {

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
    $timeout(function() {
        $scope.showCharts();
    }, 500);
});
