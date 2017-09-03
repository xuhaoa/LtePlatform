angular.module('region.import', ['app.core'])
    .factory('basicImportService',
        function(generalHttpService) {
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
                    return generalHttpService.postApiData('NewENodebExcels',
                    {
                        infos: items
                    });
                },
                dumpMultipleBtsExcels: function(items) {
                    return generalHttpService.postApiData('NewBtsExcels',
                    {
                        infos: items
                    });
                },
                dumpMultipleCellExcels: function(items) {
                    return generalHttpService.postApiData('NewCellExcels',
                    {
                        infos: items
                    });
                },
                dumpMultipleCdmaCellExcels: function(items) {
                    return generalHttpService.postApiData('NewCdmaCellExcels',
                    {
                        infos: items
                    });
                },
                vanishENodebIds: function(ids) {
                    return generalHttpService.putApiData('DumpENodebExcel',
                    {
                        eNodebIds: ids
                    });
                },
                vanishBtsIds: function(ids) {
                    return generalHttpService.putApiData('DumpBtsExcel',
                    {
                        eNodebIds: ids
                    });
                },
                vanishCellIds: function(ids) {
                    return generalHttpService.putApiData('DumpCellExcel',
                    {
                        cellIdPairs: ids
                    });
                },
                vanishCdmaCellIds: function(ids) {
                    return generalHttpService.putApiData('DumpCdmaCellExcel',
                    {
                        cellIdPairs: ids
                    });
                },
                dumpOneHotSpot: function(item) {
                    return generalHttpService.postApiData('HotSpot', item);
                },
                queryAllHotSpots: function() {
                    return generalHttpService.getApiData('HotSpot', {});
                },
                queryHotSpotsByType: function(type) {
                    return generalHttpService.getApiData('HotSpot',
                    {
                        type: type
                    });
                },
                queryHotSpotCells: function(name) {
                    return generalHttpService.getApiData('LteRruCell',
                    {
                        rruName: name
                    });
                },
                dumpSingleItem: function() {
                    return generalHttpService.putApiData('DumpNeighbor', {});
                }
            };
        })
    .factory('flowImportService',
        function(generalHttpService) {
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
                    return generalHttpService.getApiData('DumpHuaweiFlow',
                    {
                        index: index
                    });
                },
                queryDumpHistory: function(begin, end) {
                    return generalHttpService.getApiData('DumpFlow',
                    {
                        begin: begin,
                        end: end
                    });
                },
                dumpTownStats: function(statDate) {
                    return generalHttpService.getApiData('DumpFlow',
                    {
                        statDate: statDate
                    });
                }
            }
        })
    .factory('flowService',
        function(generalHttpService) {
            return {
                queryCellFlowByDateSpan: function(eNodebId, sectorId, begin, end) {
                    return generalHttpService.getApiData('FlowQuery',
                    {
                        eNodebId: eNodebId,
                        sectorId: sectorId,
                        begin: begin,
                        end: end
                    });
                },
                queryCellRrcByDateSpan: function(eNodebId, sectorId, begin, end) {
                    return generalHttpService.getApiData('RrcQuery',
                    {
                        eNodebId: eNodebId,
                        sectorId: sectorId,
                        begin: begin,
                        end: end
                    });
                },
                queryAverageFlowByDateSpan: function(eNodebId, sectorId, begin, end) {
                    return generalHttpService.getApiData('FlowQuery',
                    {
                        eNodebId: eNodebId,
                        sectorId: sectorId,
                        beginDate: begin,
                        endDate: end
                    });
                },
                queryAverageRrcByDateSpan: function(eNodebId, sectorId, begin, end) {
                    return generalHttpService.getApiData('RrcQuery',
                    {
                        eNodebId: eNodebId,
                        sectorId: sectorId,
                        beginDate: begin,
                        endDate: end
                    });
                },
                queryENodebGeoFlowByDateSpan: function(begin, end, frequency) {
                    return generalHttpService.getApiData('ENodebFlow',
                    {
                        begin: begin,
                        end: end,
                        frequency: frequency
                    });
                },
                queryConstructionByTownAndName: function(district, town, name) {
                    return generalHttpService.getApiData('Construction',
                    {
                        district: district,
                        town: (town === '全部') ? '全部' : (town + '营服中心'),
                        searchTxt: name
                    });
                },
                queryConstructionByTownAndNameInBoundary: function(district, town, name, range) {
                    return generalHttpService.getApiData('Construction',
                    {
                        district: district,
                        town: (town === '全部') ? '全部' : (town + '营服中心'),
                        searchTxt: name,
                        west: range.west,
                        east: range.east,
                        south: range.south,
                        north: range.north
                    });
                }
            };
        })
    .factory('alarmsService',
        function(generalHttpService) {
            return {
                queryENodebAlarmsByDateSpanAndLevel: function(eNodebId, begin, end, level) {
                    return generalHttpService.getApiData('Alarms',
                    {
                        eNodebId: eNodebId,
                        begin: begin,
                        end: end,
                        level: level
                    });
                },
                queryMicroItems: function() {
                    return generalHttpService.getApiData('MicroAmplifier', {});
                },
                queryGridClusters: function(theme) {
                    return generalHttpService.getApiData('GridCluster',
                    {
                        theme: theme
                    });
                },
                queryGridClusterRange: function(theme, west, east, south, north) {
                    return generalHttpService.getApiData('GridCluster',
                    {
                        theme: theme,
                        west: west,
                        east: east,
                        south: south,
                        north: north
                    });
                },
                queryClusterGridKpis: function(points) {
                    return generalHttpService.postApiData('GridCluster', points);
                },
                queryClusterKpi: function(points) {
                    return generalHttpService.putApiData('GridCluster', points);
                },
                queryDpiGridKpi: function(x, y) {
                    return generalHttpService.getApiData('DpiGridKpi',
                    {
                        x: x,
                        y: y
                    });
                }
            };
        })
    .factory('alarmImportService',
        function(generalHttpService, alarmsService) {
            return {
                queryDumpHistory: function(begin, end) {
                    return generalHttpService.getApiData('DumpAlarm',
                    {
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
                },
                updateClusterKpi: function(stat, callback) {
                    alarmsService.queryClusterKpi(stat.gridPoints).then(function(result) {
                        stat.rsrp = result.rsrp;
                        stat.weakRate = result.weakCoverageRate;
                        stat.bestLongtitute = result.longtitute;
                        stat.bestLattitute = result.lattitute;
                        stat.x = result.x;
                        stat.y = result.y;
                        if (callback) {
                            callback(stat);
                        }

                    });
                }
            };
        })
    .factory('workitemService',
        function(generalHttpService) {
            return {
                queryWithPaging: function(state, type) {
                    return generalHttpService.getApiDataWithHeading('WorkItem',
                    {
                        'statCondition': state,
                        'typeCondition': type
                    });
                },
                queryWithPagingByDistrict: function(state, type, district) {
                    return generalHttpService.getApiDataWithHeading('WorkItem',
                    {
                        statCondition: state,
                        typeCondition: type,
                        district: district
                    });
                },
                querySingleItem: function(serialNumber) {
                    return generalHttpService.getApiData('WorkItem',
                    {
                        serialNumber: serialNumber
                    });
                },
                signIn: function(serialNumber) {
                    return generalHttpService.getApiDataWithHeading('WorkItem',
                    {
                        signinNumber: serialNumber
                    });
                },
                queryChartData: function(chartType) {
                    return generalHttpService.getApiDataWithHeading('WorkItem',
                    {
                        chartType: chartType
                    });
                },
                updateSectorIds: function() {
                    return generalHttpService.putApiData('WorkItem', {});
                },
                feedback: function(message, serialNumber) {
                    return generalHttpService.postApiDataWithHeading('WorkItem',
                    {
                        message: message,
                        serialNumber: serialNumber
                    });
                },
                finish: function(comments, finishNumber) {
                    return generalHttpService.getApiDataWithHeading('WorkItem',
                    {
                        finishNumber: finishNumber,
                        comments: comments
                    });
                },
                queryByENodebId: function(eNodebId) {
                    return generalHttpService.getApiDataWithHeading('WorkItem',
                    {
                        eNodebId: eNodebId
                    });
                },
                queryByCellId: function(eNodebId, sectorId) {
                    return generalHttpService.getApiDataWithHeading('WorkItem',
                    {
                        eNodebId: eNodebId,
                        sectorId: sectorId
                    });
                },
                queryCurrentMonth: function() {
                    return generalHttpService.getApiData('WorkItemCurrentMonth', {});
                },
                constructPreciseItem: function(cell, begin, end) {
                    return generalHttpService.postApiDataWithHeading('PreciseWorkItem',
                    {
                        view: cell,
                        begin: begin,
                        end: end
                    });
                }
            };
        })
    .factory('dumpWorkItemService',
        function(generalHttpService) {
            return {
                dumpSingleItem: function() {
                    return generalHttpService.putApiData('DumpWorkItem', {});
                },
                clearImportItems: function() {
                    return generalHttpService.deleteApiData('DumpWorkItem');
                },
                queryTotalDumpItems: function() {
                    return generalHttpService.getApiData('DumpWorkItem', {});
                }
            };
        })
    .factory('preciseWorkItemService',
        function(generalHttpService) {
            return {
                queryByDateSpanDistrict: function(begin, end, district) {
                    return generalHttpService.getApiData('PreciseWorkItem',
                    {
                        begin: begin,
                        end: end,
                        district: district
                    });
                },
                queryByDateSpan: function(begin, end) {
                    return generalHttpService.getApiData('PreciseWorkItem',
                    {
                        begin: begin,
                        end: end
                    });
                },
                queryBySerial: function(number) {
                    return generalHttpService.getApiDataWithHeading('PreciseWorkItem',
                    {
                        number: number
                    });
                },
                updateInterferenceNeighbor: function(number, items) {
                    return generalHttpService.postApiDataWithHeading('InterferenceNeighborWorkItem',
                    {
                        workItemNumber: number,
                        items: items
                    });
                },
                updateInterferenceVictim: function(number, items) {
                    return generalHttpService.postApiDataWithHeading('InterferenceVictimWorkItem',
                    {
                        workItemNumber: number,
                        items: items
                    });
                },
                updateCoverage: function(number, items) {
                    return generalHttpService.postApiDataWithHeading('CoverageWorkItem',
                    {
                        workItemNumber: number,
                        items: items
                    });
                }
            };
        })
    .factory('preciseImportService',
        function(generalHttpService) {
            return {
                queryDumpHistroy: function(beginDate, endDate) {
                    return generalHttpService.getApiData('PreciseImport',
                    {
                        begin: beginDate,
                        end: endDate
                    });
                },
                queryTotalDumpItems: function() {
                    return generalHttpService.getApiData('PreciseImport', {});
                },
                queryTownPreciseViews: function(statTime) {
                    return generalHttpService.getApiData('TownPreciseImport',
                    {
                        statTime: statTime
                    });
                },
                clearImportItems: function() {
                    return generalHttpService.deleteApiData('PreciseImport', {});
                },
                dumpTownItems: function(views) {
                    return generalHttpService.postApiData('TownPreciseImport',
                    {
                        views: views
                    });
                },
                dumpTownAgpsItems: function(views) {
                    return generalHttpService.postApiData('MrGrid',
                    {
                        views: views
                    });
                },
                dumpSingleItem: function() {
                    return generalHttpService.putApiData('PreciseImport', {});
                },
                updateMongoItems: function(statDate) {
                    return generalHttpService.getApiData('PreciseMongo',
                    {
                        statDate: statDate
                    });
                }
            };
        })
    .factory('cellPreciseService',
        function(generalHttpService) {
            return {
                queryDataSpanKpi: function(begin, end, cellId, sectorId) {
                    return generalHttpService.getApiData('PreciseStat',
                    {
                        'begin': begin,
                        'end': end,
                        'cellId': cellId,
                        'sectorId': sectorId
                    });
                },
                queryOneWeekKpi: function(cellId, sectorId) {
                    return generalHttpService.getApiData('PreciseStat',
                    {
                        'cellId': cellId,
                        'sectorId': sectorId
                    });
                }
            };
        })
    .factory('appRegionService',
        function(generalHttpService) {
            return {
                initializeCities: function() {
                    return generalHttpService.getApiData('CityList', {});
                },
                queryDistricts: function(cityName) {
                    return generalHttpService.getApiData('CityList',
                    {
                        city: cityName
                    });
                },
                queryDistrictInfrastructures: function(cityName) {
                    return generalHttpService.getApiData('RegionStats',
                    {
                        city: cityName
                    });
                },
                queryDistrictIndoorCells: function(cityName) {
                    return generalHttpService.getApiData('DistrictIndoorCells',
                    {
                        city: cityName
                    });
                },
                queryDistrictBandCells: function(cityName) {
                    return generalHttpService.getApiData('DistrictBandCells',
                    {
                        city: cityName
                    });
                },
                queryTowns: function(cityName, districtName) {
                    return generalHttpService.getApiData('CityList',
                    {
                        city: cityName,
                        district: districtName
                    });
                },
                queryTownInfrastructures: function(cityName, districtName) {
                    return generalHttpService.getApiData('RegionStats',
                    {
                        city: cityName,
                        district: districtName
                    });
                },
                queryTownLteCount: function (cityName, districtName, townName, isIndoor) {
                    return generalHttpService.getApiData('RegionStats',
                        {
                            city: cityName,
                            district: districtName,
                            town: townName,
                            isIndoor: isIndoor
                        });
                },
                queryTown: function(city, district, town) {
                    return generalHttpService.getApiData('Town',
                    {
                        city: city,
                        district: district,
                        town: town
                    });
                },
                queryTownBoundaries: function(city, district, town) {
                    return generalHttpService.getApiData('TownBoundary',
                    {
                        city: city,
                        district: district,
                        town: town
                    });
                },
                isInTownBoundary: function(longtitute, lattitute, city, district, town) {
                    return generalHttpService.getApiData('TownBoundary',
                    {
                        longtitute: longtitute,
                        lattitute: lattitute,
                        city: city,
                        district: district,
                        town: town
                    });
                },
                queryENodebTown: function(eNodebId) {
                    return generalHttpService.getApiData('Town',
                    {
                        eNodebId: eNodebId
                    });
                },
                accumulateCityStat: function(stats, cityName) {
                    var cityStat = {
                        district: cityName,
                        totalLteENodebs: 0,
                        totalLteCells: 0,
                        totalNbIotCells: 0,
                        totalCdmaBts: 0,
                        totalCdmaCells: 0
                    };
                    angular.forEach(stats,
                        function(stat) {
                            cityStat.totalLteENodebs += stat.totalLteENodebs;
                            cityStat.totalLteCells += stat.totalLteCells;
                            cityStat.totalNbIotCells += stat.totalNbIotCells;
                            cityStat.totalCdmaBts += stat.totalCdmaBts;
                            cityStat.totalCdmaCells += stat.totalCdmaCells;
                        });
                    stats.push(cityStat);
                },
                getTownFlowStats: function(statDate, frequency) {
                    return generalHttpService.getApiData('TownFlow',
                    {
                        statDate: statDate,
                        frequency: frequency
                    });
                }
            };
        });