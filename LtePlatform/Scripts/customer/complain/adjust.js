app.controller('complain.adjust', function($scope, complainService) {
    $scope.page.title = "抱怨量信息校正";

    $scope.query = function() {
        complainService.queryPositionList($scope.beginDate.value, $scope.endDate.value).then(function(list) {
            console.log(list);
        });
    };

    $scope.query();
});