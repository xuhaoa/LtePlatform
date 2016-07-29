app.controller("workitem.district", function ($scope, $routeParams, workitemService) {
    $scope.page.title = "工单统计-" + $routeParams.district;

    $scope.query = function () {
        workitemService.queryWithPagingByDistrict($scope.viewData.currentState.name, $scope.viewData.currentType.name,
            $routeParams.district).then(function (result) {
            angular.forEach(result, function(view) {
                view.detailsPath = $scope.rootPath + "details/" + view.serialNumber + "/" + view.district;
            });
                $scope.viewItems = result;
            });
    };

    $scope.query();
});