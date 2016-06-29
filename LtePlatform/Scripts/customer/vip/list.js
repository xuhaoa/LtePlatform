app.controller("vip.list", function ($scope, customerDialogService, customerQueryService) {
    $scope.page.title = "政企支撑";
    $scope.construct = function() {
        customerDialogService.constructEmergencyCommunication(
            $scope.city, $scope.district, $scope.type, $scope.page.messages, $scope.query);
    };
    $scope.query = function() {
        customerQueryService.queryAllVip($scope.beginDate.value, $scope.endDate.value).then(function(items) {
            $scope.items = items;
        });
    };
    $scope.displayFinishedItem = false;

    customerQueryService.queryNetworkTypeOptions().then(function(options) {
        $scope.type = {
            options: options,
            selected: options[2]
        };
    });
    $scope.query();
});