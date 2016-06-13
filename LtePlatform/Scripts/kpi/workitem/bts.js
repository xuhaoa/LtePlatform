app.controller('workitem.bts', function ($scope, networkElementService, $routeParams, workitemService) {
    $scope.serialNumber = $routeParams.serialNumber;
    $scope.queryWorkItems = function () {
        workitemService.queryByENodebId($routeParams.btsId).then(function (result) {
            $scope.viewItems = result;
        });
    };
    networkElementService.queryBtsInfo($routeParams.btsId).then(function (result) {
        $scope.btsDetails = result;
    });
    $scope.queryWorkItems();
});