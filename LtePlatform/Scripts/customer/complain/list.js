app.controller("complain.list", function ($scope, complainService, customerQueryService) {
    $scope.page.title = "10000号投诉";
    $scope.query = function () {
        complainService.queryAll($scope.beginDate.value, $scope.endDate.value).then(function (items) {
            $scope.items = items;
        });
    };

    customerQueryService.queryNetworkTypeOptions().then(function (options) {
        $scope.type = {
            options: options,
            selected: options[0]
        };
    });
    $scope.query();
});