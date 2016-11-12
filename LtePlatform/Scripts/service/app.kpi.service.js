angular.module('myApp.kpi', ['myApp.url', 'myApp.region'])
    .constant('kpiRatingDivisionDefs', {
        precise: [94.6, 93.6, 92.6, 91.6, 90],
        downSwitch: [3, 5, 8, 10, 15],
        drop: [0.2, 0.3, 0.35, 0.4, 0.5]
    })
    .factory('appKpiService', function (chartCalculateService, generalChartService, kpiRatingDivisionDefs) {
        var accumulatePreciseStat = function (source, accumulate) {
            source.totalMrs += accumulate.totalMrs;
            source.firstNeighbors += accumulate.firstNeighbors;
            source.secondNeighbors += accumulate.secondNeighbors;
            source.thirdNeighbors += accumulate.thirdNeighbors;
        };
        var calculateDistrictRates = function (districtStat) {
            districtStat.firstRate = 100 - 100 * districtStat.firstNeighbors / districtStat.totalMrs;
            districtStat.preciseRate = 100 - 100 * districtStat.secondNeighbors / districtStat.totalMrs;
            districtStat.thirdRate = 100 - 100 * districtStat.thirdNeighbors / districtStat.totalMrs;
            return districtStat;
        };
        var calculateTownRates = function (townStat) {
            townStat.firstRate = 100 - 100 * townStat.firstNeighbors / townStat.totalMrs;
            townStat.preciseRate = 100 - 100 * townStat.secondNeighbors / townStat.totalMrs;
            townStat.thirdRate = 100 - 100 * townStat.thirdNeighbors / townStat.totalMrs;
        };
        var getValueFromDivisionAbove = function(division, value) {
            for (var i = 0; i < division.length; i++) {
                if (value > division[i]) {
                    return 5 - i;
                }
            }
            return 0;
        };
        var getValueFromDivisionBelow = function (division, value) {
            for (var i = 0; i < division.length; i++) {
                if (value < division[i]) {
                    return 5 - i;
                }
            }
            return 0;
        };
        
        return {
            getDownSwitchRate: function (stats) {
                var flow3G = 0;
                var flow4G = 0;
                angular.forEach(stats, function(stat) {
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
                    objectRate: 92.6
                };
                angular.forEach(districtStats, function(districtStat) {
                    accumulatePreciseStat(stat, districtStat);
                });
                return calculateDistrictRates(stat);
            },
            calculatePreciseRating: function (precise) {
                return getValueFromDivisionAbove(kpiRatingDivisionDefs.precise, precise);
            },
            calculateDownSwitchRating: function (rate) {
                return getValueFromDivisionBelow(kpiRatingDivisionDefs.downSwitch, rate);
            },
            calculateDropStar: function (drop) {
                return getValueFromDivisionBelow(kpiRatingDivisionDefs.drop, drop);
            },
            getMrPieOptions: function (districtStats, townStats) {
                var chart = new DrilldownPie();
                chart.initialize({
                    title: "分镇区测量报告数分布图",
                    seriesName: "区域"
                });

                var results = chartCalculateService.generateDrillDownData(districtStats, townStats, function(stat) {
                    return stat.totalMrs;
                });
                angular.forEach(results, function(data) {
                    chart.addOneSeries({
                        name: data.district, 
                        value: data.districtData, 
                        subData: data.subData
                    });
                });
                
                return chart.options;
            },
            getPreciseRateOptions: function (districtStats, townStats) {
                var chart = new DrilldownColumn();
                chart.initialize({
                    title: "分镇区精确覆盖率分布图",
                    seriesName: "区域"
                });

                var results = chartCalculateService.generateDrillDownData(districtStats, townStats, function(stat) {
                    return stat.preciseRate;
                });
                angular.forEach(results, function (data) {
                    chart.addOneSeries({
                        name: data.district,
                        value: data.districtData,
                        subData: data.subData
                    });
                });

                return chart.options;
            },
            getMrsDistrictOptions: function(stats, inputDistricts){
                var chart = new ComboChart();
                chart.title.text = "MR总数变化趋势图";
                var queryFunction = function (stat) {
                    return stat.mr;
                };
                var districts = inputDistricts.concat("全网");
                var result = chartCalculateService.generateDateDistrictStats(stats, districts.length, queryFunction);
                chart.xAxis[0].categories = result.statDates;
                chart.yAxis[0].title.text = "MR总数";
                chart.xAxis[0].title.text = '日期';
                angular.forEach(districts, function(district, index) {
                    chart.series.push({
                        type: index === districts.length - 1 ? "spline" : "column",
                        name: district,
                        data: result.districtStats[index]
                    });
                });
                return chart.options;
            },
            getPreciseDistrictOptions: function(stats, inputDistricts){
                var chart = new ComboChart();
                chart.title.text = "精确覆盖率变化趋势图";
                var queryFunction = function (stat) {
                    return stat.precise;
                };
                var districts = inputDistricts.concat("全网");
                var result = chartCalculateService.generateDateDistrictStats(stats, districts.length, queryFunction);
                chart.xAxis[0].categories = result.statDates;
                chart.yAxis[0].title.text = "精确覆盖率";
                chart.xAxis[0].title.text = '日期';
                angular.forEach(districts, function (district, index) {
                    chart.series.push({
                        type: index === districts.length - 1 ? "spline" : "column",
                        name: district,
                        data: result.districtStats[index]
                    });
                });
                return chart.options;
            },
            generateDistrictStats: function (districts, stats) {
                var outputStats = [];
                angular.forEach(stats, function(stat) {
                    var districtViews = stat.districtPreciseViews;
                    var statDate = stat.statDate;
                    var totalMrs = 0;
                    var totalSecondNeighbors = 0;
                    var values = [];
                    angular.forEach(districts, function(district) {
                        for (var k = 0; k < districtViews.length; k++) {
                            var view = districtViews[k];
                            if (view.district === district) {
                                values.push({
                                    mr: view.totalMrs,
                                    precise: view.preciseRate
                                });
                                totalMrs += view.totalMrs;
                                totalSecondNeighbors += view.secondNeighbors;
                                break;
                            }
                        }
                        if (k === districtViews.length) {
                            values.push({
                                mr: 0,
                                precise: 0
                            });
                        }
                    });
                    values.push({
                        mr: totalMrs,
                        precise: 100 - 100 * totalSecondNeighbors / totalMrs
                    });
                    outputStats.push({
                        statDate: statDate,
                        values: values
                    });
                });
                return outputStats;
            },
            calculateAverageRates: function(stats) {
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
                trendStat.districtStats = result[0].districtPreciseViews;
                trendStat.townStats = result[0].townPreciseViews;
                for (var i = 1; i < result.length; i++) {
                    angular.forEach(result[i].districtPreciseViews, function (currentDistrictStat) {
                        var found = false;
                        for (var k = 0; k < trendStat.districtStats.length; k++) {
                            if (trendStat.districtStats[k].city === currentDistrictStat.city
                                && trendStat.districtStats[k].district === currentDistrictStat.district) {
                                accumulatePreciseStat(trendStat.districtStats[k], currentDistrictStat);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            trendStat.districtStats.push(currentDistrictStat);
                        }
                    });
                    angular.forEach(result[i].townPreciseView, function(currentTownStat) {
                        var found = false;
                        for (var k = 0; k < trendStat.townStats.length; k++) {
                            if (trendStat.townStats[k].city === currentTownStat.city
                                && trendStat.townStats[k].district === currentTownStat.district
                                && trendStat.townStats[k].town === currentTownStat.town) {
                                accumulatePreciseStat(trendStat.townStats[k], currentTownStat);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            trendStat.townStats.push(currentTownStat);
                        }
                    });
                }
                angular.forEach(trendStat.districtStats, function(stat) {
                    calculateDistrictRates(stat);
                });
                angular.forEach(trendStat.townStats, function(stat) {
                    calculateTownRates(stat);
                });
            },
            getPreciseObject: function(district) {
                var objectTable = {
                    "禅城": 94,
                    "南海": 94,
                    "三水": 94,
                    "高明": 94,
                    "顺德": 90
                };
                return objectTable[district] === undefined ? 94 : objectTable[district];
            },
            generateComplainTrendOptions: function(dates, counts, objects) {
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
                }, function(data) {
                    return data.item1;
                }, function(data) {
                    return data.item2;
                });
            }
        }
    })
    .factory('downSwitchService', function (generalHttpService) {
        return {
            getRecentKpi: function (city, initialDate) {
                return generalHttpService.getApiData('DownSwitchFlow', {
                    city: city,
                    statDate: initialDate
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
            queryTownPreciseViews: function () {
                return generalHttpService.getApiData('TownPreciseImport', {});
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
    .factory('preciseInterferenceService', function (generalHttpService) {
        return {
            addMonitor: function (cell) {
                generalHttpService.postApiData('NeighborMonitor', {
                    cellId: cell.cellId,
                    sectorId: cell.sectorId
                }).then(function() {
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
    .factory('kpiDisplayService', function (appFormatService, taDivision, coverageService) {
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
                    min: 80,
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
                var statDates = [];
                var mrStats = [];
                var firstNeighbors = [];
                var secondNeighbors = [];
                var thirdNeighbors = [];
                angular.forEach(stats, function (stat) {
                    statDates.push(stat.dateString);
                    mrStats.push(stat.totalMrs);
                    firstNeighbors.push(stat.firstNeighbors);
                    secondNeighbors.push(stat.secondNeighbors);
                    thirdNeighbors.push(stat.thirdNeighbors);
                });
                chart.xAxis[0].categories = statDates;
                chart.yAxis[0].title.text = "MR数量";
                chart.xAxis[0].title.text = '日期';
                chart.series.push({
                    type: "column",
                    name: "MR总数",
                    data: mrStats
                });
                chart.series.push({
                    type: "spline",
                    name: "第一邻区MR数",
                    data: firstNeighbors
                });
                chart.series.push({
                    type: "spline",
                    name: "第二邻区MR数",
                    data: secondNeighbors
                });
                chart.series.push({
                    type: "spline",
                    name: "第三邻区MR数",
                    data: thirdNeighbors
                });
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
            }
        };
    });