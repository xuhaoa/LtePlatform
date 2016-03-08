﻿app.controller("rutrace.top", function ($scope, $http, appUrlService, topPreciseService, workitemService) {
    $scope.page.title = "TOP指标分析";
    $scope.topCells = [];
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
    $scope.orderPolicy = {
        options: [],
        selected: ""
    };
    $scope.topCount = {
        options: [5, 10, 15, 20, 30],
        selected: 15
    };

    $scope.query = function () {
        $scope.topCells = [];
        topPreciseService.queryTopKpis($scope.beginDate.value, $scope.endDate.value, $scope.topCount.selected,
            $scope.orderPolicy.selected).then(function (result) {
                $scope.topCells = result;
                for (var i = 0; i < $scope.topCells.length; i++) {
                    var cell = $scope.topCells[i];
                    workitemService.queryByCellId(cell.cellId, cell.sectorId).then(function(items) {
                        if (items.length > 0) {
                            for (var j = 0; j < $scope.topCells.length; j++) {
                                if (items[0].eNodebId === $scope.topCells[j].cellId && items[0].sectorId === $scope.topCells[j].sectorId) {
                                    $scope.topCells[j].hasWorkItems = true;
                                    break;
                                }
                            }
                        }
                    });
                }
            });
    };
    $scope.monitorAll = function () {
        for (var i = 0; i < $scope.topCells.length; i++) {
            var cell = $scope.topCells[i];
            if (cell.isMonitored === false) {
                topPreciseService.addMonitor(cell);
            }
        }
    };
    $scope.updateInfo = function(cell) {
        $scope.topStat.current = cell;
        $scope.updateTopCells(cell);
    };

    topPreciseService.getOrderSelection().then(function (result) {
        $scope.orderPolicy.options = result;
        $scope.orderPolicy.selected = result[0];
        $scope.query();
    });
});