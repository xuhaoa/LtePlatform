angular.module('kpi.work.chart', ['myApp.url', 'myApp.region', "ui.bootstrap", "kpi.core"])
    .controller("rutrace.chart",
        function($scope,
            $uibModalInstance,
            $timeout,
            dateString,
            districtStats,
            townStats,
            appKpiService) {
            $scope.dialogTitle = dateString + "精确覆盖率指标";
            $scope.showCharts = function() {
                $("#leftChart").highcharts(appKpiService
                    .getMrPieOptions(districtStats.slice(0, districtStats.length - 1), townStats));
                $("#rightChart").highcharts(appKpiService.getPreciseRateOptions(districtStats, townStats));
            };

            $scope.ok = function() {
                $uibModalInstance.close($scope.cellList);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $timeout(function() {
                    $scope.showCharts();
                },
                500);
        })
    .controller("rrc.chart",
        function($scope,
            $uibModalInstance,
            $timeout,
            dateString,
            districtStats,
            townStats,
            appKpiService) {
            $scope.dialogTitle = dateString + "RRC连接成功率指标";
            $scope.showCharts = function() {
                $("#leftChart").highcharts(appKpiService
                    .getRrcRequestOptions(districtStats.slice(0, districtStats.length - 1), townStats));
                $("#rightChart").highcharts(appKpiService.getRrcRateOptions(districtStats, townStats));
                $("#thirdChart").highcharts(appKpiService.getMoSignallingRrcRateOptions(districtStats, townStats));
                $("#fourthChart").highcharts(appKpiService.getMtAccessRrcRateOptions(districtStats, townStats));
            };

            $scope.ok = function() {
                $uibModalInstance.close($scope.cellList);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $timeout(function() {
                    $scope.showCharts();
                },
                500);
    })
    .controller("cqi.chart",
        function ($scope,
            $uibModalInstance,
            $timeout,
            dateString,
            districtStats,
            townStats,
            appKpiService) {
            $scope.dialogTitle = dateString + "CQI优良比指标";
            $scope.showCharts = function () {
                $("#leftChart").highcharts(appKpiService
                    .getCqiCountsOptions(districtStats.slice(0, districtStats.length - 1), townStats));
                $("#rightChart").highcharts(appKpiService.getCqiRateOptions(districtStats, townStats));
            };

            $scope.ok = function () {
                $uibModalInstance.close($scope.cellList);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $timeout(function () {
                $scope.showCharts();
            },
                500);
    })
    .controller("down.switch.chart",
        function ($scope,
            $uibModalInstance,
            $timeout,
            dateString,
            districtStats,
            townStats,
            appKpiService) {
            $scope.dialogTitle = dateString + "4G下切3G指标";
            $scope.showCharts = function () {
                $("#leftChart").highcharts(appKpiService
                    .getDownSwitchCountsOptions(districtStats.slice(0, districtStats.length - 1), townStats));
                $("#rightChart").highcharts(appKpiService.getDownSwitchRateOptions(districtStats, townStats, 'all'));
            };

            $scope.ok = function () {
                $uibModalInstance.close($scope.cellList);
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $timeout(function () {
                $scope.showCharts();
            },
                500);
        })
    .controller("rutrace.index",
        function($scope,
            $uibModalInstance,
            kpiPreciseService,
            appFormatService,
            appKpiService,
            kpiDisplayService,
            kpiRatingDivisionDefs,
            kpi2GService,
            downSwitchService,
            workitemService,
            dialogTitle,
            city) {
            $scope.areaItems = [
                {
                    title: "4G指标",
                    comments: '/appViews/Home/Kpi4G.html',
                    width: 6
                }, {
                    title: "4G用户3G流量比",
                    comments: '/appViews/Home/KpiDownSwitch.html',
                    width: 6
                }, {
                    title: "传统指标",
                    comments: '/appViews/Home/Kpi2G.html',
                    width: 6
                }, {
                    title: "工单监控",
                    comments: '/appViews/Home/WorkItem.html',
                    width: 6
                }
            ];
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            $scope.dialogTitle = dialogTitle + '-' + yesterday;
            $scope.statDate = {
                value: yesterday,
                opened: false
            };
            $scope.kpiDate = {
                value: yesterday,
                opened: false
            };
            $scope.flowDate = {
                value: yesterday,
                opened: false
            };
            $scope.preciseRating = kpiRatingDivisionDefs.precise;
            $scope.dropRating = kpiRatingDivisionDefs.drop;
            $scope.downSwitchRating = kpiRatingDivisionDefs.downSwitch;

            $scope.queryKpi4G = function() {
                kpiPreciseService.getRecentPreciseRegionKpi(city, $scope.statDate.value)
                    .then(function(result) {
                        $scope.statDate.value = appFormatService.getDate(result.statDate);
                        $scope.cityStat = appKpiService.getCityStat(result.districtViews, city);
                        $scope.rate = appKpiService.calculatePreciseRating($scope.cityStat.preciseRate);
                        var options = kpiDisplayService.generatePreciseBarOptions(result.districtViews,
                            $scope.cityStat);
                        $("#preciseConfig").highcharts(options);
                    });
            };
            $scope.queryKpi2G = function() {
                kpi2GService.queryDayStats(city, $scope.kpiDate.value)
                    .then(function(result) {
                        $scope.kpiDate.value = appFormatService.getDate(result.statDate);
                        var stat = result.statViews[result.statViews.length - 1];
                        $scope.dropRate = stat.drop2GRate * 100;
                        $scope.dropStar = appKpiService.calculateDropStar($scope.dropRate);
                        $scope.connectionRate = stat.connectionRate * 100;
                    });
            };
            $scope.queryDownSwitch = function() {
                downSwitchService.getRecentKpi(city, $scope.flowDate.value)
                    .then(function(result) {
                        $scope.flowDate.value = appFormatService.getDate(result.statDate);
                        $scope.flowStat = appKpiService.getDownSwitchRate(result.downSwitchFlowViews);
                        $scope.downRate = appKpiService.calculateDownSwitchRating($scope.flowStat);
                        var options = kpiDisplayService.generateDownSwitchOptions(result.downSwitchFlowViews,
                            city,
                            $scope.flowStat);
                        $("#downSwitchConfig").highcharts(options);
                    });
            };
            $scope.queryWorkItem = function() {
                workitemService.queryCurrentMonth().then(function(result) {
                    $scope.totalItems = result.item1;
                    $scope.finishedItems = result.item2;
                    $scope.lateItems = result.item3;
                    var finishedGauge = new GaugeMeter();
                    var inTimeGauge = new GaugeMeter();
                    finishedGauge.title.text = '完成工单情况';
                    finishedGauge.yAxis.max = $scope.totalItems;
                    finishedGauge.yAxis.plotBands[0].to = $scope.totalItems * 0.6;
                    finishedGauge.yAxis.plotBands[1].from = $scope.totalItems * 0.6;
                    finishedGauge.yAxis.plotBands[1].to = $scope.totalItems * 0.8;
                    finishedGauge.yAxis.plotBands[2].from = $scope.totalItems * 0.8;
                    finishedGauge.yAxis.plotBands[2].to = $scope.totalItems;
                    finishedGauge.series[0].name = '完成工单数';
                    finishedGauge.series[0].data[0] = $scope.finishedItems;
                    finishedGauge.yAxis.title.text = '工单数';
                    inTimeGauge.title.text = '工单及时性';
                    inTimeGauge.yAxis.max = $scope.totalItems;
                    inTimeGauge.yAxis.plotBands[0].to = $scope.totalItems * 0.6;
                    inTimeGauge.yAxis.plotBands[1].from = $scope.totalItems * 0.6;
                    inTimeGauge.yAxis.plotBands[1].to = $scope.totalItems * 0.8;
                    inTimeGauge.yAxis.plotBands[2].from = $scope.totalItems * 0.8;
                    inTimeGauge.yAxis.plotBands[2].to = $scope.totalItems;
                    inTimeGauge.series[0].name = '未超时工单数';
                    inTimeGauge.series[0].data[0] = $scope.totalItems - $scope.lateItems;
                    inTimeGauge.yAxis.title.text = '工单数';
                    $("#workitemFinished").highcharts(finishedGauge.options);
                    $("#workitemInTime").highcharts(inTimeGauge.options);
                });
            };

            $scope.queryKpi4G();
            $scope.queryKpi2G();
            $scope.queryDownSwitch();
            $scope.queryWorkItem();

            $scope.ok = function() {
                $uibModalInstance.close($scope.distributionGroups);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        })
    .controller("rutrace.cell.trend",
        function($scope,
            $uibModalInstance,
            name,
            cellId,
            sectorId,
            appKpiService,
            cellPreciseService,
            kpiDisplayService,
            appFormatService) {
            $scope.dialogTitle = "小区指标变化趋势分析" + "-" + name;
            $scope.showTrend = function() {
                $scope.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
                $scope.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
                cellPreciseService.queryDataSpanKpi($scope.beginDate.value,
                    $scope.endDate.value,
                    cellId,
                    sectorId).then(function (result) {
                    $("#mrsConfig").highcharts(kpiDisplayService.getMrsOptions(result,
                            $scope.beginDateString + "-" + $scope.endDateString + "MR数变化趋势"));
                    $("#preciseConfig").highcharts(kpiDisplayService.getPreciseOptions(result,
                        $scope.beginDateString + "-" + $scope.endDateString + "精确覆盖率变化趋势"));
                });
            };
            $scope.showTrend();

            $scope.ok = function() {
                $uibModalInstance.close($scope.distributionGroups);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };
        });