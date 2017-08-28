angular.module('kpi.coverage', ['myApp.url', 'myApp.region', "ui.bootstrap"])
    .controller('coverage.details.dialog', function ($scope, $uibModalInstance, cellName, cellId, sectorId,
        topPreciseService, preciseChartService) {
        $scope.dialogTitle = cellName + '：覆盖详细信息';
        $scope.showCoverage = function () {
            topPreciseService.queryRsrpTa($scope.beginDate.value, $scope.endDate.value,
                cellId, sectorId).then(function (result) {
                    for (var rsrpIndex = 0; rsrpIndex < 12; rsrpIndex++) {
                        var options = preciseChartService.getRsrpTaOptions(result, rsrpIndex);
                        $("#rsrp-ta-" + rsrpIndex).highcharts(options);
                    }
                });
            topPreciseService.queryCoverage($scope.beginDate.value, $scope.endDate.value,
                cellId, sectorId).then(function (result) {
                    var options = preciseChartService.getCoverageOptions(result);
                    $("#coverage-chart").highcharts(options);
                });
            topPreciseService.queryTa($scope.beginDate.value, $scope.endDate.value,
                cellId, sectorId).then(function (result) {
                    var options = preciseChartService.getTaOptions(result);
                    $("#ta-chart").highcharts(options);
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.coverageInfos);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showCoverage();
    })
    .controller('interference.source.dialog', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId,
        preciseInterferenceService, neighborMongoService) {
        $scope.dialogTitle = dialogTitle;
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
        var options = [
            {
                name: "模3干扰数",
                value: "mod3Interferences"
            }, {
                name: "模6干扰数",
                value: "mod6Interferences"
            }, {
                name: "6dB干扰数",
                value: "overInterferences6Db"
            }, {
                name: "10dB干扰数",
                value: "overInterferences10Db"
            }, {
                name: "总干扰水平",
                value: "interferenceLevel"
            }
        ];
        $scope.orderPolicy = {
            options: options,
            selected: options[4].value
        };
        $scope.displayItems = {
            options: [5, 10, 15, 20, 30],
            selected: 10
        };

        $scope.showInterference = function () {
            $scope.interferenceCells = [];

            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    angular.forEach(result, function (cell) {
                        for (var i = 0; i < $scope.mongoNeighbors.length; i++) {
                            var neighbor = $scope.mongoNeighbors[i];
                            if (neighbor.neighborPci === cell.destPci) {
                                cell.isMongoNeighbor = true;
                                break;
                            }
                        }
                    });
                    $scope.interferenceCells = result;
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.interferenceCells);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        neighborMongoService.queryNeighbors(eNodebId, sectorId).then(function (result) {
            $scope.mongoNeighbors = result;
            $scope.showInterference();
        });
    })
    .controller('interference.source.db.chart', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
        topPreciseService, kpiDisplayService, preciseInterferenceService) {
        $scope.dialogTitle = dialogTitle;
        $scope.currentCellName = name + "-" + sectorId;
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
        $scope.showChart = function () {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                    $("#interference-over6db").highcharts(pieOptions.over6DbOption);
                    $("#interference-over10db").highcharts(pieOptions.over10DbOption);
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.source.mod.chart', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
        topPreciseService, kpiDisplayService, preciseInterferenceService) {
        $scope.dialogTitle = dialogTitle;
        $scope.currentCellName = name + "-" + sectorId;
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
        $scope.showChart = function () {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    var pieOptions = kpiDisplayService.getInterferencePieOptions(result, $scope.currentCellName);
                    $("#interference-mod3").highcharts(pieOptions.mod3Option);
                    $("#interference-mod6").highcharts(pieOptions.mod6Option);
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.source.strength.chart', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId, name,
        topPreciseService, kpiDisplayService, preciseInterferenceService, neighborMongoService, networkElementService) {
        $scope.dialogTitle = dialogTitle;
        $scope.currentCellName = name + "-" + sectorId;
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
        $scope.showChart = function () {
            preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (result) {
                    networkElementService.queryCellInfo(eNodebId, sectorId).then(function (info) {
                        topPreciseService.queryCellStastic(eNodebId, info.pci,
                            $scope.beginDate.value, $scope.endDate.value).then(function (stastic) {
                                var columnOptions = kpiDisplayService.getStrengthColumnOptions(result, stastic.mrCount,
                                    $scope.currentCellName);
                                $("#strength-over6db").highcharts(columnOptions.over6DbOption);
                                $("#strength-over10db").highcharts(columnOptions.over10DbOption);
                            });
                    });
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close('已处理');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showChart();
    })
    .controller('interference.victim.dialog', function ($scope, $uibModalInstance, dialogTitle, eNodebId, sectorId,
        topPreciseService, preciseInterferenceService) {
        $scope.dialogTitle = dialogTitle;
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
        var options = [
            {
                name: "模3干扰数",
                value: "mod3Interferences"
            }, {
                name: "模6干扰数",
                value: "mod6Interferences"
            }, {
                name: "6dB干扰数",
                value: "overInterferences6Db"
            }, {
                name: "10dB干扰数",
                value: "overInterferences10Db"
            }, {
                name: "总干扰水平",
                value: "interferenceLevel"
            }
        ];
        $scope.orderPolicy = {
            options: options,
            selected: options[4].value
        };
        $scope.displayItems = {
            options: [5, 10, 15, 20, 30],
            selected: 10
        };

        $scope.showVictim = function () {
            $scope.victimCells = [];

            preciseInterferenceService.queryInterferenceVictim($scope.beginDate.value, $scope.endDate.value,
                eNodebId, sectorId).then(function (victims) {
                    preciseInterferenceService.queryInterferenceNeighbor($scope.beginDate.value, $scope.endDate.value,
                        eNodebId, sectorId).then(function (result) {
                            angular.forEach(victims, function (victim) {
                                for (var j = 0; j < result.length; j++) {
                                    if (result[j].destENodebId === victim.victimENodebId
                                        && result[j].destSectorId === victim.victimSectorId) {
                                        victim.forwardInterferences6Db = result[j].overInterferences6Db;
                                        victim.forwardInterferences10Db = result[j].overInterferences10Db;
                                        break;
                                    }
                                }
                            });
                            $scope.victimCells = victims;
                        });
                });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.victimCells);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showVictim();
    })
    .controller('interference.coverage.dialog', function($scope) {
        
    })

    .controller("grid.stats", function ($scope, dialogTitle, category, stats, $uibModalInstance, $timeout, generalChartService) {
        $scope.dialogTitle = dialogTitle;
        var options = generalChartService.getPieOptions(stats, {
            title: dialogTitle,
            seriesTitle: category
        }, function (stat) {
            return stat.key;
        }, function (stat) {
            return stat.value;
        });
        $timeout(function () {
            $("#rightChart").highcharts(options);
        }, 500);

        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("grid.cluster", function ($scope, dialogTitle, clusterList, currentCluster,
        $uibModalInstance, alarmImportService) {
        $scope.dialogTitle = dialogTitle;
        $scope.clusterList = clusterList;
        $scope.currentCluster = currentCluster;

        $scope.calculateKpis = function() {
            angular.forEach($scope.clusterList, function(stat) {
                alarmImportService.updateClusterKpi(stat);
            });
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.currentCluster);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("agps.stats", function ($scope, dialogTitle, stats, legend,
        $uibModalInstance, $timeout, generalChartService) {
        $scope.dialogTitle = dialogTitle;
        var intervalStats = [];
        var low = -10000;
        angular.forEach(legend, function(interval) {
            var high = interval.threshold;
            intervalStats.push({
                interval: '[' + low + ', ' + high + ')dBm',
                count: _.countBy(stats, function(stat) { return stat.telecomRsrp - 140 >= low && stat.telecomRsrp - 140 < high })['true']
            });
            low = high;
        });
        intervalStats.push({
            interval: 'RSRP >= ' + low + 'dBm',
            count: _.countBy(stats, function (stat) { return stat.telecomRsrp - 140 >= low && stat.telecomRsrp - 140 < 10000 })['true']
        });
        var counts = stats.length;
        var operators = ['-110dBm以上', '-105dBm以上', '-100dBm以上'];
        var coverages = [
            _.countBy(stats, function (stat) { return stat.telecomRsrp >= 30 })['true'] / counts * 100,
            _.countBy(stats, function (stat) { return stat.telecomRsrp >= 35 })['true'] / counts * 100,
            _.countBy(stats, function (stat) { return stat.telecomRsrp >= 40 })['true'] / counts * 100
        ];
        var rate100Intervals = [];
        var rate105Intervals = [];
        var thresholds = [
            {
                low: 0,
                high: 0.5
            }, {
                low: 0.5,
                high: 0.75
            }, {
                low: 0.75,
                high: 0.9
            }, {
                low: 0.9,
                high: 1.01
            }
        ];
        angular.forEach(thresholds, function(threshold) {
            rate100Intervals.push({
                interval: '[' + threshold.low + ', ' + threshold.high + ')',
                count: _.countBy(stats, function(stat) { return stat.telecomRate100 >= threshold.low && stat.telecomRate100 < threshold.high })['true']
            });
            rate105Intervals.push({
                interval: '[' + threshold.low + ', ' + threshold.high + ')',
                count: _.countBy(stats, function (stat) { return stat.telecomRate105 >= threshold.low && stat.telecomRate105 < threshold.high })['true']
            });
        });
        $timeout(function () {
            $("#leftChart").highcharts(generalChartService.getPieOptions(intervalStats, {
                title: 'RSRP区间分布',
                seriesTitle: 'RSRP区间'
            }, function (stat) {
                return stat.interval;
            }, function (stat) {
                return stat.count;
            }));
            $("#rightChart").highcharts(generalChartService.queryColumnOptions({
                title: 'RSRP覆盖优良率（%）',
                ytitle: '覆盖优良率（%）',
                xtitle: '覆盖标准',
                min: 80,
                max: 100
            }, operators, coverages));
            $("#thirdChart").highcharts(generalChartService.getPieOptions(rate100Intervals, {
                title: '覆盖率区间分布（RSRP>-100dBm）',
                seriesTitle: '覆盖率区间'
            }, function(stat) {
                return stat.interval;
            }, function(stat) {
                return stat.count;
            }));
            $("#fourthChart").highcharts(generalChartService.getPieOptions(rate105Intervals, {
                title: '覆盖率区间分布（RSRP>-105dBm）',
                seriesTitle: '覆盖率区间'
            }, function (stat) {
                return stat.interval;
            }, function (stat) {
                return stat.count;
            }));
        }, 500);

        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("town.stats", function ($scope, cityName, dialogTitle, $uibModalInstance, appRegionService, parametersChartService) {
        $scope.dialogTitle = dialogTitle;
        appRegionService.queryDistrictInfrastructures(cityName).then(function (result) {
            appRegionService.accumulateCityStat(result, cityName);
            $("#leftChart").highcharts(
                parametersChartService.getDistrictLteENodebPieOptions(result.slice(0, result.length - 1), cityName));
            $("#rightChart").highcharts(
                parametersChartService.getDistrictLteCellPieOptions(result.slice(0, result.length - 1), cityName));
        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("cdma.town.stats", function ($scope, cityName, dialogTitle, $uibModalInstance, appRegionService, parametersChartService) {
        $scope.dialogTitle = dialogTitle;
        appRegionService.queryDistrictInfrastructures(cityName).then(function (result) {
            appRegionService.accumulateCityStat(result, cityName);
            $("#leftChart").highcharts(
                parametersChartService.getDistrictCdmaBtsPieOptions(result.slice(0, result.length - 1), cityName));
            $("#rightChart").highcharts(
                parametersChartService.getDistrictCdmaCellPieOptions(result.slice(0, result.length - 1), cityName));
        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("flow.stats", function ($scope, today, dialogTitle, frequency,
        $uibModalInstance, appRegionService, preciseChartService) {
        $scope.dialogTitle = dialogTitle;
        appRegionService.getTownFlowStats(today, frequency).then(function (result) {
            $("#leftChart").highcharts(preciseChartService.getTownFlowOption(result, frequency));
            $("#rightChart").highcharts(preciseChartService.getTownUsersOption(result, frequency));
        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("flow.trend", function ($scope, beginDate, endDate, city, frequency, dialogTitle, 
        $uibModalInstance, kpiPreciseService, appFormatService, appKpiService, appRegionService) {
        $scope.dialogTitle = appFormatService.getDateString(beginDate.value, "yyyy年MM月dd日") + '-'
            + appFormatService.getDateString(endDate.value, "yyyy年MM月dd日")
            + dialogTitle;
        kpiPreciseService.getDateSpanFlowRegionKpi(city, beginDate.value, endDate.value, frequency).then(function (result) {
            appRegionService.queryDistricts(city).then(function (districts) {
                var stats = appKpiService.generateFlowDistrictStats(districts, result);
                var trendStat = {};
                appKpiService.generateFlowTrendStatsForPie(trendStat, result);
                $("#leftChart").highcharts(appKpiService.getDownlinkFlowDistrictOptions(stats, districts, frequency));
                $("#rightChart").highcharts(appKpiService.getUplinkFlowDistrictOptions(stats, districts, frequency));
                $("#thirdChart").highcharts(appKpiService
                    .getDownlinkFlowOptions(trendStat.districtStats, trendStat.townStats, frequency));
                $("#fourthChart").highcharts(appKpiService
                    .getUplinkFlowOptions(trendStat.districtStats, trendStat.townStats, frequency));
            });

        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("users.trend", function ($scope, beginDate, endDate, city, frequency, dialogTitle, $uibModalInstance,
        kpiPreciseService, appFormatService, appKpiService, appRegionService) {
        $scope.dialogTitle = appFormatService.getDateString(beginDate.value, "yyyy年MM月dd日") + '-'
            + appFormatService.getDateString(endDate.value, "yyyy年MM月dd日")
            + dialogTitle;
        kpiPreciseService.getDateSpanFlowRegionKpi(city, beginDate.value, endDate.value, frequency).then(function (result) {
            appRegionService.queryDistricts(city).then(function (districts) {
                var stats = appKpiService.generateUsersDistrictStats(districts, result);
                var trendStat = {};
                appKpiService.generateFlowTrendStatsForPie(trendStat, result);
                $("#leftChart").highcharts(appKpiService.getMaxUsersDistrictOptions(stats, districts, frequency));
                $("#rightChart").highcharts(appKpiService.getMaxActiveUsersDistrictOptions(stats, districts, frequency));
                $("#thirdChart").highcharts(appKpiService
                    .getMaxUsersOptions(trendStat.districtStats, trendStat.townStats, frequency));
                $("#fourthChart").highcharts(appKpiService
                    .getMaxActiveUsersOptions(trendStat.districtStats, trendStat.townStats, frequency));
            });

        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("feelingRate.trend", function ($scope, beginDate, endDate, city, frequency, dialogTitle, $uibModalInstance,
        kpiPreciseService, appFormatService, appKpiService, appRegionService) {
        $scope.dialogTitle = appFormatService.getDateString(beginDate.value, "yyyy年MM月dd日") + '-'
            + appFormatService.getDateString(endDate.value, "yyyy年MM月dd日")
            + dialogTitle;
        kpiPreciseService.getDateSpanFlowRegionKpi(city, beginDate.value, endDate.value, frequency).then(function (result) {
            appRegionService.queryDistricts(city).then(function (districts) {
                var stats = appKpiService.generateFeelingRateDistrictStats(districts, result);
                var trendStat = {};
                appKpiService.generateFlowTrendStatsForPie(trendStat, result);
                $("#leftChart").highcharts(appKpiService.getDownlinkRateDistrictOptions(stats, districts, frequency));
                $("#rightChart").highcharts(appKpiService.getUplinkRateDistrictOptions(stats, districts, frequency));
                $("#thirdChart").highcharts(appKpiService
                    .getDownlinkRateOptions(trendStat.districtStats, trendStat.townStats, frequency));
                $("#fourthChart").highcharts(appKpiService
                    .getUplinkRateOptions(trendStat.districtStats, trendStat.townStats, frequency));
            });

        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('downSwitch.trend', function ($scope, beginDate, endDate, city, frequency, dialogTitle, $uibModalInstance,
        kpiPreciseService, appFormatService, appKpiService, appRegionService) {
        $scope.dialogTitle = appFormatService.getDateString(beginDate.value, "yyyy年MM月dd日") + '-'
            + appFormatService.getDateString(endDate.value, "yyyy年MM月dd日")
            + dialogTitle;
        kpiPreciseService.getDateSpanFlowRegionKpi(city, beginDate.value, endDate.value, frequency).then(function (result) {
            appRegionService.queryDistricts(city).then(function (districts) {
                var stats = appKpiService.generateDownSwitchDistrictStats(districts, result);
                var trendStat = {};
                appKpiService.generateFlowTrendStatsForPie(trendStat, result);
                $("#leftChart").highcharts(appKpiService.getDownSwitchTimesDistrictOptions(stats, districts, frequency));
                $("#rightChart").highcharts(appKpiService.getDownSwitchRateDistrictOptions(stats, districts, frequency));
                $("#thirdChart").highcharts(appKpiService
                    .getDownSwitchTimesOptions(trendStat.districtStats, trendStat.townStats, frequency));
                $("#fourthChart").highcharts(appKpiService
                    .getDownSwitchRateOptions(trendStat.districtStats, trendStat.townStats, frequency));
            });

        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('rank2Rate.trend', function ($scope, beginDate, endDate, city, frequency, dialogTitle, $uibModalInstance,
        kpiPreciseService, appFormatService, appKpiService, appRegionService) {
        $scope.dialogTitle = appFormatService.getDateString(beginDate.value, "yyyy年MM月dd日") + '-'
            + appFormatService.getDateString(endDate.value, "yyyy年MM月dd日")
            + dialogTitle;
        kpiPreciseService.getDateSpanFlowRegionKpi(city, beginDate.value, endDate.value, frequency).then(function (result) {
            appRegionService.queryDistricts(city).then(function (districts) {
                var stats = appKpiService.generateRank2DistrictStats(districts, result);
                var trendStat = {};
                appKpiService.generateFlowTrendStatsForPie(trendStat, result);
                $("#leftChart").highcharts(appKpiService.getSchedulingTimesDistrictOptions(stats, districts, frequency));
                $("#rightChart").highcharts(appKpiService.getRank2RateDistrictOptions(stats, districts, frequency));
                $("#thirdChart").highcharts(appKpiService
                    .getSchedulingTimesOptions(trendStat.districtStats, trendStat.townStats, frequency));
                $("#fourthChart").highcharts(appKpiService
                    .getRank2RateOptions(trendStat.districtStats, trendStat.townStats, frequency));
            });

        });
        $scope.ok = function () {
            $uibModalInstance.close($scope.city);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

     .controller("user.roles.dialog", function ($scope, $uibModalInstance, dialogTitle, userName, authorizeService) {
         $scope.dialogTitle = dialogTitle;
         $scope.ok = function () {
             $uibModalInstance.close($scope.city);
         };

         $scope.cancel = function () {
             $uibModalInstance.dismiss('cancel');
         };

         $scope.query = function () {
             authorizeService.queryRolesInUser(userName).then(function (roles) {
                 $scope.existedRoles = roles;
             });
             authorizeService.queryCandidateRolesInUser(userName).then(function (roles) {
                 $scope.candidateRoles = roles;
             });
         };

         $scope.addRole = function (role) {
             authorizeService.assignRoleInUser(userName, role).then(function (result) {
                 if (result) {
                     $scope.query();
                 }
             });
         };

         $scope.removeRole = function (role) {
             authorizeService.releaseRoleInUser(userName, role).then(function (result) {
                 if (result) {
                     $scope.query();
                 }
             });
         };

         $scope.query();
     })

    .factory('coverageDialogService', function (menuItemService) {
        return {
            showDetails: function (cellName, cellId, sectorId) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Coverage/DetailsChartDialog.html',
                    controller: 'coverage.details.dialog',
                    resolve: {
                        cellName: function () {
                            return cellName;
                        },
                        cellId: function () {
                            return cellId;
                        },
                        sectorId: function () {
                            return sectorId;
                        }
                    }
                });
            },
            showSource: function (currentView, serialNumber, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/SourceDialog.html',
                    controller: 'interference.source.dialog',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰源分析";
                        },
                        eNodebId: function () {
                            return currentView.eNodebId;
                        },
                        sectorId: function () {
                            return currentView.sectorId;
                        },
                        serialNumber: function () {
                            return serialNumber;
                        }
                    }
                }, function (info) {
                    callback(info);
                });
            },
            showSourceDbChart: function (currentView) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Rutrace/Interference/SourceDbChartDialog.html',
                    controller: 'interference.source.db.chart',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰源图表";
                        },
                        eNodebId: function () {
                            return currentView.eNodebId;
                        },
                        sectorId: function () {
                            return currentView.sectorId;
                        },
                        name: function () {
                            return currentView.eNodebName;
                        }
                    }
                });
            },
            showSourceModChart: function (currentView, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/SourceModChartDialog.html',
                    controller: 'interference.source.mod.chart',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "MOD3/MOD6干扰图表";
                        },
                        eNodebId: function () {
                            return currentView.eNodebId;
                        },
                        sectorId: function () {
                            return currentView.sectorId;
                        },
                        name: function () {
                            return currentView.eNodebName;
                        }
                    }
                }, function (info) {
                    callback(info);
                });
            },
            showSourceStrengthChart: function (currentView, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/SourceStrengthChartDialog.html',
                    controller: 'interference.source.strength.chart',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰强度图表";
                        },
                        eNodebId: function () {
                            return currentView.eNodebId;
                        },
                        sectorId: function () {
                            return currentView.sectorId;
                        },
                        name: function () {
                            return currentView.eNodebName;
                        }
                    }
                }, function (info) {
                    callback(info);
                });
            },
            showInterferenceVictim: function (currentView, serialNumber, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/VictimDialog.html',
                    controller: 'interference.victim.dialog',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "干扰小区分析";
                        },
                        eNodebId: function () {
                            return currentView.eNodebId;
                        },
                        sectorId: function () {
                            return currentView.sectorId;
                        },
                        serialNumber: function () {
                            return serialNumber;
                        }
                    }
                }, function (info) {
                    callback(info);
                });
            },
            showCoverage: function (currentView, preciseCells, callback) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/Rutrace/Interference/CoverageDialog.html',
                    controller: 'interference.coverage.dialog',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "覆盖分析";
                        },
                        preciseCells: function () {
                            return preciseCells;
                        }
                    }
                }, function (info) {
                    callback(info);
                });
            },///////////未完成
            showGridStats: function (district, town, theme, category, data, keys) {
                var stats = [];
                angular.forEach(keys, function (key) {
                    stats.push({
                        key: key,
                        value: data[key]
                    });
                });
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/SingleChartDialog.html',
                    controller: 'grid.stats',
                    resolve: {
                        dialogTitle: function () {
                            return district + town + theme;
                        },
                        category: function () {
                            return category;
                        },
                        stats: function () {
                            return stats;
                        }
                    }
                });
            },
            showGridClusterStats: function (theme, clusterList, currentCluster, action) {
                menuItemService.showGeneralDialogWithAction({
                    templateUrl: '/appViews/BasicKpi/GridClusterDialog.html',
                    controller: 'grid.cluster',
                    resolve: {
                        dialogTitle: function () {
                            return theme + "栅格簇信息";
                        },
                        clusterList: function () {
                            return clusterList;
                        },
                        currentCluster: function () {
                            return currentCluster;
                        }
                    }
                }, action);
            },
            showAgpsStats: function (stats, legend) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'agps.stats',
                    resolve: {
                        dialogTitle: function () {
                            return 'AGPS三网对比覆盖指标';
                        },
                        stats: function () {
                            return stats;
                        },
                        legend: function() {
                            return legend;
                        }
                    }
                });
            },
            showTownStats: function (cityName) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'town.stats',
                    resolve: {
                        dialogTitle: function () {
                            return "全市LTE基站小区分布";
                        },
                        cityName: function () {
                            return cityName;
                        }
                    }
                });
            },
            showCdmaTownStats: function (cityName) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'cdma.town.stats',
                    resolve: {
                        dialogTitle: function () {
                            return "全市CDMA基站小区分布";
                        },
                        cityName: function () {
                            return cityName;
                        }
                    }
                });
            },
            showFlowStats: function (today, frequency) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'flow.stats',
                    resolve: {
                        dialogTitle: function () {
                            return "全市4G流量和用户数分布";
                        },
                        today: function () {
                            return today;
                        },
                        frequency: function() {
                            return frequency;
                        }
                    }
                });
            },
            showFlowTrend: function (city, beginDate, endDate, frequency) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'flow.trend',
                    resolve: {
                        dialogTitle: function () {
                            return city + "流量变化趋势";
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        city: function () {
                            return city;
                        },
                        frequency: function () {
                            return frequency;
                        }
                    }
                });
            },
            showUsersTrend: function (city, beginDate, endDate, frequency) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'users.trend',
                    resolve: {
                        dialogTitle: function () {
                            return city + "用户数变化趋势";
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        city: function () {
                            return city;
                        },
                        frequency: function () {
                            return frequency;
                        }
                    }
                });
            },
            showFeelingRateTrend: function (city, beginDate, endDate, frequency) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'feelingRate.trend',
                    resolve: {
                        dialogTitle: function () {
                            return city + "感知速率变化趋势";
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        city: function () {
                            return city;
                        },
                        frequency: function () {
                            return frequency;
                        }
                    }
                });
            },
            showDownSwitchTrend: function (city, beginDate, endDate, frequency) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'downSwitch.trend',
                    resolve: {
                        dialogTitle: function () {
                            return city + "4G下切3G变化趋势";
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        city: function () {
                            return city;
                        },
                        frequency: function () {
                            return frequency;
                        }
                    }
                });
            },
            showRank2RateTrend: function (city, beginDate, endDate, frequency) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Home/FourChartDialog.html',
                    controller: 'rank2Rate.trend',
                    resolve: {
                        dialogTitle: function () {
                            return city + "4G双流比变化趋势";
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        city: function () {
                            return city;
                        },
                        frequency: function () {
                            return frequency;
                        }
                    }
                });
            },
            showUserRoles: function (userName) {
                menuItemService.showGeneralDialog({
                    templateUrl: '/appViews/Manage/UserRolesDialog.html',
                    controller: 'user.roles.dialog',
                    resolve: {
                        dialogTitle: function () {
                            return userName + "角色管理";
                        },
                        userName: function () {
                            return userName;
                        }
                    }
                });
            }
        }
    })
