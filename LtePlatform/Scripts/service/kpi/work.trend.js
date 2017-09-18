﻿angular.module('kpi.work.trend', ['myApp.url', 'myApp.region', "ui.bootstrap", "kpi.core"])
    .run(function($rootScope) {
        $rootScope.trendStat = {
            stats: [],
            districts: [],
            districtStats: [],
            townStats: [],
            beginDateString: "",
            endDateString: ""
        };
    })
    .controller('basic.kpi.trend',
        function($scope, $uibModalInstance, city, beginDate, endDate, kpi2GService, kpiDisplayService) {
            $scope.dialogTitle = "指标变化趋势-" + city;
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;

            kpi2GService.queryKpiOptions().then(function(result) {
                $scope.kpi = {
                    options: result,
                    selected: result[0]
                };
            });

            $scope.$watch('kpi.options',
                function(options) {
                    if (options && options.length) {
                        $scope.showTrend();
                    }
                });

            $scope.ok = function() {
                $uibModalInstance.close($scope.kpi);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.showTrend = function() {
                kpi2GService.queryKpiTrend(city, $scope.beginDate.value, $scope.endDate.value).then(function(data) {
                    angular.forEach($scope.kpi.options,
                        function(option, $index) {
                            $("#kpi-" + $index).highcharts(kpiDisplayService.generateComboChartOptions(data, option));
                        });
                });
            };
        })
    .controller("rutrace.trend.dialog",
        function($scope,
            $uibModalInstance,
            city,
            beginDate,
            endDate,
            appRegionService,
            appKpiService,
            kpiPreciseService,
            appFormatService) {

            appRegionService.queryDistricts(city.selected)
                .then(function(districts) {
                    $scope.trendStat.districts = districts;
                });
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.dialogTitle = "精确覆盖率变化趋势";
            $scope.preciseFunc = function(stat) {
                return stat.precise;
            };
            $scope.mrFunc = function(stat) {
                return stat.mr;
            };
            $scope.showCharts = function() {
                $("#mr-pie").highcharts(appKpiService.getMrPieOptions($scope.trendStat.districtStats,
                    $scope.trendStat.townStats));
                $("#precise").highcharts(appKpiService.getPreciseRateOptions($scope.trendStat.districtStats,
                    $scope.trendStat.townStats));
                $("#time-mr").highcharts(appKpiService.getMrsDistrictOptions($scope.trendStat.stats,
                    $scope.trendStat.districts));
                $("#time-precise").highcharts(appKpiService.getPreciseDistrictOptions($scope.trendStat.stats,
                    $scope.trendStat.districts));
            };
            $scope.ok = function() {
                $uibModalInstance.close($scope.trendStat);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            kpiPreciseService.getDateSpanPreciseRegionKpi($scope.city.selected,
                    $scope.beginDate.value,
                    $scope.endDate.value)
                .then(function(result) {
                    $scope.trendStat.stats = appKpiService.generateDistrictStats($scope.trendStat.districts, result);
                    if (result.length > 0) {
                        appKpiService.generateTrendStatsForPie($scope.trendStat, result);
                        $scope.trendStat.stats.push(appKpiService.calculateAverageRates($scope.trendStat.stats));
                    }
                    $scope.trendStat.beginDateString = appFormatService
                        .getDateString($scope.beginDate.value, "yyyy年MM月dd日");
                    $scope.trendStat.endDateString = appFormatService
                        .getDateString($scope.endDate.value, "yyyy年MM月dd日");
                    $scope.showCharts();
                });

        })
    .controller("rrc.trend.dialog",
        function($scope,
            $uibModalInstance,
            city,
            beginDate,
            endDate,
            appRegionService,
            appKpiService,
            kpiPreciseService,
            appFormatService) {

            appRegionService.queryDistricts(city.selected)
                .then(function(districts) {
                    $scope.trendStat.districts = districts;
                });
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.dialogTitle = "RRC连接成功率变化趋势";
            $scope.rateFunc = function(stat) {
                return stat.rate;
            };
            $scope.requestFunc = function(stat) {
                return stat.request;
            };
            $scope.showCharts = function() {
                $("#time-request").highcharts(appKpiService.getRrcRequestOptions($scope.trendStat.districtStats,
                    $scope.trendStat.townStats));
                $("#time-rate").highcharts(appKpiService.getRrcRateOptions($scope.trendStat.districtStats,
                    $scope.trendStat.townStats));
                $("#request-pie").highcharts(appKpiService.getRrcRequestDistrictOptions($scope.trendStat.stats,
                    $scope.trendStat.districts));
                $("#rate-column").highcharts(appKpiService.getRrcRateDistrictOptions($scope.trendStat.stats,
                    $scope.trendStat.districts));
            };
            $scope.ok = function() {
                $uibModalInstance.close($scope.trendStat);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            kpiPreciseService.getDateSpanRrcRegionKpi($scope.city.selected,
                    $scope.beginDate.value,
                    $scope.endDate.value)
                .then(function(result) {
                    $scope.trendStat.stats = appKpiService.generateRrcDistrictStats($scope.trendStat.districts, result);
                    if (result.length > 0) {
                        appKpiService.generateRrcTrendStatsForPie($scope.trendStat, result);
                        $scope.trendStat.stats.push(appKpiService.calculateAverageRrcRates($scope.trendStat.stats));
                    }
                    $scope.trendStat.beginDateString = appFormatService
                        .getDateString($scope.beginDate.value, "yyyy年MM月dd日");
                    $scope.trendStat.endDateString = appFormatService
                        .getDateString($scope.endDate.value, "yyyy年MM月dd日");
                    $scope.showCharts();
                });

        })
    .controller('kpi.topConnection3G.trend',
        function($scope,
            $uibModalInstance,
            city,
            beginDate,
            endDate,
            topCount,
            appRegionService,
            appFormatService,
            connection3GService) {
            $scope.dialogTitle = "TOP连接变化趋势-" + city;
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.topCount = topCount;
            $scope.showTrend = function() {
                connection3GService.queryCellTrend($scope.beginDate.value,
                    $scope.endDate.value,
                    city,
                    $scope.orderPolicy.selected,
                    $scope.topCount.selected).then(function(result) {
                    $scope.trendCells = result;
                });
            };
            $scope.ok = function() {
                $uibModalInstance.close($scope.trendStat);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            connection3GService.queryOrderPolicy().then(function(result) {
                $scope.orderPolicy = {
                    options: result,
                    selected: result[0]
                }
                $scope.showTrend();
            });
        })
    .controller('kpi.topDrop2G.trend',
        function($scope,
            $uibModalInstance,
            city,
            beginDate,
            endDate,
            topCount,
            appRegionService,
            appFormatService,
            drop2GService) {
            $scope.dialogTitle = "TOP掉话变化趋势-" + city;
            $scope.beginDate = beginDate;
            $scope.endDate = endDate;
            $scope.topCount = topCount;
            $scope.ok = function() {
                $uibModalInstance.close($scope.trendStat);
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            };

            $scope.showTrend = function() {
                drop2GService.queryCellTrend($scope.beginDate.value,
                    $scope.endDate.value,
                    city,
                    $scope.orderPolicy.selected,
                    $scope.topCount.selected).then(function(result) {
                    $scope.trendCells = result;
                });
            };
            drop2GService.queryOrderPolicy().then(function(result) {
                $scope.orderPolicy = {
                    options: result,
                    selected: result[0]
                }
                $scope.showTrend();
            });
        });