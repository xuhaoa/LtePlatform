angular.module("topic.dialog.college", ['myApp.url', 'myApp.region', 'myApp.kpi', 'topic.basic', "ui.bootstrap"])
    .run(function ($rootScope, kpiPreciseService) {
        $rootScope.orderPolicy = {
            options: [],
            selected: ""
        };
        $rootScope.topCount = {
            options: [5, 10, 15, 20, 30],
            selected: 15
        };
        kpiPreciseService.getOrderSelection().then(function (result) {
            $rootScope.orderPolicy.options = result;
            $rootScope.orderPolicy.selected = result[5];
        });
        $rootScope.closeAlert = function (messages, index) {
            messages.splice(index, 1);
        };

        $rootScope.overallStat = {
            currentDistrict: "",
            districtStats: [],
            townStats: [],
            cityStat: {},
            dateString: ""
        };
    })
    .controller("college.flow.name",
        function($scope,
            $uibModalInstance,
            name,
            beginDate,
            endDate,
            collegeService,
            appKpiService,
            kpiChartService) {
            $scope.dialogTitle = name + "流量分析";
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.flowStats = [];
            $scope.mergeStats = [];
            $scope.query = function() {
                appKpiService.calculateFlowStats($scope.cellList,
                    $scope.flowStats,
                    $scope.mergeStats,
                    $scope.beginDate,
                    $scope.endDate);
            };
            $scope.showCharts = function() {
                kpiChartService.showFlowCharts($scope.flowStats, name, $scope.mergeStats);
            };
            collegeService.queryCells(name).then(function(cells) {
                $scope.cellList = cells;
                $scope.query();
            });

            $scope.ok = function() {
                $uibModalInstance.close($scope.eNodeb);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
    })
    .controller("college.feeling.name",
        function ($scope,
            $uibModalInstance,
            name,
            beginDate,
            endDate,
            collegeService,
            appKpiService,
            kpiChartService) {
            $scope.dialogTitle = name + "感知速率分析";
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.flowStats = [];
            $scope.mergeStats = [];
            $scope.query = function () {
                appKpiService.calculateFeelingStats($scope.cellList,
                    $scope.flowStats,
                    $scope.mergeStats,
                    $scope.beginDate,
                    $scope.endDate);
            };
            $scope.showCharts = function () {
                kpiChartService.showFlowCharts($scope.flowStats, name, $scope.mergeStats);
            };
            collegeService.queryCells(name).then(function (cells) {
                $scope.cellList = cells;
                $scope.query();
            });

            $scope.ok = function () {
                $uibModalInstance.close($scope.eNodeb);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller("rutrace.trend",
        function($scope,
            $uibModalInstance,
            mapDialogService,
            appKpiService,
            kpiPreciseService,
            appFormatService,
            workItemDialog,
            dialogTitle,
            city,
            beginDate,
            endDate) {
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            $scope.dialogTitle = dialogTitle + '-' + yesterday;
            $scope.kpiType = 'precise';
            $scope.statDate = {
                value: yesterday,
                opened: false
            };
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.showKpi = function() {
                kpiPreciseService.getRecentPreciseRegionKpi(city.selected, $scope.statDate.value)
                    .then(function(result) {
                        $scope.statDate.value = appFormatService.getDate(result.statDate);
                        angular.forEach(result.districtPreciseViews,
                            function(view) {
                                view.objectRate = appKpiService.getPreciseObject(view.district);
                            });
                        $scope.overallStat.districtStats = result.districtPreciseViews;
                        $scope.overallStat.townStats = result.townPreciseViews;
                        $scope.overallStat.currentDistrict = result.districtPreciseViews[0].district;
                        $scope.overallStat.districtStats
                            .push(appKpiService.getCityStat($scope.overallStat.districtStats, city.selected));
                        $scope.overallStat.dateString = appFormatService
                            .getDateString($scope.statDate.value, "yyyy年MM月dd日");
                    });
            };
            $scope.showChart = function() {
                workItemDialog.showPreciseChart($scope.overallStat);
            };
            $scope.showWorkitemCity = function() {
                mapDialogService.showPreciseWorkItem($scope.endDate);
            };
            $scope.showTrend = function() {
                workItemDialog.showPreciseTrend(city, $scope.beginDate, $scope.endDate);
            };
            $scope.showTopKpi = function() {
                mapDialogService.showPreciseTop($scope.beginDate, $scope.endDate);
            };

            $scope.showKpi();

            $scope.ok = function() {
                $uibModalInstance.close($scope.building);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('rrc.trend',
        function($scope,
            $uibModalInstance,
            kpiPreciseService,
            appFormatService,
            appKpiService,
            workItemDialog,
            dialogTitle,
            city,
            beginDate,
            endDate) {
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            $scope.dialogTitle = dialogTitle + '-' + yesterday;
            $scope.kpiType = 'rrc';
            $scope.statDate = {
                value: yesterday,
                opened: false
            };

            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.showKpi = function() {
                kpiPreciseService.getRecentRrcRegionKpi(city.selected, $scope.statDate.value)
                    .then(function(result) {
                        $scope.statDate.value = appFormatService.getDate(result.statDate);
                        angular.forEach(result.districtRrcViews,
                            function(view) {
                                view.objectRate = appKpiService.getRrcObject(view.district);
                            });
                        $scope.overallStat.districtStats = result.districtRrcViews;
                        $scope.overallStat.townStats = result.townRrcViews;
                        $scope.overallStat.currentDistrict = result.districtRrcViews[0].district;
                        $scope.overallStat.districtStats
                            .push(appKpiService.getRrcCityStat($scope.overallStat.districtStats, city.selected));
                        $scope.overallStat.dateString = appFormatService
                            .getDateString($scope.statDate.value, "yyyy年MM月dd日");
                    });
            };
            $scope.showChart = function() {
                workItemDialog.showRrcChart($scope.overallStat);
            };
            $scope.showTrend = function() {
                workItemDialog.showRrcTrend(city, $scope.beginDate, $scope.endDate);
            };
            $scope.showKpi();
            $scope.ok = function() {
                $uibModalInstance.close($scope.building);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller("rutrace.top",
        function($scope,
            $uibModalInstance,
            dialogTitle,
            preciseInterferenceService,
            kpiPreciseService,
            workitemService,
            beginDate,
            endDate) {
            $scope.dialogTitle = dialogTitle;
            $scope.topCells = [];
            $scope.updateMessages = [];
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;

            $scope.query = function() {
                $scope.topCells = [];
                kpiPreciseService.queryTopKpis(beginDate.value,
                    endDate.value,
                    $scope.topCount.selected,
                    $scope.orderPolicy.selected).then(function(result) {
                    $scope.topCells = result;
                    angular.forEach(result,
                        function(cell) {
                            workitemService.queryByCellId(cell.cellId, cell.sectorId).then(function(items) {
                                if (items.length > 0) {
                                    for (var j = 0; j < $scope.topCells.length; j++) {
                                        if (items[0].eNodebId === $scope.topCells[j].cellId &&
                                            items[0].sectorId === $scope.topCells[j].sectorId) {
                                            $scope.topCells[j].hasWorkItems = true;
                                            break;
                                        }
                                    }
                                }
                            });
                        });
                });
            };

            $scope.query();

            $scope.ok = function() {
                $uibModalInstance.close($scope.building);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller("rutrace.top.district",
        function($scope,
            $uibModalInstance,
            district,
            preciseInterferenceService,
            kpiPreciseService,
            workitemService,
            beginDate,
            endDate) {
            $scope.dialogTitle = "TOP指标分析-" + district;
            $scope.topCells = [];
            $scope.updateMessages = [];
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;

            $scope.query = function() {
                $scope.topCells = [];
                kpiPreciseService.queryTopKpisInDistrict($scope.beginDate.value,
                    $scope.endDate.value,
                    $scope.topCount.selected,
                    $scope.orderPolicy.selected,
                    $scope.city.selected,
                    district).then(function(result) {
                    $scope.topCells = result;
                    angular.forEach(result,
                        function(cell) {
                            workitemService.queryByCellId(cell.cellId, cell.sectorId).then(function(items) {
                                if (items.length > 0) {
                                    for (var j = 0; j < $scope.topCells.length; j++) {
                                        if (items[0].eNodebId === $scope.topCells[j].cellId &&
                                            items[0].sectorId === $scope.topCells[j].sectorId) {
                                            $scope.topCells[j].hasWorkItems = true;
                                            break;
                                        }
                                    }
                                }
                            });
                        });
                });
            };

            $scope.query();

            $scope.ok = function() {
                $uibModalInstance.close($scope.building);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller('college.coverage.all',
        function($scope,
            beginDate,
            endDate,
            $uibModalInstance,
            collegeDtService,
            collegeMapService) {
            $scope.dialogTitle = "校园网路测数据查询";
            $scope.dtInfos = [];
            $scope.query = function() {
                collegeMapService.showDtInfos($scope.dtInfos, beginDate.value, endDate.value);
            };
            $scope.ok = function() {
                $uibModalInstance.close($scope.building);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });