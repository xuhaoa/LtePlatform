angular.module('myApp.region', ['myApp.url'])
    .factory('kpiPreciseService', function (generalHttpService) {
        return {
            getRecentPreciseRegionKpi: function (city, initialDate) {
                return generalHttpService.getApiData('PreciseRegion', {
                    city: city,
                    statDate: initialDate
                });
            },
            getDateSpanPreciseRegionKpi: function (city, beginDate, endDate) {
                return generalHttpService.getApiData('PreciseRegion', {
                    city: city,
                    begin: beginDate,
                    end: endDate
                });
            },
            getDateSpanFlowRegionKpi: function (city, beginDate, endDate) {
                return generalHttpService.getApiData('TownFlow', {
                    city: city,
                    begin: beginDate,
                    end: endDate
                });
            },
            getOrderSelection: function () {
                return generalHttpService.getApiData('KpiOptions', {
                    key: "OrderPreciseStatPolicy"
                });
            },
            queryTopKpis: function (begin, end, topCount, orderSelection) {
                return generalHttpService.getApiData('PreciseStat', {
                    'begin': begin,
                    'end': end,
                    'topCount': topCount,
                    'orderSelection': orderSelection
                });
            },
            queryTopKpisInDistrict: function (begin, end, topCount, orderSelection, city, district) {
                return generalHttpService.getApiData('PreciseStat', {
                    'begin': begin,
                    'end': end,
                    'topCount': topCount,
                    'orderSelection': orderSelection,
                    city: city,
                    district: district
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
                return generalHttpService.getApiData('PlanningSiteRange', {
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
            },
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
            },
            queryOutdoorCellSites: function(city, district) {
                return generalHttpService.getApiData('OutdoorCellSite', {
                    city: city,
                    district: district
                });
            },
            queryIndoorCellSites: function (city, district) {
                return generalHttpService.getApiData('IndoorCellSite', {
                    city: city,
                    district: district
                });
            },
            queryPlanningSites: function(city, district) {
                return generalHttpService.getApiData('PlanningSite', {
                    city: city,
                    district: district
                });
            },
            queryOpenningSites: function (city, district) {
                return generalHttpService.getApiData('OpenningSite', {
                    city: city,
                    district: district
                });
            },
            queryOpennedSites: function (city, district) {
                return generalHttpService.getApiData('OpennedSite', {
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
            },
            queryENodebGeoFlowByDateSpan: function(begin, end) {
                return generalHttpService.getApiData('ENodebFlow', {
                    begin: begin,
                    end: end
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
    .constant('roleDistrictDictionary', {
        "顺德管理": "顺德",
        "南海管理": "南海",
        "禅城管理": "禅城",
        "三水管理": "三水",
        "高明管理": "高明"
    })
    .factory('authorizeService', function (generalHttpService, roleDistrictDictionary) {
        return {
            queryCurrentUserInfo: function () {
                return generalHttpService.getApiData('CurrentUser', {});
            },
            queryCurrentUserName: function () {
                return generalHttpService.getApiDataWithHeading('CurrentUserName', {});
            },
            queryAllUsers: function () {
                return generalHttpService.getApiDataWithHeading('ApplicationUsers', {});
            },
            queryRolesInUser: function(userName) {
                return generalHttpService.getApiDataWithHeading('ApplicationUsers', {
                    userName: userName
                });
            },
            queryCandidateRolesInUser: function (userName) {
                return generalHttpService.getApiDataWithHeading('ManageUsers', {
                    userName: userName
                });
            },
            queryEmailConfirmed: function (name) {
                return generalHttpService.getMvcData('/Manage/EmailHasBeenConfirmed', {
                    userName: name
                });
            },
            updateRoleList: function () {
                return generalHttpService.getApiDataWithHeading('ApplicationRoles', {});
            },
            addRole: function (name) {
                return generalHttpService.getApiDataWithHeading('CreateRole', {
                    roleName: name
                });
            },
            deleteRole: function (name) {
                return generalHttpService.getApiDataWithHeading('DeleteRole', {
                    roleName: name
                });
            },
            assignRoleInUser: function(userName, roleName) {
                return generalHttpService.getApiDataWithHeading('ApplicationRoles', {
                    userName: userName,
                    roleName: roleName
                });
            },
            releaseRoleInUser: function (userName, roleName) {
                return generalHttpService.getApiDataWithHeading('ManageRoles', {
                    userName: userName,
                    roleName: roleName
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
            },
            queryRoleDistrict: function(role) {
                return roleDistrictDictionary[role];
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
    .factory('dumpPreciseService', function (dumpProgress, networkElementService) {
        var serviceInstance = {};
        serviceInstance.dumpAllRecords = function (records, outerIndex, innerIndex, eNodebId, sectorId, queryFunc) {
            if (outerIndex >= records.length) {
                if (queryFunc !== undefined)
                    queryFunc();
            } else {
                var subRecord = records[outerIndex];
                if (subRecord.existedRecords < subRecord.mongoRecords.length && innerIndex < subRecord.mongoRecords.length) {
                    var stat = subRecord.mongoRecords[innerIndex];
                    networkElementService.querySystemNeighborCell(eNodebId, sectorId, stat.neighborPci).then(function (neighbor) {
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
    .factory('kpiDisplayService', function (appFormatService, coverageService, topPreciseService, calculateService, chartCalculateService) {
        return {
            generatePreciseBarOptions: function (districtStats, cityStat) {
                var chart = new BarChart();
                chart.title.text = cityStat.city + "精确覆盖率统计";
                chart.legend.enabled = false;
                var category = [];
                var precise = [];
                angular.forEach(districtStats, function (stat) {
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
            generateDownSwitchOptions: function (districtStats, city, cityDownSwitch) {
                var chart = new BarChart();
                chart.title.text = city + "4G用户3G流量比统计";
                chart.legend.enabled = false;
                var category = [];
                var precise = [];
                angular.forEach(districtStats, function (stat) {
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
            generateComboChartOptions: function (data, name, city) {
                var chart = new ComboChart();
                chart.title.text = name;
                var kpiOption = appFormatService.lowerFirstLetter(name);
                chart.xAxis[0].categories = data.statDates;
                chart.yAxis[0].title.text = name;
                chart.xAxis[0].title.text = '日期';
                for (var i = 0; i < data.regionList.length - 1; i++) {
                    chart.series.push({
                        type: kpiOption === "2G呼建(%)" ? 'line' : 'column',
                        name: data.regionList[i],
                        data: data.kpiDetails[kpiOption][i]
                    });
                }
                chart.series.push({
                    type: 'spline',
                    name: city,
                    data: data.kpiDetails[kpiOption][data.regionList.length - 1],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                });
                return chart.options;
            },
            getMrsOptions: function (stats, title) {
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
                chartCalculateService.writeSeriesData(series.series, seriesData.info, dataKeys);
                return chart.options;
            },
            getPreciseOptions: function (stats, title) {
                var chart = new ComboChart();
                chart.title.text = title;
                var statDates = [];
                var firstRate = [];
                var secondRate = [];
                var thirdRate = [];
                angular.forEach(stats, function (stat) {
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
            getInterferencePieOptions: function (interferenceCells, currentCellName) {
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
                angular.forEach(interferenceCells, function (cell) {
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
            getStrengthColumnOptions: function (interferenceCells, mrCount, currentCellName) {
                var over6DbColumn = new Column3d();
                var over10DbColumn = new Column3d();
                over6DbColumn.series[0].name = '6dB干扰强度';
                over10DbColumn.series[0].name = '10dB干扰强度';
                over6DbColumn.title.text = currentCellName + ': 6dB干扰干扰强度';
                over10DbColumn.title.text = currentCellName + ': 10dB干扰干扰强度';

                angular.forEach(interferenceCells, function (cell) {
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
            calculatePreciseChange: function (input) {
                var preKpis = input.slice(0, 7);
                var postKpis = input.slice(input.length - 7);
                var preSum = 0;
                var postSum = 0;
                angular.forEach(preKpis, function (kpi) {
                    preSum += kpi.secondRate;
                });
                angular.forEach(postKpis, function (kpi) {
                    postSum += kpi.secondRate;
                });
                return {
                    pre: 100 - preSum / 7,
                    post: 100 - postSum / 7
                };
            },
            queryKpiOptions: function (network) {
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
            queryCoverageLegend: function (kpi) {
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
                    default:
                        return {
                            criteria: coverageService.defaultSinrCriteria,
                            sign: true
                        };
                }
            },
            initializeCoveragePoints: function (legend) {
                var pointDef = {
                    sign: legend.sign,
                    intervals: []
                };
                angular.forEach(legend.criteria, function (interval) {
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
                var intervals = pointDef.intervals;
                angular.forEach(points, function (point) {
                    var value = 0;
                    switch (kpi) {
                        case 'Ec/Io':
                            value = point.ecio;
                            break;
                        case 'RxAGC':
                            value = point.rxAgc;
                            break;
                        case 'TxPower':
                            value = point.txPower;
                            break;
                        case 'SINR(3G)':
                            value = point.sinr;
                            break;
                        case 'RxAGC0':
                            value = point.rxAgc0;
                            break;
                        case 'RxAGC1':
                            value = point.rxAgc1;
                            break;
                        case 'RSRP':
                            value = point.rsrp;
                            break;
                        default:
                            value = point.sinr;
                            break;
                    }
                    for (var i = 0; i < intervals.length; i++) {
                        if ((pointDef.sign && value < intervals[i].threshold) || (!pointDef.sign && value > intervals[i].threshold)) {
                            intervals[i].coors.push({
                                longtitute: point.longtitute,
                                lattitute: point.lattitute
                            });
                            break;
                        }
                    }
                });
            },
            updateCoverageKpi: function (neighbor, cell, dateSpan) {
                topPreciseService.queryCoverage(dateSpan.begin, dateSpan.end,
                    cell.cellId, cell.sectorId).then(function (coverage) {
                        if (coverage.length > 0) {
                            var coverageRate = calculateService.calculateWeakCoverageRate(coverage);
                            neighbor.weakBelow115 = coverageRate.rate115;
                            neighbor.weakBelow110 = coverageRate.rate110;
                            neighbor.weakBelow105 = coverageRate.rate105;
                        }

                    });
                topPreciseService.queryTa(dateSpan.begin, dateSpan.end,
                    cell.cellId, cell.sectorId).then(function (taList) {
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
    .factory('appKpiService', function (chartCalculateService, generalChartService, kpiRatingDivisionDefs, flowService, calculateService) {
        return {
            getDownSwitchRate: function (stats) {
                var flow3G = 0;
                var flow4G = 0;
                angular.forEach(stats, function (stat) {
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
                angular.forEach(districtStats, function (districtStat) {
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
                                ], function (stat) {
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
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.totalMrs;
                }), {
                    title: "分镇区测量报告数分布图",
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
            getPreciseRateOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.preciseRate;
                }), {
                    title: "分镇区精确覆盖率分布图",
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
            getDownlinkFlowOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.pdcpDownlinkFlow/1024/1024/8;
                }), {
                    title: "分镇区下行流量分布图（TB）",
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
            getUplinkFlowOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.pdcpUplinkFlow / 1024 / 1024 / 8;
                }), {
                    title: "分镇区上行流量分布图（TB）",
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
            getDownlinkRateOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.downlinkFeelingRate;
                }), {
                    title: "分镇区下行感知速率分布图（Mbit/s）",
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
            getUplinkRateOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownColumnOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.uplinkFeelingRate;
                }), {
                    title: "分镇区上行感知速率分布图（Mbit/s）",
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
            getMaxUsersOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.maxUsers;
                }), {
                    title: "分镇区最大用户数",
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
            getMaxActiveUsersOptions: function (districtStats, townStats) {
                return chartCalculateService.generateDrillDownPieOptionsWithFunc(chartCalculateService.generateDrillDownData(districtStats, townStats, function (stat) {
                    return stat.maxActiveUsers;
                }), {
                    title: "分镇区最大激活用户数",
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
            getMrsDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
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
            getMaxUsersDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.maxUsers;
                }), districts, {
                    title: "最大用户数变化趋势图",
                    xTitle: '日期',
                    yTitle: "最大用户数"
                });
            },
            getMaxActiveUsersDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.maxActiveUsers;
                }), districts, {
                    title: "最大激活用户数变化趋势图",
                    xTitle: '日期',
                    yTitle: "最大激活用户数"
                });
            },
            getDownlinkRateDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.downlinkFeelingRate;
                }), districts, {
                    title: "下行感知速率变化趋势图",
                    xTitle: '日期',
                    yTitle: "下行感知速率（Mbit/s）"
                });
            },
            getUplinkRateDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.uplinkFeelingRate;
                }), districts, {
                    title: "上行感知速率变化趋势图",
                    xTitle: '日期',
                    yTitle: "上行感知速率（Mbit/s）"
                });
            },
            getPreciseDistrictOptions: function (stats, inputDistricts) {
                var districts = inputDistricts.concat("全网");
                return chartCalculateService.generateSplineChartOptions(chartCalculateService.generateDateDistrictStats(stats, districts.length, function (stat) {
                    return stat.precise;
                }), districts, {
                    title: "精确覆盖率变化趋势图",
                    xTitle: '日期',
                    yTitle: "精确覆盖率"
                });
            },
            generateFlowDistrictStats: function (districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function (stat) {
                        return stat.districtFlowViews;
                    },
                    initializeFunc: function (generalStat) {
                        generalStat.pdcpDownlinkFlow = 0;
                        generalStat.pdcpUplinkFlow = 0;
                    },
                    calculateFunc: function (view) {
                        return {
                            pdcpDownlinkFlow: view.pdcpDownlinkFlow / 1024 / 1024 / 8,
                            pdcpUplinkFlow: view.pdcpUplinkFlow / 1024 / 1024 / 8
                        };
                    },
                    accumulateFunc: function (generalStat, view) {
                        generalStat.pdcpDownlinkFlow += view.pdcpDownlinkFlow / 1024 / 1024 / 8;
                        generalStat.pdcpUplinkFlow += view.pdcpUplinkFlow / 1024 / 1024 / 8;
                    },
                    zeroFunc: function () {
                        return {
                            pdcpDownlinkFlow: 0,
                            pdcpUplinkFlow: 0
                        };
                    },
                    totalFunc: function (generalStat) {
                        return {
                            pdcpDownlinkFlow: generalStat.pdcpDownlinkFlow,
                            pdcpUplinkFlow: generalStat.pdcpUplinkFlow
                        }
                    }
                });
            },
            generateUsersDistrictStats: function (districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function (stat) {
                        return stat.districtFlowViews;
                    },
                    initializeFunc: function (generalStat) {
                        generalStat.maxUsers = 0;
                        generalStat.maxActiveUsers = 0;
                    },
                    calculateFunc: function (view) {
                        return {
                            maxUsers: view.maxUsers,
                            maxActiveUsers: view.maxActiveUsers
                        };
                    },
                    accumulateFunc: function (generalStat, view) {
                        generalStat.maxUsers += view.maxUsers;
                        generalStat.maxActiveUsers += view.maxActiveUsers;
                    },
                    zeroFunc: function () {
                        return {
                            maxUsers: 0,
                            maxActiveUsers: 0
                        };
                    },
                    totalFunc: function (generalStat) {
                        return {
                            maxUsers: generalStat.maxUsers,
                            maxActiveUsers: generalStat.maxActiveUsers
                        }
                    }
                });
            },
            generateFeelingRateDistrictStats: function (districts, stats) {
                return chartCalculateService.generateDistrictStats(districts, stats, {
                    districtViewFunc: function (stat) {
                        return stat.districtFlowViews;
                    },
                    initializeFunc: function (generalStat) {
                        generalStat.totalUplinkDuration = 0;
                        generalStat.totalUplinkThroughput = 0;
                        generalStat.totalDownlinkDuration = 0;
                        generalStat.totalDownlinkThroughput = 0;
                    },
                    calculateFunc: function (view) {
                        return {
                            uplinkFeelingRate: view.uplinkFeelingRate,
                            downlinkFeelingRate: view.downlinkFeelingRate
                        };
                    },
                    accumulateFunc: function (generalStat, view) {
                        generalStat.totalUplinkDuration += view.uplinkFeelingDuration;
                        generalStat.totalUplinkThroughput += view.uplinkFeelingThroughput;
                        generalStat.totalDownlinkDuration += view.downlinkFeelingDuration;
                        generalStat.totalDownlinkThroughput += view.downlinkFeelingThroughput;
                    },
                    zeroFunc: function () {
                        return {
                            totalUplinkDuration: 0,
                            totalUplinkThroughput: 0,
                            totalDownlinkDuration: 0,
                            totalDownlinkThroughput: 0
                        };
                    },
                    totalFunc: function (generalStat) {
                        return {
                            uplinkFeelingRate: generalStat.totalUplinkThroughput / generalStat.totalUplinkDuration,
                            downlinkFeelingRate: generalStat.totalDownlinkThroughput / generalStat.totalDownlinkDuration
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
            calculateAverageRates: function (stats) {
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
                chartCalculateService.generateStatsForPie(trendStat, result, {
                    districtViewsFunc: function(stat) {
                        return stat.districtPreciseViews;
                    },
                    townViewsFunc: function(stat) {
                        return stat.townPreciseViews;
                    },
                    accumulateFunc: function (source, accumulate) {
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
            generateFlowTrendStatsForPie: function (trendStat, result) {
                chartCalculateService.generateStatsForPie(trendStat, result, {
                    districtViewsFunc: function (stat) {
                        return stat.districtFlowViews;
                    },
                    townViewsFunc: function (stat) {
                        return stat.townFlowViews;
                    },
                    accumulateFunc: function (source, accumulate) {
                        calculateService.accumulateFlowStat(source, accumulate);
                    }
                });
            },
            getPreciseObject: function (district) {
                var objectTable = {
                    "禅城": 89.8,
                    "南海": 90,
                    "三水": 90,
                    "高明": 90,
                    "顺德": 90.2
                };
                return objectTable[district] === undefined ? 90 : objectTable[district];
            },
            generateComplainTrendOptions: function (dates, counts, objects) {
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
                }, function (data) {
                    return data.item1;
                }, function (data) {
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
            generateMergeFlowOptions: function (stats, topic) {
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
            generateMergeUsersOptions: function (stats, topic) {
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
    .factory('kpiChartService', function (appKpiService) {
        return {
            showFlowCharts: function (flowStats, topic, mergeStats) {
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
    .factory('collegeService', function (generalHttpService) {
        return {
            queryNames: function () {
                return generalHttpService.getApiData('CollegeNames', {});
            },
            queryStats: function (year) {
                return generalHttpService.getApiData('CollegeStat', {
                    year: year
                });
            },
            queryRegion: function (id) {
                return generalHttpService.getApiData('CollegeRegion/' + id, {});
            },
            queryRange: function (name) {
                return generalHttpService.getApiData('CollegeRange', {
                    collegeName: name
                });
            },
            queryENodebs: function (name) {
                return generalHttpService.getApiData('CollegeENodeb', {
                    collegeName: name
                });
            },
            queryCells: function (name) {
                return generalHttpService.getApiData('CollegeCells', {
                    collegeName: name
                });
            },
            queryBtss: function (name) {
                return generalHttpService.getApiData('CollegeBtss', {
                    collegeName: name
                });
            },
            queryCdmaCells: function (name) {
                return generalHttpService.getApiData('CollegeCdmaCells', {
                    collegeName: name
                });
            },
            queryLteDistributions: function (name) {
                return generalHttpService.getApiData('CollegeLteDistributions', {
                    collegeName: name
                });
            },
            queryCdmaDistributions: function (name) {
                return generalHttpService.getApiData('CollegeCdmaDistributions', {
                    collegeName: name
                });
            },
            queryRaster: function (dataType, range, begin, end) {
                return generalHttpService.getApiData('RasterFile', {
                    dataType: dataType,
                    west: range.west,
                    east: range.east,
                    south: range.south,
                    north: range.north,
                    begin: begin,
                    end: end
                });
            }
        }
    })
    .factory('collegeQueryService', function (generalHttpService) {
        return {
            queryByName: function (name) {
                return generalHttpService.getApiData('CollegeName', {
                    name: name
                });
            },
            queryByNameAndYear: function (name, year) {
                return generalHttpService.getApiData('CollegeQuery', {
                    name: name,
                    year: year
                });
            },
            queryAll: function () {
                return generalHttpService.getApiData('CollegeQuery', {});
            },
            queryYearList: function (year) {
                return generalHttpService.getApiData('CollegeYear', {
                    year: year
                });
            },
            saveYearInfo: function (info) {
                return generalHttpService.postApiData('CollegeQuery', info);
            },
            constructCollegeInfo: function (info) {
                return generalHttpService.postApiDataWithHeading('CollegeStat', info);
            },
            saveCollegeCells: function (container) {
                return generalHttpService.postApiData('CollegeCellContainer', container);
            },
            saveCollegeENodebs: function (container) {
                return generalHttpService.postApiData('CollegeENodeb', container);
            },
            saveCollegeBtss: function (container) {
                return generalHttpService.postApiData('CollegeBtss', container);
            },
            saveCollege3GTest: function (view) {
                return generalHttpService.postApiData('College3GTest', view);
            },
            saveCollege4GTest: function (view) {
                return generalHttpService.postApiData('College4GTest', view);
            },
            queryCollege3GTestList: function (begin, end, name) {
                return generalHttpService.getApiData('College3GTest', {
                    begin: begin,
                    end: end,
                    name: name
                });
            },
            queryCollege4GTestList: function (begin, end, name) {
                return generalHttpService.getApiData('College4GTest', {
                    begin: begin,
                    end: end,
                    name: name
                });
            },
            queryCollegeFlow: function (collegeName, begin, end) {
                return generalHttpService.getApiData('CollegeFlow', {
                    collegeName: collegeName,
                    begin: begin,
                    end: end
                });
            },
            queryCollegeDateFlows: function (collegeName, begin, end) {
                return generalHttpService.getApiData('CollegeFlow', {
                    collegeName: collegeName,
                    beginDate: begin,
                    endDate: end
                });
            }
        };
    })
    .factory('collegeDtService', function (collegeService) {
        var queryRange = function (info) {
            return {
                west: info.centerX - 0.02,
                east: info.centerX + 0.02,
                south: info.centerY - 0.02,
                north: info.centerY + 0.03
            }
        };
        return {
            updateFileInfo: function (info, begin, end) {
                var range = queryRange(info);
                collegeService.queryRaster('2G', range, begin, end).then(function (files) {
                    info.file2Gs = files;
                });
                collegeService.queryRaster('3G', range, begin, end).then(function (files) {
                    info.file3Gs = files;
                });
                collegeService.queryRaster('4G', range, begin, end).then(function (files) {
                    info.file4Gs = files;
                });
            },
            queryRaster: function (center, type, begin, end, callback) {
                var range = queryRange(center);
                collegeService.queryRaster(type, range, begin, end).then(function (files) {
                    callback(files);
                });
            },
            default3GTestView: function (collegeName, place, tester) {
                return {
                    testTime: new Date(),
                    collegeName: collegeName,
                    place: place,
                    tester: tester,
                    downloadRate: 1024,
                    accessUsers: 23,
                    minRssi: -109,
                    maxRssi: -99,
                    vswr: 1.11
                };
            },
            default4GTestView: function (collegeName, place, tester) {
                return {
                    testTime: new Date(),
                    collegeName: collegeName,
                    place: place,
                    tester: tester,
                    downloadRate: 38024,
                    uploadRate: 21024,
                    accessUsers: 33,
                    rsrp: -109,
                    sinr: 12,
                    cellName: "",
                    pci: 0
                };
            }
        };
    })
    .value('collegeInfrastructurePath', '/appViews/College/Infrastructure/')
    .value('collegeTestPath', '/appViews/College/Test/')
    .factory('collegeDialogService', function (collegeInfrastructurePath, collegeTestPath,
        collegeQueryService, $uibModal, $log) {
        var resolveScope = function (name, topic) {
            return {
                dialogTitle: function () {
                    return name + "-" + topic;
                },
                name: function () {
                    return name;
                }
            };
        };
        return {
            showENodebs: function (name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'ENodebDialog.html',
                    controller: 'eNodeb.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "LTE基站信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCells: function (name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'LteCellDialog.html',
                    controller: 'cell.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "LTE小区信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showBtss: function (name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'BtsDialog.html',
                    controller: 'bts.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "CDMA基站信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCdmaCells: function (name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'CdmaCellDialog.html',
                    controller: 'cdmaCell.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "CDMA小区信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showLteDistributions: function (name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'DistributionDialog.html',
                    controller: 'lte.distribution.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "LTE室分信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCdmaDistributions: function (name) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'DistributionDialog.html',
                    controller: 'cdma.distribution.dialog',
                    size: 'lg',
                    resolve: resolveScope(name, "CDMA室分信息")
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            addYearInfo: function (item, name, year, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'YearInfoDialog.html',
                    controller: 'year.info.dialog',
                    size: 'lg',
                    resolve: {
                        name: function () {
                            return name;
                        },
                        year: function () {
                            return year;
                        },
                        item: function () {
                            return item;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    collegeQueryService.saveYearInfo(info).then(function () {
                        callback();
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            addNewCollege: function (callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'NewCollegeDialog.html',
                    controller: 'college.new.dialog',
                    size: 'lg',
                    resolve: {

                    }
                });
                modalInstance.result.then(function (info) {
                    collegeQueryService.constructCollegeInfo(info).then(function () {
                        callback();
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            supplementENodebCells: function (eNodebs, cells, collegeName, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'CellSupplementDialog.html',
                    controller: 'cell.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        eNodebs: function () {
                            return eNodebs;
                        },
                        cells: function () {
                            return cells;
                        },
                        collegeName: function () {
                            return collegeName;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    var cellNames = [];
                    angular.forEach(info, function (cell) {
                        cellNames.push(cell.cellName);
                    });
                    collegeQueryService.saveCollegeCells({
                        collegeName: collegeName,
                        cellNames: cellNames
                    }).then(function () {
                        callback();
                    });

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            supplementPositionCells: function (collegeName, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeInfrastructurePath + 'CellSupplementDialog.html',
                    controller: 'cell.position.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    var cellNames = [];
                    angular.forEach(info, function (cell) {
                        cellNames.push(cell.cellName);
                    });
                    collegeQueryService.saveCollegeCells({
                        collegeName: collegeName,
                        cellNames: cellNames
                    }).then(function () {
                        callback();
                    });

                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            construct3GTest: function (collegeName) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeTestPath + 'Construct3GTest.html',
                    controller: 'college.test3G.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    collegeQueryService.saveCollege3GTest(info).then(function () {
                        console.log(info);
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            construct4GTest: function (collegeName) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeTestPath + 'Construct4GTest.html',
                    controller: 'college.test4G.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    collegeQueryService.saveCollege4GTest(info).then(function () {
                        console.log(info);
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            processTest: function (collegeName, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeTestPath + 'Process.html',
                    controller: 'test.process.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            tracePlanning: function (collegeName, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: collegeTestPath + 'Planning.html',
                    controller: 'trace.planning.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    callback(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showCollegDialog: function (college) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/College/Table/CollegeMapInfoBox.html',
                    controller: 'map.college.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return college.name + "-" + "基本信息";
                        },
                        college: function () {
                            return college;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            addENodeb: function (collegeName, center, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/College/Infrastructure/CellSupplementDialog.html',
                    controller: 'eNodeb.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        },
                        center: function () {
                            return center;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    var ids = [];
                    angular.forEach(info, function (eNodeb) {
                        ids.push(eNodeb.eNodebId);
                    });
                    collegeQueryService.saveCollegeENodebs({
                        collegeName: collegeName,
                        eNodebIds: ids
                    }).then(function (count) {
                        callback(count);
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            addBts: function (collegeName, center, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/College/Infrastructure/CellSupplementDialog.html',
                    controller: 'bts.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        collegeName: function () {
                            return collegeName;
                        },
                        center: function () {
                            return center;
                        }
                    }
                });
                modalInstance.result.then(function (info) {
                    var ids = [];
                    angular.forEach(info, function (bts) {
                        ids.push(bts.btsId);
                    });
                    collegeQueryService.saveCollegeBtss({
                        collegeName: collegeName,
                        btsIds: ids
                    }).then(function (count) {
                        callback(count);
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
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
            queryOnlineSustains: function (today) {
                return generalHttpService.getApiData('OnlineSustain', {
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
            queryComplainProcessList: function (number) {
                return generalHttpService.getApiData('ComplainProcess', {
                    serialNumber: number
                });
            },
            createComplainProcess: function (dto) {
                return generalHttpService.postApiDataWithHeading('ComplainProcess', dto);
            },
            updateComplainProcess: function (process) {
                return generalHttpService.putApiData('ComplainProcess', process);
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
    .factory('customerDialogService', function ($uibModal, $log, customerQueryService, emergencyService, complainService, basicImportService) {
        return {
            constructEmergencyCommunication: function (city, district, type, messages, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Customer/Dialog/Emergency.html',
                    controller: 'emergency.new.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return "新增应急通信需求";
                        },
                        city: function () {
                            return city;
                        },
                        district: function () {
                            return district;
                        },
                        vehicularType: function () {
                            return type;
                        }
                    }
                });

                modalInstance.result.then(function (dto) {
                    customerQueryService.postDto(dto).then(function (result) {
                        if (result > 0) {
                            messages.push({
                                type: 'success',
                                contents: '完成应急通信需求：' + dto.projectName + '的导入'
                            });
                            callback();
                        } else {
                            messages.push({
                                type: 'warning',
                                contents: '最近已经有该需求，请不要重复导入'
                            });
                        }
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            constructEmergencyCollege: function (serialNumber, collegeName, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Customer/Dialog/Emergency.html',
                    controller: 'emergency.college.dialog',
                    size: 'lg',
                    resolve: {
                        serialNumber: function () {
                            return serialNumber;
                        },
                        collegeName: function () {
                            return collegeName;
                        }
                    }
                });

                modalInstance.result.then(function (dto) {
                    customerQueryService.postDto(dto).then(function (result) {
                        callback();
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            constructHotSpot: function (callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Parameters/Import/HotSpot.html',
                    controller: 'hot.spot.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return '新增热点信息';
                        }
                    }
                });

                modalInstance.result.then(function (dto) {
                    basicImportService.dumpOneHotSpot(dto).then(function (result) {
                        callback();
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            manageHotSpotCells: function (hotSpot, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Parameters/Import/HotSpotCell.html',
                    controller: 'hot.spot.cell.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return hotSpot.hotspotName + '热点小区管理';
                        },
                        name: function () {
                            return hotSpot.hotspotName;
                        },
                        address: function () {
                            return hotSpot.address;
                        },
                        center: function () {
                            return {
                                longtitute: hotSpot.longtitute,
                                lattitute: hotSpot.lattitute
                            }
                        }
                    }
                });

                modalInstance.result.then(function (dto) {
                    callback(dto);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            supplementVipDemandInfo: function (view, city, district, messages, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Customer/Dialog/VipSupplement.html',
                    controller: 'vip.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return "补充政企客户支撑需求信息";
                        },
                        view: function () {
                            return view;
                        },
                        city: function () {
                            return city;
                        },
                        district: function () {
                            return district;
                        }
                    }
                });

                modalInstance.result.then(function (dto) {
                    customerQueryService.updateVip(dto).then(function () {
                        messages.push({
                            type: 'success',
                            contents: '完成政企客户支撑需求：' + dto.serialNumber + '的补充'
                        });
                        callback();
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            supplementCollegeDemandInfo: function (view, messages) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Customer/Dialog/CollegeSupplement.html',
                    controller: 'college.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return "补充校园网支撑需求信息";
                        },
                        view: function () {
                            return view;
                        }
                    }
                });

                modalInstance.result.then(function (dto) {
                    customerQueryService.updateVip(dto).then(function () {
                        messages.push({
                            type: 'success',
                            contents: '完成校园网支撑需求：' + dto.serialNumber + '的补充'
                        });
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            constructFiberItem: function (id, num, callback, messages) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Customer/Dialog/Fiber.html',
                    controller: 'fiber.new.dialog',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return "新增光纤工单信息";
                        },
                        id: function () {
                            return id;
                        },
                        num: function () {
                            return num;
                        }
                    }
                });

                modalInstance.result.then(function (item) {
                    emergencyService.createFiberItem(item).then(function (result) {
                        if (result) {
                            messages.push({
                                type: 'success',
                                contents: '完成光纤工单：' + item.workItemNumber + '的导入'
                            });
                            callback(result);
                        } else {
                            messages.push({
                                type: 'warning',
                                contents: '最近已经有该工单，请不要重复导入'
                            });
                        }
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            supplementComplainInfo: function (item, callback) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Customer/Dialog/Complain.html',
                    controller: 'complain.supplement.dialog',
                    size: 'lg',
                    resolve: {
                        item: function () {
                            return item;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                    complainService.postPosition(info).then(function () {
                        callback();
                    });
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        };
    });