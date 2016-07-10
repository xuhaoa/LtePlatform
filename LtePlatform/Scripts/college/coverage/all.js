app.controller("all.coverage", function($scope, collegeMapService) {
    $scope.page.title = "校园覆盖";
    $scope.dtInfos = [];

    collegeMapService.showDtInfos($scope.dtInfos, $scope.beginDate.value, $scope.endDate.value);
});