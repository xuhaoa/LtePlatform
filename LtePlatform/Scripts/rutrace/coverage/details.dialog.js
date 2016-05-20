app.controller('coverage.details.dialog', function($scope, $uibModalInstance, dialogTitle, cellId, sectorId, date, topPreciseService) {
    $scope.dialogTitle = dialogTitle;
    topPreciseService.queryOneDayCellStastic(cellId, sectorId, date).then(function (result) {
        console.log(result);
    });

    $scope.ok = function () {
        $uibModalInstance.close('已处理');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});