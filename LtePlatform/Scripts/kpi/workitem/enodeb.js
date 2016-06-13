app.controller('workitem.eNodeb', function ($scope, $uibModal, $log, networkElementService, $routeParams, workitemService,
    workItemDialog) {
    $scope.serialNumber = $routeParams.serialNumber;
    $scope.queryWorkItems = function () {
        workitemService.queryByENodebId($routeParams.eNodebId).then(function (result) {
            $scope.viewItems = result;
        });
    };
    networkElementService.queryENodebInfo($routeParams.eNodebId).then(function (result) {
        $scope.eNodebDetails = result;
    });
    $scope.queryWorkItems();
});