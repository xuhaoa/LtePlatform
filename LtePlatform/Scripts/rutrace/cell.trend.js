app.controller("cell.trend", function ($scope, $routeParams, appKpiService, cellPreciseService,
    kpiDisplayService, appFormatService) {
    $scope.page.title = "小区指标变化趋势分析" + "-" + $routeParams.name;
    $scope.showTrend = function() {
        $scope.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
        $scope.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
        cellPreciseService.queryDataSpanKpi($scope.beginDate.value, $scope.endDate.value, $routeParams.cellId,
            $routeParams.sectorId).then(function (result) {
                $scope.mrsConfig = kpiDisplayService.getMrsOptions(result,
                    $scope.beginDateString + "-" + $scope.endDateString + "MR数变化趋势");
                $scope.preciseConfig = kpiDisplayService.getPreciseOptions(result,
                    $scope.beginDateString + "-" + $scope.endDateString + "精确覆盖率变化趋势");
        });
    };
    $scope.showTrend();
});