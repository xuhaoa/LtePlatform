app.controller('interference.coverage.dialog', function ($scope, $uibModalInstance, dialogTitle, preciseCells,
    topPreciseService, networkElementService) {
    $scope.dialogTitle = dialogTitle;
    $scope.preciseCells = preciseCells;
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
        angular.forEach($scope.preciseCells, function (cell) {
            networkElementService.queryCellInfo(cell.eNodebId, cell.sectorId).then(function(info) {
                topPreciseService.queryCellStastic(cell.eNodebId, info.pci, $scope.beginDate.value, $scope.endDate.value).then(function(result) {
                    cell.overCoverageRate = result.overCoverCount * 100 / result.mrCount;
                    cell.weakCoverageRate = result.weakCoverCount * 100 / result.mrCount;
                    $scope.coverageInfos.push({
                        eNodebId: cell.eNodebId,
                        sectorId: cell.sectorId,
                        overCoverageRate: cell.overCoverageRate,
                        weakCoverageRate: cell.weakCoverageRate
                    });
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