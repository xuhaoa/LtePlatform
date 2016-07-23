
app.controller("rutrace.chart", function ($scope, $location, $timeout, appKpiService) {
    if ($scope.overallStat.districtStats.length === 0) $location.path($scope.rootPath);

    $scope.showCharts = function () {
        $("#mr-pie").highcharts(appKpiService.getMrPieOptions(
            $scope.overallStat.districtStats.slice(0, $scope.overallStat.districtStats.length - 1),
            $scope.overallStat.townStats));
        $("#precise").highcharts(appKpiService.getPreciseRateOptions($scope.overallStat.districtStats,
            $scope.overallStat.townStats));
    };

    $timeout(function() {
        $scope.showCharts();
    }, 1000);
});
