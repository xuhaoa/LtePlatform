app.controller('workitem.cdmaCell', function ($scope, networkElementService, $routeParams, workitemService) {
    $scope.serialNumber = $routeParams.serialNumber;
    $scope.queryWorkItems = function () {
        workitemService.queryByCellId($routeParams.btsId, $routeParams.sectorId).then(function (result) {
            $scope.viewItems = result;
        });
    };
    networkElementService.queryCdmaCellInfo($routeParams.btsId, $routeParams.sectorId).then(function (result) {
        $scope.cdmaCellDetails = result;
    });
    $scope.queryWorkItems();
});