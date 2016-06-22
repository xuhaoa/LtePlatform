angular.module('kpi.precise', ['myApp.url', 'myApp.region'])
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
    .factory('preciseInterferenceService', function (generalHttpService, appUrlService, $http) {
        return {
            addMonitor: function (cell) {
                $http.post(appUrlService.getApiUrl('NeighborMonitor'), {
                    cellId: cell.cellId,
                    sectorId: cell.sectorId
                }).success(function () {
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
                return generalHttpService.getApiData('CellStastic', {
                    'begin': begin,
                    'end': end,
                    'eNodebId': cellId,
                    'sectorId': sectorId
                });
            },
            queryCellStastic: function (cellId, pci, begin, end) {
                return generalHttpService.getApiData('CellStastic', {
                    eNodebId: cellId,
                    pci: pci,
                    begin: begin,
                    end: end
                });
            },
            queryOneDayCellStastic: function (cellId, sectorId, date) {
                return generalHttpService.getApiData('CellStastic', {
                    eNodebId: cellId,
                    sectorId: sectorId,
                    date: date
                });
            },
            queryAverageRsrpTaStastic: function (cellId, sectorId, date) {
                return generalHttpService.getApiData('AverageRsrpTa', {
                    eNodebId: cellId,
                    sectorId: sectorId,
                    date: date
                });
            },
            queryAverageRsrpTaDateSpan: function (cellId, sectorId, begin, end) {
                return generalHttpService.getApiData('AverageRsrpTa', {
                    eNodebId: cellId,
                    sectorId: sectorId,
                    begin: begin,
                    end: end
                });
            },
            queryAbove110TaRate: function (cellId, sectorId, date) {
                return generalHttpService.getApiData('Above110TaRate', {
                    eNodebId: cellId,
                    sectorId: sectorId,
                    date: date
                });
            },
            queryAbove110TaDateSpan: function (cellId, sectorId, begin, end) {
                return generalHttpService.getApiData('Above110TaRate', {
                    eNodebId: cellId,
                    sectorId: sectorId,
                    begin: begin,
                    end: end
                });
            },
            queryAbove105TaRate: function (cellId, sectorId, date) {
                return generalHttpService.getApiData('Above105TaRate', {
                    eNodebId: cellId,
                    sectorId: sectorId,
                    date: date
                });
            },
            queryAbove105TaDateSpan: function (cellId, sectorId, begin, end) {
                return generalHttpService.getApiData('Above105TaRate', {
                    eNodebId: cellId,
                    sectorId: sectorId,
                    begin: begin,
                    end: end
                });
            }
        };
    });