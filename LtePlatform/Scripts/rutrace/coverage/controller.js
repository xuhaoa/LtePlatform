app.controller("rutrace.coverage", function($scope, $routeParams, $uibModal, topPreciseService) {
    $scope.currentCellName = $routeParams.name + "-" + $routeParams.sectorId;
    $scope.page.title = "TOP指标覆盖分析: " + $scope.currentCellName;
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
    $scope.detailsDialogTitle = $routeParams.name + "-" + $routeParams.sectorId + "详细小区统计";
    $scope.cellId = $routeParams.cellId;
    $scope.sectorId = $routeParams.sectorId;
    $scope.showCoverage = function() {
        topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
            $routeParams.cellId, $routeParams.sectorId).then(function(result) {
            $scope.coverageList = result;
            });
        topPreciseService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
            $routeParams.cellId, $routeParams.sectorId).then(function(result) {
            $scope.interferenceCells = result;
            angular.forEach($scope.interferenceCells, function(neighbor) {
                if (neighbor.destENodebId > 0) {
                    topPreciseService.queryCellStastic(neighbor.destENodebId, neighbor.destPci,
                        $scope.beginDate.value, $scope.endDate.value).then(function (coverage) {
                            if (coverage) {
                                neighbor.mrCount = coverage.mrCount;
                                neighbor.weakCoverCount = coverage.weakCoverCount;
                                neighbor.overCoverCount = coverage.overCoverCount;
                            }
                    });
                }
            });
        });
        topPreciseService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
            $routeParams.cellId, $routeParams.sectorId).then(function(result) {
                $scope.interferenceVictims = result;
                angular.forEach($scope.interferenceVictims,function(victim) {
                    if (victim.victimENodebId > 0) {
                        topPreciseService.queryCellStastic(victim.victimENodebId, victim.victimPci,
                        $scope.beginDate.value, $scope.endDate.value).then(function (coverage) {
                            if (coverage) {
                                victim.mrCount = coverage.mrCount;
                                victim.weakCoverCount = coverage.weakCoverCount;
                                victim.overCoverCount = coverage.overCoverCount;
                            }
                        });
                    }
                })
        });
    };
    $scope.showCoverage();
});