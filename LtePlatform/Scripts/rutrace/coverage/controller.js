angular.module('precise.coverage', ['app.common'])
    .controller("rutrace.coverage", function($scope, $routeParams, $uibModal, topPreciseService, preciseInterferenceService) {
        $scope.currentCellName = $routeParams.name + "-" + $routeParams.sectorId;
        $scope.page.title = "TOP指标覆盖分析: " + $scope.currentCellName;
        $scope.orderPolicy = topPreciseService.getOrderPolicySelection();
        $scope.detailsDialogTitle = $routeParams.name + "-" + $routeParams.sectorId + "详细小区统计";
        $scope.cellId = $routeParams.cellId;
        $scope.sectorId = $routeParams.sectorId;
        $scope.showCoverage = function() {
            topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function(result) {
                $scope.coverageList = result;
            });
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function(result) {
                $scope.interferenceCells = result;
                angular.forEach($scope.interferenceCells, function(neighbor) {
                    if (neighbor.destENodebId > 0) {
                        topPreciseService.queryCellStastic(neighbor.destENodebId, neighbor.destPci,
                            $scope.beginDate.value, $scope.endDate.value).then(function(coverage) {
                            if (coverage) {
                                neighbor.mrCount = coverage.mrCount;
                                neighbor.weakCoverCount = coverage.weakCoverCount;
                                neighbor.overCoverCount = coverage.overCoverCount;
                            }
                        });
                    }
                });
            });
            preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function(result) {
                $scope.interferenceVictims = result;
                angular.forEach($scope.interferenceVictims, function(victim) {
                    if (victim.victimENodebId > 0) {
                        topPreciseService.queryCellStastic(victim.victimENodebId, victim.victimPci,
                            $scope.beginDate.value, $scope.endDate.value).then(function(coverage) {
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
    })
    .controller('coverage.details.dialog', function($scope, $uibModalInstance, dialogTitle, cellId, sectorId, date,
        kpiDisplayService, topPreciseService) {
        $scope.dialogTitle = dialogTitle;
        $scope.chartView = {
            options: ['覆盖指标', '干扰指标'],
            selected: '覆盖指标'
        };
        topPreciseService.queryOneDayCellStastic(cellId, sectorId, date).then(function(result) {
            var options = kpiDisplayService.getCoverageOptions(result, cellId + '-' + sectorId + '覆盖指标变化趋势');
            $("#weak-and-over-coverage").highcharts(options);
            var interferenceOptions = kpiDisplayService.getCoverageInterferenceOptions(result, cellId + '-' + sectorId + '干扰指标变化趋势');
            $("#interference-db").highcharts(interferenceOptions);
        });

        $scope.ok = function() {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('coverage.ta.dialog', function($scope, $uibModalInstance, dialogTitle, cellId, sectorId, date,
        topPreciseService, cellPreciseService, kpiDisplayService) {
        $scope.dialogTitle = dialogTitle;
        $scope.chartView = {
            options: ['平均RSRP', '覆盖率'],
            selected: '平均RSRP'
        };
        topPreciseService.queryAverageRsrpTaStastic(cellId, sectorId, date).then(function(result) {
            var options = kpiDisplayService.getAverageRsrpTaOptions(result, cellId + '-' + sectorId + '平均RSRP统计');
            $("#average-rsrp").highcharts(options);
        });
        topPreciseService.queryAbove110TaRate(cellId, sectorId, date).then(function(above110Stat) {
            topPreciseService.queryAbove105TaRate(cellId, sectorId, date).then(function(above105Stat) {
                var options = kpiDisplayService.getAboveRateTaOptions(above110Stat, above105Stat, cellId + '-' + sectorId + '覆盖率统计');
                $("#coverage-rate").highcharts(options);
            });
        });

        $scope.ok = function() {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('coverage.ta.query.dialog', function($scope, $uibModalInstance, dialogTitle, cellId, sectorId,
        topPreciseService, cellPreciseService, kpiDisplayService) {
        $scope.dialogTitle = dialogTitle;
        $scope.chartView = {
            options: ['平均RSRP', '覆盖率'],
            selected: '平均RSRP'
        };
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
        $scope.query = function() {
            topPreciseService.queryAverageRsrpTaStastic(cellId, sectorId, $scope.beginDate.value, $scope.endDate.value).then(function(result) {
                var options = kpiDisplayService.getAverageRsrpTaOptions(result, cellId + '-' + sectorId + '平均RSRP统计');
                $("#average-rsrp").highcharts(options);
            });
            topPreciseService.queryAbove110TaRate(cellId, sectorId, $scope.beginDate.value, $scope.endDate.value).then(function(above110Stat) {
                topPreciseService.queryAbove105TaRate(cellId, sectorId, $scope.beginDate.value, $scope.endDate.value).then(function(above105Stat) {
                    var options = kpiDisplayService.getAboveRateTaOptions(above110Stat, above105Stat, cellId + '-' + sectorId + '覆盖率统计');
                    $("#coverage-rate").highcharts(options);
                });
            });
        };

        $scope.ok = function() {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.query();
    });