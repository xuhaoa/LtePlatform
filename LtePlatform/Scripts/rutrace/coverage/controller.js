app.controller("rutrace.coverage", function($scope, $timeout, $routeParams, $uibModal, $log, topPreciseService) {
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
    $scope.showCoverage = function() {
        topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
            $routeParams.cellId, $routeParams.sectorId).then(function(result) {
            $scope.coverageList = result;
        });
    };
    $scope.showDetails = function(date) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/appViews/Rutrace/Coverage/DetailsChartDialog.html',
            controller: 'coverage.details.dialog',
            size: 'lg',
            resolve: {
                dialogTitle: function () {
                    return $routeParams.name + "-" + $routeParams.sectorId + "详细小区统计";
                },
                cellId: function () {
                    return $routeParams.cellId;
                },
                sectorId: function () {
                    return $routeParams.sectorId;
                },
                date: function() {
                    return date;
                }
            }
        });

        modalInstance.result.then(function (info) {
            console.log(info);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.showCoverage();
});