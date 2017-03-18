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
            queryAreaTestDate: function() {
                return generalHttpService.getApiData('AreaTestDate', {});
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