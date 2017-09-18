angular.module('kpi.core', ['myApp.url', 'myApp.region'])
    .factory('kpiDisplayService', function(appFormatService, coverageService, topPreciseService, calculateService, chartCalculateService,
        generalChartService) {
        return {
            generatePreciseBarOptions: function(districtStats, cityStat) {
                var chart = new BarChart();
                chart.title.text = cityStat.city + "精确覆盖率统计";
                chart.legend.enabled = false;
                var category = [];
                var precise = [];
                angular.forEach(districtStats, function(stat) {
                    category.push(stat.district);
                    precise.push(stat.preciseRate);
                });
                category.push(cityStat.city);
                precise.push(cityStat.preciseRate);
                chart.xAxis.categories = category;
                chart.xAxis.title.text = '区域';
                chart.setDefaultYAxis({
                    title: '精确覆盖率',
                    min: 70,
                    max: 100
                });
                var series = {
                    name: '精确覆盖率',
                    data: precise
                };
                chart.asignSeries(series);
                return chart.options;
            },
            generateDownSwitchOptions: function(districtStats, city, cityDownSwitch) {
                var chart = new BarChart();
                chart.title.text = city + "4G用户3G流量比统计";
                chart.legend.enabled = false;
                var category = [];
                var precise = [];
                angular.forEach(districtStats, function(stat) {
                    category.push(stat.region);
                    precise.push(stat.downSwitchRate);
                });
                category.push(city);
                precise.push(cityDownSwitch);
                chart.xAxis.categories = category;
                chart.xAxis.title.text = '区域';
                chart.setDefaultYAxis({
                    title: '4G用户3G流量比',
                    min: 0,
                    max: 10
                });
                var series = {
                    name: '4G用户3G流量比',
                    data: precise
                };
                chart.asignSeries(series);
                return chart.options;
            },
            generateComboChartOptions: function(data, name) {
                var setting = {
                    title: name,
                    xtitle: '日期',
                    ytitle: name
                };
                var categories = data.statDates;
                var dataList = [];
                var seriesTitle = [];
                var typeList = [];
                var kpiOption = appFormatService.lowerFirstLetter(name);
                var type = kpiOption === "2G呼建(%)" ? 'line' : 'column';
                angular.forEach(data.regionList, function(item, $index) {
                    typeList.push($index === data.regionList.length - 1 ? 'spline' : type);
                    dataList.push(data.kpiDetails[kpiOption][$index]);
                    seriesTitle.push(item);
                });

                return generalChartService.queryMultipleComboOptions(setting, categories, dataList, seriesTitle, typeList);
            },
            getMrsOptions: function(stats, title) {
                var chart = new ComboChart();
                chart.title.text = title;
                var categoryKey = 'dateString';
                var dataKeys = [
                    'totalMrs',
                    'firstNeighbors',
                    'secondNeighbors',
                    'thirdNeighbors'
                ];
                var seriesInfo = {
                    totalMrs: {
                        type: 'column',
                        name: "MR总数"
                    },
                    firstNeighbors: {
                        type: "spline",
                        name: "第一邻区MR数"
                    },
                    secondNeighbors: {
                        type: "spline",
                        name: "第二邻区MR数"
                    },
                    thirdNeighbors: {
                        type: "spline",
                        name: "第三邻区MR数"
                    }
                };
                var seriesData = chartCalculateService.generateSeriesInfo(seriesInfo, stats, categoryKey, dataKeys);
                chart.xAxis[0].categories = seriesData.categories;
                chart.yAxis[0].title.text = "MR数量";
                chart.xAxis[0].title.text = '日期';
                chartCalculateService.writeSeriesData(chart.series, seriesData.info, dataKeys);
                return chart.options;
            },
            getPreciseOptions: function(stats, title) {
                var chart = new ComboChart();
                chart.title.text = title;
                var statDates = [];
                var firstRate = [];
                var secondRate = [];
                var thirdRate = [];
                angular.forEach(stats, function(stat) {
                    statDates.push(stat.dateString);
                    firstRate.push(100 - parseFloat(stat.firstRate));
                    secondRate.push(100 - parseFloat(stat.secondRate));
                    thirdRate.push(100 - parseFloat(stat.thirdRate));
                });
                chart.xAxis[0].categories = statDates;
                chart.xAxis[0].title.text = '日期';
                chart.yAxis[0].title.text = "精确覆盖率";
                chart.series.push({
                    type: "spline",
                    name: "第一邻区精确覆盖率",
                    data: firstRate
                });
                chart.series.push({
                    type: "spline",
                    name: "第二邻区精确覆盖率",
                    data: secondRate
                });
                chart.series.push({
                    type: "spline",
                    name: "第三邻区精确覆盖率",
                    data: thirdRate
                });
                return chart.options;
            },
            getInterferencePieOptions: function(interferenceCells, currentCellName) {
                var over6DbPie = new GradientPie();
                var over10DbPie = new GradientPie();
                var mod3Pie = new GradientPie();
                var mod6Pie = new GradientPie();
                over6DbPie.series[0].name = '6dB干扰日平均次数';
                over10DbPie.series[0].name = '10dB干扰日平均次数';
                over6DbPie.title.text = currentCellName + ': 6dB干扰日平均次数';
                over10DbPie.title.text = currentCellName + ': 10dB干扰日平均次数';
                mod3Pie.series[0].name = 'MOD3干扰日平均次数';
                mod6Pie.series[0].name = 'MOD6干扰日平均次数';
                mod3Pie.title.text = currentCellName + ': MOD3干扰日平均次数';
                mod6Pie.title.text = currentCellName + ': MOD6干扰日平均次数';
                angular.forEach(interferenceCells, function(cell) {
                    over6DbPie.series[0].data.push({
                        name: cell.neighborCellName,
                        y: cell.overInterferences6Db
                    });
                    over10DbPie.series[0].data.push({
                        name: cell.neighborCellName,
                        y: cell.overInterferences10Db
                    });
                    if (cell.mod3Interferences > 0) {
                        mod3Pie.series[0].data.push({
                            name: cell.neighborCellName,
                            y: cell.mod3Interferences
                        });
                    }
                    if (cell.mod6Interferences > 0) {
                        mod6Pie.series[0].data.push({
                            name: cell.neighborCellName,
                            y: cell.mod6Interferences
                        });
                    }
                });
                return {
                    over6DbOption: over6DbPie.options,
                    over10DbOption: over10DbPie.options,
                    mod3Option: mod3Pie.options,
                    mod6Option: mod6Pie.options
                };
            },
            getStrengthColumnOptions: function(interferenceCells, mrCount, currentCellName) {
                var over6DbColumn = new Column3d();
                var over10DbColumn = new Column3d();
                over6DbColumn.series[0].name = '6dB干扰强度';
                over10DbColumn.series[0].name = '10dB干扰强度';
                over6DbColumn.title.text = currentCellName + ': 6dB干扰干扰强度';
                over10DbColumn.title.text = currentCellName + ': 10dB干扰干扰强度';

                angular.forEach(interferenceCells, function(cell) {
                    over6DbColumn.series[0].data.push(cell.overInterferences6Db / mrCount * 100);
                    over10DbColumn.series[0].data.push(cell.overInterferences10Db / mrCount * 100);
                    over6DbColumn.xAxis.categories.push(cell.neighborCellName);
                    over10DbColumn.xAxis.categories.push(cell.neighborCellName);
                });
                return {
                    over6DbOption: over6DbColumn.options,
                    over10DbOption: over10DbColumn.options
                };
            },
            calculatePreciseChange: function(input) {
                var preKpis = input.slice(0, 7);
                var postKpis = input.slice(input.length - 7);
                var preSum = 0;
                var postSum = 0;
                angular.forEach(preKpis, function(kpi) {
                    preSum += kpi.secondRate;
                });
                angular.forEach(postKpis, function(kpi) {
                    postSum += kpi.secondRate;
                });
                return {
                    pre: 100 - preSum / 7,
                    post: 100 - postSum / 7
                };
            },
            queryKpiOptions: function(network) {
                switch (network) {
                case '2G':
                    return {
                        options: ['Ec/Io', 'RxAGC', 'TxPower'],
                        selected: 'Ec/Io'
                    };
                case '3G':
                    return {
                        options: ['SINR(3G)', 'RxAGC0', 'RxAGC1'],
                        selected: 'SINR(3G)'
                    };
                default:
                    return {
                        options: ['RSRP', 'SINR'],
                        selected: 'RSRP'
                    };
                }
            },
            queryCoverageLegend: function(kpi) {
                switch (kpi) {
                case 'Ec/Io':
                    return {
                        criteria: coverageService.defaultEcioCriteria,
                        sign: true
                    };
                case 'RxAGC':
                    return {
                        criteria: coverageService.defaultRxCriteria,
                        sign: true
                    };
                case 'TxPower':
                    return {
                        criteria: coverageService.defaultTxCriteria,
                        sign: false
                    };
                case 'SINR(3G)':
                    return {
                        criteria: coverageService.defaultSinr3GCriteria,
                        sign: true
                    };
                case 'RxAGC0':
                    return {
                        criteria: coverageService.defaultRxCriteria,
                        sign: true
                    };
                case 'RxAGC1':
                    return {
                        criteria: coverageService.defaultRxCriteria,
                        sign: true
                    };
                case 'RSRP':
                    return {
                        criteria: coverageService.defaultRsrpCriteria,
                        sign: true
                    };
                case 'rsrpInterval':
                    return {
                        criteria: coverageService.rsrpIntervalCriteria,
                        sign: true
                    };
                case 'competeResult':
                    return {
                        criteria: coverageService.competeCriteria,
                        sign: true
                    };
                default:
                    return {
                        criteria: coverageService.defaultSinrCriteria,
                        sign: true
                    };
                }
            },
            initializeCoveragePoints: function(legend) {
                var pointDef = {
                    sign: legend.sign,
                    intervals: []
                };
                angular.forEach(legend.criteria, function(interval) {
                    pointDef.intervals.push({
                        color: interval.color,
                        threshold: interval.threshold,
                        coors: []
                    });
                });
                pointDef.intervals.push({
                    color: "#077f07",
                    threshold: legend.sign ? 10000 : -10000,
                    coors: []
                });
                return pointDef;
            },
            generateCoveragePoints: function (pointDef, points, kpi) {
                calculateService.generateCoveragePointsWithFunc(pointDef, points, function(point) {
                    switch (kpi) {
                    case 'Ec/Io':
                        return point.ecio;
                    case 'RxAGC':
                        return point.rxAgc;
                    case 'TxPower':
                        return point.txPower;
                    case 'SINR(3G)':
                        return point.sinr;
                    case 'RxAGC0':
                        return point.rxAgc0;
                    case 'RxAGC1':
                        return point.rxAgc1;
                    case 'RSRP':
                        return point.rsrp;
                    default:
                        return point.sinr;
                    }
                });
            },
            generateRealRsrpPoints: function (pointDef, points) {
                calculateService.generateCoveragePointsWithOffset(pointDef, points, function (point) {
                    return point.rsrp;
                }, 0.000245, 0.000225);
            },
            generateMobileRsrpPoints: function(pointDef, points) {
                calculateService.generateCoveragePointsWithFunc(pointDef, points, function(point) {
                    return point.mobileRsrp;
                });
            },
            generateTelecomRsrpPoints: function(pointDef, points) {
                calculateService.generateCoveragePointsWithOffset(pointDef, points, function (point) {
                    return point.telecomRsrp - 140;
                }, 0.000245, 0.000225);
            },
            generateUnicomRsrpPoints: function(pointDef, points) {
                calculateService.generateCoveragePointsWithFunc(pointDef, points, function(point) {
                    return point.unicomRsrp;
                });
            },
            generateAverageRsrpPoints: function (pointDef, points) {
                calculateService.generateCoveragePointsWithOffset(pointDef, points, function (point) {
                    return point.averageRsrp - 140;
                }, 0.000245, 0.000225);
            },
            updateCoverageKpi: function(neighbor, cell, dateSpan) {
                topPreciseService.queryCoverage(dateSpan.begin, dateSpan.end,
                    cell.cellId, cell.sectorId).then(function(coverage) {
                    if (coverage.length > 0) {
                        var coverageRate = calculateService.calculateWeakCoverageRate(coverage);
                        neighbor.weakBelow115 = coverageRate.rate115;
                        neighbor.weakBelow110 = coverageRate.rate110;
                        neighbor.weakBelow105 = coverageRate.rate105;
                    }

                });
                topPreciseService.queryTa(dateSpan.begin, dateSpan.end,
                    cell.cellId, cell.sectorId).then(function(taList) {
                    if (taList.length > 0) {
                        neighbor.overCover = calculateService.calculateOverCoverageRate(taList);
                    }
                });
            }
        };
    })
    .constant('kpiRatingDivisionDefs', {
        precise: [94.6, 83.6, 72.6, 61.6, 50],
        downSwitch: [3, 5, 8, 10, 15],
        drop: [0.2, 0.3, 0.35, 0.4, 0.5]
    })
    .factory('appKpiService', function(chartCalculateService, generalChartService, kpiRatingDivisionDefs, flowService, calculateService) {
        return {
            getDownSwitchRate: function(stats) {
                var flow3G = 0;
                var flow4G = 0;
                angular.forEach(stats, function(stat) {
                    flow3G += stat.downSwitchFlow3G;
                    flow4G += stat.flow4G;
                });
                return 100 * flow3G / flow4G;
            },
            getCityStat: function(districtStats, currentCity) {
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
            getRrcCityStat: function (districtStats, currentCity) {
                var stat = {
                    city: currentCity,
                    district: "全网",
                    totalRrcRequest: 0,
                    totalRrcSuccess: 0,
                    moDataRrcRequest: 0,
                    moDataRrcSuccess: 0,
                    moSignallingRrcRequest: 0,
                    moSignallingRrcSuccess: 0,
                    mtAccessRrcRequest: 0,
                    mtAccessRrcSuccess: 0,
                    rrcSuccessRate: 0,
                    moSiganllingRrcRate: 0,
                    moDataRrcRate: 0,
                    mtAccessRrcRate: 0,
                    objectRate: 99
                };
                angular.forEach(districtStats, function (districtStat) {
                    calculateService.accumulateRrcStat(stat, districtStat);
                });
                return calculateService.calculateDistrictRrcRates(stat);
            },
            calculatePreciseRating: function(precise) {
                return calculateService.getValueFromDivisionAbove(kpiRatingDivisionDefs.precise, precise);
            },
            calculateDownSwitchRating: function(rate) {
                return calculateService.getValueFromDivisionBelow(kpiRatingDivisionDefs.downSwitch, rate);
            },
            calculateDropStar: function(drop) {
                return calculateService.getValueFromDivisionBelow(kpiRatingDivisionDefs.drop, drop);
            },
            calculateFlowStats: function(cellList, flowStats, mergeStats, beginDate, endDate) {
                flowStats.length = 0;
                mergeStats.length = 0;
                angular.forEach(cellList, function(cell) {
                    flowService.queryCellFlowByDateSpan(cell.eNodebId, cell.sectorId,
                        beginDate.value, endDate.value).then(function(flowList) {
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
            calculateFeelingStats: function (cellList, flowStats, mergeStats, beginDate, endDate) {
                flowStats.length = 0;
                mergeStats.length = 0;
                angular.forEach(cellList, function (cell) {
                    flowService.queryCellFlowByDateSpan(cell.eNodebId, cell.sectorId,
                        beginDate.value, endDate.value).then(function (flowList) {
                            cell.feelingList = flowList;
                            if (flowList.length > 0) {
                                flowStats.push(chartCalculateService.calculateMemberSum(flowList, [
                                    'downlinkFeelingThroughput',
                                    'downlinkFeelingDuration',
                                    'uplinkFeelingThroughput',
                                    'uplinkFeelingDuration',
                                    'pdcpDownlinkFlow',
                                    'pdcpUplinkFlow',
                                    'schedulingRank2',
                                    'schedulingTimes',
                                    'redirectCdma2000'
                                ], function (stat) {
                                    stat.cellName = cell.eNodebName + '-' + cell.sectorId;
                                    stat
                                        .downlinkFeelingRate =
                                        cell.downlinkFeelingThroughput / cell.downlinkFeelingDuration;
                                    stat.uplinkFeelingRate = cell.uplinkFeelingThroughput / cell.uplinkFeelingDuration;
                                    stat.rank2Rate = cell.schedulingRank2 * 100 / cell.schedulingTimes;
                                }));
                                calculateService.mergeDataByKey(mergeStats, flowList, 'statTime', [
                                    'downlinkFeelingThroughput',
                                    'downlinkFeelingDuration',
                                    'uplinkFeelingThroughput',
                                    'uplinkFeelingDuration',
                                    'pdcpDownlinkFlow',
                                    'pdcpUplinkFlow',
                                    'schedulingRank2',
                                    'schedulingTimes',
                                    'redirectCdma2000'
                                ]);
                            }
                        });
                });
            },
            getMrPieOptions: function(districtStats, townStats) {
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
            getRrcRequestOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.totalRrcRequest;
                }), {
                        title: "分镇区RRC连接数分布图",
                        seriesName: "区域"
                    }, {
                        nameFunc: function (stat) {
                            return stat.district;
                        },
                        valueFunc: function (stat) {
                            return stat.districtData;
                        }
                    });
            },
            getPreciseRateOptions: function(districtStats, townStats) {
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
            getRrcRateOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.rrcSuccessRate;
                }), {
                        title: "分镇区RRC连接成功率分布图",
                        seriesName: "区域",
                        yMin: 99,
                        yMax: 100
                    }, {
                        nameFunc: function (stat) {
                            return stat.district;
                        },
                        valueFunc: function (stat) {
                            return stat.districtData;
                        }
                    });
            },
            getMoSignallingRrcRateOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.moSiganllingRrcRate;
                }), {
                        title: "分镇区主叫信令RRC连接成功率分布图",
                        seriesName: "区域",
                        yMin: 99,
                        yMax: 100
                    }, {
                        nameFunc: function (stat) {
                            return stat.district;
                        },
                        valueFunc: function (stat) {
                            return stat.districtData;
                        }
                    });
            },
            getMtAccessRrcRateOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.mtAccessRrcRate;
                }), {
                        title: "分镇区被叫接入RRC连接成功率分布图",
                        seriesName: "区域",
                        yMin: 99,
                        yMax: 100
                    }, {
                        nameFunc: function (stat) {
                            return stat.district;
                        },
                        valueFunc: function (stat) {
                            return stat.districtData;
                        }
                    });
            },
            getDownlinkFlowOptions: function (districtStats, townStats, frequency) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService
                    .generateDrillDownData(districtStats,
                        townStats,
                        function(stat) {
                            return stat.pdcpDownlinkFlow / 1024 / 1024 / 8;
                        }),
                    {
                        title: "分镇区下行流量分布图（TB）-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        seriesName: "区域"
                    },
                    {
                        nameFunc: function(stat) {
                            return stat.district;
                        },
                        valueFunc: function(stat) {
                            return stat.districtData;
                        }
                    });
            },
            getUplinkFlowOptions: function (districtStats, townStats, frequency) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService
                    .generateDrillDownData(districtStats,
                        townStats,
                        function(stat) {
                            return stat.pdcpUplinkFlow / 1024 / 1024 / 8;
                        }),
                    {
                        title: "分镇区上行流量分布图（TB）-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        seriesName: "区域"
                    },
                    {
                        nameFunc: function(stat) {
                            return stat.district;
                        },
                        valueFunc: function(stat) {
                            return stat.districtData;
                        }
                    });
            },
            getDownlinkRateOptions: function (districtStats, townStats, frequency) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService
                    .generateDrillDownData(districtStats,
                        townStats,
                        function(stat) {
                            return stat.downlinkFeelingRate;
                        }),
                    {
                        title: "分镇区下行感知速率分布图（Mbit/s）-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        seriesName: "区域",
                        yMin: 5,
                        yMax: 40
                    },
                    {
                        nameFunc: function(stat) {
                            return stat.district;
                        },
                        valueFunc: function(stat) {
                            return stat.districtData;
                        }
                    });
            },
            getUplinkRateOptions: function (districtStats, townStats, frequency) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService
                    .generateDrillDownData(districtStats,
                        townStats,
                        function(stat) {
                            return stat.uplinkFeelingRate;
                        }),
                    {
                        title: "分镇区上行感知速率分布图（Mbit/s）-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        seriesName: "区域",
                        yMin: 0,
                        yMax: 15
                    },
                    {
                        nameFunc: function(stat) {
                            return stat.district;
                        },
                        valueFunc: function(stat) {
                            return stat.districtData;
                        }
                    });
            },
            getDownSwitchTimesOptions: function (districtStats, townStats, frequency) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService
                    .generateDrillDownData(districtStats,
                        townStats,
                        function(stat) {
                            return stat.redirectCdma2000;
                        }),
                    {
                        title: "分镇区4G下切3G次数-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        seriesName: "区域"
                    },
                    {
                        nameFunc: function(stat) {
                            return stat.district;
                        },
                        valueFunc: function(stat) {
                            return stat.districtData;
                        }
                    });
            },
            getSchedulingTimesOptions: function (districtStats, townStats, frequency) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService
                    .generateDrillDownData(districtStats,
                        townStats,
                        function(stat) {
                            return stat.schedulingTimes;
                        }),
                    {
                        title: "分镇区调度次数-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        seriesName: "区域"
                    },
                    {
                        nameFunc: function(stat) {
                            return stat.district;
                        },
                        valueFunc: function(stat) {
                            return stat.districtData;
                        }
                    });
            },
            getDownSwitchRateOptions: function (districtStats, townStats, frequency) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService
                    .generateDrillDownData(districtStats,
                        townStats,
                        function(stat) {
                            return stat.downSwitchRate * 8;
                        }),
                    {
                        title: "分镇区4G下切3G比例（次/GB）-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        seriesName: "区域"
                    },
                    {
                        nameFunc: function(stat) {
                            return stat.district;
                        },
                        valueFunc: function(stat) {
                            return stat.districtData;
                        }
                    });
            },
            getRank2RateOptions: function (districtStats, townStats, frequency) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService
                    .generateDrillDownData(districtStats,
                        townStats,
                        function(stat) {
                            return stat.rank2Rate;
                        }),
                    {
                        title: "分镇区双流比（%）-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        seriesName: "区域"
                    },
                    {
                        nameFunc: function(stat) {
                            return stat.district;
                        },
                        valueFunc: function(stat) {
                            return stat.districtData;
                        }
                    });
            },
            getMaxUsersOptions: function (districtStats, townStats, frequency) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService
                    .generateDrillDownData(districtStats,
                        townStats,
                        function(stat) {
                            return stat.maxUsers;
                        }),
                    {
                        title: "分镇区最大用户数-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        seriesName: "区域"
                    },
                    {
                        nameFunc: function(stat) {
                            return stat.district;
                        },
                        valueFunc: function(stat) {
                            return stat.districtData;
                        }
                    });
            },
            getMaxActiveUsersOptions: function (districtStats, townStats, frequency) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService
                    .generateDrillDownData(districtStats,
                        townStats,
                        function(stat) {
                            return stat.maxActiveUsers;
                        }),
                    {
                        title: "分镇区最大激活用户数-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        seriesName: "区域"
                    },
                    {
                        nameFunc: function(stat) {
                            return stat.district;
                        },
                        valueFunc: function(stat) {
                            return stat.districtData;
                        }
                    });
            },
            getMrsDistrictOptions: function(stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.mr;
                        }),
                    districts,
                    {
                        title: "MR总数变化趋势图",
                        xTitle: '日期',
                        yTitle: "MR总数"
                    });
            },
            getRrcRequestDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                    districts.length,
                    function (stat) {
                        return stat.request;
                    }),
                    districts,
                    {
                        title: "RRC连接请求变化趋势图",
                        xTitle: '日期',
                        yTitle: "RRC连接请求数"
                    });
            },
            getDownlinkFlowDistrictOptions: function (stats, inputDistricts, frequency) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.pdcpDownlinkFlow;
                        }),
                    districts,
                    {
                        title: "下行流量变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        xTitle: '日期',
                        yTitle: "下行流量(TB)"
                    });
            },
            getUplinkFlowDistrictOptions: function (stats, inputDistricts, frequency) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.pdcpUplinkFlow;
                        }),
                    districts,
                    {
                        title: "上行流量变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        xTitle: '日期',
                        yTitle: "上行流量(TB)"
                    });
            },
            getMaxUsersDistrictOptions: function (stats, inputDistricts, frequency) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.maxUsers;
                        }),
                    districts,
                    {
                        title: "最大用户数变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        xTitle: '日期',
                        yTitle: "最大用户数"
                    });
            },
            getMaxActiveUsersDistrictOptions: function (stats, inputDistricts, frequency) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.maxActiveUsers;
                        }),
                    districts,
                    {
                        title: "最大激活用户数变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        xTitle: '日期',
                        yTitle: "最大激活用户数"
                    });
            },
            getDownlinkRateDistrictOptions: function (stats, inputDistricts, frequency) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.downlinkFeelingRate;
                        }),
                    districts,
                    {
                        title: "下行感知速率变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        xTitle: '日期',
                        yTitle: "下行感知速率（Mbit/s）"
                    });
            },
            getUplinkRateDistrictOptions: function (stats, inputDistricts, frequency) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.uplinkFeelingRate;
                        }),
                    districts,
                    {
                        title: "上行感知速率变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        xTitle: '日期',
                        yTitle: "上行感知速率（Mbit/s）"
                    });
            },
            getDownSwitchTimesDistrictOptions: function (stats, inputDistricts, frequency) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.downSwitchTimes;
                        }),
                    districts,
                    {
                        title: "下切次数变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        xTitle: '日期',
                        yTitle: "下切次数"
                    });
            },
            getSchedulingTimesDistrictOptions: function (stats, inputDistricts, frequency) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.schedulingTimes;
                        }),
                    districts,
                    {
                        title: "调度次数变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        xTitle: '日期',
                        yTitle: "调度次数"
                    });
            },
            getDownSwitchRateDistrictOptions: function (stats, inputDistricts, frequency) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.downSwitchRate;
                        }),
                    districts,
                    {
                        title: "下切比例变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        xTitle: '日期',
                        yTitle: "下切比例（次/GB）"
                    });
            },
            getRank2RateDistrictOptions: function (stats, inputDistricts, frequency) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.rank2Rate;
                        }),
                    districts,
                    {
                        title: "双流比变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                        xTitle: '日期',
                        yTitle: "双流比（%）"
                    });
            },
            getPreciseDistrictOptions: function(stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                        districts.length,
                        function(stat) {
                            return stat.precise;
                        }),
                    districts,
                    {
                        title: "精确覆盖率变化趋势图",
                        xTitle: '日期',
                        yTitle: "精确覆盖率"
                    });
            },
            getRrcRateDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService
                    .generateDateDistrictStats(stats,
                    districts.length,
                    function (stat) {
                        return stat.rate;
                    }),
                    districts,
                    {
                        title: "RRC连接成功率变化趋势图",
                        xTitle: '日期',
                        yTitle: "RRC连接成功率"
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
                            pdcpDownlinkFlow: view.pdcpDownlinkFlow / 1024 / 1024 / 8,
                            pdcpUplinkFlow: view.pdcpUplinkFlow / 1024 / 1024 / 8
                        };
                    },
                    accumulateFunc: function(generalStat, view) {
                        generalStat.pdcpDownlinkFlow += view.pdcpDownlinkFlow / 1024 / 1024 / 8;
                        generalStat.pdcpUplinkFlow += view.pdcpUplinkFlow / 1024 / 1024 / 8;
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
            generateUsersDistrictStats: function(districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function(stat) {
                        return stat.districtFlowViews;
                    },
                    initializeFunc: function(generalStat) {
                        generalStat.maxUsers = 0;
                        generalStat.maxActiveUsers = 0;
                    },
                    calculateFunc: function(view) {
                        return {
                            maxUsers: view.maxUsers,
                            maxActiveUsers: view.maxActiveUsers
                        };
                    },
                    accumulateFunc: function(generalStat, view) {
                        generalStat.maxUsers += view.maxUsers;
                        generalStat.maxActiveUsers += view.maxActiveUsers;
                    },
                    zeroFunc: function() {
                        return {
                            maxUsers: 0,
                            maxActiveUsers: 0
                        };
                    },
                    totalFunc: function(generalStat) {
                        return {
                            maxUsers: generalStat.maxUsers,
                            maxActiveUsers: generalStat.maxActiveUsers
                        }
                    }
                });
            },
            generateFeelingRateDistrictStats: function(districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function(stat) {
                        return stat.districtFlowViews;
                    },
                    initializeFunc: function(generalStat) {
                        generalStat.totalUplinkDuration = 0;
                        generalStat.totalUplinkThroughput = 0;
                        generalStat.totalDownlinkDuration = 0;
                        generalStat.totalDownlinkThroughput = 0;
                    },
                    calculateFunc: function(view) {
                        return {
                            uplinkFeelingRate: view.uplinkFeelingRate,
                            downlinkFeelingRate: view.downlinkFeelingRate
                        };
                    },
                    accumulateFunc: function(generalStat, view) {
                        generalStat.totalUplinkDuration += view.uplinkFeelingDuration;
                        generalStat.totalUplinkThroughput += view.uplinkFeelingThroughput;
                        generalStat.totalDownlinkDuration += view.downlinkFeelingDuration;
                        generalStat.totalDownlinkThroughput += view.downlinkFeelingThroughput;
                    },
                    zeroFunc: function() {
                        return {
                            totalUplinkDuration: 0,
                            totalUplinkThroughput: 0,
                            totalDownlinkDuration: 0,
                            totalDownlinkThroughput: 0
                        };
                    },
                    totalFunc: function(generalStat) {
                        return {
                            uplinkFeelingRate: generalStat.totalUplinkThroughput / generalStat.totalUplinkDuration,
                            downlinkFeelingRate: generalStat.totalDownlinkThroughput / generalStat.totalDownlinkDuration
                        };
                    }
                });
            },
            generateDownSwitchDistrictStats: function (districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function (stat) {
                        return stat.districtFlowViews;
                    },
                    initializeFunc: function (generalStat) {
                        generalStat.totalDownSwitchTimes = 0;
                        generalStat.totalUplinkThroughput = 0;
                        generalStat.totalDownlinkThroughput = 0;
                    },
                    calculateFunc: function (view) {
                        return {
                            downSwitchTimes: view.redirectCdma2000,
                            downSwitchRate: view.downSwitchRate * 8
                        };
                    },
                    accumulateFunc: function (generalStat, view) {
                        generalStat.totalDownSwitchTimes += view.redirectCdma2000;
                        generalStat.totalUplinkThroughput += view.pdcpUplinkFlow;
                        generalStat.totalDownlinkThroughput += view.pdcpDownlinkFlow;
                    },
                    zeroFunc: function () {
                        return {
                            totalDownSwitchTimes: 0,
                            totalUplinkThroughput: 0,
                            totalDownlinkThroughput: 0
                        };
                    },
                    totalFunc: function (generalStat) {
                        return {
                            downSwitchTimes: generalStat.totalDownSwitchTimes,
                            downSwitchRate: 1024 * 8 * generalStat.totalDownSwitchTimes / (generalStat.totalUplinkThroughput + generalStat.totalDownlinkThroughput)
                        };
                    }
                });
            },
            generateRank2DistrictStats: function (districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function (stat) {
                        return stat.districtFlowViews;
                    },
                    initializeFunc: function (generalStat) {
                        generalStat.totalRank2Times = 0;
                        generalStat.totalSchedulingTimes = 0;
                    },
                    calculateFunc: function (view) {
                        return {
                            schedulingTimes: view.schedulingTimes,
                            rank2Rate: view.rank2Rate
                        };
                    },
                    accumulateFunc: function (generalStat, view) {
                        generalStat.totalRank2Times += view.schedulingRank2;
                        generalStat.totalSchedulingTimes += view.schedulingTimes;
                    },
                    zeroFunc: function () {
                        return {
                            totalRank2Times: 0,
                            totalSchedulingTimes: 0
                        };
                    },
                    totalFunc: function (generalStat) {
                        return {
                            schedulingTimes: generalStat.totalSchedulingTimes,
                            rank2Rate: 100 * generalStat.totalRank2Times / generalStat.totalSchedulingTimes
                        };
                    }
                });
            },
            generateDistrictStats: function(districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function(stat) {
                        return stat.districtPreciseViews;
                    },
                    initializeFunc: function(generalStat) {
                        generalStat.totalMrs = 0;
                        generalStat.totalSecondNeighbors = 0;
                    },
                    calculateFunc: function(view) {
                        return {
                            mr: view.totalMrs,
                            precise: view.preciseRate
                        };
                    },
                    accumulateFunc: function(generalStat, view) {
                        generalStat.totalMrs += view.totalMrs;
                        generalStat.totalSecondNeighbors += view.secondNeighbors;
                    },
                    zeroFunc: function() {
                        return {
                            mr: 0,
                            precise: 0
                        };
                    },
                    totalFunc: function(generalStat) {
                        return {
                            mr: generalStat.totalMrs,
                            precise: 100 - 100 * generalStat.totalSecondNeighbors / generalStat.totalMrs
                        }
                    }
                });
            },
            generateRrcDistrictStats: function (districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function (stat) {
                        return stat.districtRrcViews;
                    },
                    initializeFunc: function (generalStat) {
                        generalStat.totalRrcRequest = 0;
                        generalStat.totalRrcSuccess = 0;
                    },
                    calculateFunc: function (view) {
                        return {
                            request: view.totalRrcRequest,
                            rate: view.rrcSuccessRate
                        };
                    },
                    accumulateFunc: function (generalStat, view) {
                        generalStat.totalRrcRequest += view.totalRrcRequest;
                        generalStat.totalRrcSuccess += view.totalRrcSuccess;
                    },
                    zeroFunc: function () {
                        return {
                            request: 0,
                            rate: 0
                        };
                    },
                    totalFunc: function (generalStat) {
                        return {
                            request: generalStat.totalRrcRequest,
                            rate: 100 * generalStat.totalRrcSuccess / generalStat.totalRrcRequest
                        }
                    }
                });
            },
            calculateAverageRates: function(stats) {
                var result = {
                    statDate: "平均值",
                    values: calculateService.calculateAverageValues(stats,['mr', 'precise'])
                };
                return result;
            },
            calculateAverageRrcRates: function (stats) {
                var result = {
                    statDate: "平均值",
                    values: calculateService.calculateAverageValues(stats, ['request', 'rate'])
                };
                return result;
            },
            generateTrendStatsForPie: function(trendStat, result) {
                chartCalculateService.generateStatsForPie(trendStat, result, {
                    districtViewsFunc: function(stat) {
                        return stat.districtPreciseViews;
                    },
                    townViewsFunc: function(stat) {
                        return stat.townPreciseViews;
                    },
                    accumulateFunc: function(source, accumulate) {
                        calculateService.accumulatePreciseStat(source, accumulate);
                    },
                    districtCalculate: function(stat) {
                        calculateService.calculateDistrictRates(stat);
                    },
                    townCalculate: function(stat) {
                        calculateService.calculateTownRates(stat);
                    }
                });
            },
            generateRrcTrendStatsForPie: function (trendStat, result) {
                chartCalculateService.generateStatsForPie(trendStat, result, {
                    districtViewsFunc: function (stat) {
                        return stat.districtRrcViews;
                    },
                    townViewsFunc: function (stat) {
                        return stat.townRrcViews;
                    },
                    accumulateFunc: function (source, accumulate) {
                        calculateService.accumulateRrcStat(source, accumulate);
                    },
                    districtCalculate: function (stat) {
                        calculateService.calculateDistrictRrcRates(stat);
                    },
                    townCalculate: function (stat) {
                        calculateService.calculateTownRrcRates(stat);
                    }
                });
            },
            generateFlowTrendStatsForPie: function(trendStat, result) {
                chartCalculateService.generateStatsForPie(trendStat, result, {
                    districtViewsFunc: function(stat) {
                        return stat.districtFlowViews;
                    },
                    townViewsFunc: function(stat) {
                        return stat.townFlowViews;
                    },
                    accumulateFunc: function(source, accumulate) {
                        calculateService.accumulateFlowStat(source, accumulate);
                    }
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
            getRrcObject: function (district) {
                var objectTable = {
                    "禅城": 99,
                    "南海": 99,
                    "三水": 99,
                    "高明": 99,
                    "顺德": 99
                };
                return objectTable[district] === undefined ? 99 : objectTable[district];
            },
            getCqiObject: function (district) {
                var objectTable = {
                    "禅城": 93,
                    "南海": 93,
                    "三水": 93,
                    "高明": 93,
                    "顺德": 93
                };
                return objectTable[district] === undefined ? 99 : objectTable[district];
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
            generateColumnOptions: function(stat, title, xtitle, ytitle) {
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
            generateDownlinkFlowOptions: function(stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '下行PDCP层流量（MB）',
                    seriesTitle: '下行PDCP层流量（MB）'
                }, function(stat) {
                    return stat.cellName;
                }, function(stat) {
                    return stat.pdcpDownlinkFlow;
                });
            },
            generateUplinkFlowOptions: function(stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '上行PDCP层流量（MB）',
                    seriesTitle: '上行PDCP层流量（MB）'
                }, function(stat) {
                    return stat.cellName;
                }, function(stat) {
                    return stat.pdcpUplinkFlow;
                });
            },
            generateMaxUsersOptions: function(stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '最大连接用户数',
                    seriesTitle: '最大连接用户数'
                }, function(stat) {
                    return stat.cellName;
                }, function(stat) {
                    return stat.maxUsers;
                });
            },
            generateSchedulingTimeOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '调度次数',
                    seriesTitle: '调度次数'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.schedulingTimes;
                });
            },
            generateDownSwitchTimeOptions: function (stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '下切3G次数',
                    seriesTitle: '4G下切3G次数'
                }, function (stat) {
                    return stat.cellName;
                }, function (stat) {
                    return stat.redirectCdma2000;
                });
            },
            generateAverageUsersOptions: function(stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '平均连接用户数',
                    seriesTitle: '平均连接用户数'
                }, function(stat) {
                    return stat.cellName;
                }, function(stat) {
                    return stat.averageUsers;
                });
            },
            generateMaxActiveUsersOptions: function(stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '最大激活用户数',
                    seriesTitle: '最大激活用户数'
                }, function(stat) {
                    return stat.cellName;
                }, function(stat) {
                    return stat.maxActiveUsers;
                });
            },
            generateAverageActiveUsersOptions: function(stats, topic) {
                return generalChartService.getPieOptions(stats, {
                    title: topic + '平均激活用户数',
                    seriesTitle: '平均激活用户数'
                }, function(stat) {
                    return stat.cellName;
                }, function(stat) {
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
            generateMergeFeelingOptions: function (stats, topic) {
                var flowData = generalChartService.generateColumnDataByKeys(stats, 'statTime', [
                    'pdcpDownlinkFlow',
                    'pdcpUplinkFlow',
                    'downlinkFeelingRate',
                    'uplinkFeelingRate'
                ]);
                return generalChartService.queryMultipleComboOptionsWithDoubleAxes({
                        xtitle: '日期',
                        ytitles: ['流量（MB）', '感知速率（Mbit/s）'],
                        title: topic + '流量/感知速率'
                    },
                    flowData.categories,
                    flowData.dataList,
                    ['下行流量', '上行流量', '下行感知速率', '上行感知速率'],
                    ['column', 'column', 'line', 'line'],
                    [0, 0, 1, 1]);
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
            },
            generateMergeDownSwitchOptions: function (stats, topic) {
                angular.forEach(stats,
                    function(stat) {
                        stat.schedulingTimes /= 10000;
                    });
                var usersData = generalChartService.generateColumnDataByKeys(stats, 'statTime', [
                    'redirectCdma2000',
                    'schedulingTimes',
                    'rank2Rate'
                ]);
                return generalChartService.queryMultipleComboOptionsWithDoubleAxes({
                        xtitle: '日期',
                        ytitles: ['下切次数', '双流比（%）'],
                        title: topic + '下切次数/调度次数/双流比'
                    },
                    usersData.categories,
                    usersData.dataList,
                    ['4G下切3G次数', '调度次数（万次）', '双流比（%）'],
                    ['column', 'column', 'line'],
                    [0, 0, 1]);
            }
        }
    })
    .factory('kpiChartService', function(appKpiService) {
        return {
            showFlowCharts: function (flowStats, topic, mergeStats) {
                angular.forEach(flowStats,
                    function(stat) {
                        stat.pdcpDownlinkFlow /= 8;
                        stat.pdcpUplinkFlow /= 8;
                    });
                angular.forEach(mergeStats,
                    function(stat) {
                        stat.pdcpUplinkFlow /= 8;
                        stat.pdcpDownlinkFlow /= 8;
                    });
                $("#downlinkFlowChart").highcharts(appKpiService.generateDownlinkFlowOptions(flowStats, topic));
                $("#uplinkFlowChart").highcharts(appKpiService.generateUplinkFlowOptions(flowStats, topic));
                $("#maxUsersChart").highcharts(appKpiService.generateMaxUsersOptions(flowStats, topic));
                $("#averageUsersChart").highcharts(appKpiService.generateAverageUsersOptions(flowStats, topic));
                $("#maxActiveUsersChart").highcharts(appKpiService.generateMaxActiveUsersOptions(flowStats, topic));
                $("#averageActiveUsersChart").highcharts(appKpiService.generateAverageActiveUsersOptions(flowStats, topic));

                $("#flowDate").highcharts(appKpiService.generateMergeFlowOptions(mergeStats, topic));

                $("#usersDate").highcharts(appKpiService.generateMergeUsersOptions(mergeStats, topic));
            },
            showFeelingCharts: function (flowStats, topic, mergeStats) {
                angular.forEach(flowStats,
                    function (stat) {
                        stat.pdcpDownlinkFlow /= 8;
                        stat.pdcpUplinkFlow /= 8;
                    });
                angular.forEach(mergeStats,
                    function (stat) {
                        stat.pdcpUplinkFlow /= 8;
                        stat.pdcpDownlinkFlow /= 8;
                        stat.downlinkFeelingRate = stat.downlinkFeelingThroughput / stat.downlinkFeelingDuration;
                        stat.uplinkFeelingRate = stat.uplinkFeelingThroughput / stat.uplinkFeelingDuration;
                        stat.rank2Rate = stat.schedulingRank2 * 100 / stat.schedulingTimes;
                    });
                $("#downlinkFlowChart").highcharts(appKpiService.generateDownlinkFlowOptions(flowStats, topic));
                $("#uplinkFlowChart").highcharts(appKpiService.generateUplinkFlowOptions(flowStats, topic));
                $("#maxUsersChart").highcharts(appKpiService.generateSchedulingTimeOptions(flowStats, topic));
                $("#averageUsersChart").highcharts(appKpiService.generateDownSwitchTimeOptions(flowStats, topic));

                $("#flowDate").highcharts(appKpiService.generateMergeFeelingOptions(mergeStats, topic));

                $("#usersDate").highcharts(appKpiService.generateMergeDownSwitchOptions(mergeStats, topic));
            }
        };
    });