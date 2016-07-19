app.controller('kpi.trend', function ($scope, $routeParams, kpi2GService, kpiDisplayService) {
    $scope.page.title = "指标变化趋势-" + $routeParams.city;

    kpi2GService.queryKpiOptions().then(function(result) {
        $scope.kpi = {
            options: result,
            selected: result[0]
        };
    });

    $scope.$watch('kpi.options', function(options) {
        if (options && options.length) {
            $scope.showTrend();
        }
    });

    $scope.showTrend = function() {
        kpi2GService.queryKpiTrend($routeParams.city, $scope.beginDate.value, $scope.endDate.value).then(function(data) {
            angular.forEach($scope.kpi.options, function (option, $index) {
                $("#kpi-"+ $index).highcharts(kpiDisplayService.generateComboChartOptions(data, option, $routeParams.city));
            });
        });
    };
});