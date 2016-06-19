app.controller("workitem.details", function ($scope, $routeParams, $uibModal, $log,
    workitemService, appFormatService, cellPreciseService, preciseWorkItemService, networkElementService) {
    $scope.page.title = "工单编号" + $routeParams.number + "信息";
    $scope.serialNumber = $routeParams.number;
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
    $scope.queryWorkItems = function () {
        workitemService.querySingleItem($routeParams.number).then(function (result) {
            $scope.currentView = result;
            $scope.beginDate.value = appFormatService.getDate($scope.currentView.beginTime);
            $scope.showTrend();
        });
        
    };
    $scope.queryPreciseCells = function() {
        preciseWorkItemService.queryBySerial($routeParams.number).then(function (cells) {
            $scope.preciseCells = cells;
            angular.forEach(cells, function (cell) {
                networkElementService.queryENodebInfo(cell.eNodebId).then(function (info) {
                    cell.cellName = info.name + '-' + cell.sectorId;
                });
            });
        });
    };
    $scope.showTrend = function () {
        $scope.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
        $scope.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
        cellPreciseService.queryDataSpanKpi($scope.beginDate.value, $scope.endDate.value, $scope.currentView.eNodebId,
            $scope.currentView.sectorId).then(function (result) {
                $scope.mrsConfig = cellPreciseService.getMrsOptions(result,
                    $scope.beginDateString + "-" + $scope.endDateString + "MR数变化趋势");
                $scope.preciseConfig = cellPreciseService.getPreciseOptions(result,
                    $scope.beginDateString + "-" + $scope.endDateString + "精确覆盖率变化趋势");
            });
    };
    
    $scope.queryWorkItems();
    $scope.queryPreciseCells();
});