angular.module('app.kpi.chart', ['app.format', 'app.chart', 'app.calculation'])
    .factory('preciseChartService',
        function(generalChartService, chartCalculateService) {
            return {
                getTypeOption: function(views) {
                    return chartCalculateService.generateDrillDownPieOptions(generalChartService
                        .generateCompoundStats(views),
                        {
                            title: "工单类型分布图",
                            seriesName: "工单类型"
                        });
                },
                getStateOption: function(views) {
                    return chartCalculateService.generateDrillDownPieOptions(generalChartService
                        .generateCompoundStats(views),
                        {
                            title: "工单状态分布图",
                            seriesName: "工单状态"
                        });
                },
                getDistrictOption: function(views) {
                    return chartCalculateService.generateDrillDownPieOptions(generalChartService
                        .generateCompoundStats(views),
                        {
                            title: "工单镇区分布图",
                            seriesName: "镇区"
                        });
                },
                getTownFlowOption: function(views, frequency) {
                    return chartCalculateService.generateDrillDownPieOptions(generalChartService
                        .generateCompoundStats(views,
                            function(view) {
                                return view.district;
                            },
                            function(view) {
                                return view.town;
                            },
                            function(view) {
                                return (view.pdcpDownlinkFlow + view.pdcpUplinkFlow) / 1024 / 1024 / 8;
                            }),
                        {
                            title: "流量镇区分布图(TB)-" + (frequency === 'all' ? frequency : frequency + 'M'),
                            seriesName: "区域"
                        });
                },
                getTownUsersOption: function(views, frequency) {
                    return chartCalculateService.generateDrillDownPieOptions(generalChartService
                        .generateCompoundStats(views,
                            function(view) {
                                return view.district;
                            },
                            function(view) {
                                return view.town;
                            },
                            function(view) {
                                return view.maxUsers;
                            }),
                        {
                            title: "最大在线用户数镇区分布图(TB)-" + (frequency === 'all' ? frequency : frequency + 'M'),
                            seriesName: "区域"
                        });
                },
                getCoverageOptions: function(stats) {
                    var chart = new ComboChart();
                    chart.initialize({
                        title: '覆盖情况统计',
                        xTitle: 'RSRP(dBm)',
                        yTitle: 'MR次数'
                    });
                    angular.forEach(stats,
                        function(stat, index) {
                            var data = chartCalculateService.generateMrsRsrpStats(stat);
                            if (index === 0) {
                                chart.xAxis[0].categories = data.categories;
                            }
                            chart.series.push({
                                type: 'spline',
                                name: stat.statDate,
                                data: data.values
                            });
                        });

                    return chart.options;
                },
                getTaOptions: function(stats) {
                    var chart = new ComboChart();
                    chart.initialize({
                        title: '接入距离分布统计',
                        xTitle: '接入距离(米)',
                        yTitle: 'MR次数'
                    });
                    angular.forEach(stats,
                        function(stat, index) {
                            var data = chartCalculateService.generateMrsTaStats(stat);
                            if (index === 0) {
                                chart.xAxis[0].categories = data.categories;
                            }
                            chart.series.push({
                                type: 'spline',
                                name: stat.statDate,
                                data: data.values
                            });
                        });

                    return chart.options;
                },
                getRsrpTaOptions: function(stats, rsrpIndex) {
                    var chart = new ComboChart();
                    chart.initialize({
                        title: '接入距离分布统计',
                        xTitle: '接入距离(米)',
                        yTitle: 'MR次数'
                    });
                    chart.legend.align = 'right';
                    angular.forEach(stats,
                        function(stat, index) {
                            var data = chartCalculateService.generateRsrpTaStats(stat, rsrpIndex);
                            if (index === 0) {
                                chart.xAxis[0].categories = data.categories;
                                chart.title.text += '(' + data.seriesName + ')';
                            }
                            chart.series.push({
                                type: 'line',
                                name: stat.statDate,
                                data: data.values
                            });
                        });

                    return chart.options;
                },

                generateDistrictTrendOptions: function(stats, districts, kpiFunc, titleSettings) {
                    return chartCalculateService.generateSplineChartOptions(chartCalculateService
                        .generateDateDistrictStats(stats,
                            districts.length,
                            kpiFunc),
                        districts,
                        titleSettings);
                }
            }
        })
    .factory('kpiChartCalculateService',
        function(chartCalculateService, calculateService, preciseChartService, appFormatService, generalChartService) {
            return {
                generateFlowTrendStatsForPie: function(trendStat, result) {
                    chartCalculateService.generateStatsForPie(trendStat,
                        result,
                        {
                            districtViewsFunc: function(stat) {
                                return stat.districtViews;
                            },
                            townViewsFunc: function(stat) {
                                return stat.townViews;
                            },
                            accumulateFunc: function(source, accumulate) {
                                calculateService.accumulateFlowStat(source, accumulate);
                            }
                        });
                },
                generateFlowDistrictStats: function(districts, stats) {
                    return chartCalculateService.generateDistrictStats(districts,
                        stats,
                        {
                            districtViewFunc: function(stat) {
                                return stat.districtViews;
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
                getDownlinkFlowDistrictOptions: function(stats, inputDistricts, frequency) {
                    var districts = inputDistricts.concat("全网");
                    return preciseChartService.generateDistrictTrendOptions(stats,
                        districts,
                        function(stat) {
                            return stat.pdcpDownlinkFlow;
                        },
                        {
                            title: "下行流量变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                            xTitle: '日期',
                            yTitle: "下行流量(TB)"
                        });
                },
                getUplinkFlowDistrictOptions: function(stats, inputDistricts, frequency) {
                    var districts = inputDistricts.concat("全网");
                    return preciseChartService.generateDistrictTrendOptions(stats,
                        districts,
                        function(stat) {
                            return stat.pdcpUplinkFlow;
                        },
                        {
                            title: "上行流量变化趋势图-" + (frequency === 'all' ? frequency : frequency + 'M'),
                            xTitle: '日期',
                            yTitle: "上行流量(TB)"
                        });
                },
                getDownlinkFlowOptions: function(districtStats, townStats, frequency) {
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
                        appFormatService.generateDistrictPieNameValueFuncs());
                },
                getUplinkFlowOptions: function(districtStats, townStats, frequency) {
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
                        appFormatService.generateDistrictPieNameValueFuncs());
                },
                generateDownlinkFlowOptions: function(stats, topic) {
                    return generalChartService.getPieOptions(stats,
                        {
                            title: topic + '下行PDCP层流量（MB）',
                            seriesTitle: '下行PDCP层流量（MB）'
                        },
                        function(stat) {
                            return stat.cellName;
                        },
                        function(stat) {
                            return stat.pdcpDownlinkFlow;
                        });
                },
                generateUplinkFlowOptions: function(stats, topic) {
                    return generalChartService.getPieOptions(stats,
                        {
                            title: topic + '上行PDCP层流量（MB）',
                            seriesTitle: '上行PDCP层流量（MB）'
                        },
                        function(stat) {
                            return stat.cellName;
                        },
                        function(stat) {
                            return stat.pdcpUplinkFlow;
                        });
                },
                generateMaxUsersOptions: function(stats, topic) {
                    return generalChartService.getPieOptions(stats,
                        {
                            title: topic + '最大连接用户数',
                            seriesTitle: '最大连接用户数'
                        },
                        function(stat) {
                            return stat.cellName;
                        },
                        function(stat) {
                            return stat.maxUsers;
                        });
                },
                generateAverageUsersOptions: function(stats, topic) {
                    return generalChartService.getPieOptions(stats,
                        {
                            title: topic + '平均连接用户数',
                            seriesTitle: '平均连接用户数'
                        },
                        function(stat) {
                            return stat.cellName;
                        },
                        function(stat) {
                            return stat.averageUsers;
                        });
                },
                generateMaxActiveUsersOptions: function(stats, topic) {
                    return generalChartService.getPieOptions(stats,
                        {
                            title: topic + '最大激活用户数',
                            seriesTitle: '最大激活用户数'
                        },
                        function(stat) {
                            return stat.cellName;
                        },
                        function(stat) {
                            return stat.maxActiveUsers;
                        });
                },
                generateAverageActiveUsersOptions: function(stats, topic) {
                    return generalChartService.getPieOptions(stats,
                        {
                            title: topic + '平均激活用户数',
                            seriesTitle: '平均激活用户数'
                        },
                        function(stat) {
                            return stat.cellName;
                        },
                        function(stat) {
                            return stat.averageActiveUsers;
                        });
                },
                generateMergeFlowOptions: function(stats, topic) {
                    var flowData = generalChartService.generateColumnDataByKeys(stats,
                        'statTime',
                        [
                            'pdcpDownlinkFlow',
                            'pdcpUplinkFlow'
                        ]);
                    return generalChartService.queryMultipleColumnOptions({
                            xtitle: '日期',
                            ytitle: '流量（MB）',
                            title: topic + '流量统计'
                        },
                        flowData.categories,
                        flowData.dataList,
                        ['下行流量', '上行流量']);
                },
                generateMergeUsersOptions: function(stats, topic) {
                    var usersData = generalChartService.generateColumnDataByKeys(stats,
                        'statTime',
                        [
                            'averageActiveUsers',
                            'averageUsers',
                            'maxActiveUsers',
                            'maxUsers'
                        ]);
                    return generalChartService.queryMultipleColumnOptions({
                            xtitle: '日期',
                            ytitle: '用户数',
                            title: topic + '用户数'
                        },
                        usersData.categories,
                        usersData.dataList,
                        ['平均激活用户数', '平均连接用户数', '最大激活用户数', '最大连接用户数']);
                },
                generateSchedulingTimeOptions: function(stats, topic) {
                    return generalChartService.getPieOptions(stats,
                        {
                            title: topic + '调度次数',
                            seriesTitle: '调度次数'
                        },
                        function(stat) {
                            return stat.cellName;
                        },
                        function(stat) {
                            return stat.schedulingTimes;
                        });
                },
                generateDownSwitchTimeOptions: function(stats, topic) {
                    return generalChartService.getPieOptions(stats,
                        {
                            title: topic + '下切3G次数',
                            seriesTitle: '4G下切3G次数'
                        },
                        function(stat) {
                            return stat.cellName;
                        },
                        function(stat) {
                            return stat.redirectCdma2000;
                        });
                },
                generateMergeFeelingOptions: function(stats, topic) {
                    var flowData = generalChartService.generateColumnDataByKeys(stats,
                        'statTime',
                        [
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
                generateMergeDownSwitchOptions: function(stats, topic) {
                    angular.forEach(stats,
                        function(stat) {
                            stat.schedulingTimes /= 10000;
                        });
                    var usersData = generalChartService.generateColumnDataByKeys(stats,
                        'statTime',
                        [
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
            };
        })
    .factory('kpiChartService',
        function(kpiChartCalculateService) {
            return {
                showFlowCharts: function(flowStats, topic, mergeStats) {
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
                    $("#downlinkFlowChart").highcharts(kpiChartCalculateService
                        .generateDownlinkFlowOptions(flowStats, topic));
                    $("#uplinkFlowChart").highcharts(kpiChartCalculateService
                        .generateUplinkFlowOptions(flowStats, topic));
                    $("#maxUsersChart").highcharts(kpiChartCalculateService.generateMaxUsersOptions(flowStats, topic));
                    $("#averageUsersChart").highcharts(kpiChartCalculateService
                        .generateAverageUsersOptions(flowStats, topic));
                    $("#maxActiveUsersChart").highcharts(kpiChartCalculateService
                        .generateMaxActiveUsersOptions(flowStats, topic));
                    $("#averageActiveUsersChart")
                        .highcharts(kpiChartCalculateService.generateAverageActiveUsersOptions(flowStats, topic));

                    $("#flowDate").highcharts(kpiChartCalculateService.generateMergeFlowOptions(mergeStats, topic));

                    $("#usersDate").highcharts(kpiChartCalculateService.generateMergeUsersOptions(mergeStats, topic));
                },
                showFeelingCharts: function(flowStats, topic, mergeStats) {
                    angular.forEach(flowStats,
                        function(stat) {
                            stat.pdcpDownlinkFlow /= 8;
                            stat.pdcpUplinkFlow /= 8;
                        });
                    angular.forEach(mergeStats,
                        function(stat) {
                            stat.pdcpDownlinkFlow /= 8;
                            stat.pdcpUplinkFlow /= 8;
                            stat.downlinkFeelingRate = stat.downlinkFeelingThroughput / stat.downlinkFeelingDuration;
                            stat.uplinkFeelingRate = stat.uplinkFeelingThroughput / stat.uplinkFeelingDuration;
                            stat.rank2Rate = stat.schedulingRank2 * 100 / stat.schedulingTimes;
                        });
                    $("#downlinkFlowChart").highcharts(kpiChartCalculateService
                        .generateDownlinkFlowOptions(flowStats, topic));
                    $("#uplinkFlowChart").highcharts(kpiChartCalculateService
                        .generateUplinkFlowOptions(flowStats, topic));
                    $("#maxUsersChart").highcharts(kpiChartCalculateService
                        .generateSchedulingTimeOptions(flowStats, topic));
                    $("#averageUsersChart").highcharts(kpiChartCalculateService
                        .generateDownSwitchTimeOptions(flowStats, topic));

                    $("#flowDate").highcharts(kpiChartCalculateService.generateMergeFeelingOptions(mergeStats, topic));

                    $("#usersDate").highcharts(kpiChartCalculateService
                        .generateMergeDownSwitchOptions(mergeStats, topic));
                },
                generateDistrictFrequencyFlowTrendCharts: function(districts, frequency, result) {
                    var stats = kpiChartCalculateService.generateFlowDistrictStats(districts, result);
                    var trendStat = {};
                    kpiChartCalculateService.generateFlowTrendStatsForPie(trendStat, result);
                    $("#leftChart").highcharts(kpiChartCalculateService
                        .getDownlinkFlowDistrictOptions(stats, districts, frequency));
                    $("#rightChart").highcharts(kpiChartCalculateService
                        .getUplinkFlowDistrictOptions(stats, districts, frequency));
                    $("#thirdChart").highcharts(kpiChartCalculateService
                        .getDownlinkFlowOptions(trendStat.districtStats, trendStat.townStats, frequency));
                    $("#fourthChart").highcharts(kpiChartCalculateService
                        .getUplinkFlowOptions(trendStat.districtStats, trendStat.townStats, frequency));
                }
            };
        });