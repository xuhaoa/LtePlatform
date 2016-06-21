
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
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    $scope.beginDate = {
        value: new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate(), 8),
        opened: false
    };
    var today = new Date();
    $scope.endDate = {
        value: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8),
        opened: false
    };

    appRegionService.initializeCities().then(function(result) {
        $scope.overallStat.city = result[0];
        $scope.city.options = result;
        $scope.city.selected = result[0];
        appRegionService.queryDistricts(result[0]).then(function (districts) {
            for (var i = 0; i < districts.length; i++) {
                menuItemService.updateMenuItem($scope.menuItems, 2,
                    "TOP指标分析-" + districts[i],
                    $scope.rootPath + "topDistrict/" + districts[i]);
            }
        });
    });
});
