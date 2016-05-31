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
            eNodebId, sectorId).then(function(victims) {
            topPreciseService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function(result) {
                angular.forEach(victims, function(victim) {
                    for (var j = 0; j < result.length; j++) {
                        if (result[j].destENodebId === victim.victimENodebId
                            && result[j].destSectorId === victim.victimSectorId) {
                            victim.forwardInterferences6Db = result[j].overInterferences6Db;
                            victim.forwardInterferences10Db = result[j].overInterferences10Db;
                            break;
                        }
                    }
                });
                $scope.victimCells = victims;
            });
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