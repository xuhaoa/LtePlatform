app.controller("emergency.list", function ($scope, customerDiloagService, appRegionService) {
    $scope.construct = function() {
        customerDiloagService.constructEmergencyCommunication($scope.beginDate.value, $scope.endDate.value);
    };

    appRegionService.initializeCities().then(function(cities) {
        $scope.city.options = cities;
        $scope.city.selected = cities[0];
        appRegionService.queryDistricts($scope.city.selected).then(function(districts) {
            $scope.district = {
                options: districts,
                selected: districts[0]
            };
        });
    });
});