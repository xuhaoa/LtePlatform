angular.module('myApp.kpi', ['myApp.url', 'myApp.region', "ui.bootstrap"])
    .constant('kpiRatingDivisionDefs', {
        precise: [94.6, 83.6, 72.6, 61.6, 50],
        downSwitch: [3, 5, 8, 10, 15],
        drop: [0.2, 0.3, 0.35, 0.4, 0.5]
    })
    .factory('appKpiService', function (chartCalculateService, generalChartService, kpiRatingDivisionDefs, flowService, calculateService) {
        return {
            getDownSwitchRate: function (stats) {
                var flow3G = 0;
                var flow4G = 0;
                angular.forEach(stats, function(stat) {
                    flow3G += stat.downSwitchFlow3G;
                    flow4G += stat.flow4G;
                });
                return 100 * flow3G / flow4G;
            },
            getCityStat: function (districtStats, currentCity) {
                var stat = {
                    city: currentCity,
                    district: "全网",
                    totalMrs: 0,
                    firstNeighbors: 0,
                    secondNeighbors: 0,
                    thirdNeighbors: 0,
                    firstRate: 0,
                    preciseRate: 0,
                    objectRate: 90
                };
                angular.forEach(districtStats, function(districtStat) {
                    calculateService.accumulatePreciseStat(stat, districtStat);
                });
                return calculateService.calculateDistrictRates(stat);
            },
            calculatePreciseRating: function (precise) {
                return calculateService.getValueFromDivisionAbove(kpiRatingDivisionDefs.precise, precise);
            },
            calculateDownSwitchRating: function (rate) {
                return calculateService.getValueFromDivisionBelow(kpiRatingDivisionDefs.downSwitch, rate);
            },
            calculateDropStar: function (drop) {
                return calculateService.getValueFromDivisionBelow(kpiRatingDivisionDefs.drop, drop);
            },
            calculateFlowStats: function (cellList, flowStats, mergeStats, beginDate, endDate) {
                flowStats.length = 0;
                mergeStats.length = 0;
                angular.forEach(cellList, function (cell) {
                    flowService.queryCellFlowByDateSpan(cell.eNodebId, cell.sectorId,
                        beginDate.value, endDate.value).then(function (flowList) {
                            cell.flowList = flowList;
                            if (flowList.length > 0) {
                                flowStats.push(chartCalculateService.calculateMemberSum(flowList, [
                                    'averageActiveUsers',
                                    'averageUsers',
                                    'maxActiveUsers',
                                    'maxUsers',
                                    'pdcpDownlinkFlow',
                                    'pdcpUplinkFlow'
                                ], function(stat) {
                                    stat.cellName = cell.eNodebName + '-' + cell.sectorId;
                                }));
                                calculateService.mergeDataByKey(mergeStats, flowList, 'statTime', [
                                    'averageActiveUsers',
                                    'averageUsers',
                                    'maxActiveUsers',
                                    'maxUsers',
                                    'pdcpDownlinkFlow',
                                    'pdcpUplinkFlow'
                                ]);
                            }
                        });
                });
            },
            getMrPieOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function(stat) {
                    return stat.totalMrs;
                }), {
                    title: "分镇区测量报告数分布图",
                    seriesName: "区域"
                }, {
                    nameFunc: function(stat) {
                        return stat.district;
                    },
                    valueFunc: function(stat) {
                        return stat.districtData;
                    }
                });
            },
            getPreciseRateOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function(stat) {
                    return stat.preciseRate;
                }), {
                    title: "分镇区精确覆盖率分布图",
                    seriesName: "区域"
                }, {
                    nameFunc: function(stat) {
                        return stat.district;
                    },
                    valueFunc: function(stat) {
                        return stat.districtData;
                    }
                });
            },
            getMrsDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function(stat) {
                    return stat.mr;
                }), districts, {
                    title: "MR总数变化趋势图",
                    xTitle: '日期',
                    yTitle: "MR总数"
                });
            },
            getDownlinkFlowDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.pdcpDownlinkFlow;
                }), districts, {
                    title: "下行流量变化趋势图",
                    xTitle: '日期',
                    yTitle: "下行流量(TB)"
                });
            },
            getUplinkFlowDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.pdcpUplinkFlow;
                }), districts, {
                    title: "上行流量变化趋势图",
                    xTitle: '日期',
                    yTitle: "上行流量(TB)"
                });
            },
            getPreciseDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function(stat) {
                    return stat.precise;
                }), districts, {
                    title: "精确覆盖率变化趋势图",
                    xTitle: '日期',
                    yTitle: "精确覆盖率"
                });
            },
            generateFlowDistrictStats: function(districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function(stat) {
                        return stat.districtFlowViews;
                    },
                    initializeFunc: function(generalStat) {
                        generalStat.pdcpDownlinkFlow = 0;
                        generalStat.pdcpUplinkFlow = 0;
                    },
                    calculateFunc: function(view) {
                        return {
                            pdcpDownlinkFlow: view.pdcpDownlinkFlow/1024/1024/8,
                            pdcpUplinkFlow: view.pdcpUplinkFlow/1024/1024/8
                        };
                    },
                    accumulateFunc: function(generalStat, view) {
                        generalStat.pdcpDownlinkFlow += view.pdcpDownlinkFlow/1024 / 1024/8;
                        generalStat.pdcpUplinkFlow += view.pdcpUplinkFlow / 1024 / 1024/8;
                    },
                    zeroFunc: function() {
                        return {
                            pdcpDownlinkFlow: 0,
                            pdcpUplinkFlow: 0
                        };
                    },
                    totalFunc: function(generalStat) {
                        return {
                            pdcpDownlinkFlow: generalStat.pdcpDownlinkFlow,
                            pdcpUplinkFlow: generalStat.pdcpUplinkFlow
                        }
                    }
                });
            },
            generateDistrictStats: function (districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function (stat) {
                        return stat.districtPreciseViews;
                    },
                    initializeFunc: function (generalStat) {
                        generalStat.totalMrs = 0;
                        generalStat.totalSecondNeighbors = 0;
                    },
                    calculateFunc: function (view) {
                        return {
                            mr: view.totalMrs,
                            precise: view.preciseRate
                        };
                    },
                    accumulateFunc: function (generalStat, view) {
                        generalStat.totalMrs += view.totalMrs;
                        generalStat.totalSecondNeighbors += view.secondNeighbors;
                    },
                    zeroFunc: function () {
                        return {
                            mr: 0,
                            precise: 0
                        };
                    },
                    totalFunc: function (generalStat) {
                        return {
                            mr: generalStat.totalMrs,
                            precise: 100 - 100 * generalStat.totalSecondNeighbors / generalStat.totalMrs
                        }
                    }
                });
            },
            calculateAverageRates: function(stats) {
                var result = {
                    statDate: "平均值",
                    values: []
                };
                if (stats.length === 0) return result;
                for (var i = 0; i < stats.length; i++) {
                    for (var j = 0; j < stats[i].values.length; j++) {
                        if (i === 0) {
                            result.values.push({
                                mr: stats[i].values[j].mr / stats.length,
                                precise: stats[i].values[j].precise / stats.length
                            });
                        } else {
                            result.values[j].mr += stats[i].values[j].mr / stats.length;
                            result.values[j].precise += stats[i].values[j].precise / stats.length;
                        }
                    }
                }
                return result;
            },
            generateTrendStatsForPie: function (trendStat, result) {
                trendStat.districtStats = result[0].districtPreciseViews;
                trendStat.townStats = result[0].townPreciseViews;
                for (var i = 1; i < result.length; i++) {
                    angular.forEach(result[i].districtPreciseViews, function (currentDistrictStat) {
                        var found = false;
                        for (var k = 0; k < trendStat.districtStats.length; k++) {
                            if (trendStat.districtStats[k].city === currentDistrictStat.city
                                && trendStat.districtStats[k].district === currentDistrictStat.district) {
                                calculateService.accumulatePreciseStat(trendStat.districtStats[k], currentDistrictStat);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            trendStat.districtStats.push(currentDistrictStat);
                        }
                    });
                    angular.forEach(result[i].townPreciseView, function(currentTownStat) {
                        var found = false;
                        for (var k = 0; k < trendStat.townStats.length; k++) {
                            if (trendStat.townStats[k].city === currentTownStat.city
                                && trendStat.townStats[k].district === currentTownStat.district
                                && trendStat.townStats[k].town === currentTownStat.town) {
                                calculateService.accumulatePreciseStat(trendStat.townStats[k], currentTownStat);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            trendStat.townStats.push(currentTownStat);
                        }
                    });
                }
                angular.forEach(trendStat.districtStats, function(stat) {
                    calculateService.calculateDistrictRates(stat);
                });
                angular.forEach(trendStat.townStats, function(stat) {
                    calculateService.calculateTownRates(stat);
                });
            },
            getPreciseObject: function(district) {
                var objectTable = {
                    "禅城": 89.8,
                    "南海": 90,
                    "三水": 90,
                    "高明": 90,
                    "顺德": 90.2
                };
                return objectTable[district] === undefined ? 90 : objectTable[district];
            },
            generateComplainTrendOptions: function(dates, counts, objects) {
                var chart = new TimeSeriesLine();
                chart.title.text = '月度抱怨量变化趋势图';
                chart.setDefaultXAxis({
                    title: '日期',
                    categories: dates
                });
                chart.setDefaultYAxis({
                    title: '抱怨量'
                });
                chart.insertSeries({
                    name: '指标值',
                    data: counts
                });
                chart.insertSeries({
                    name: '目标值',
                    data: objects
                });
                return chart.options;
            },
            generateColumnOptions: function (stat, title, xtitle, ytitle) {
                return generalChartService.getColumnOptions(stat, {
                    title: title,
                    xtitle: xtitle,
                    ytitle: ytitle
                }, function(data) {
                    return data.item1;
                }, function(data) {
                    return data.item2;
                });
            },
            generateDownlinkFlowOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '下行PDCP层流量（MB）',
                    seriesTitle: '下行PDCP层流量（MB）'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.pdcpDownlinkFlow;
                });
            },
            generateUplinkFlowOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '上行PDCP层流量（MB）',
                    seriesTitle: '上行PDCP层流量（MB）'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.pdcpUplinkFlow;
                });
            },
            generateMaxUsersOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '最大连接用户数',
                    seriesTitle: '最大连接用户数'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.maxUsers;
                });
            },
            generateAverageUsersOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '平均连接用户数',
                    seriesTitle: '平均连接用户数'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.averageUsers;
                });
            },
            generateMaxActiveUsersOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '最大激活用户数',
                    seriesTitle: '最大激活用户数'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.maxActiveUsers;
                });
            },
            generateAverageActiveUsersOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '平均激活用户数',
                    seriesTitle: '平均激活用户数'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.averageActiveUsers;
                });
            },
            generateMergeFlowOptions: function(stats, topic) {
                var flowData = generalChartService.generateColumnDataByKeys(stats, 'statTime', [
                'pdcpDownlinkFlow',
                'pdcpUplinkFlow'
                ]);
                return generalChartService.queryMultipleColumnOptions({
                    xtitle: '日期',
                    ytitle: '流量（MB）',
                    title: topic + '流量统计'
                }, flowData.categories, flowData.dataList, ['下行流量', '上行流量']);
            },
            generateMergeUsersOptions: function(stats, topic) {
                var usersData = generalChartService.generateColumnDataByKeys(stats, 'statTime', [
                'averageActiveUsers',
                'averageUsers',
                'maxActiveUsers',
                'maxUsers'
                ]);
                return generalChartService.queryMultipleColumnOptions({
                    xtitle: '日期',
                    ytitle: '用户数',
                    title: topic + '用户数'
                }, usersData.categories, usersData.dataList, ['平均激活用户数', '平均连接用户数', '最大激活用户数', '最大连接用户数']);
            }
        }
    })
    .factory('kpiChartService', function(appKpiService) {
        return {
            showFlowCharts: function(flowStats, topic, mergeStats) {
                $("#downlinkFlowChart").highcharts(appKpiService.generateDownlinkFlowOptions(flowStats, topic));
                $("#uplinkFlowChart").highcharts(appKpiService.generateUplinkFlowOptions(flowStats, topic));
                $("#maxUsersChart").highcharts(appKpiService.generateMaxUsersOptions(flowStats, topic));
                $("#averageUsersChart").highcharts(appKpiService.generateAverageUsersOptions(flowStats, topic));
                $("#maxActiveUsersChart").highcharts(appKpiService.generateMaxActiveUsersOptions(flowStats, topic));
                $("#averageActiveUsersChart").highcharts(appKpiService.generateAverageActiveUsersOptions(flowStats, topic));

                $("#flowDate").highcharts(appKpiService.generateMergeFlowOptions(mergeStats, topic));

                $("#usersDate").highcharts(appKpiService.generateMergeUsersOptions(mergeStats, topic));
            }
        };
    })
    .factory('downSwitchService', function (generalHttpService) {
        return {
            getRecentKpi: function (city, initialDate) {
                return generalHttpService.getApiData('DownSwitchFlow', {
                    city: city,
                    statDate: initialDate
                });
            }
        };
    })
    .factory('kpi2GService', function (generalHttpService) {
        return {
            queryDayStats: function (city, initialDate) {
                return generalHttpService.getApiData('KpiDataList', {
                    city: city,
                    statDate: initialDate
                });
            },
            queryKpiOptions: function () {
                return generalHttpService.getApiData('KpiDataList', {});
            },
            queryKpiTrend: function (city, begin, end) {
                return generalHttpService.getApiData('KpiDataList', {
                    city: city,
                    beginDate: begin,
                    endDate: end
                });
            }
        };
    })
    .factory('drop2GService', function (generalHttpService) {
        return {
            queryDayStats: function (city, initialDate) {
                return generalHttpService.getApiData('TopDrop2G', {
                    city: city,
                    statDate: initialDate
                });
            },
            queryOrderPolicy: function () {
                return generalHttpService.getApiData('KpiOptions', {
                    key: "OrderTopDrop2GPolicy"
                });
            },
            queryCellTrend: function (begin, end, city, policy, topCount) {
                return generalHttpService.getApiData('TopDrop2G', {
                    begin: begin,
                    end: end,
                    city: city,
                    policy: policy,
                    topCount: topCount
                });
            }
        }
    })
    .factory('connection3GService', function (generalHttpService) {
        return {
            queryDayStats: function (city, initialDate) {
                return generalHttpService.getApiData('TopConnection3G', {
                    city: city,
                    statDate: initialDate
                });
            },
            queryOrderPolicy: function () {
                return generalHttpService.getApiData('KpiOptions', {
                    key: "OrderTopConnection3GPolicy"
                });
            },
            queryCellTrend: function (begin, end, city, policy, topCount) {
                return generalHttpService.getApiData('TopConnection3G', {
                    begin: begin,
                    end: end,
                    city: city,
                    policy: policy,
                    topCount: topCount
                });
            }
        }
    })
    .factory('preciseImportService', function (generalHttpService) {
        return {
            queryDumpHistroy: function (beginDate, endDate) {
                return generalHttpService.getApiData('PreciseImport', {
                    begin: beginDate,
                    end: endDate
                });
            },
            queryTotalDumpItems: function () {
                return generalHttpService.getApiData('PreciseImport', {});
            },
            queryTownPreciseViews: function (statTime) {
                return generalHttpService.getApiData('TownPreciseImport', {
                    statTime: statTime
                });
            },
            clearImportItems: function () {
                return generalHttpService.deleteApiData('PreciseImport', {});
            },
            dumpTownItems: function (views) {
                return generalHttpService.postApiData('TownPreciseImport', {
                    views: views
                });
            },
            dumpSingleItem: function () {
                return generalHttpService.putApiData('PreciseImport', {});
            },
            updateMongoItems: function(statDate) {
                return generalHttpService.getApiData('PreciseMongo', {
                    statDate: statDate
                })
            }
        };
    })
    .factory('cellPreciseService', function (generalHttpService) {
        return {
            queryDataSpanKpi: function (begin, end, cellId, sectorId) {
                return generalHttpService.getApiData('PreciseStat', {
                    'begin': begin,
                    'end': end,
                    'cellId': cellId,
                    'sectorId': sectorId
                });
            },
            queryOneWeekKpi: function (cellId, sectorId) {
                return generalHttpService.getApiData('PreciseStat', {
                    'cellId': cellId,
                    'sectorId': sectorId
                });
            }
        };
    })
    .factory('appRegionService', function (generalHttpService) {
        return {
            initializeCities: function () {
                return generalHttpService.getApiData('CityList', {});
            },
            queryDistricts: function (cityName) {
                return generalHttpService.getApiData('CityList', {
                    city: cityName
                });
            },
            queryDistrictInfrastructures: function (cityName) {
                return generalHttpService.getApiData('RegionStats', {
                    city: cityName
                });
            },
            queryTowns: function (cityName, districtName) {
                return generalHttpService.getApiData('CityList', {
                    city: cityName,
                    district: districtName
                });
            },
            queryTownInfrastructures: function (cityName, districtName) {
                return generalHttpService.getApiData('RegionStats', {
                    city: cityName,
                    district: districtName
                });
            },
            queryTown: function (city, district, town) {
                return generalHttpService.getApiData('Town', {
                    city: city,
                    district: district,
                    town: town
                });
            },
            queryENodebTown: function (eNodebId) {
                return generalHttpService.getApiData('Town', {
                    eNodebId: eNodebId
                });
            },
            accumulateCityStat: function (stats, cityName) {
                var cityStat = {
                    district: cityName,
                    totalLteENodebs: 0,
                    totalLteCells: 0,
                    totalCdmaBts: 0,
                    totalCdmaCells: 0
                };
                angular.forEach(stats, function (stat) {
                    cityStat.totalLteENodebs += stat.totalLteENodebs;
                    cityStat.totalLteCells += stat.totalLteCells;
                    cityStat.totalCdmaBts += stat.totalCdmaBts;
                    cityStat.totalCdmaCells += stat.totalCdmaCells;
                });
                stats.push(cityStat);
            },
            getTownFlowStats: function (statDate) {
                return generalHttpService.getApiData('TownFlow', {
                    statDate: statDate
                });
            }
        };
    })
    .controller('workitem.feedback.dialog', function ($scope, $uibModalInstance, input, dialogTitle) {
        $scope.item = input;
        $scope.dialogTitle = dialogTitle;
        $scope.message = "";

        $scope.ok = function () {
            $uibModalInstance.close($scope.message);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('workitem.details.dialog', function ($scope, $uibModalInstance, input, dialogTitle, workItemDialog) {
        $scope.currentView = input;
        $scope.dialogTitle = dialogTitle;
        $scope.message = "";
        $scope.platformInfos = workItemDialog.calculatePlatformInfo($scope.currentView.comments);
        $scope.feedbackInfos = workItemDialog.calculatePlatformInfo($scope.currentView.feedbackContents);
        $scope.preventChangeParentView = true;

        $scope.ok = function () {
            $uibModalInstance.close($scope.message);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .factory('workitemService', function (generalHttpService) {
        return {
            queryWithPaging: function (state, type) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    'statCondition': state,
                    'typeCondition': type
                });
            },
            queryWithPagingByDistrict: function (state, type, district) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    statCondition: state,
                    typeCondition: type,
                    district: district
                });
            },
            querySingleItem: function (serialNumber) {
                return generalHttpService.getApiData('WorkItem', {
                    serialNumber: serialNumber
                });
            },
            signIn: function (serialNumber) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    signinNumber: serialNumber
                });
            },
            queryChartData: function (chartType) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    chartType: chartType
                });
            },
            updateSectorIds: function () {
                return generalHttpService.putApiData('WorkItem', {});
            },
            feedback: function (message, serialNumber) {
                return generalHttpService.postApiDataWithHeading('WorkItem', {
                    message: message,
                    serialNumber: serialNumber
                });
            },
            finish: function (comments, finishNumber) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    finishNumber: finishNumber,
                    comments: comments
                });
            },
            queryByENodebId: function (eNodebId) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    eNodebId: eNodebId
                });
            },
            queryByCellId: function (eNodebId, sectorId) {
                return generalHttpService.getApiDataWithHeading('WorkItem', {
                    eNodebId: eNodebId,
                    sectorId: sectorId
                });
            },
            queryCurrentMonth: function () {
                return generalHttpService.getApiData('WorkItemCurrentMonth', {});
            },
            constructPreciseItem: function (cell, begin, end) {
                return generalHttpService.postApiDataWithHeading('PreciseWorkItem', {
                    view: cell,
                    begin: begin,
                    end: end
                });
            }
        };
    })
    .factory('dumpWorkItemService', function (generalHttpService) {
        return {
            dumpSingleItem: function () {
                return generalHttpService.putApiData('DumpWorkItem', {});
            },
            clearImportItems: function () {
                return generalHttpService.deleteApiData('DumpWorkItem');
            },
            queryTotalDumpItems: function () {
                return generalHttpService.getApiData('DumpWorkItem', {});
            }
        };
    })
    .factory('preciseWorkItemService', function (generalHttpService) {
        return {
            queryByDateSpanDistrict: function (begin, end, district) {
                return generalHttpService.getApiData('PreciseWorkItem', {
                    begin: begin,
                    end: end,
                    district: district
                });
            },
            queryByDateSpan: function (begin, end) {
                return generalHttpService.getApiData('PreciseWorkItem', {
                    begin: begin,
                    end: end
                });
            },
            queryBySerial: function (number) {
                return generalHttpService.getApiDataWithHeading('PreciseWorkItem', {
                    number: number
                });
            },
            updateInterferenceNeighbor: function (number, items) {
                return generalHttpService.postApiDataWithHeading('InterferenceNeighborWorkItem', {
                    workItemNumber: number,
                    items: items
                });
            },
            updateInterferenceVictim: function (number, items) {
                return generalHttpService.postApiDataWithHeading('InterferenceVictimWorkItem', {
                    workItemNumber: number,
                    items: items
                });
            },
            updateCoverage: function (number, items) {
                return generalHttpService.postApiDataWithHeading('CoverageWorkItem', {
                    workItemNumber: number,
                    items: items
                });
            }
        };
    })

    .controller("eNodeb.flow", function ($scope, $uibModalInstance, eNodeb, beginDate, endDate,
        networkElementService, appKpiService, kpiChartService) {
        $scope.eNodebName = eNodeb.name;
        $scope.flowStats = [];
        $scope.mergeStats = [];
        $scope.queryFlow = function() {
            appKpiService.calculateFlowStats($scope.cellList, $scope.flowStats, $scope.mergeStats, $scope.beginDate, $scope.endDate);
        };

        $scope.showCharts = function() {
            kpiChartService.showFlowCharts($scope.flowStats, $scope.eNodebName, $scope.mergeStats);
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.cellList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        networkElementService.queryCellViewsInOneENodeb(eNodeb.eNodebId).then(function (result) {
            $scope.cellList = result;
            $scope.queryFlow();
        });
    })
    .controller("hotSpot.flow", function ($scope, $uibModalInstance, hotSpot, beginDate, endDate,
        basicImportService, appKpiService, kpiChartService) {
        $scope.eNodebName = hotSpot.hotspotName;
        $scope.flowStats = [];
        $scope.mergeStats = [];
        $scope.queryFlow = function () {
            appKpiService.calculateFlowStats($scope.cellList, $scope.flowStats, $scope.mergeStats, $scope.beginDate, $scope.endDate);
        };

        $scope.showCharts = function () {
            kpiChartService.showFlowCharts($scope.flowStats, $scope.eNodebName, $scope.mergeStats);
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.cellList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        basicImportService.queryHotSpotCells(hotSpot.hotspotName).then(function (result) {
            $scope.cellList = result;
            $scope.queryFlow();
        });
    })

    .controller("rutrace.chart", function ($scope, $uibModalInstance, $timeout,
        dateString, districtStats, townStats, appKpiService) {
        $scope.dialogTitle = dateString + "精确覆盖率指标";
        $scope.showCharts = function () {
            $("#leftChart").highcharts(appKpiService.getMrPieOptions(districtStats.slice(0, districtStats.length - 1), townStats));
            $("#rightChart").highcharts(appKpiService.getPreciseRateOptions(districtStats, townStats));
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.cellList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $timeout(function () {
            $scope.showCharts();
        }, 500);
    })
    .controller('basic.kpi.trend', function ($scope, $uibModalInstance, city, beginDate, endDate, kpi2GService, kpiDisplayService) {
        $scope.dialogTitle = "指标变化趋势-" + city;
        $scope.beginDate = beginDate;
        $scope.endDate = endDate;

        kpi2GService.queryKpiOptions().then(function (result) {
            $scope.kpi = {
                options: result,
                selected: result[0]
            };
        });

        $scope.$watch('kpi.options', function (options) {
            if (options && options.length) {
                $scope.showTrend();
            }
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.kpi);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showTrend = function () {
            kpi2GService.queryKpiTrend(city, $scope.beginDate.value, $scope.endDate.value).then(function (data) {
                angular.forEach($scope.kpi.options, function (option, $index) {
                    $("#kpi-" + $index).highcharts(kpiDisplayService.generateComboChartOptions(data, option, city));
                });
            });
        };
    })

    .controller("rutrace.trend.dialog", function ($scope, $uibModalInstance, trendStat, city, beginDate, endDate,
        appKpiService, kpiPreciseService, appFormatService) {
        $scope.trendStat = trendStat;
        $scope.city = city;
        $scope.beginDate = beginDate;
        $scope.endDate = endDate;
        $scope.dialogTitle = "精确覆盖率变化趋势";
        $scope.showCharts = function () {
            $("#mr-pie").highcharts(appKpiService.getMrPieOptions($scope.trendStat.districtStats,
                $scope.trendStat.townStats));
            $("#precise").highcharts(appKpiService.getPreciseRateOptions($scope.trendStat.districtStats,
                $scope.trendStat.townStats));
            $("#time-mr").highcharts(appKpiService.getMrsDistrictOptions($scope.trendStat.stats,
                $scope.trendStat.districts));
            $("#time-precise").highcharts(appKpiService.getPreciseDistrictOptions($scope.trendStat.stats,
                $scope.trendStat.districts));
        };
        $scope.ok = function () {
            $uibModalInstance.close($scope.trendStat);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        kpiPreciseService.getDateSpanPreciseRegionKpi($scope.city.selected, $scope.beginDate.value, $scope.endDate.value)
            .then(function(result) {
                $scope.trendStat.stats = appKpiService.generateDistrictStats($scope.trendStat.districts, result);
                if (result.length > 0) {
                    appKpiService.generateTrendStatsForPie($scope.trendStat, result);
                    $scope.trendStat.stats.push(appKpiService.calculateAverageRates($scope.trendStat.stats));
                }
                $scope.trendStat.beginDateString = appFormatService.getDateString($scope.beginDate.value, "yyyy年MM月dd日");
                $scope.trendStat.endDateString = appFormatService.getDateString($scope.endDate.value, "yyyy年MM月dd日");
                $scope.showCharts();
            });

    })

    .controller('kpi.topConnection3G.trend', function ($scope, $uibModalInstance, city, beginDate, endDate, topCount,
        appRegionService, appFormatService, connection3GService) {
        $scope.dialogTitle = "TOP连接变化趋势-" + city;
        $scope.beginDate = beginDate;
        $scope.endDate = endDate;
        $scope.topCount = topCount;
        $scope.showTrend = function () {
            connection3GService.queryCellTrend($scope.beginDate.value, $scope.endDate.value, city,
                $scope.orderPolicy.selected, $scope.topCount.selected).then(function (result) {
                    $scope.trendCells = result;
                });
        };
        $scope.ok = function () {
            $uibModalInstance.close($scope.trendStat);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        connection3GService.queryOrderPolicy().then(function (result) {
            $scope.orderPolicy = {
                options: result,
                selected: result[0]
            }
            $scope.showTrend();
        });
    })
    .controller('kpi.topDrop2G.trend', function ($scope, $uibModalInstance, city, beginDate, endDate, topCount,
        appRegionService, appFormatService, drop2GService) {
        $scope.dialogTitle = "TOP掉话变化趋势-" + city;
        $scope.beginDate = beginDate;
        $scope.endDate = endDate;
        $scope.topCount = topCount;
        $scope.ok = function () {
            $uibModalInstance.close($scope.trendStat);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showTrend = function () {
            drop2GService.queryCellTrend($scope.beginDate.value, $scope.endDate.value, city,
                $scope.orderPolicy.selected, $scope.topCount.selected).then(function (result) {
                    $scope.trendCells = result;
                });
        };
        drop2GService.queryOrderPolicy().then(function (result) {
            $scope.orderPolicy = {
                options: result,
                selected: result[0]
            }
            $scope.showTrend();
        });
    })
    .factory('workItemDialog', function ($uibModal, $log, workitemService) {
        return {
            feedback: function (view, callbackFunc) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/WorkItem/FeedbackDialog.html',
                    controller: 'workitem.feedback.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return view.serialNumber + "工单反馈";
                        },
                        input: function () {
                            return view;
                        }
                    }
                });

                modalInstance.result.then(function (output) {
                    workitemService.feedback(output, view.serialNumber).then(function (result) {
                        if (result && callbackFunc)
                            callbackFunc();
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showDetails: function (view, callbackFunc) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/WorkItem/DetailsDialog.html',
                    controller: 'workitem.details.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return view.serialNumber + "工单信息";
                        },
                        input: function () {
                            return view;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    if (callbackFunc) callbackFunc();
                }, function () {
                    if (callbackFunc) callbackFunc();
                });
            },
            showENodebFlow: function (eNodeb, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Parameters/Region/ENodebFlow.html',
                    controller: 'eNodeb.flow',
                    size: 'lg',
                    resolve: {
                        eNodeb: function () {
                            return eNodeb;
                        },
                        beginDate: function() {
                            return beginDate;
                        },
                        endDate: function() {
                            return endDate;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },
            showHotSpotFlow: function (hotSpot, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Parameters/Region/ENodebFlow.html',
                    controller: 'hotSpot.flow',
                    size: 'lg',
                    resolve: {
                        hotSpot: function () {
                            return hotSpot;
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },
            showPreciseChart: function (overallStat) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Home/DoubleChartDialog.html',
                    controller: 'rutrace.chart',
                    size: 'lg',
                    resolve: {
                        dateString: function () {
                            return overallStat.dateString;
                        },
                        districtStats: function () {
                            return overallStat.districtStats;
                        },
                        townStats: function () {
                            return overallStat.townStats;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },
            showPreciseTrend: function (trendStat, city, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Coverage/Trend.html',
                    controller: 'rutrace.trend.dialog',
                    size: 'lg',
                    resolve: {
                        trendStat: function () {
                            return trendStat;
                        },
                        city: function () {
                            return city;
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },
            showBasicTrend: function (city, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/BasicKpi/Trend.html',
                    controller: 'basic.kpi.trend',
                    size: 'lg',
                    resolve: {
                        city: function () {
                            return city;
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },

            showTopDropTrend: function (city, beginDate, endDate, topCount) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/BasicKpi/TopDrop2GTrend.html',
                    controller: 'kpi.topDrop2G.trend',
                    size: 'lg',
                    resolve: {
                        city: function () {
                            return city;
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        topCount: function() {
                            return topCount;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },

            showTopConnectionTrend: function (city, beginDate, endDate, topCount) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/BasicKpi/TopConnection3GTrend.html',
                    controller: 'kpi.topConnection3G.trend',
                    size: 'lg',
                    resolve: {
                        city: function () {
                            return city;
                        },
                        beginDate: function () {
                            return beginDate;
                        },
                        endDate: function () {
                            return endDate;
                        },
                        topCount: function () {
                            return topCount;
                        }
                    }
                });

                modalInstance.result.then(function () {
                }, function () {
                });
            },

            calculatePlatformInfo: function (comments) {
                var platformInfos = [];
                if (comments) {
                    var fields = comments.split('[');
                    if (fields.length > 1) {
                        angular.forEach(fields, function (field) {
                            var subFields = field.split(']');
                            platformInfos.push({
                                time: subFields[0],
                                contents: subFields[1]
                            });
                        });
                    }
                }

                return platformInfos;
            }
        };
    })
    .factory('preciseWorkItemGenerator', function () {
        return {
            generatePreciseInterferenceNeighborDtos: function (sources) {
                var sumDb6Share = 0;
                var sumDb10Share = 0;
                var sumMod3Share = 0;
                var sumMod6Share = 0;
                var dtos = [];
                angular.forEach(sources, function (source) {
                    sumDb6Share += source.overInterferences6Db;
                    sumDb10Share += source.overInterferences10Db;
                    sumMod3Share += source.mod3Interferences;
                    sumMod6Share += source.mod6Interferences;
                });
                angular.forEach(sources, function (source) {
                    if (source.destENodebId > 0 && source.destSectorId > 0) {
                        var db6Share = source.overInterferences6Db * 100 / sumDb6Share;
                        var db10Share = source.overInterferences10Db * 100 / sumDb10Share;
                        var mod3Share = source.mod3Interferences * 100 / sumMod3Share;
                        var mod6Share = source.mod6Interferences * 100 / sumMod6Share;
                        if (db6Share > 10 || db10Share > 10 || mod3Share > 10 || mod6Share > 10) {
                            dtos.push({
                                eNodebId: source.destENodebId,
                                sectorId: source.destSectorId,
                                db6Share: db6Share,
                                db10Share: db10Share,
                                mod3Share: mod3Share,
                                mod6Share: mod6Share
                            });
                        }
                    }
                });
                return dtos;
            },
            generatePreciseInterferenceVictimDtos: function (sources) {
                var sumBackwardDb6Share = 0;
                var sumBackwardDb10Share = 0;
                var sumBackwardMod3Share = 0;
                var sumBackwardMod6Share = 0;
                var dtos = [];
                angular.forEach(sources, function (source) {
                    sumBackwardDb6Share += source.overInterferences6Db;
                    sumBackwardDb10Share += source.overInterferences10Db;
                    sumBackwardMod3Share += source.mod3Interferences;
                    sumBackwardMod6Share += source.mod6Interferences;
                });
                angular.forEach(sources, function (source) {
                    if (source.victimENodebId > 0 && source.victimSectorId > 0) {
                        var db6Share = source.overInterferences6Db * 100 / sumBackwardDb6Share;
                        var db10Share = source.overInterferences10Db * 100 / sumBackwardDb10Share;
                        var mod3Share = source.mod3Interferences * 100 / sumBackwardMod3Share;
                        var mod6Share = source.mod6Interferences * 100 / sumBackwardMod6Share;
                        if (db6Share > 10 || db10Share > 10 || mod3Share > 10 || mod6Share > 10) {
                            dtos.push({
                                eNodebId: source.victimENodebId,
                                sectorId: source.victimSectorId,
                                backwardDb6Share: db6Share,
                                backwardDb10Share: db10Share,
                                backwardMod3Share: mod3Share,
                                backwardMod6Share: mod6Share
                            });
                        }
                    }
                });
                return dtos;
            }
        };
    })
    .factory('cellHuaweiMongoService', function (generalHttpService) {
        return {
            queryCellParameters: function (eNodebId, sectorId) {
                return generalHttpService.getApiData('CellHuaweiMongo', {
                    eNodebId: eNodebId,
                    sectorId: sectorId
                });
            },
            queryLocalCellDef: function (eNodebId) {
                return generalHttpService.getApiData('CellHuaweiMongo', {
                    eNodebId: eNodebId
                });
            }
        };
    })
     .factory('cellPowerService', function (generalHttpService) {
         return {
             queryCellParameters: function (eNodebId, sectorId) {
                 return generalHttpService.getApiData('CellPower', {
                     eNodebId: eNodebId,
                     sectorId: sectorId
                 });
             },
             queryUlOpenLoopPowerControll: function (eNodebId, sectorId) {
                 return generalHttpService.getApiData('UplinkOpenLoopPowerControl', {
                     eNodebId: eNodebId,
                     sectorId: sectorId
                 });
             }
         };
     })

    .factory('intraFreqHoService', function (generalHttpService) {
        return {
            queryENodebParameters: function (eNodebId) {
                return generalHttpService.getApiData('IntraFreqHo', {
                    eNodebId: eNodebId
                });
            },
            queryCellParameters: function (eNodebId, sectorId) {
                return generalHttpService.getApiData('IntraFreqHo', {
                    eNodebId: eNodebId,
                    sectorId: sectorId
                });
            }
        };
    })
    .factory('interFreqHoService', function (generalHttpService) {
        return {
            queryENodebParameters: function (eNodebId) {
                return generalHttpService.getApiData('InterFreqHo', {
                    eNodebId: eNodebId
                });
            },
            queryCellParameters: function (eNodebId, sectorId) {
                return generalHttpService.getApiData('InterFreqHo', {
                    eNodebId: eNodebId,
                    sectorId: sectorId
                });
            }
        };
    });