﻿angular.module('myApp.region', ['myApp.url'])
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
            },
            dumpOneHotSpot: function(item) {
                return generalHttpService.postApiData('HotSpot', item);
            },
            queryAllHotSpots: function() {
                return generalHttpService.getApiData('HotSpot', {});
            },
            queryHotSpotCells: function(name) {
                return generalHttpService.getApiData('LteRruCell', {
                    rruName: name
                });
            },
            queryDumpNeighbors: function () {
                return generalHttpService.getApiData('DumpNeighbor', {});
            },
            clearDumpNeighbors: function () {
                return generalHttpService.deleteApiData('DumpNeighbor');
            },
            dumpSingleItem: function () {
                return generalHttpService.putApiData('DumpNeighbor', {});
            }
        };
    })
    .factory('neighborImportService', function (geometryService, networkElementService) {
        return {
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
            },
            updateCellRruInfo: function (supplementCells, settings) {
                angular.forEach(settings.dstCells, function (dstCell) {
                    var i;
                    for (i = 0; i < settings.cells.length; i++) {
                        if (dstCell.cellName === settings.cells[i].eNodebName + '-' + settings.cells[i].sectorId) {
                            break;
                        }
                    }
                    if (i === settings.cells.length) {
                        dstCell.distance = geometryService.getDistance(settings.lattitute, settings.longtitute, dstCell.lattitute, dstCell.longtitute);
                        networkElementService.queryLteRruFromCellName(dstCell.cellName).then(function (rru) {
                            dstCell.rruName = rru ? rru.rruName : '';
                            supplementCells.push(dstCell);
                        });
                    }
                });
            },
            updateENodebRruInfo: function(supplementCells, settings) {
                angular.forEach(settings.dstCells, function (item) {
                    var i;
                    for (i = 0; i < settings.cells.length; i++) {
                        if (settings.cells[i].eNodebId === item.eNodebId && settings.cells[i].sectorId === item.sectorId) {
                            break;
                        }
                    }
                    if (i === settings.cells.length) {
                        networkElementService.queryCellInfo(item.eNodebId, item.sectorId).then(function (view) {
                            view.distance = geometryService.getDistance(settings.lattitute, settings.longtitute, item.lattitute, item.longtitute);
                            networkElementService.queryLteRruFromCellName(view.cellName).then(function (rru) {
                                view.rruName = rru ? rru.rruName : '';
                                supplementCells.push(view);
                            });
                        });
                    }
                });
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
    .factory('coverageService', function (generalHttpService) {
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
            ]
        }
    })
    .factory('authorizeService', function (generalHttpService) {
        return {
            queryCurrentUserInfo: function () {
                return generalHttpService.getApiData('CurrentUser', {});
            },
            queryAllUsers: function () {
                return generalHttpService.getApiDataWithHeading('ApplicationUsers', {});
            },
            queryEmailConfirmed: function (name) {
                return generalHttpService.getMvcData('/Manage/EmailHasBeenConfirmed', {
                    userName: name
                });
            },
            updateRoleList: function () {
                return generalHttpService.getApiData('ApplicationRoles', {});
            },
            addRole: function (name) {
                return generalHttpService.getApiData('ApplicationRoles', {
                    roleName: name,
                    action: "create"
                });
            },
            deleteRole: function (name) {
                return generalHttpService.getApiData('ApplicationRoles', {
                    roleName: name,
                    action: "delete"
                });
            },
            changePassword: function (input) {
                return generalHttpService.postMvcData('/Manage/ChangePassword', input);
            },
            forgotPassword: function (input) {
                return generalHttpService.postMvcData('/Manage/ForgotPassword', input);
            },
            resetPassword: function (input) {
                return generalHttpService.postMvcData('/Manage/ResetPassword', input);
            },
            addPhoneNumber: function (input) {
                return generalHttpService.postMvcData('/Manage/AddPhoneNumber', input);
            },
            verifyPhoneNumber: function (input) {
                return generalHttpService.postMvcData('/Manage/VerifyPhoneNumber', input);
            },
            removePhoneNumber: function () {
                return generalHttpService.postMvcData('/Manage/RemovePhoneNumber', {});
            },
            confirmEmail: function (input) {
                return generalHttpService.postMvcData('/Manage/ConfirmEmail', input);
            }
        };
    })
    .factory('neighborMongoService', function (generalHttpService) {
        return {
            queryNeighbors: function (eNodebId, sectorId) {
                return generalHttpService.getApiData('NeighborCellMongo', {
                    eNodebId: eNodebId,
                    sectorId: sectorId
                });
            },
            queryReverseNeighbors: function (destENodebId, destSectorId) {
                return generalHttpService.getApiData('NeighborCellMongo', {
                    destENodebId: destENodebId,
                    destSectorId: destSectorId
                });
            }
        };
    })
    .factory('dumpProgress', function (generalHttpService, appFormatService) {
        var serviceInstance = {};

        serviceInstance.clear = function (progressInfo) {
            generalHttpService.deleteApiData('DumpInterference').then(function () {
                progressInfo.totalDumpItems = 0;
                progressInfo.totalSuccessItems = 0;
                progressInfo.totalFailItems = 0;
            });
        };

        serviceInstance.dump = function (actionUrl, progressInfo) {
            var self = serviceInstance;
            generalHttpService.putApiData(actionUrl, {}).then(function (result) {
                if (result === true) {
                    progressInfo.totalSuccessItems = progressInfo.totalSuccessItems + 1;
                } else {
                    progressInfo.totalFailItems = progressInfo.totalFailItems + 1;
                }
                if (progressInfo.totalSuccessItems + progressInfo.totalFailItems < progressInfo.totalDumpItems) {
                    self.dump(actionUrl, progressInfo);
                } else {
                    self.clear(actionUrl, progressInfo);
                }
            }, function () {
                progressInfo.totalFailItems = progressInfo.totalFailItems + 1;
                if (progressInfo.totalSuccessItems + progressInfo.totalFailItems < progressInfo.totalDumpItems) {
                    self.dump(actionUrl, progressInfo);
                } else {
                    self.clear(actionUrl, progressInfo);
                }
            });
        };

        serviceInstance.dumpMongo = function (stat) {
            return generalHttpService.postApiData('DumpInterference', stat);
        };

        serviceInstance.dumpCellStat = function (stat) {
            return generalHttpService.postApiData('DumpCellStat', stat);
        };

        serviceInstance.resetProgress = function (begin, end) {
            return generalHttpService.getApiData('DumpInterference', {
                'begin': begin,
                'end': end
            });
        };

        serviceInstance.queryExistedItems = function (eNodebId, sectorId, date) {
            return generalHttpService.getApiData('DumpInterference', {
                eNodebId: eNodebId,
                sectorId: sectorId,
                date: appFormatService.getDateString(date, 'yyyy-MM-dd')
            });
        };

        serviceInstance.queryMongoItems = function (eNodebId, sectorId, date) {
            return generalHttpService.getApiData('InterferenceMongo', {
                eNodebId: eNodebId,
                sectorId: sectorId,
                date: date
            });
        };

        serviceInstance.queryNeighborMongoItem = function (eNodebId, sectorId, neighborPci, date) {
            return generalHttpService.getApiData('InterferenceMatrix', {
                eNodebId: eNodebId,
                sectorId: sectorId,
                neighborPci: neighborPci,
                date: date
            });
        };

        serviceInstance.queryMrsRsrpItem = function (eNodebId, sectorId, date) {
            return generalHttpService.getApiData('MrsRsrp', {
                eNodebId: eNodebId,
                sectorId: sectorId,
                statDate: date
            });
        };

        serviceInstance.queryMrsTadvItem = function (eNodebId, sectorId, date) {
            return generalHttpService.getApiData('MrsTadv', {
                eNodebId: eNodebId,
                sectorId: sectorId,
                statDate: date
            });
        };

        serviceInstance.queryMrsPhrItem = function (eNodebId, sectorId, date) {
            return generalHttpService.getApiData('MrsPhr', {
                eNodebId: eNodebId,
                sectorId: sectorId,
                statDate: date
            });
        };

        serviceInstance.queryMrsTadvRsrpItem = function (eNodebId, sectorId, date) {
            return generalHttpService.getApiData('MrsTadvRsrp', {
                eNodebId: eNodebId,
                sectorId: sectorId,
                statDate: date
            });
        };

        return serviceInstance;
    })
    .factory('dumpPreciseService', function (dumpProgress, neighborService) {
        var serviceInstance = {};
        serviceInstance.dumpAllRecords = function (records, outerIndex, innerIndex, eNodebId, sectorId, queryFunc) {
            if (outerIndex >= records.length) {
                if (queryFunc !== undefined)
                    queryFunc();
            } else {
                var subRecord = records[outerIndex];
                if (subRecord.existedRecords < subRecord.mongoRecords.length && innerIndex < subRecord.mongoRecords.length) {
                    var stat = subRecord.mongoRecords[innerIndex];
                    neighborService.querySystemNeighborCell(eNodebId, sectorId, stat.neighborPci).then(function (neighbor) {
                        if (neighbor) {
                            stat.destENodebId = neighbor.nearestCellId;
                            stat.destSectorId = neighbor.nearestSectorId;
                        } else {
                            stat.destENodebId = 0;
                            stat.destSectorId = 0;
                        }
                        dumpProgress.dumpMongo(stat).then(function () {
                            serviceInstance.dumpAllRecords(records, outerIndex, innerIndex + 1, eNodebId, sectorId, queryFunc);
                        });
                    });
                } else
                    serviceInstance.dumpAllRecords(records, outerIndex + 1, 0, eNodebId, sectorId, queryFunc);
            }

        };
        serviceInstance.dumpDateSpanSingleNeighborRecords = function (cell, date, end) {
            if (date < end) {
                dumpProgress.queryNeighborMongoItem(cell.cellId, cell.sectorId, cell.neighborPci, date).then(function (result) {
                    var stat = result;
                    var nextDate = date;
                    nextDate.setDate(nextDate.getDate() + 1);
                    if (stat) {
                        stat.destENodebId = cell.neighborCellId;
                        stat.destSectorId = cell.neighborSectorId;
                        dumpProgress.dumpMongo(stat).then(function () {
                            serviceInstance.dumpDateSpanSingleNeighborRecords(cell, nextDate, end);
                        });
                    } else {
                        serviceInstance.dumpDateSpanSingleNeighborRecords(cell, nextDate, end);
                    }
                });
            } else {
                cell.finished = true;
            }
        };

        return serviceInstance;
    })
    .controller('dump.cell.mongo', function ($scope, $uibModalInstance, dumpProgress, appFormatService, dumpPreciseService,
        dialogTitle, eNodebId, sectorId, pci, begin, end) {
        $scope.dialogTitle = dialogTitle;

        $scope.dateRecords = [];
        $scope.currentDetails = [];
        $scope.currentIndex = 0;

        $scope.ok = function () {
            $uibModalInstance.close($scope.dateRecords);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.queryRecords = function () {
            $scope.mrsRsrpStats = [];
            $scope.mrsTaStats = [];
            angular.forEach($scope.dateRecords, function (record) {
                dumpProgress.queryExistedItems(eNodebId, sectorId, record.date).then(function (result) {
                    record.existedRecords = result;
                });
                dumpProgress.queryMongoItems(eNodebId, sectorId, record.date).then(function (result) {
                    record.mongoRecords = result;
                });
                dumpProgress.queryMrsRsrpItem(eNodebId, sectorId, record.date).then(function (result) {
                    record.mrsRsrpStats = result;
                    $scope.mrsRsrpStats.push({
                        statDate: result.statDate,
                        data: _.map(_.range(48), function (index) {
                            return result['rsrP_' + appFormatService.prefixInteger(index, 2)];
                        })
                    });
                });
                dumpProgress.queryMrsTadvItem(eNodebId, sectorId, record.date).then(function (result) {
                    record.mrsTaStats = result;
                    $scope.mrsTaStats.push({
                        statDate: result.statDate,
                        data: _.map(_.range(44), function (index) {
                            return result['tadv_' + appFormatService.prefixInteger(index, 2)];
                        })
                    });
                });
                dumpProgress.queryMrsPhrItem(eNodebId, sectorId, record.date).then(function (result) {
                    //console.log(result['powerHeadRoom_00']);
                    record.mrsPhrStats = result;
                });
                dumpProgress.queryMrsTadvRsrpItem(eNodebId, sectorId, record.date).then(function (result) {
                    //console.log(result['tadv00Rsrp00']);
                    record.mrsTaRsrpStats = result;
                });
            });
        };

        $scope.updateDetails = function (index) {
            $scope.currentIndex = index % $scope.dateRecords.length;
        };

        $scope.dumpAllRecords = function () {
            dumpPreciseService.dumpAllRecords($scope.dateRecords, 0, 0, eNodebId, sectorId, $scope.queryRecords);
        };

        var startDate = new Date(begin);
        while (startDate < end) {
            var date = new Date(startDate);
            $scope.dateRecords.push({
                date: date,
                existedRecords: 0,
                existedStat: false
            });
            startDate.setDate(date.getDate() + 1);
        }
        $scope.queryRecords();
    })
    .factory('neighborDialogService', function ($uibModal, $log, neighborService) {
        var matchNearest = function (nearestCell, currentNeighbor, center) {
            neighborService.updateNeighbors(center.cellId, center.sectorId, currentNeighbor.destPci,
                nearestCell.eNodebId, nearestCell.sectorId).then(function () {
                    currentNeighbor.neighborCellName = nearestCell.eNodebName + "-" + nearestCell.sectorId;
                });
        };
        return {
            dumpMongo: function (cell, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/DumpCellMongoDialog.html',
                    controller: 'dump.cell.mongo',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return cell.name + "-" + cell.sectorId + "干扰数据导入";
                        },
                        eNodebId: function () {
                            return cell.eNodebId;
                        },
                        sectorId: function () {
                            return cell.sectorId;
                        },
                        pci: function () {
                            return cell.pci;
                        },
                        begin: function () {
                            return beginDate;
                        },
                        end: function () {
                            return endDate;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showPrecise: function (precise) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Map/PreciseSectorMapInfoBox.html',
                    controller: 'map.source.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return precise.eNodebName + "-" + precise.sectorId + "精确覆盖率指标";
                        },
                        neighbor: function () {
                            return precise;
                        }
                    }
                });
                modalInstance.result.then(function (sector) {
                    console.log(sector);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            },
            showNeighbor: function (neighbor) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Map/NeighborMapInfoBox.html',
                    controller: 'map.neighbor.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return neighbor.cellName + "小区信息";
                        },
                        neighbor: function () {
                            return neighbor;
                        }
                    }
                });
                modalInstance.result.then(function (nei) {
                    console.log(nei);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showInterferenceSource: function (neighbor) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Map/SourceMapInfoBox.html',
                    controller: 'map.source.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return neighbor.neighborCellName + "干扰源信息";
                        },
                        neighbor: function () {
                            return neighbor;
                        }
                    }
                });
                modalInstance.result.then(function (nei) {
                    console.log(nei);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showInterferenceVictim: function (neighbor) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Map/VictimMapInfoBox.html',
                    controller: 'map.source.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return neighbor.victimCellName + "被干扰小区信息";
                        },
                        neighbor: function () {
                            return neighbor;
                        }
                    }
                });
                modalInstance.result.then(function (nei) {
                    console.log(nei);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            matchNeighbor: function (center, candidate, neighbors) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/MatchCellDialog.html',
                    controller: 'neighbors.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return center.eNodebName + "-" + center.sectorId + "的邻区PCI=" + candidate.destPci + "的可能小区";
                        },
                        candidateNeighbors: function () {
                            return neighbors;
                        },
                        currentCell: function () {
                            return center;
                        }
                    }
                });

                modalInstance.result.then(function (nearestCell) {
                    matchNearest(nearestCell, candidate, center);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }
    })
    .factory('coverageDialogService', function ($uibModal, $log) {
        return {
            showDetails: function (cellName, cellId, sectorId) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Coverage/DetailsChartDialog.html',
                    controller: 'coverage.details.dialog',
                    size: 'lg',
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

                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showSource: function (currentView, serialNumber, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/SourceDialog.html',
                    controller: 'interference.source.dialog',
                    size: 'lg',
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
                });

                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showSourceDbChart: function (currentView) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/SourceDbChartDialog.html',
                    controller: 'interference.source.db.chart',
                    size: 'lg',
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

                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showSourceModChart: function (currentView, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/SourceModChartDialog.html',
                    controller: 'interference.source.mod.chart',
                    size: 'lg',
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
                });

                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showSourceStrengthChart: function (currentView, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/SourceStrengthChartDialog.html',
                    controller: 'interference.source.strength.chart',
                    size: 'lg',
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
                });

                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showInterferenceVictim: function (currentView, serialNumber, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/VictimDialog.html',
                    controller: 'interference.victim.dialog',
                    size: 'lg',
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
                });

                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCoverage: function (currentView, preciseCells, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/CoverageDialog.html',
                    controller: 'interference.coverage.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return currentView.eNodebName + "-" + currentView.sectorId + "覆盖分析";
                        },
                        preciseCells: function () {
                            return preciseCells;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        }
    });