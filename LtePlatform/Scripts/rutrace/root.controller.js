
app.controller("rutrace.root", function ($scope, appRegionService, menuItemService) {
    $scope.page = { title: "指标总体情况" };
    $scope.overallStat = {
        currentDistrict: "",
        districtStats: [],
        townStats: [],
        cityStat: {},
        dateString: "",
        city: ""
    };
    $scope.trendStat = {
        stats: [],
        districts: [],
        districtStats: [],
        townStats: [],
        beginDateString: "",
        endDateString: ""
    };
    $scope.topStat = {
        current: {},
        cells: {},
        interference: {},
        victims: {},
        coverages: {},
        updateInteferenceProgress: {},
        updateVictimProgress: {},
        mongoNeighbors: {},
        pieOptions: {},
        columnOptions: {}
    };
    $scope.updateTopCells = function(cell) {
        var cellName = cell.eNodebName + "-" + cell.sectorId;
        if ($scope.topStat.cells[cellName] === undefined) {
            $scope.topStat.cells[cellName] = cell;
        }
    };
    $scope.city = {
        selected: "",
        options: []
    };

    appRegionService.initializeCities().then(function(result) {
        $scope.overallStat.city = result[0];
        $scope.city.options = result;
        $scope.city.selected = result[0];
        appRegionService.queryDistricts(result[0]).then(function (districts) {
            angular.forEach(districts, function(district) {
                menuItemService.updateMenuItem($scope.menuItems, 2,
                    "TOP指标分析-" + district, $scope.rootPath + "topDistrict/" + district);
            });
        });
    });
});
