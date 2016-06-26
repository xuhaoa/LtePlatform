app.controller("vip.list", function ($scope, customerDialogService, customerQueryService) {
    $scope.construct = function() {
        customerDialogService.constructEmergencyCommunication(
            $scope.city, $scope.district, $scope.type, $scope.page.messages, $scope.query);
    };
    $scope.query = function() {
        customerQueryService.queryAllVip($scope.beginDate.value, $scope.endDate.value).then(function(items) {
            console.log(items);
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