app.controller("emergency.list", function ($scope, customerDiloagService, customerQueryService) {
    $scope.construct = function() {
        customerDiloagService.constructEmergencyCommunication($scope.beginDate.value, $scope.endDate.value);
    };

    customerQueryService.queryVehicleTypeService().then(function(options) {
        $scope.type = {
            options: options,
            selected: options[0]
        };
    });
});