app.controller('interference.coverage.dialog', function ($scope, $uibModalInstance, dialogTitle, preciseCells,
    topPreciseService) {
    $scope.dialogTitle = dialogTitle;
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    $scope.beginDate = {
        value: lastWeek,
        opened: false
    };
    $scope.endDate = {
        value: new Date(),
        opened: false
    };
    $scope.showCoverage = function () {
        $scope.coverageInfos = [];
        angular.forEach(preciseCells, function(cell) {
            topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
                cell.eNodebId, cell.sectorId).then(function(result) {
                    cell.overCoverageRate = result.overCoverageRate;
                    cell.weakCoverageRate = result.weakCoverageRate;
                $scope.coverageInfos.push({
                    eNodebId: result.eNodebId,
                    sectorId: result.sectorId,
                    overCoverageRate: result.overCoverageRate,
                    weakCoverageRate: result.weakCoverageRate
                });
            });
        });
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.coverageInfos);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.showCoverage();
});