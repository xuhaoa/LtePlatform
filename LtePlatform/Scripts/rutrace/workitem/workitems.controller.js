app.controller("rutrace.workitems", function ($scope, $routeParams, workitemService, networkElementService) {
    $scope.page.title = $routeParams.name + "-" + $routeParams.sectorId + ":TOP小区工单历史";
    $scope.queryWorkItems = function () {
        workitemService.queryByCellId($routeParams.cellId, $routeParams.sectorId).then(function (result) {
            $scope.viewItems = result;
            $scope.viewData.workItems = result;
        });
        networkElementService.queryCellInfo($routeParams.cellId, $routeParams.sectorId).then(function (result) {
            $scope.lteCellDetails = result;
        });
    };
    $scope.queryWorkItems();
});