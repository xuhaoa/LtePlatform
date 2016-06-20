angular.module('myApp.kpi', ['myApp.url', 'myApp.region'])
    .factory('appKpiService', function () {
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
                    district: "-",
                    totalMrs: 0,
                    firstNeighbors: 0,
                    secondNeighbors: 0,
                    thirdNeighbors: 0,
                    firstRate: 0,
                    preciseRate: 0
                };
                angular.forEach(districtStats, function(districtStat) {
                    accumulatePreciseStat(stat, districtStat);
                });
                return calculateDistrictRates(stat);
            },
            calculatePreciseRating: function(precise) {
                if (precise > 94.6) return 5;
                else if (precise > 93.6) return 4;
                else if (precise > 92.6) return 3;
                else if (precise > 91.6) return 2;
                else if (precise > 90) return 1;
                else return 0;
            },
            calculateDownSwitchRating: function (rate) {
                if (rate < 3) return 5;
                else if (rate < 5) return 4;
                else if (rate < 8) return 3;
                else if (rate < 10) return 2;
                else if (rate < 15) return 1;
                else return 0;
            },
            calculateDropStar: function (drop) {
                if (drop < 0.2) return 5;
                else if (drop < 0.3) return 4;
                else if (drop < 0.35) return 3;
                else if (drop < 0.4) return 2;
                else if (drop < 0.5) return 1;
                else return 0;
            },
            getMrPieOptions: function (districtStats, townStats) {
                var chart = new DrilldownPie();
                chart.title.text = "分镇区测量报告数分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "区域";
                angular.forEach(districtStats, function(districtStat) {
                    var subData = [];
                    var district = districtStat.district;
                    var districtMr = districtStat.totalMrs;
                    angular.forEach(townStats, function(townStat) {
                        if (townStat.district === district) {
                            subData.push([townStat.town, townStat.totalMrs]);
                        }
                    });
                    chart.addOneSeries(district, districtMr, subData);
                });
                return chart.options;
            },
            getPreciseRateOptions: function (districtStats, townStats) {
                var chart = new DrilldownColumn();
                chart.title.text = "分镇区精确覆盖率分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "区域";
                for (var i = 0; i < districtStats.length; i++) {
                    var subData = [];
                    var district = districtStats[i].district;
                    var districtRate = districtStats[i].preciseRate;
                    for (var j = 0; j < townStats.length; j++) {
                        if (townStats[j].district === district) {
                            subData.push([townStats[j].town, townStats[j].preciseRate]);
                        }
                    }
                    chart.addOneSeries(district, districtRate, subData);
                }
                return chart.options;
            },
            getMrsDistrictOptions: function(stats, districts){
                var chart = new ComboChart();
                chart.title.text = "MR总数变化趋势图";
                var statDates = [];
                var districtStats = [];
                for (var i = 0; i < stats.length; i++) {
                    var stat = stats[i];
                    statDates.push(stat.statDate);
                    for (var j = 0; j < districts.length ; j++) {
                        if (i === 0) {
                            districtStats.push([stat.values[j].mr]);
                        } else {
                            districtStats[j].push(stat.values[j].mr);
                        }
                    }
                }
                chart.xAxis[0].categories = statDates;
                chart.yAxis[0].title.text = "MR总数";
                chart.xAxis[0].title.text = '日期';
                for (j = 0; j < districts.length; j++) {
                    chart.series.push({
                        type: j === districts.length - 1 ? "spline" : "column",
                        name: districts[j],
                        data: districtStats[j]
                    });
                }
                return chart.options;
            },
            getPreciseDistrictOptions: function(stats, districts){
                var chart = new ComboChart();
                chart.title.text = "精确覆盖率变化趋势图";
                var statDates = [];
                var districtStats = [];
                for (var i = 0; i < stats.length; i++) {
                    var stat = stats[i];
                    statDates.push(stat.statDate);
                    for (var j = 0; j < districts.length ; j++) {
                        if (i === 0) {
                            districtStats.push([stat.values[j].precise]);
                        } else {
                            districtStats[j].push(stat.values[j].precise);
                        }
                    }
                }
                chart.xAxis[0].categories = statDates;
                chart.yAxis[0].title.text = "精确覆盖率";
                chart.xAxis[0].title.text = '日期';
                for (j = 0; j < districts.length; j++) {
                    chart.series.push({
                        type: j === districts.length - 1 ? "spline" : "line",
                        name: districts[j],
                        data: districtStats[j]
                    });
                }
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
                    for (var j = 0; j < result[i].districtPreciseViews.length; j++) {
                        var currentDistrictStat = result[i].districtPreciseViews[j];
                        for (var k = 0; k < trendStat.districtStats.length; k++) {
                            if (trendStat.districtStats[k].city === currentDistrictStat.city
                                && trendStat.districtStats[k].district === currentDistrictStat.district) {
                                accumulatePreciseStat(trendStat.districtStats[k], currentDistrictStat);
                                break;
                            }
                        }
                        if (k === trendStat.districtStats.length) {
                            trendStat.districtStats.push(currentDistrictStat);
                        }
                    }
                    for (j = 0; j < result[i].townPreciseViews.length; j++) {
                        var currentTownStat = result[i].townPreciseViews[j];
                        for (k = 0; k < trendStat.townStats.length; k++) {
                            if (trendStat.townStats[k].city === currentTownStat.city
                                && trendStat.townStats[k].district === currentTownStat.district
                                && trendStat.townStats[k].town === currentTownStat.town) {
                                accumulatePreciseStat(trendStat.townStats[k], currentTownStat);
                                break;
                            }
                        }
                        if (k === trendStat.townStats.length) {
                            trendStat.townStats.push(currentTownStat);
                        }
                    }
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
            }
        }
    })
    .factory('topPreciseService', function (generalHttpService) {
        return {
            getOrderPolicySelection: function() {
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
    })
    .factory('cellPreciseService', function ($q, $http, appUrlService) {
        return{
            queryDataSpanKpi: function (begin, end, cellId, sectorId) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('PreciseStat'),
                    params: {
                        'begin': begin,
                        'end': end,
                        'cellId': cellId,
                        'sectorId': sectorId
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                .error(function (reason) {
                    deferred.reject(reason);
                });
                return deferred.promise;
            },
            queryOneWeekKpi: function (cellId, sectorId) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('PreciseStat'),
                    params: {
                        'cellId': cellId,
                        'sectorId': sectorId
                    }
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