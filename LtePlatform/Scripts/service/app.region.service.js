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
            getCollegeDistributionForDownlinkFlow: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网下行流量分布",
                    seriesTitle: "下行流量(MB)"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.pdcpDownlinkFlow;
                });
            },
            getCollegeDistributionForUplinkFlow: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网上行流量分布",
                    seriesTitle: "上行流量(MB)"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.pdcpUplinkFlow;
                });
            },
            getCollegeDistributionForAverageUsers: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网平均用户数分布",
                    seriesTitle: "平均用户数"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.averageUsers;
                });
            },
            getCollegeDistributionForActiveUsers: function (data) {
                return generalChartService.getPieOptions(data, {
                    title: "校园网最大激活用户数分布",
                    seriesTitle: "最大激活用户数"
                }, function (subData) {
                    return subData.name;
                }, function (subData) {
                    return subData.maxActiveUsers;
                });
            },
            getCellDistributionForDownlinkFlow: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "小区下行流量分布",
                    xtitle: "小区名称",
                    ytitle: "下行流量(MB)"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForUplinkFlow: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "小区上行流量分布",
                    xtitle: "小区名称",
                    ytitle: "上行流量(MB)"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForAverageUsers: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "平均用户数分布",
                    xtitle: "小区名称",
                    ytitle: "平均用户数"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForActiveUsers: function (data, index) {
                return generalChartService.queryColumnOptions({
                    title: "最大激活用户数分布",
                    xtitle: "小区名称",
                    ytitle: "最大激活用户数"
                }, data.categories, data.dataList[index]);
            },
            getDateFlowOptions: function (data, index1, index2) {
                return generalChartService.queryDoubleColumnOptions({
                    title: "流量变化趋势",
                    xtitle: "日期",
                    ytitle1: "下行流量(MB)",
                    ytitle2: "上行流量(MB)"
                }, data.categories, data.dataList[index1], data.dataList[index2]);
            },
            getDateUsersOptions: function (data, index1, index2) {
                return generalChartService.queryDoubleColumnOptions({
                    title: "用户数变化趋势",
                    xtitle: "日期",
                    ytitle1: "平均用户数",
                    ytitle2: "最大激活用户数"
                }, data.categories, data.dataList[index1], data.dataList[index2]);
            }
        };
    })
    .factory('preciseChartService', function (generalChartService, chartCalculateService) {
        return {
            getTypeOption: function (views) {
                var stats = generalChartService.generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.initialize({
                    title: "工单类型分布图",
                    seriesName: "工单类型"
                });
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: stat.type,
                        value: stat.total,
                        subData: stat.subData
                    });
                });
                return chart.options;
            },

            getStateOption: function (views) {
                var stats = generalChartService.generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.initialize({
                    title: "工单状态分布图",
                    seriesName: "工单状态"
                });
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: stat.type,
                        value: stat.total,
                        subData: stat.subData
                    });
                });
                return chart.options;
            },

            getDistrictOption: function (views) {
                var stats = generalChartService.generateCompoundStats(views);

                var chart = new DrilldownPie();
                chart.initialize({
                    title: "工单镇区分布图",
                    seriesName: "镇区"
                });
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: stat.type,
                        value: stat.total,
                        subData: stat.subData
                    });
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
                chart.initialize({
                    title: "流量镇区分布图(TB)",
                    seriesName: "区域"
                });
                angular.forEach(stats, function (stat) {
                    chart.addOneSeries({
                        name: stat.type,
                        value: stat.total,
                        subData: stat.subData
                    });
                });
                return chart.options;
            },

            getCoverageOptions: function (stats) {
                var chart = new ComboChart();
                chart.initialize({
                    title: '覆盖情况统计',
                    xTitle: 'RSRP(dBm)',
                    yTitle: 'MR次数'
                });
                angular.forEach(stats, function (stat, index) {
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

            getTaOptions: function (stats) {
                var chart = new ComboChart();
                chart.initialize({
                    title: '接入距离分布统计',
                    xTitle: '接入距离(米)',
                    yTitle: 'MR次数'
                });
                angular.forEach(stats, function (stat, index) {
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

            getRsrpTaOptions: function (stats, rsrpIndex) {
                var chart = new ComboChart();
                chart.initialize({
                    title: '接入距离分布统计',
                    xTitle: '接入距离(米)',
                    yTitle: 'MR次数'
                });
                chart.legend.align = 'right';
                angular.forEach(stats, function (stat, index) {
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
            }
        }
    })

    .factory('neighborService', function (generalHttpService) {
        return {
            queryCellNeighbors: function (cellId, sectorId) {
                return generalHttpService.getApiData('NearestPciCell', {
                    'cellId': cellId,
                    'sectorId': sectorId
                });
            },
            querySystemNeighborCell: function (cellId, sectorId, pci) {
                return generalHttpService.getApiData('NearestPciCell', {
                    'cellId': cellId,
                    'sectorId': sectorId,
                    'pci': pci
                });
            },
            updateCellPci: function (cell) {
                return generalHttpService.postApiData('NearestPciCell', cell);
            },
            monitorNeighbors: function (cell) {
                return generalHttpService.postApiData('NeighborMonitor', {
                    cellId: cell.nearestCellId,
                    sectorId: cell.nearestSectorId
                });
            },
            queryNearestCells: function (eNodebId, sectorId, pci) {
                return generalHttpService.getApiData('Cell', {
                    'eNodebId': eNodebId,
                    'sectorId': sectorId,
                    'pci': pci
                });
            },
            updateNeighbors: function (cellId, sectorId, pci, nearestCellId, nearestSectorId) {
                return generalHttpService.putApiData('NearestPciCell', {
                    cellId: cellId,
                    sectorId: sectorId,
                    pci: pci,
                    nearestCellId: nearestCellId,
                    nearestSectorId: nearestSectorId
                });
            }
        };
    })
    .factory('networkElementService', function (generalHttpService) {
        return {
            queryCellInfo: function (cellId, sectorId) {
                return generalHttpService.getApiData('Cell', {
                    eNodebId: cellId,
                    sectorId: sectorId
                });
            },
            queryLteRruFromCellName: function (cellName) {
                return generalHttpService.getApiData('LteRru', {
                    cellName: cellName
                });
            },
            queryCellInfosInOneENodeb: function (eNodebId) {
                return generalHttpService.getApiData('Cell', {
                    eNodebId: eNodebId
                });
            },
            queryCellViewsInOneENodeb: function (eNodebId) {
                return generalHttpService.getApiData('Cell', {
                    cellId: eNodebId
                });
            },
            queryCellSectorIds: function (name) {
                return generalHttpService.getApiData('Cell', {
                    eNodebName: name
                });
            },
            queryCdmaSectorIds: function (name) {
                return generalHttpService.getApiData('CdmaCell', {
                    btsName: name
                });
            },
            queryCdmaCellViews: function (name) {
                return generalHttpService.getApiData('CdmaCell', {
                    name: name
                });
            },
            queryCdmaCellInfo: function (btsId, sectorId) {
                return generalHttpService.getApiData('CdmaCell', {
                    btsId: btsId,
                    sectorId: sectorId
                });
            },
            queryCdmaCellInfoWithType: function (btsId, sectorId, cellType) {
                return generalHttpService.getApiData('CdmaCell', {
                    btsId: btsId,
                    sectorId: sectorId,
                    cellType: cellType
                });
            },
            queryCdmaCellInfosInOneBts: function (btsId) {
                return generalHttpService.getApiData('CdmaCell', {
                    btsId: btsId
                });
            },
            queryENodebInfo: function (eNodebId) {
                return generalHttpService.getApiData('ENodeb', {
                    eNodebId: eNodebId
                });
            },
            queryENodebsInOneTown: function (city, district, town) {
                return generalHttpService.getApiData('ENodeb', {
                    city: city,
                    district: district,
                    town: town
                });
            },
            queryENodebsByGeneralName: function (name) {
                return generalHttpService.getApiData('ENodeb', {
                    name: name
                });
            },
            queryBtsInfo: function (btsId) {
                return generalHttpService.getApiData('Bts', {
                    btsId: btsId
                });
            },
            queryBtssInOneTown: function (city, district, town) {
                return generalHttpService.getApiData('Bts', {
                    city: city,
                    district: district,
                    town: town
                });
            },
            queryBtssByGeneralName: function (name) {
                return generalHttpService.getApiData('Bts', {
                    name: name
                });
            },
            queryCellSectors: function (cells) {
                return generalHttpService.postApiData('Cell', {
                    views: cells
                });
            },
            queryRangeSectors: function (range, excludedIds) {
                return generalHttpService.postApiData('SectorView', {
                    west: range.west,
                    east: range.east,
                    south: range.south,
                    north: range.north,
                    excludedCells: excludedIds
                });
            },
            queryRangeCells: function (range) {
                return generalHttpService.getApiData('Cell', {
                    west: range.west,
                    east: range.east,
                    south: range.south,
                    north: range.north
                });
            },
            queryRangePlanningSites: function (range) {
                return generalHttpService.getApiData('PlanningSite', {
                    west: range.west,
                    east: range.east,
                    south: range.south,
                    north: range.north
                });
            },
            queryRangeENodebs: function (container) {
                return generalHttpService.postApiData('ENodeb', container);
            },
            queryRangeBtss: function (container) {
                return generalHttpService.postApiData('Bts', container);
            }
        };
    })
    .factory('basicImportService', function (generalHttpService) {
        return {
            queryENodebExcels: function () {
                return generalHttpService.getApiData('NewENodebExcels', {});
            },
            queryCellExcels: function () {
                return generalHttpService.getApiData('NewCellExcels', {});
            },
            queryBtsExcels: function () {
                return generalHttpService.getApiData('NewBtsExcels', {});
            },
            queryCdmaCellExcels: function () {
                return generalHttpService.getApiData('NewCdmaCellExcels', {});
            },
            queryCellCount: function () {
                return generalHttpService.getApiData('DumpLteRru', {});
            },
            queryCdmaCellCount: function () {
                return generalHttpService.getApiData('DumpCdmaRru', {});
            },
            queryVanishedENodebs: function () {
                return generalHttpService.getApiData('DumpENodebExcel', {});
            },
            queryVanishedBtss: function () {
                return generalHttpService.getApiData('DumpBtsExcel', {});
            },
            queryVanishedCells: function () {
                return generalHttpService.getApiData('DumpCellExcel', {});
            },
            queryVanishedCdmaCells: function () {
                return generalHttpService.getApiData('DumpCdmaCellExcel', {});
            },
            dumpOneENodebExcel: function (item) {
                return generalHttpService.postApiData('DumpENodebExcel', item);
            },
            dumpOneBtsExcel: function (item) {
                return generalHttpService.postApiData('DumpBtsExcel', item);
            },
            dumpOneCellExcel: function (item) {
                return generalHttpService.postApiData('DumpCellExcel', item);
            },
            dumpOneCdmaCellExcel: function (item) {
                return generalHttpService.postApiData('DumpCdmaCellExcel', item);
            },
            updateLteCells: function () {
                return generalHttpService.postApiData('DumpLteRru', {});
            },
            dumpLteRrus: function () {
                return generalHttpService.putApiData('DumpLteRru', {});
            },
            dumpCdmaRrus: function () {
                return generalHttpService.putApiData('DumpCdmaRru', {});
            },
            dumpMultipleENodebExcels: function (items) {
                return generalHttpService.postApiData('NewENodebExcels', {
                    infos: items
                });
            },
            dumpMultipleBtsExcels: function (items) {
                return generalHttpService.postApiData('NewBtsExcels', {
                    infos: items
                });
            },
            dumpMultipleCellExcels: function (items) {
                return generalHttpService.postApiData('NewCellExcels', {
                    infos: items
                });
            },
            dumpMultipleCdmaCellExcels: function (items) {
                return generalHttpService.postApiData('NewCdmaCellExcels', {
                    infos: items
                });
            },
            vanishENodebIds: function (ids) {
                return generalHttpService.putApiData('DumpENodebExcel', {
                    eNodebIds: ids
                });
            },
            vanishBtsIds: function (ids) {
                return generalHttpService.putApiData('DumpBtsExcel', {
                    eNodebIds: ids
                });
            },
            vanishCellIds: function (ids) {
                return generalHttpService.putApiData('DumpCellExcel', {
                    cellIdPairs: ids
                });
            },
            vanishCdmaCellIds: function (ids) {
                return generalHttpService.putApiData('DumpCdmaCellExcel', {
                    cellIdPairs: ids
                });
            }
        };
    })
    .factory('neighborImportService', function (generalHttpService) {
        return {
            queryDumpNeighbors: function () {
                return generalHttpService.getApiData('DumpNeighbor', {});
            },
            clearDumpNeighbors: function () {
                return generalHttpService.deleteApiData('DumpNeighbor');
            },
            dumpSingleItem: function () {
                return generalHttpService.putApiData('DumpNeighbor', {});
            },
            updateSuccessProgress: function (result, progressInfo, callback) {
                if (result) {
                    progressInfo.totalSuccessItems += 1;
                } else {
                    progressInfo.totalFailItem += 1;
                }
                if (progressInfo.totalSuccessItems + progressInfo.totalFailItems < progressInfo.totalDumpItems) {
                    callback();
                } else {
                    progressInfo.totalDumpItems = 0;
                    progressInfo.totalSuccessItems = 0;
                    progressInfo.totalFailItems = 0;
                }
            },
            updateFailProgress: function (progressInfo, callback) {
                progressInfo.totalFailItems += 1;
                if (progressInfo.totalSuccessItems + progressInfo.totalFailItems < progressInfo.totalDumpItems) {
                    callback();
                } else {
                    progressInfo.totalDumpItems = 0;
                    progressInfo.totalSuccessItems = 0;
                    progressInfo.totalFailItems = 0;
                }
            }
        }
    })
    .factory('flowImportService', function (generalHttpService) {
        return {
            queryHuaweiFlows: function () {
                return generalHttpService.getApiData('DumpHuaweiFlow', {});
            },
            queryZteFlows: function () {
                return generalHttpService.getApiData('DumpZteFlow', {});
            },
            clearDumpHuaweis: function () {
                return generalHttpService.deleteApiData('DumpHuaweiFlow');
            },
            clearDumpZtes: function () {
                return generalHttpService.deleteApiData('DumpZteFlow');
            },
            dumpHuaweiItem: function () {
                return generalHttpService.putApiData('DumpHuaweiFlow', {});
            },
            dumpZteItem: function () {
                return generalHttpService.putApiData('DumpZteFlow', {});
            },
            queryHuaweiStat: function (index) {
                return generalHttpService.getApiData('DumpHuaweiFlow', {
                    index: index
                });
            },
            queryDumpHistory: function (begin, end) {
                return generalHttpService.getApiData('DumpFlow', {
                    begin: begin,
                    end: end
                });
            },
            dumpTownStats: function (statDate) {
                return generalHttpService.getApiData('DumpFlow', {
                    statDate: statDate
                });
            }
        }
    })
    .factory('alarmsService', function (generalHttpService) {
        return {
            queryENodebAlarmsByDateSpanAndLevel: function (eNodebId, begin, end, level) {
                return generalHttpService.getApiData('Alarms', {
                    eNodebId: eNodebId,
                    begin: begin,
                    end: end,
                    level: level
                });
            }
        };
    })
    .factory('alarmImportService', function (generalHttpService) {
        return {
            queryDumpHistory: function (begin, end) {
                return generalHttpService.getApiData('DumpAlarm', {
                    begin: begin,
                    end: end
                });
            },
            queryDumpItems: function () {
                return generalHttpService.getApiData('DumpAlarm', {});
            },
            dumpSingleItem: function () {
                return generalHttpService.putApiData('DumpAlarm', {});
            },
            clearImportItems: function () {
                return generalHttpService.deleteApiData('DumpAlarm');
            },
            updateHuaweiAlarmInfos: function (cellDef) {
                return generalHttpService.postApiData('Alarms', cellDef);
            }
        };
    })
    .factory('flowService', function (generalHttpService) {
        return {
            queryCellFlowByDateSpan: function (eNodebId, sectorId, begin, end) {
                return generalHttpService.getApiData('FlowQuery', {
                    eNodebId: eNodebId,
                    sectorId: sectorId,
                    begin: begin,
                    end: end
                });
            },
            queryAverageFlowByDateSpan: function (eNodebId, sectorId, begin, end) {
                return generalHttpService.getApiData('FlowQuery', {
                    eNodebId: eNodebId,
                    sectorId: sectorId,
                    beginDate: begin,
                    endDate: end
                });
            }
        };
    })
    .factory('coverageService', function (generalHttpService, chartCalculateService) {
        return {
            queryByRasterInfo: function (info, type) {
                var api;
                switch (type) {
                    case '2G':
                        api = "Record2G";
                        break;
                    case '3G':
                        api = "Record3G";
                        break;
                    default:
                        api = "Record4G";
                        break;
                }
                return generalHttpService.postApiData(api, info);
            },
            queryDetailsByRasterInfo: function (info, type) {
                var api;
                switch (type) {
                    case '2G':
                        api = "Record2GDetails";
                        break;
                    case '3G':
                        api = "Record3GDetails";
                        break;
                    default:
                        api = "Record4GDetails";
                        break;
                }
                return generalHttpService.postApiData(api, info);
            },
            querySingleRasterInfo: function (fileName, rasterNum, type) {
                var api;
                switch (type) {
                    case '2G':
                        api = "Record2G";
                        break;
                    case '3G':
                        api = "Record3G";
                        break;
                    default:
                        api = "Record4G";
                        break;
                }
                return generalHttpService.getApiData(api, {
                    fileName: fileName,
                    rasterNum: rasterNum
                });
            },
            defaultRsrpCriteria: [
                {
                    threshold: -120,
                    color: "#ff0000"
                }, {
                    threshold: -115,
                    color: "#7f0808"
                }, {
                    threshold: -110,
                    color: "#3f0f0f"
                }, {
                    threshold: -105,
                    color: "#077f7f"
                }, {
                    threshold: -95,
                    color: "#07073f"
                }, {
                    threshold: -80,
                    color: "#073f07"
                }
            ],
            defaultSinrCriteria: [
                {
                    threshold: -3,
                    color: "#ff0000"
                }, {
                    threshold: 0,
                    color: "#7f0808"
                }, {
                    threshold: 3,
                    color: "#3f0f0f"
                }, {
                    threshold: 6,
                    color: "#077f7f"
                }, {
                    threshold: 9,
                    color: "#07073f"
                }, {
                    threshold: 15,
                    color: "#073f07"
                }
            ],
            defaultRxCriteria: [
                {
                    threshold: -110,
                    color: "#ff0000"
                }, {
                    threshold: -105,
                    color: "#7f0808"
                }, {
                    threshold: -100,
                    color: "#3f0f0f"
                }, {
                    threshold: -95,
                    color: "#077f7f"
                }, {
                    threshold: -85,
                    color: "#07073f"
                }, {
                    threshold: -70,
                    color: "#073f07"
                }
            ],
            defaultSinr3GCriteria: [
                {
                    threshold: -9,
                    color: "#ff0000"
                }, {
                    threshold: -6,
                    color: "#7f0808"
                }, {
                    threshold: -3,
                    color: "#3f0f0f"
                }, {
                    threshold: 0,
                    color: "#077f7f"
                }, {
                    threshold: 3,
                    color: "#07073f"
                }, {
                    threshold: 7,
                    color: "#073f07"
                }
            ],
            defaultEcioCriteria: [
                {
                    threshold: -15,
                    color: "#ff0000"
                }, {
                    threshold: -12,
                    color: "#7f0808"
                }, {
                    threshold: -9,
                    color: "#3f0f0f"
                }, {
                    threshold: -7,
                    color: "#077f7f"
                }, {
                    threshold: -5,
                    color: "#07073f"
                }, {
                    threshold: -3,
                    color: "#073f07"
                }
            ],
            defaultTxCriteria: [
                {
                    threshold: 12,
                    color: "#ff0000"
                }, {
                    threshold: 6,
                    color: "#7f0808"
                }, {
                    threshold: 0,
                    color: "#3f0f0f"
                }, {
                    threshold: -3,
                    color: "#077f7f"
                }, {
                    threshold: -6,
                    color: "#07073f"
                }, {
                    threshold: -12,
                    color: "#073f07"
                }
            ],
            calculateWeakCoverageRate: function(coverageList) {
                var sum = 0;
                var sum115 = 0;
                var sum110 = 0;
                var sum105 = 0;
                angular.forEach(coverageList, function(coverage) {
                    var stat = chartCalculateService.generateCoverageStats(coverage);
                    sum += stat.total;
                    sum115 += stat.sumBelow115;
                    sum110 += stat.sumBetween115And110;
                    sum105 += stat.sumBetween110And105;
                });
                return {
                    rate115: sum115 / sum,
                    rate110: (sum115 + sum110) / sum,
                    rate105: (sum115 + sum110 + sum105) / sum
                };
            }
        }
    })
    .factory('authorizeService', function ($q, $http, appUrlService) {
        return {
            queryCurrentUserInfo: function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('CurrentUser')
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            queryAllUsers: function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('ApplicationUsers'),
                    headers: {
                        'Authorization': 'Bearer ' + appUrlService.getAccessToken()
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            queryEmailConfirmed: function (name) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: '/Manage/EmailHasBeenConfirmed',
                    params: {
                        userName: name
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            updateRoleList: function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('ApplicationRoles')
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            addRole: function (name) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('ApplicationRoles'),
                    params: {
                        roleName: name,
                        action: "create"
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            deleteRole: function (name) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('ApplicationRoles'),
                    params: {
                        roleName: name,
                        action: "delete"
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            changePassword: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/ChangePassword',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            forgotPassword: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/ForgotPassword',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            resetPassword: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/ResetPassword',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            addPhoneNumber: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/AddPhoneNumber',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            verifyPhoneNumber: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/VerifyPhoneNumber',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            removePhoneNumber: function () {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/RemovePhoneNumber'
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            confirmEmail: function (input) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: '/Manage/ConfirmEmail',
                    data: input
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            }
        };
    });