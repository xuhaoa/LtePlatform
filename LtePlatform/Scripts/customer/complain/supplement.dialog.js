app.controller('complain.supplement.dialog', function ($scope, $uibModalInstance,
    appRegionService, appFormatService, baiduMapService, item) {
    $scope.dialogTitle = item.serialNumber + "工单信息补充";

    $scope.item = item;
    appRegionService.initializeCities().then(function(cities) {
        $scope.city.options = cities;
        $scope.city.selected = cities[0];
        appRegionService.queryDistricts($scope.city.selected).then(function (districts) {
            $scope.district.options = districts;
            $scope.district.selected = (item.district) ? item.district.replace('区', '') : districts[0];
        });
    });
    baiduMapService.initializeMap("map", 11);
    baiduMapService.addCityBoundary("佛山");

    $scope.matchTown = function() {
        var town = appFormatService.searchPattern($scope.town.options, item.sitePosition);
        if (town) {
            $scope.town.selected = town;
            return;
        }
        town = appFormatService.searchPattern($scope.town.options, item.buildingName);
        if (town) {
            $scope.town.selected = town;
            return;
        }
        town = appFormatService.searchPattern($scope.town.options, item.roadName);
        if (town) {
            $scope.town.selected = town;
        }
    };

    $scope.ok = function () {
        $scope.item.district = $scope.district.selected;
        $scope.item.town = $scope.town.selected;
        $uibModalInstance.close($scope.item);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});