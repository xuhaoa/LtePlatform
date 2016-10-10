angular.module('myApp.parameters', ['myApp.url'])
    .factory('neighborService', function(generalHttpService) {
        return {
            queryCellNeighbors: function(cellId, sectorId) {
                return generalHttpService.getApiData('NearestPciCell', {
                    'cellId': cellId,
                    'sectorId': sectorId
                });
            },
            querySystemNeighborCell: function(cellId, sectorId, pci) {
                return generalHttpService.getApiData('NearestPciCell', {
                    'cellId': cellId,
                    'sectorId': sectorId,
                    'pci': pci
                });
            },
            updateCellPci: function(cell) {
                return generalHttpService.postApiData('NearestPciCell', cell);
            },
            monitorNeighbors: function(cell) {
                return generalHttpService.postApiData('NeighborMonitor', {
                    cellId: cell.nearestCellId,
                    sectorId: cell.nearestSectorId
                });
            },
            queryNearestCells: function(eNodebId, sectorId, pci) {
                return generalHttpService.getApiData('Cell', {
                    'eNodebId': eNodebId,
                    'sectorId': sectorId,
                    'pci': pci
                });
            },
            updateNeighbors: function(cellId, sectorId, pci, nearestCellId, nearestSectorId) {
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
    .factory('networkElementService', function(generalHttpService) {
        return {
            queryCellInfo: function(cellId, sectorId) {
                return generalHttpService.getApiData('Cell', {
                    eNodebId: cellId,
                    sectorId: sectorId
                });
            },
            queryLteRruFromCellName: function(cellName) {
                return generalHttpService.getApiData('LteRru', {
                    cellName: cellName
                });
            },
            queryCellInfosInOneENodeb: function(eNodebId) {
                return generalHttpService.getApiData('Cell', {
                    eNodebId: eNodebId
                });
            },
            queryCellViewsInOneENodeb: function(eNodebId) {
                return generalHttpService.getApiData('Cell', {
                    cellId: eNodebId
                });
            },
            queryCellSectorIds: function(name) {
                return generalHttpService.getApiData('Cell', {
                    eNodebName: name
                });
            },
            queryCdmaSectorIds: function(name) {
                return generalHttpService.getApiData('CdmaCell', {
                    btsName: name
                });
            },
            queryCdmaCellViews: function(name) {
                return generalHttpService.getApiData('CdmaCell', {
                    name: name
                });
            },
            queryCdmaCellInfo: function(btsId, sectorId) {
                return generalHttpService.getApiData('CdmaCell', {
                    btsId: btsId,
                    sectorId: sectorId
                });
            },
            queryCdmaCellInfoWithType: function(btsId, sectorId, cellType) {
                return generalHttpService.getApiData('CdmaCell', {
                    btsId: btsId,
                    sectorId: sectorId,
                    cellType: cellType
                });
            },
            queryCdmaCellInfosInOneBts: function(btsId) {
                return generalHttpService.getApiData('CdmaCell', {
                    btsId: btsId
                });
            },
            queryENodebInfo: function(eNodebId) {
                return generalHttpService.getApiData('ENodeb', {
                    eNodebId: eNodebId
                });
            },
            queryENodebsInOneTown: function(city, district, town) {
                return generalHttpService.getApiData('ENodeb', {
                    city: city,
                    district: district,
                    town: town
                });
            },
            queryENodebsByGeneralName: function(name) {
                return generalHttpService.getApiData('ENodeb', {
                    name: name
                });
            },
            queryBtsInfo: function(btsId) {
                return generalHttpService.getApiData('Bts', {
                    btsId: btsId
                });
            },
            queryBtssInOneTown: function(city, district, town) {
                return generalHttpService.getApiData('Bts', {
                    city: city,
                    district: district,
                    town: town
                });
            },
            queryBtssByGeneralName: function(name) {
                return generalHttpService.getApiData('Bts', {
                    name: name
                });
            },
            queryCellSectors: function(cells) {
                return generalHttpService.postApiData('Cell', {
                    views: cells
                });
            },
            queryRangeSectors: function(range, excludedIds) {
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
            queryRangeENodebs: function(container) {
                return generalHttpService.postApiData('ENodeb', container);
            },
            queryRangeBtss: function(container) {
                return generalHttpService.postApiData('Bts', container);
            }
        };
    })
    .factory('basicImportService', function(generalHttpService) {
        return {
            queryENodebExcels: function() {
                return generalHttpService.getApiData('NewENodebExcels', {});
            },
            queryCellExcels: function() {
                return generalHttpService.getApiData('NewCellExcels', {});
            },
            queryBtsExcels: function() {
                return generalHttpService.getApiData('NewBtsExcels', {});
            },
            queryCdmaCellExcels: function() {
                return generalHttpService.getApiData('NewCdmaCellExcels', {});
            },
            queryCellCount: function() {
                return generalHttpService.getApiData('DumpLteRru', {});
            },
            queryCdmaCellCount: function() {
                return generalHttpService.getApiData('DumpCdmaRru', {});
            },
            queryVanishedENodebs: function() {
                return generalHttpService.getApiData('DumpENodebExcel', {});
            },
            queryVanishedBtss: function() {
                return generalHttpService.getApiData('DumpBtsExcel', {});
            },
            queryVanishedCells: function() {
                return generalHttpService.getApiData('DumpCellExcel', {});
            },
            queryVanishedCdmaCells: function() {
                return generalHttpService.getApiData('DumpCdmaCellExcel', {});
            },
            dumpOneENodebExcel: function(item) {
                return generalHttpService.postApiData('DumpENodebExcel', item);
            },
            dumpOneBtsExcel: function(item) {
                return generalHttpService.postApiData('DumpBtsExcel', item);
            },
            dumpOneCellExcel: function(item) {
                return generalHttpService.postApiData('DumpCellExcel', item);
            },
            dumpOneCdmaCellExcel: function(item) {
                return generalHttpService.postApiData('DumpCdmaCellExcel', item);
            },
            updateLteCells: function() {
                return generalHttpService.postApiData('DumpLteRru', {});
            },
            dumpLteRrus: function() {
                return generalHttpService.putApiData('DumpLteRru', {});
            },
            dumpCdmaRrus: function() {
                return generalHttpService.putApiData('DumpCdmaRru', {});
            },
            dumpMultipleENodebExcels: function(items) {
                return generalHttpService.postApiData('NewENodebExcels', {
                    infos: items
                });
            },
            dumpMultipleBtsExcels: function(items) {
                return generalHttpService.postApiData('NewBtsExcels', {
                    infos: items
                });
            },
            dumpMultipleCellExcels: function(items) {
                return generalHttpService.postApiData('NewCellExcels', {
                    infos: items
                });
            },
            dumpMultipleCdmaCellExcels: function(items) {
                return generalHttpService.postApiData('NewCdmaCellExcels', {
                    infos: items
                });
            },
            vanishENodebIds: function(ids) {
                return generalHttpService.putApiData('DumpENodebExcel', {
                    eNodebIds: ids
                });
            },
            vanishBtsIds: function(ids) {
                return generalHttpService.putApiData('DumpBtsExcel', {
                    eNodebIds: ids
                });
            },
            vanishCellIds: function(ids) {
                return generalHttpService.putApiData('DumpCellExcel', {
                    cellIdPairs: ids
                });
            },
            vanishCdmaCellIds: function(ids) {
                return generalHttpService.putApiData('DumpCdmaCellExcel', {
                    cellIdPairs: ids
                });
            }
        };
    })
    .factory('neighborImportService', function(generalHttpService) {
        return {
            queryDumpNeighbors: function() {
                return generalHttpService.getApiData('DumpNeighbor', {});
            },
            clearDumpNeighbors: function() {
                return generalHttpService.deleteApiData('DumpNeighbor');
            },
            dumpSingleItem: function() {
                return generalHttpService.putApiData('DumpNeighbor', {});
            },
            updateSuccessProgress: function(result, progressInfo, callback) {
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
            updateFailProgress: function(progressInfo, callback) {
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
    .factory('flowImportService', function(generalHttpService) {
        return {
            queryHuaweiFlows: function() {
                return generalHttpService.getApiData('DumpHuaweiFlow', {});
            },
            queryZteFlows: function() {
                return generalHttpService.getApiData('DumpZteFlow', {});
            },
            clearDumpHuaweis: function() {
                return generalHttpService.deleteApiData('DumpHuaweiFlow');
            },
            clearDumpZtes: function() {
                return generalHttpService.deleteApiData('DumpZteFlow');
            },
            dumpHuaweiItem: function() {
                return generalHttpService.putApiData('DumpHuaweiFlow', {});
            },
            dumpZteItem: function() {
                return generalHttpService.putApiData('DumpZteFlow', {});
            },
            queryHuaweiStat: function(index) {
                return generalHttpService.getApiData('DumpHuaweiFlow', {
                    index: index
                });
            },
            queryDumpHistory: function(begin, end) {
                return generalHttpService.getApiData('DumpFlow', {
                    begin: begin,
                    end: end
                });
            },
            dumpTownStats: function(statDate) {
                return generalHttpService.getApiData('DumpFlow', {
                    statDate: statDate
                });
            }
        }
    })
    .factory('alarmsService', function(generalHttpService) {
        return {
            queryENodebAlarmsByDateSpanAndLevel: function(eNodebId, begin, end, level) {
                return generalHttpService.getApiData('Alarms', {
                    eNodebId: eNodebId,
                    begin: begin,
                    end: end,
                    level: level
                });
            }
        };
    })
    .factory('alarmImportService', function(generalHttpService) {
        return {
            queryDumpHistory: function(begin, end) {
                return generalHttpService.getApiData('DumpAlarm', {
                    begin: begin,
                    end: end
                });
            },
            queryDumpItems: function() {
                return generalHttpService.getApiData('DumpAlarm', {});
            },
            dumpSingleItem: function() {
                return generalHttpService.putApiData('DumpAlarm', {});
            },
            clearImportItems: function() {
                return generalHttpService.deleteApiData('DumpAlarm');
            },
            updateHuaweiAlarmInfos: function(cellDef) {
                return generalHttpService.postApiData('Alarms', cellDef);
            }
        };
    })
    .factory('flowService', function(generalHttpService) {
        return {
            queryCellFlowByDateSpan: function(eNodebId, sectorId, begin, end) {
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
    .factory('coverageService', function(generalHttpService) {
        return {
            queryByRasterInfo: function(info, type) {
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
            querySingleRasterInfo: function(fileName, rasterNum, type) {
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
    });