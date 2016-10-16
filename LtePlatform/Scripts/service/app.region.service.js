angular.module('myApp.region', ['myApp.url'])
    .factory('parametersChartService', function (generalChartService) {
        return {
            getDistrictLteENodebPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区LTE基站数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalLteENodebs;
                });
            },
            getDistrictLteCellPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区LTE小区数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalLteCells;
                });
            },
            getDistrictCdmaBtsPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区CDMA基站数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalCdmaBts;
                });
            },
            getDistrictCdmaCellPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区CDMA小区数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalCdmaCells;
                });
            },
            getTownLteENodebPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇LTE基站数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalLteENodebs;
                });
            },
            getTownLteCellPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇LTE小区数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalLteCells;
                });
            },
            getTownCdmaBtsPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇CDMA基站数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalCdmaBts;
                });
            },
            getTownCdmaCellPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇CDMA小区数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalCdmaCells;
                });
            },
            getCollegeDistributionForDownlinkFlow(data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网下行流量分布",
                    seriesTitle: "下行流量(MB)"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.pdcpDownlinkFlow;
                });
            },
            getCollegeDistributionForUplinkFlow(data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网上行流量分布",
                    seriesTitle: "上行流量(MB)"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.pdcpUplinkFlow;
                });
            },
            getCollegeDistributionForAverageUsers(data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网平均用户数分布",
                    seriesTitle: "平均用户数"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.averageUsers;
                });
            },
            getCollegeDistributionForActiveUsers(data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网最大激活用户数分布",
                    seriesTitle: "最大激活用户数"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.maxActiveUsers;
                });
            },
            getCellDistributionForDownlinkFlow(data, index) {
                return generalChartService.queryColumnOptions({
                    title: "小区下行流量分布",
                    xtitle: "小区名称",
                    ytitle: "下行流量(MB)"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForUplinkFlow(data, index) {
                return generalChartService.queryColumnOptions({
                    title: "小区上行流量分布",
                    xtitle: "小区名称",
                    ytitle: "上行流量(MB)"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForAverageUsers(data, index) {
                return generalChartService.queryColumnOptions({
                    title: "平均用户数分布",
                    xtitle: "小区名称",
                    ytitle: "平均用户数"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForActiveUsers(data, index) {
                return generalChartService.queryColumnOptions({
                    title: "最大激活用户数分布",
                    xtitle: "小区名称",
                    ytitle: "最大激活用户数"
                }, data.categories, data.dataList[index]);
            },
            getDateFlowOptions(data, index1, index2) {
                return generalChartService.queryDoubleColumnOptions({
                    title: "流量变化趋势",
                    xtitle: "日期",
                    ytitle1: "下行流量(MB)",
                    ytitle2: "上行流量(MB)"
                }, data.categories, data.dataList[index1], data.dataList[index2]);
            },
            getDateUsersOptions(data, index1, index2) {
                return generalChartService.queryDoubleColumnOptions({
                    title: "用户数变化趋势",
                    xtitle: "日期",
                    ytitle1: "平均用户数",
                    ytitle2: "最大激活用户数"
                }, data.categories, data.dataList[index1], data.dataList[index2]);
            }
        };
    })
    .factory('preciseChartService', function (generalChartService) {
        return {
            getTypeOption: function (views) {
                var stats = generalChartService.generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.title.text = "工单类型分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "工单类型";
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries(stat.type, stat.total, stat.subData);
                });
                return chart.options;
            },

            getStateOption: function (views) {
                var stats = generalChartService.generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.title.text = "工单状态分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "工单状态";
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries(stat.type, stat.total, stat.subData);
                });
                return chart.options;
            },

            getDistrictOption: function (views) {
                var stats = generalChartService.generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.title.text = "工单镇区分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "镇区";
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries(stat.type, stat.total, stat.subData);
                });
                return chart.options;
            },

            getTownFlowOption: function(views) {
                var stats = generalChartService.generateCompoundStats(views, function(view) {
                    return view.district;
                }, function(view) {
                    return view.town;
                }, function(view) {
                    return (view.pdcpDownlinkFlow + view.pdcpUplinkFlow) / 1024 / 1024 / 8;
                });

                var chart = new DrilldownPie();
                chart.title.text = "流量镇区分布图(TB)";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "区域";
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries(stat.type, stat.total, stat.subData);
                });
                return chart.options;
            }
        }
    });