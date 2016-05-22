app.controller('coverage.details.dialog', function ($scope, $uibModalInstance, dialogTitle, cellId, sectorId, date,
    topPreciseService, cellPreciseService) {
    $scope.dialogTitle = dialogTitle;
    $scope.chartView = {
        options: ['覆盖指标', '干扰指标'],
        selected: '覆盖指标'
    };
    topPreciseService.queryOneDayCellStastic(cellId, sectorId, date).then(function (result) {
        var options = cellPreciseService.getCoverageOptions(result, cellId + '-' + sectorId + '覆盖指标变化趋势');
        $("#weak-and-over-coverage").highcharts(options);
        var interferenceOptions = cellPreciseService.getCoverageInterferenceOptions(result, cellId + '-' + sectorId + '干扰指标变化趋势');
        $("#interference-db").highcharts(interferenceOptions);
    });

    $scope.ok = function () {
        $uibModalInstance.close('已处理');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});