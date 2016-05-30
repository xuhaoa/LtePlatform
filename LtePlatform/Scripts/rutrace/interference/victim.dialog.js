app.controller('interference.victim.dialog', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId,
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

    $scope.showVictim = function () {
        $scope.victimCells = [];

        topPreciseService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
            eNodebId, sectorId).then(function (result) {
                $scope.victimCells = result;
            });
    };

    $scope.ok = function () {
        $uibModalInstance.close('已处理');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.showVictim();
});