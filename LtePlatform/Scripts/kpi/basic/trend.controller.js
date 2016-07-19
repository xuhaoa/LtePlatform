app.controller('kpi.trend', function ($scope, $routeParams, kpi2GService, kpiDisplayService) {
    $scope.page.title = "指标变化趋势-" + $routeParams.city;
    $scope.configs = {};

    kpi2GService.queryKpiOptions().then(function(result) {
        $scope.kpi = {
            options: result,
            selected: result[0]
        };
        kpi2GService.queryKpiTrend($routeParams.city, $scope.beginDate.value, $scope.endDate.value).then(function(data) {
            for (var i = 0; i < result.length; i++) {
                $scope.configs[result[i]] = kpiDisplayService.generateComboChartOptions(data, result[i], $routeParams.city);
            }
        });
    });
});