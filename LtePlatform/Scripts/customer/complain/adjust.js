app.controller('complain.adjust', function($scope, complainService) {
    $scope.page.title = "抱怨量信息校正";
    $scope.items = [];

    $scope.query = function() {
        complainService.queryPositionList($scope.beginDate.value, $scope.endDate.value).then(function(list) {
            $scope.items = list;
        });
    };

    $scope.query();
});