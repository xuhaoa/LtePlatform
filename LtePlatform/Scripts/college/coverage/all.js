app.controller("all.coverage", function($scope, collegeMapService) {
    $scope.page.title = "校园覆盖";
    $scope.dtInfos = [];

    $scope.query = function() {
        console.log($scope.dtInfos);
    };

    collegeMapService.showDtInfos($scope.dtInfos);
});