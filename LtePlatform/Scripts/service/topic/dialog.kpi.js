angular.module('topic.dialog.kpi', ['myApp.url', 'myApp.region', 'myApp.kpi', 'topic.basic', "ui.bootstrap"])
    .run(function($rootScope, kpiPreciseService) {
        $rootScope.orderPolicy = {
            options: [],
            selected: ""
        };
        $rootScope.topCount = {
            options: [5, 10, 15, 20, 30],
            selected: 15
        };
        $rootScope.initializeOrderPolicy = function() {
            kpiPreciseService.getOrderSelection().then(function(result) {
                $rootScope.orderPolicy.options = result;
                $rootScope.orderPolicy.selected = result[5];
            });
        };
        $rootScope.initializeDownSwitchOrderPolicy = function() {
            kpiPreciseService.getDownSwitchOrderSelection().then(function(result) {
                $rootScope.orderPolicy.options = result;
                $rootScope.orderPolicy.selected = result[1];
            });
        };
        
        $rootScope.closeAlert = function(messages, index) {
            messages.splice(index, 1);
        };

        $rootScope.overallStat = {
            currentDistrict: "",
            districtStats: [],
            townStats: [],
            cityStat: {},
            dateString: ""
        };
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        $rootScope.statDate = {
            value: yesterday,
            opened: false
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
            $scope.dialogTitle = dialogTitle +
                '-' +
                appFormatService.getDateString($scope.statDate.value, "yyyy年MM月dd日");
            $scope.kpiType = 'precise';
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.showKpi = function() {
                kpiPreciseService.getRecentPreciseRegionKpi(city.selected, $scope.statDate.value)
                    .then(function(result) {
                        $scope.statDate.value = appFormatService.getDate(result.statDate);
                        angular.forEach(result.districtViews,
                            function(view) {
                                view.objectRate = appKpiService.getPreciseObject(view.district);
                            });
                        $scope.overallStat.districtStats = result.districtViews;
                        $scope.overallStat.townStats = result.townViews;
                        $scope.overallStat.currentDistrict = result.districtViews[0].district;
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
            $scope.dialogTitle = dialogTitle +
                '-' +
                appFormatService.getDateString($scope.statDate.value, "yyyy年MM月dd日");
            $scope.kpiType = 'rrc';

            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.showKpi = function() {
                kpiPreciseService.getRecentRrcRegionKpi(city.selected, $scope.statDate.value)
                    .then(function(result) {
                        $scope.statDate.value = appFormatService.getDate(result.statDate);
                        angular.forEach(result.districtViews,
                            function(view) {
                                view.objectRate = appKpiService.getRrcObject(view.district);
                            });
                        $scope.overallStat.districtStats = result.districtViews;
                        $scope.overallStat.townStats = result.townViews;
                        $scope.overallStat.currentDistrict = result.districtViews[0].district;
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
    .controller('cqi.trend',
        function ($scope,
            $uibModalInstance,
            kpiPreciseService,
            appFormatService,
            appKpiService,
            workItemDialog,
            dialogTitle,
            city,
            beginDate,
            endDate) {
            $scope.dialogTitle = dialogTitle +
                '-' +
                appFormatService.getDateString($scope.statDate.value, "yyyy年MM月dd日");
            $scope.kpiType = 'cqi';

            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.showKpi = function () {
                kpiPreciseService.getRecentCqiRegionKpi(city.selected, $scope.statDate.value)
                    .then(function (result) {
                        $scope.statDate.value = appFormatService.getDate(result.statDate);
                        angular.forEach(result.districtViews,
                            function (view) {
                                view.objectRate = appKpiService.getCqiObject(view.district);
                                view.goodCounts = view.cqiCounts.item2;
                                view.totalCounts = view.cqiCounts.item1 + view.cqiCounts.item2;
                            });
                        $scope.overallStat.districtStats = result.districtViews;
                        $scope.overallStat.townStats = result.townViews;
                        $scope.overallStat.currentDistrict = result.districtViews[0].district;
                        $scope.overallStat.districtStats
                            .push(appKpiService.getCqiCityStat($scope.overallStat.districtStats, city.selected));
                        $scope.overallStat.dateString = appFormatService
                            .getDateString($scope.statDate.value, "yyyy年MM月dd日");
                    });
            };
            $scope.showChart = function () {
                workItemDialog.showCqiChart($scope.overallStat);
            };
            $scope.showTrend = function () {
                workItemDialog.showCqiTrend(city, $scope.beginDate, $scope.endDate);
            };
            $scope.showKpi();
            $scope.ok = function () {
                $uibModalInstance.close($scope.building);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
    })
    .controller('down.switch.trend',
        function ($scope,
            $uibModalInstance,
            kpiPreciseService,
            appFormatService,
            appKpiService,
            workItemDialog,
            mapDialogService,
            dialogTitle,
            city,
            beginDate,
            endDate) {
            $scope.dialogTitle = dialogTitle +
                '-' +
                appFormatService.getDateString($scope.statDate.value, "yyyy年MM月dd日");
            $scope.kpiType = 'downSwitch';

            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.showKpi = function () {
                kpiPreciseService.getRecentFlowRegionKpi(city.selected, $scope.statDate.value)
                    .then(function (result) {
                        $scope.statDate.value = appFormatService.getDate(result.statDate);
                        angular.forEach(result.districtViews,
                            function (view) {
                                view.objectRate = appKpiService.getDownSwitchObject(view.district);
                                view.totalFlowMByte = (view.pdcpDownlinkFlow + view.pdcpUplinkFlow) / 8;
                            });
                        $scope.overallStat.districtStats = result.districtViews;
                        $scope.overallStat.townStats = result.townViews;
                        $scope.overallStat.currentDistrict = result.districtViews[0].district;
                        $scope.overallStat.districtStats
                            .push(appKpiService.getFlowCityStat($scope.overallStat.districtStats, city.selected));
                        $scope.overallStat.dateString = appFormatService
                            .getDateString($scope.statDate.value, "yyyy年MM月dd日");
                    });
            };
            $scope.showChart = function () {
                workItemDialog.showDownSwitchChart($scope.overallStat);
            };
            $scope.showTrend = function () {
                workItemDialog.showDownSwitchTrend(city, $scope.beginDate, $scope.endDate);
            };
            $scope.showTopKpi = function () {
                mapDialogService.showDownSwitchTop($scope.beginDate, $scope.endDate);
            };

            $scope.showKpi();
            $scope.ok = function () {
                $uibModalInstance.close($scope.building);
            };

            $scope.cancel = function () {
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
            $scope.kpiType = 'precise';

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
            $scope.initializeOrderPolicy();
            $scope.$watch('orderPolicy.selected',
                function (selection) {
                    if (selection) {
                        $scope.query();
                    }
                });

            $scope.ok = function() {
                $uibModalInstance.close($scope.building);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
    })
    .controller("down.switch.top",
        function ($scope,
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
            $scope.kpiType = 'downSwitch';

            $scope.query = function () {
                $scope.topCells = [];
                kpiPreciseService.queryTopDownSwitchByPolicy(beginDate.value,
                    endDate.value,
                    $scope.topCount.selected,
                    $scope.orderPolicy.selected).then(function (result) {
                        $scope.topCells = result;
                    });
            };
            $scope.initializeDownSwitchOrderPolicy();
            $scope.$watch('orderPolicy.selected',
                function (selection) {
                    if (selection) {
                        $scope.query();
                    }
                });
            

            $scope.ok = function () {
                $uibModalInstance.close($scope.building);
            };

            $scope.cancel = function () {
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
            $scope.initializeOrderPolicy();
            $scope.$watch('orderPolicy.selected',
                function (selection) {
                    if (selection) {
                        $scope.query();
                    }
                });

            $scope.ok = function() {
                $uibModalInstance.close($scope.building);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });