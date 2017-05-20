angular.module('region.basic', ['app.core'])
    .factory('kpiPreciseService', function(generalHttpService) {
        return {
            getRecentPreciseRegionKpi: function(city, initialDate) {
                return generalHttpService.getApiData('PreciseRegion', {
                    city: city,
                    statDate: initialDate
                });
            },
            getDateSpanPreciseRegionKpi: function(city, beginDate, endDate) {
                return generalHttpService.getApiData('PreciseRegion', {
                    city: city,
                    begin: beginDate,
                    end: endDate
                });
            },
            getDateSpanFlowRegionKpi: function(city, beginDate, endDate) {
                return generalHttpService.getApiData('TownFlow', {
                    city: city,
                    begin: beginDate,
                    end: endDate
                });
            },
            getOrderSelection: function() {
                return generalHttpService.getApiData('KpiOptions', {
                    key: "OrderPreciseStatPolicy"
                });
            },
            getHotSpotTypeSelection: function() {
                return generalHttpService.getApiData('KpiOptions', {
                    key: "HotspotType"
                });
            },
            queryTopKpis: function(begin, end, topCount, orderSelection) {
                return generalHttpService.getApiData('PreciseStat', {
                    'begin': begin,
                    'end': end,
                    'topCount': topCount,
                    'orderSelection': orderSelection
                });
            },
            queryTopKpisInDistrict: function(begin, end, topCount, orderSelection, city, district) {
                return generalHttpService.getApiData('PreciseStat', {
                    'begin': begin,
                    'end': end,
                    'topCount': topCount,
                    'orderSelection': orderSelection,
                    city: city,
                    district: district
                });
            },
            queryTopDownSwitchInDistrict: function(begin, end, topCount, city, district) {
                return generalHttpService.getApiData('TopDownSwitch', {
                    begin: begin,
                    end: end,
                    topCount: topCount,
                    city: city,
                    district: district
                });
            },
            queryTopRank2InDistrict: function(begin, end, topCount, city, district) {
                return generalHttpService.getApiData('TopRank2', {
                    begin: begin,
                    end: end,
                    topCount: topCount,
                    city: city,
                    district: district
                });
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
            dumpOneHotSpot: function (item) {
                return generalHttpService.postApiData('HotSpot', item);
            },
            queryAllHotSpots: function () {
                return generalHttpService.getApiData('HotSpot', {});
            },
            queryHotSpotsByType: function (type) {
                return generalHttpService.getApiData('HotSpot', {
                    type: type
                });
            },
            queryHotSpotCells: function (name) {
                return generalHttpService.getApiData('LteRruCell', {
                    rruName: name
                });
            },
            dumpSingleItem: function () {
                return generalHttpService.putApiData('DumpNeighbor', {});
            }
        };
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
            },
            queryENodebGeoFlowByDateSpan: function (begin, end) {
                return generalHttpService.getApiData('ENodebFlow', {
                    begin: begin,
                    end: end
                });
            },
            queryConstructionByTownAndName: function (district, town, name) {
                return generalHttpService.getApiData('Construction', {
                    district: district,
                    town: town + '营服中心',
                    searchTxt: name
                });
            },
            queryConstructionByTownAndNameInBoundary: function (district, town, name, range) {
                return generalHttpService.getApiData('Construction', {
                    district: district,
                    town: town + '营服中心',
                    searchTxt: name,
                    west: range.west,
                    east: range.east,
                    south: range.south,
                    north: range.north
                });
            }
        };
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
    .factory('coverageService', function (generalHttpService) {
        return {
            queryAreaTestDate: function () {
                return generalHttpService.getApiData('AreaTestDate', {});
            },
            queryAgisDtPoints: function (begin, end) {
                return generalHttpService.getApiData('AgisDtPoints', {
                    begin: begin,
                    end: end
                });
            },
            queryAgisDtPointsByTopic: function (begin, end, topic) {
                return generalHttpService.getApiData('AgisDtPoints', {
                    begin: begin,
                    end: end,
                    topic: topic
                });
            },
            queryMrGridSelfCoverage: function (district, statDate) {
                return generalHttpService.getApiData('MrGrid', {
                    district: district,
                    statDate: statDate
                });
            },
            queryTownMrGridSelfCoverage: function (district, town, statDate) {
                return generalHttpService.getApiData('TownMrGrid', {
                    district: district,
                    town: town,
                    statDate: statDate
                });
            },
            queryMrGridCompete: function (district, statDate, competeDescription) {
                return generalHttpService.getApiData('MrGrid', {
                    district: district,
                    statDate: statDate,
                    competeDescription: competeDescription
                });
            },
            queryTownMrGridCompete: function (district, town, statDate, competeDescription) {
                return generalHttpService.getApiData('TownMrGrid', {
                    district: district,
                    town: town,
                    statDate: statDate,
                    competeDescription: competeDescription
                });
            },
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
                    color: "#FF6666"
                }, {
                    threshold: -110,
                    color: "#FF6600"
                }, {
                    threshold: -105,
                    color: "#FFFF00"
                }, {
                    threshold: -95,
                    color: "#0099CC"
                }, {
                    threshold: -80,
                    color: "#009933"
                }
            ],
            rsrpIntervalCriteria: [
                {
                    threshold: "-110dbm以下",
                    color: "#FF6666"
                }, {
                    threshold: "-105dbm到-110dbm",
                    color: "#FF6600"
                }, {
                    threshold: "-100dbm到-105dbm",
                    color: "#0099CC"
                }
            ],
            competeCriteria: [
                {
                    threshold: "覆盖率小于于80%且比对方差",
                    color: "#FF0000"
                }, {
                    threshold: "覆盖率小于于80%且比对方好",
                    color: "#0099CC"
                }, {
                    threshold: "覆盖率大于80%且低于对方5%",
                    color: "#00FFFF"
                }, {
                    threshold: "覆盖率大于80%且高于对方5%",
                    color: "#00FF00"
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
    .factory('preciseInterferenceService', function (generalHttpService) {
        return {
            addMonitor: function (cell) {
                generalHttpService.postApiData('NeighborMonitor', {
                    cellId: cell.cellId,
                    sectorId: cell.sectorId
                }).then(function () {
                    cell.isMonitored = true;
                });
            },
            queryMonitor: function (cellId, sectorId) {
                return generalHttpService.getApiData('NeighborMonitor', {
                    'cellId': cellId,
                    'sectorId': sectorId
                });
            },
            updateInterferenceNeighbor: function (cellId, sectorId) {
                return generalHttpService.getApiData('InterferenceNeighbor', {
                    'cellId': cellId,
                    'sectorId': sectorId
                });
            },
            queryInterferenceNeighbor: function (begin, end, cellId, sectorId) {
                return generalHttpService.getApiData('InterferenceNeighbor', {
                    'begin': begin,
                    'end': end,
                    'cellId': cellId,
                    'sectorId': sectorId
                });
            },
            updateInterferenceVictim: function (cellId, sectorId) {
                return generalHttpService.getApiData('InterferenceNeighbor', {
                    neighborCellId: cellId,
                    neighborSectorId: sectorId
                });
            },
            queryInterferenceVictim: function (begin, end, cellId, sectorId) {
                return generalHttpService.getApiData('InterferenceVictim', {
                    'begin': begin,
                    'end': end,
                    'cellId': cellId,
                    'sectorId': sectorId
                });
            }
        };
    })
    .factory('topPreciseService', function (generalHttpService) {
        return {
            getOrderPolicySelection: function () {
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
                return {
                    options: options,
                    selected: options[4].value
                };
            },
            queryCoverage: function (begin, end, cellId, sectorId) {
                return generalHttpService.getApiData('MrsRsrp', {
                    'begin': begin,
                    'end': end,
                    'eNodebId': cellId,
                    'sectorId': sectorId
                });
            },
            queryTa: function (begin, end, cellId, sectorId) {
                return generalHttpService.getApiData('MrsTadv', {
                    'begin': begin,
                    'end': end,
                    'eNodebId': cellId,
                    'sectorId': sectorId
                });
            },
            queryRsrpTa: function (begin, end, cellId, sectorId) {
                return generalHttpService.getApiData('MrsTadvRsrp', {
                    'begin': begin,
                    'end': end,
                    'eNodebId': cellId,
                    'sectorId': sectorId
                });
            }
        };
    })
    .factory('customerQueryService', function (generalHttpService) {
        return {
            queryVehicleTypeOptions: function () {
                return generalHttpService.getApiData('KpiOptions', {
                    key: "VehicleType"
                });
            },
            queryDemandLevelOptions: function () {
                return generalHttpService.getApiData('KpiOptions', {
                    key: "DemandLevel"
                });
            },
            queryNetworkTypeOptions: function () {
                return generalHttpService.getApiData('KpiOptions', {
                    key: 'NetworkType'
                });
            },
            queryMarketThemeOptions: function () {
                return generalHttpService.getApiData('KpiOptions', {
                    key: 'MarketTheme'
                });
            },
            queryTransmitFunctionOptions: function () {
                return ['光纤', '微波', '卫星'];
            },
            queryElectricSupplyOptions: function () {
                return ['市电', '市电供电', '远供', '油机'];
            },
            postDto: function (dto) {
                return generalHttpService.postApiData("EmergencyCommunication", dto);
            },
            queryAll: function (begin, end) {
                return generalHttpService.getApiData("EmergencyCommunication", {
                    begin: begin,
                    end: end
                });
            },
            queryAllVip: function (begin, end) {
                return generalHttpService.getApiData("VipDemand", {
                    begin: begin,
                    end: end
                });
            },
            queryOneVip: function (serialNumber) {
                return generalHttpService.getApiData("VipDemand", {
                    serialNumber: serialNumber
                });
            },
            queryOneComplain: function (serialNumber) {
                return generalHttpService.getApiData("ComplainQuery", {
                    serialNumber: serialNumber
                });
            },
            updateVip: function (dto) {
                return generalHttpService.putApiData("VipDemand", dto);
            },
            queryOneEmergency: function (id) {
                return generalHttpService.getApiData('EmergencyCommunication/' + id, {});
            }
        };
    })
    .factory('emergencyService', function (generalHttpService) {
        return {
            queryProcessList: function (id) {
                return generalHttpService.getApiData('EmergencyProcess/' + id, {});
            },
            createProcess: function (dto) {
                return generalHttpService.postApiDataWithHeading('EmergencyProcess', dto);
            },
            createVipProcess: function (dto) {
                return generalHttpService.postApiDataWithHeading('VipProcess', dto);
            },
            updateProcess: function (process) {
                return generalHttpService.putApiData('EmergencyProcess', process);
            },
            updateVipProcess: function (process) {
                return generalHttpService.putApiData('VipProcess', process);
            },
            finishVipProcess: function (process) {
                return generalHttpService.postApiDataWithHeading('VipProcessFinish', process);
            },
            createFiberItem: function (item) {
                return generalHttpService.postApiData('EmergencyFiber', item);
            },
            finishFiberItem: function (item) {
                return generalHttpService.putApiData('EmergencyFiber', item);
            },
            queryFiberList: function (id) {
                return generalHttpService.getApiData('EmergencyFiber/' + id, {});
            },
            queryVipDemands: function (today) {
                return generalHttpService.getApiData('VipDemand', {
                    today: today
                });
            },
            queryCollegeVipDemands: function (year) {
                return generalHttpService.getApiData('CollegeVipDemand', {
                    year: year
                });
            },
            queryCollegeVipDemand: function (year, collegeName) {
                return generalHttpService.getApiData('CollegeVipDemand', {
                    collegeName: collegeName,
                    year: year
                });
            },
            queryVipProcessList: function (number) {
                return generalHttpService.getApiData('VipProcess', {
                    serialNumber: number
                });
            },
            constructCollegeVipDemand: function (stat) {
                return generalHttpService.postApiDataWithHeading('CollegeVipDemand', stat);
            }
        };
    })
    .factory('complainService', function (generalHttpService) {
        return {
            queryPositionList: function (begin, end) {
                return generalHttpService.getApiData('ComplainPosition', {
                    begin: begin,
                    end: end
                });
            },
            postPosition: function (dto) {
                return generalHttpService.postApiData('ComplainPosition', dto);
            },
            queryCurrentComplains: function (today) {
                return generalHttpService.getApiData('ComplainQuery', {
                    today: today
                });
            },
            queryMonthTrend: function (date) {
                return generalHttpService.getApiData('ComplainQuery', {
                    date: date
                });
            },
            queryBranchDemands: function (today) {
                return generalHttpService.getApiData('BranchDemand', {
                    today: today
                });
            },
            queryLastMonthSustainCount: function (today) {
                return generalHttpService.getApiData('SustainCount', {
                    today: today
                });
            },
            queryAll: function (begin, end) {
                return generalHttpService.getApiData("ComplainQuery", {
                    begin: begin,
                    end: end
                });
            },
            queryBranchList: function (begin, end) {
                return generalHttpService.getApiData("BranchDemand", {
                    begin: begin,
                    end: end
                });
            },
            queryOnlineList: function (begin, end) {
                return generalHttpService.getApiData("OnlineSustain", {
                    begin: begin,
                    end: end
                });
            },
            queryLastMonthOnlineList: function (today) {
                return generalHttpService.getApiData("OnlineSustain", {
                    today: today
                });
            },
            queryLastMonthOnlineListInOneDistrict: function (today, city, district) {
                return generalHttpService.getApiData("OnlineSustain", {
                    today: today,
                    city: city,
                    district: district
                });
            },
            updateComplain: function (dto) {
                return generalHttpService.putApiData("ComplainQuery", dto);
            },
            queryComplainMonthStats: function (date) {
                return generalHttpService.getApiData("ComplainQuery", {
                    countDate: date
                });
            },
            queryHotSpotCells: function (name) {
                return generalHttpService.getApiData('HotSpotCells', {
                    name: name
                });
            }
        }
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
    })
    .factory('downSwitchService', function (generalHttpService, appUrlService) {
        return {
            getRecentKpi: function (city, initialDate) {
                return generalHttpService.getApiData('DownSwitchFlow', {
                    city: city,
                    statDate: initialDate
                });
            },
            getStationByName: function (name, areaName, page, pageSize) {
                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Station/search', {
                    "curr_page": page,
                    "page_size": pageSize,
                    "stationName": name,
                    "areaName": areaName
                });
            },
            getStationsByAreaName: function (areaName, page, pageSize) {
                return generalHttpService.getMvcData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Station/search/', {
                    curr_page: page,
                    page_size: pageSize,
                    areaName: areaName
                });
            },
            getStationById: function (id) {
                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Station/single', {
                    "id": id
                });
            },
            getAlarmStationByName: function (name, page, pageSize) {
                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Station/search', {
                    "curr_page": page,
                    "page_size": pageSize,
                    "stationName": name
                });
            },
            getStationByFilter: function (areaName, stationGrade, netType, roomAttribution, towerAttribution, isPower, isBBU, page, pageSize) {
                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Station/search', {
                    "curr_page": page,
                    "page_size": pageSize,
                    "areaName": areaName,
                    "netType": netType,
                    "stationGrade": stationGrade,
                    "roomAttribution": roomAttribution,
                    "towerAttribution": towerAttribution,
                    "isBBU": isBBU,
                    "isPower": isPower
                });
            },
            getAlarmStations: function (areaName, levelIndex, netType, page, pageSize) {
                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Alarm/search', {
                    "curr_page": page,
                    "page_size": pageSize,
                    "area_id": areaName,
                    "net_type": netType,
                    "alarmLevel": levelIndex
                });
            },
            getAlarmStationById: function (id) {
                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Alarm/single/', {
                    station_id: id
                });
            },
            getAlarmHistorybyId: function (id, currPage, pageSize, alarmLevel) {
                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Alarmhistory/search', {
                    "id": id,
                    "alarmLevel": alarmLevel,
                    "curr_page": currPage,
                    "page_size": pageSize
                });
            },
            getSpecialStations: function (recoverName, page, pageSize) {

                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Special/search', {
                    "curr_page": page,
                    "page_size": pageSize,
                    "recoverName": recoverName
                });
            },
            getSpecialIndoor: function (recoverName, page, pageSize) {
                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/SpecialIndoor/search', {
                    "curr_page": page,
                    "page_size": pageSize,
                    "recoverName": recoverName
                });
            },
            getFaultStations: function (page, pageSize) {
                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/Fault/search', {
                    "curr_page": page,
                    "page_size": pageSize
                });
            },
            getZeroVoice: function (isSolve, page, pageSize) {
                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/ZeroVoice/search', {
                    "curr_page": page,
                    "page_size": pageSize,
                    "isSolve": isSolve
                });
            },
            getZeroFlow: function (isSolve, page, pageSize) {
                return generalHttpService.postPhpUrlData(appUrlService.getPhpHost() + 'LtePlatForm/lte/index.php/ZeroFlow/search', {
                    "curr_page": page,
                    "page_size": pageSize,
                    "isSolve": isSolve
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
            updateMongoItems: function (statDate) {
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
            queryDistrictIndoorCells: function (cityName) {
                return generalHttpService.getApiData('DistrictIndoorCells', {
                    city: cityName
                });
            },
            queryDistrictBandCells: function (cityName) {
                return generalHttpService.getApiData('DistrictBandCells', {
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
            queryTownBoundaries: function (city, district, town) {
                return generalHttpService.getApiData('TownBoundary', {
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
    });