app.controller('workitem.cell', function ($scope, networkElementService, $routeParams, workitemService) {
    $scope.serialNumber = $routeParams.serialNumber;
    $scope.queryWorkItems = function () {
        workitemService.queryByCellId($routeParams.eNodebId, $routeParams.sectorId).then(function (result) {
            $scope.viewItems = result;
        });
    };
    networkElementService.queryCellInfo($routeParams.eNodebId, $routeParams.sectorId).then(function (result) {
        $scope.lteCellDetails = result;
    });
    $scope.queryWorkItems();
});