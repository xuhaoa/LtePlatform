app.controller("emergency.list", function ($scope, customerDiloagService, customerQueryService) {
    $scope.construct = function() {
        customerDiloagService.constructEmergencyCommunication($scope.city, $scope.district);
    };

    customerQueryService.queryVehicleTypeOptions().then(function(options) {
        $scope.type = {
            options: options,
            selected: options[0]
        };
    });
});