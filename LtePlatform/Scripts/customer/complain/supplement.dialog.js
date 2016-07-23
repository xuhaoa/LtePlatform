app.controller('complain.supplement.dialog', function ($scope, $uibModalInstance,
    appRegionService, item) {
    $scope.dialogTitle = item.serialNumber + "工单信息补充";

    $scope.item = item;
    appRegionService.initializeCities().then(function(cities) {
        $scope.city.options = cities;
        $scope.city.selected = cities[0];
        appRegionService.queryDistricts($scope.city.selected).then(function (districts) {
            $scope.district.options = districts;
            $scope.district.selected = districts[0];
        });
    });

    $scope.ok = function () {
        $uibModalInstance.close($scope.item);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});