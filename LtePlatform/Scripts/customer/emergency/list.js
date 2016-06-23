app.controller("emergency.list", function ($scope, customerDiloagService, customerQueryService) {
    $scope.construct = function() {
        customerDiloagService.constructEmergencyCommunication($scope.city, $scope.district, $scope.type, $scope.page.messages);
    };
    $scope.query = function() {
        customerQueryService.queryAll($scope.beginDate.value, $scope.endDate.value).then(function(items) {
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