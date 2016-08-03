angular.module('precise.workitem', ['app.common'])
    .controller("rutrace.workitems", function($scope, $routeParams, workitemService, networkElementService) {
        $scope.page.title = $routeParams.name + "-" + $routeParams.sectorId + ":TOP小区工单历史";
        $scope.queryWorkItems = function() {
            workitemService.queryByCellId($routeParams.cellId, $routeParams.sectorId).then(function(result) {
                $scope.viewItems = result;
                $scope.viewData.workItems = result;
            });
            networkElementService.queryCellInfo($routeParams.cellId, $routeParams.sectorId).then(function(result) {
                $scope.lteCellDetails = result;
            });
        };
        $scope.queryWorkItems();
    })
    .controller("workitem.details", function($scope, $routeParams, $uibModal, $log,
        workitemService, appFormatService, cellPreciseService, kpiDisplayService, preciseWorkItemService, networkElementService) {
        $scope.page.title = "工单编号" + $routeParams.number + "信息";
        $scope.serialNumber = $routeParams.number;
        $scope.initialize = true;
        $scope.queryWorkItems = function() {
            workitemService.querySingleItem($routeParams.number).then(function(result) {
                $scope.currentView = result;
                $scope.beginDate.value = appFormatService.getDate($scope.currentView.beginTime);
                $scope.showTrend();
            });

        };
        $scope.queryPreciseCells = function() {
            preciseWorkItemService.queryBySerial($routeParams.number).then(function(cells) {
                $scope.preciseCells = cells;
                angular.forEach(cells, function(cell) {
                    networkElementService.queryENodebInfo(cell.eNodebId).then(function(info) {
                        cell.cellName = info.name + '-' + cell.sectorId;
                    });
                });
            });
        };
        $scope.showTrend = function() {
            $scope.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
            $scope.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
            cellPreciseService.queryDataSpanKpi($scope.beginDate.value, $scope.endDate.value, $scope.currentView.eNodebId,
                $scope.currentView.sectorId).then(function(result) {
                $scope.mrsConfig = kpiDisplayService.getMrsOptions(result,
                    $scope.beginDateString + "-" + $scope.endDateString + "MR数变化趋势");
                $scope.preciseConfig = kpiDisplayService.getPreciseOptions(result,
                    $scope.beginDateString + "-" + $scope.endDateString + "精确覆盖率变化趋势");
                if ($scope.initialize && result.length > 14) {
                    var output = kpiDisplayService.calculatePreciseChange(result);
                    $scope.preKpi = output.pre;
                    $scope.postKpi = output.post;
                    $scope.initialize = false;
                }
            });
        };
        $scope.finishItem = function() {
            workitemService.finish('优化前精确覆盖率：' + $scope.preKpi + '%；优化后精确覆盖率：' + $scope.postKpi + '%',
                $scope.serialNumber).then(function(view) {
                $scope.currentView = view;
            });
        };

        $scope.queryWorkItems();
        $scope.queryPreciseCells();
    })
    .controller("workitem.city", function($scope, preciseWorkItemService, workItemDialog) {
        $scope.page.title = "精确覆盖优化工单一览";
        $scope.queryWorkItems = function() {
            preciseWorkItemService.queryByDateSpan($scope.seasonDate.value, $scope.endDate.value).then(function(views) {
                angular.forEach(views, function(view) {
                    view.detailsPath = $scope.rootPath + "details/" + view.serialNumber;
                });
                $scope.viewItems = views;
            });
        };
        $scope.showDetails = function(view) {
            workItemDialog.showDetails(view, $scope.queryWorkItems);
        };
        $scope.queryWorkItems();
    })
    .controller("workitem.district", function($scope, $routeParams, preciseWorkItemService, workItemDialog) {
        $scope.page.title = $routeParams.district + "精确覆盖优化工单一览";
        $scope.queryWorkItems = function() {
            preciseWorkItemService.queryByDateSpanDistrict($scope.seasonDate.value, $scope.endDate.value, $routeParams.district).then(function(views) {
                angular.forEach(views, function(view) {
                    view.detailsPath = $scope.rootPath + "details/" + view.serialNumber;
                });
                $scope.viewItems = views;
            });
        };
        $scope.showDetails = function(view) {
            workItemDialog.showDetails(view, $scope.queryWorkItems);
        };
        $scope.queryWorkItems();
    });