app.controller('kpi.topDrop2G.trend', function ($scope, $routeParams, appRegionService, appFormatService, drop2GService) {
    $scope.page.title = "TOP掉话变化趋势-" + $routeParams.city;
    $scope.topCount = {
        options: [10, 20, 30, 50],
        selected: 10
    };
    $scope.showTrend = function() {
        drop2GService.queryCellTrend($scope.beginDate.value, $scope.endDate.value, $routeParams.city,
            $scope.orderPolicy.selected, $scope.topCount.selected).then(function (result) {
            $scope.trendCells = result;
        });
    };
    drop2GService.queryOrderPolicy().then(function(result) {
        $scope.orderPolicy = {
            options: result,
            selected: result[0]
        }
        $scope.showTrend();
    });
});