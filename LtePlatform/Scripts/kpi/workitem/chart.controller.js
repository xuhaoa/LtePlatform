app.controller("kpi.workitem.chart", function ($scope, $timeout, preciseChartService, workitemService) {
    $scope.page.title = "统计图表";
    workitemService.queryChartData("type-subtype").then(function (result) {
        $("#type-chart").highcharts(preciseChartService.getTypeOption(result));
    });
    workitemService.queryChartData("state-subtype").then(function (result) {
        $("#state-chart").highcharts(preciseChartService.getStateOption(result));
    });
    workitemService.queryChartData("district-town").then(function (result) {
        $("#district-chart").highcharts(preciseChartService.getDistrictOption(result));
    });
});