app.controller("kpi.workitem.chart", function ($scope, $timeout, preciseChartService, workitemService) {
    $scope.page.title = "统计图表";
    if ($scope.viewData.chartData === undefined) {
        workitemService.queryChartData().then(function(result) {
            $scope.viewData.chartData = result;
            $("#type-chart").highcharts(preciseChartService.getTypeOption(result));
            $("#state-chart").highcharts(preciseChartService.getStateOption(result));
        });
    } else {
        $timeout(function () {
            $("#type-chart").highcharts(preciseChartService.getTypeOption($scope.viewData.chartData));
            $("#state-chart").highcharts(preciseChartService.getStateOption($scope.viewData.chartData));
        }, 1000);
    }

});