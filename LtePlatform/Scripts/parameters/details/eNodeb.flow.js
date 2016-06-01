app.controller("eNodeb.flow", function ($scope, $stateParams, networkElementService) {
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

    networkElementService.queryCellViewsInOneENodeb($stateParams.eNodebId).then(function (result) {
        $scope.cellList = result;
    });
});