app.controller("emergency.list", function ($scope, customerDialogService, customerQueryService) {
    $scope.page.title = "应急需求";
    $scope.construct = function() {
        customerDialogService.constructEmergencyCommunication(
            $scope.city, $scope.district, $scope.type, $scope.page.messages, $scope.query);
    };
    $scope.query = function() {
        customerQueryService.queryAll($scope.beginDate.value, $scope.endDate.value).then(function(items) {
            $scope.items = items;
        });
    };

    customerQueryService.queryVehicleTypeOptions().then(function(options) {
        $scope.type = {
            options: options,
            selected: options[0]
        };
    });
    $scope.query();
});