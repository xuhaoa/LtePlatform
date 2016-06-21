app.controller("emergency.list", function ($scope, customerDiloagService) {
    $scope.construct = function() {
        customerDiloagService.constructEmergencyCommunication($scope.beginDate.value, $scope.endDate.value);
    };
});