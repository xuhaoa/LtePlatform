app.controller("eNodeb.flow", function ($scope, $stateParams, networkElementService, flowService) {
    $scope.eNodebName = $stateParams.name;
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
    $scope.queryFlow = function () {
        angular.forEach($scope.cellList, function(cell) {
            flowService.queryCellFlowByDateSpan(cell.eNodebId, cell.sectorId,
                $scope.beginDate.value, $scope.endDate.value).then(function(flowList) {
                cell.flowList = flowList;
            });
        });
    };

    networkElementService.queryCellViewsInOneENodeb($stateParams.eNodebId).then(function (result) {
        $scope.cellList = result;
        $scope.queryFlow();
    });
});