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
        var generateDrillDownData = function(chart, districtStats, townStats, queryFunction) {
            angular.forEach(districtStats, function(districtStat) {
                var subData = [];
                var district = districtStat.district;
                var districtData = queryFunction(districtStat);
                angular.forEach(townStats, function(townStat) {
                    if (townStat.district === district) {
                        subData.push([townStat.town, queryFunction(townStat)]);
                    }
                });
                chart.addOneSeries(district, districtData, subData);
            });
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
            calculatePreciseRating: function (precise) {
                var division = [94.6, 93.6, 92.6, 91.6, 90];
                return getValueFromDivisionAbove(division, precise);
            },
            calculateDownSwitchRating: function (rate) {
                var division = [3, 5, 8, 10, 15];
                return getValueFromDivisionBelow(division, rate);
            },
            calculateDropStar: function (drop) {
                var division = [0.2, 0.3, 0.35, 0.4, 0.5];
                return getValueFromDivisionBelow(division, drop);
            },
            getMrPieOptions: function (districtStats, townStats) {
                var chart = new DrilldownPie();
                chart.title.text = "分镇区测量报告数分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "区域";
                var queryFunction = function(stat) {
                    return stat.totalMrs;
                };
                generateDrillDownData(chart, districtStats, townStats, queryFunction);
                return chart.options;
            },
            getPreciseRateOptions: function (districtStats, townStats) {
                var chart = new DrilldownColumn();
                chart.title.text = "分镇区精确覆盖率分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "区域";
                var queryFunction = function(stat) {
                    return stat.preciseRate;
                };
                generateDrillDownData(chart, districtStats, townStats, queryFunction);
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
    .factory('downSwitchService', function (generalHttpService) {
        return {
            getRecentKpi: function (city, initialDate) {
                return generalHttpService.getApiData('DownSwitchFlow', {
                    city: city,
                    statDate: initialDate
                });
            }
        };
    });