app.controller("rutrace.map", function ($scope, $timeout, $routeParams, $location, $uibModal, $log,
    geometryService, baiduMapService, networkElementService, menuItemService, cellPreciseService, neighborMongoService, topPreciseService) {
    $scope.page.title = "小区地理化分析" + ": " + $routeParams.name + "-" + $routeParams.sectorId;
    $scope.neighborLines = [];
    $scope.displayNeighbors = false;
    $scope.reverseNeighborLines = [];
    $scope.displayReverseNeighbors = false;
    $scope.interferenceLines = [];
    $scope.interferenceCircles = [];
    $scope.displayInterference = false;
    $scope.victimLines = [];
    $scope.victimCircles = [];
    $scope.displayVictims = false;
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    $scope.beginDate = {
        value: lastWeek,
        opened: false
    };
    $scope.endDate = {
        value: new Date(),
        opened: false
    };
    menuItemService.updateMenuItem($scope.menuItems, 1,
        $scope.page.title,
        $scope.rootPath + "baidumap/" + $routeParams.cellId + "/" + $routeParams.sectorId + "/" + $routeParams.name);

    baiduMapService.initializeMap("all-map", 12);
    cellPreciseService.queryOneWeekKpi($routeParams.cellId, $routeParams.sectorId).then(function(cellView) {
        networkElementService.queryCellSectors([cellView]).then(function (result) {
            geometryService.transformToBaidu(result[0].longtitute, result[0].lattitute).then(function (coors) {
                var xOffset = coors.x - result[0].longtitute;
                var yOffset = coors.y - result[0].lattitute;
                result[0].longtitute = coors.x;
                result[0].lattitute = coors.y;

                var sectorTriangle = baiduMapService.generateSector(result[0], "blue", 1.25);
                baiduMapService.addOneSectorToScope(sectorTriangle, neighborMongoService.showPreciseDialog, result[0]);

                baiduMapService.setCellFocus(result[0].longtitute, result[0].lattitute, 15);
                var range = baiduMapService.getCurrentMapRange(-xOffset, -yOffset);

                networkElementService.queryRangeSectors(range, []).then(function (sectors) {
                    angular.forEach(sectors, function(sector) {
                        sector.longtitute += xOffset;
                        sector.lattitute += yOffset;
                        baiduMapService.addOneSectorToScope(baiduMapService.generateSector(sector, "green"),
                            neighborMongoService.showNeighborDialog, sector);
                    });
                });
            });

        });
    });

    networkElementService.queryCellInfo($routeParams.cellId, $routeParams.sectorId).then(function(cell) {
        geometryService.transformToBaidu(cell.longtitute, cell.lattitute).then(function(coors) {
            var xOffset = coors.x - cell.longtitute;
            var yOffset = coors.y - cell.lattitute;
            neighborMongoService.queryNeighbors($routeParams.cellId, $routeParams.sectorId).then(function(neighbors) {
                baiduMapService.generateNeighborLines($scope.neighborLines, cell, neighbors, xOffset, yOffset);
            });
            neighborMongoService.queryReverseNeighbors($routeParams.cellId, $routeParams.sectorId).then(function(neighbors) {
                baiduMapService.generateReverseNeighborLines($scope.reverseNeighborLines, cell, neighbors, xOffset, yOffset);
            });
            topPreciseService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function (interference) {
                    baiduMapService.generateInterferenceComponents($scope.interferenceLines, $scope.interferenceCircles, cell,
                        interference, xOffset, yOffset);
                });
            topPreciseService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                $routeParams.cellId, $routeParams.sectorId).then(function(victims) {
                    console.log(victims);
            });
        });
    });
            
    $scope.toggleNeighbors = function () {
        if ($scope.displayNeighbors) {
            baiduMapService.removeOverlays($scope.neighborLines);
            $scope.displayNeighbors = false;
        } else {
            baiduMapService.addOverlays($scope.neighborLines);
            $scope.displayNeighbors = true;
        }
    };

    $scope.toggleReverseNeighbers = function() {
        if ($scope.displayReverseNeighbors) {
            baiduMapService.removeOverlays($scope.reverseNeighborLines);
            $scope.displayReverseNeighbors = false;
        } else {
            baiduMapService.addOverlays($scope.reverseNeighborLines);
            $scope.displayReverseNeighbors = true;
        }
    };

    $scope.toggleInterference = function () {
        if ($scope.displayInterference) {
            baiduMapService.removeOverlays($scope.interferenceLines);
            baiduMapService.removeOverlays($scope.interferenceCircles);
            $scope.displayInterference = false;
        } else {
            baiduMapService.addOverlays($scope.interferenceLines);
            baiduMapService.addOverlays($scope.interferenceCircles);
            $scope.displayInterference = true;
        }
    };
});