app.controller("cell.info", function ($scope, $stateParams, neighborMongoService) {
    $scope.page.title = $stateParams.name + "-" + $stateParams.sectorId + "小区信息";
    $scope.isHuaweiCell = false;
    $scope.eNodebId = $stateParams.eNodebId;
    $scope.sectorId = $stateParams.sectorId;
    
    neighborMongoService.queryNeighbors($stateParams.eNodebId, $stateParams.sectorId).then(function (result) {
        $scope.mongoNeighbors = result;
    });
});