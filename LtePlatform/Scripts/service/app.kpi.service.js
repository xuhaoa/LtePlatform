angular.module('myApp.kpi', ['myApp.url', 'myApp.region', 'parameters.chart'])
    .factory('chartCalculateService', function() {
        return {
            generateDrillDownData: function (districtStats, townStats, queryFunction) {
                var results = [];
                angular.forEach(districtStats, function(districtStat) {
                    var subData = [];
                    var district = districtStat.district;
                    var districtData = queryFunction(districtStat);
                    angular.forEach(townStats, function(townStat) {
                        if (townStat.district === district) {
                            subData.push([townStat.town, queryFunction(townStat)]);
                        }
                    });
                    
                    results.push({
                        district: district,
                        districtData: districtData,
                        subData: subData
                    });
                });
                return results;
            },
            generateDateDistrictStats: function(stats, districtLength, queryFunction) {
                var statDates = [];
                var districtStats = [];
                angular.forEach(stats, function(stat, index) {
                    statDates.push(stat.statDate);
                    for (var j = 0; j < districtLength; j++) {
                        var statValue = stat.values[j] ? queryFunction(stat.values[j]) : 0;
                        if (index === 0) {
                            districtStats.push([statValue]);
                        } else {
                            districtStats[j].push(statValue);
                        }
                    }
                });
                return{
                    statDates: statDates,
                    districtStats: districtStats
                };
            }
        };
    })
    .factory('appKpiService', function (chartCalculateService, generalChartService) {
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

                var results = chartCalculateService.generateDrillDownData(districtStats, townStats, function(stat) {
                    return stat.totalMrs;
                });
                angular.forEach(results, function(data) {
                    chart.addOneSeries(data.district, data.districtData, data.subData);
                });
                
                return chart.options;
            },
            getPreciseRateOptions: function (districtStats, townStats) {
                var chart = new DrilldownColumn();
                chart.title.text = "分镇区精确覆盖率分布图";
                chart.series[0].data = [];
                chart.drilldown.series = [];
                chart.series[0].name = "区域";

                var results = chartCalculateService.generateDrillDownData(districtStats, townStats, function(stat) {
                    return stat.preciseRate;
                });
                angular.forEach(results, function (data) {
                    chart.addOneSeries(data.district, data.districtData, data.subData);
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
                var chart = new AreaChart();
                chart.title.text = '月度抱怨量变化趋势图';
                chart.xAxis.title = '日期';
                chart.xAxis.type = 'datetime';
                chart.xAxis.categories = dates;
                chart.yAxis.title = '抱怨量';
                chart.series.push({
                    name: '指标值',
                    data: counts,
                    type: 'area'
                });
                chart.series.push({
                    name: '目标值',
                    data: objects,
                    type: 'area'
                });
                chart.enableLegend = true;
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
    });