angular.module('app.calculation', [])
    .factory('preciseWorkItemGenerator', function() {
        return {
            generatePreciseInterferenceNeighborDtos: function(sources) {
                var sumDb6Share = 0;
                var sumDb10Share = 0;
                var sumMod3Share = 0;
                var sumMod6Share = 0;
                var dtos = [];
                angular.forEach(sources, function(source) {
                    sumDb6Share += source.overInterferences6Db;
                    sumDb10Share += source.overInterferences10Db;
                    sumMod3Share += source.mod3Interferences;
                    sumMod6Share += source.mod6Interferences;
                });
                angular.forEach(sources, function(source) {
                    if (source.destENodebId > 0 && source.destSectorId > 0) {
                        var db6Share = source.overInterferences6Db * 100 / sumDb6Share;
                        var db10Share = source.overInterferences10Db * 100 / sumDb10Share;
                        var mod3Share = source.mod3Interferences * 100 / sumMod3Share;
                        var mod6Share = source.mod6Interferences * 100 / sumMod6Share;
                        if (db6Share > 10 || db10Share > 10 || mod3Share > 10 || mod6Share > 10) {
                            dtos.push({
                                eNodebId: source.destENodebId,
                                sectorId: source.destSectorId,
                                db6Share: db6Share,
                                db10Share: db10Share,
                                mod3Share: mod3Share,
                                mod6Share: mod6Share
                            });
                        }
                    }
                });
                return dtos;
            },
            generatePreciseInterferenceVictimDtos: function(sources) {
                var sumBackwardDb6Share = 0;
                var sumBackwardDb10Share = 0;
                var sumBackwardMod3Share = 0;
                var sumBackwardMod6Share = 0;
                var dtos = [];
                angular.forEach(sources, function(source) {
                    sumBackwardDb6Share += source.overInterferences6Db;
                    sumBackwardDb10Share += source.overInterferences10Db;
                    sumBackwardMod3Share += source.mod3Interferences;
                    sumBackwardMod6Share += source.mod6Interferences;
                });
                angular.forEach(sources, function(source) {
                    if (source.victimENodebId > 0 && source.victimSectorId > 0) {
                        var db6Share = source.overInterferences6Db * 100 / sumBackwardDb6Share;
                        var db10Share = source.overInterferences10Db * 100 / sumBackwardDb10Share;
                        var mod3Share = source.mod3Interferences * 100 / sumBackwardMod3Share;
                        var mod6Share = source.mod6Interferences * 100 / sumBackwardMod6Share;
                        if (db6Share > 10 || db10Share > 10 || mod3Share > 10 || mod6Share > 10) {
                            dtos.push({
                                eNodebId: source.victimENodebId,
                                sectorId: source.victimSectorId,
                                backwardDb6Share: db6Share,
                                backwardDb10Share: db10Share,
                                backwardMod3Share: mod3Share,
                                backwardMod6Share: mod6Share
                            });
                        }
                    }
                });
                return dtos;
            },

            calculatePlatformInfo: function (comments) {
                var platformInfos = [];
                if (comments) {
                    var fields = comments.split('[');
                    if (fields.length > 1) {
                        angular.forEach(fields, function (field) {
                            var subFields = field.split(']');
                            platformInfos.push({
                                time: subFields[0],
                                contents: subFields[1]
                            });
                        });
                    }
                }

                return platformInfos;
            }
        };
    })
    .factory('neGeometryService', function() {
        var isLongtituteValid = function(longtitute) {
            return (!isNaN(longtitute)) && longtitute > 112 && longtitute < 114;
        };

        var isLattituteValid = function(lattitute) {
            return (!isNaN(lattitute)) && lattitute > 22 && lattitute < 24;
        };

        var isLonLatValid = function(item) {
            return isLongtituteValid(item.longtitute) && isLattituteValid(item.lattitute);
        };

        var mapLonLat = function(source, destination) {
            source.longtitute = destination.longtitute;
            source.lattitute = destination.lattitute;
        };

        return {
            queryENodebLonLatEdits: function(eNodebs) {
                var result = [];
                for (var index = 0; index < eNodebs.length; index++) {
                    if (!isLonLatValid(eNodebs[index])) {
                        result.push({
                            index: index,
                            eNodebId: eNodebs[index].eNodebId,
                            name: eNodebs[index].name,
                            district: eNodebs[index].districtName,
                            town: eNodebs[index].townName,
                            longtitute: eNodebs[index].longtitute,
                            lattitute: eNodebs[index].lattitute
                        });
                    }
                }
                return result;
            },
            queryBtsLonLatEdits: function(btss) {
                var result = [];
                for (var index = 0; index < btss.length; index++) {
                    if (!isLonLatValid(btss[index])) {
                        result.push({
                            index: index,
                            bscId: btss[index].bscId,
                            btsId: btss[index].btsId,
                            name: btss[index].name,
                            districtName: btss[index].districtName,
                            longtitute: eNodebs[index].longtitute,
                            lattitute: eNodebs[index].lattitute
                        });
                    }
                }
                return result;
            },
            queryCellLonLatEdits: function(cells) {
                var result = [];
                for (var index = 0; index < cells.length; index++) {
                    if (!isLonLatValid(cells[index])) {
                        result.push({
                            index: index,
                            eNodebId: cells[index].eNodebId,
                            sectorId: cells[index].sectorId,
                            frequency: cells[index].frequency,
                            isIndoor: cells[index].isIndoor,
                            longtitute: cells[index].longtitute,
                            lattitute: cells[index].lattitute
                        });
                    }
                }
                return result;
            },
            queryCdmaCellLonLatEdits: function(cells) {
                var result = [];
                for (var index = 0; index < cells.length; index++) {
                    if (!isLonLatValid(cells[index])) {
                        result.push({
                            index: index,
                            btsId: cells[index].btsId,
                            sectorId: cells[index].sectorId,
                            frequency: cells[index].frequency,
                            isIndoor: cells[index].isIndoor,
                            longtitute: cells[index].longtitute,
                            lattitute: cells[index].lattitute
                        });
                    }
                }
                return result;
            },
            mapLonLatEdits: function(sourceFunc, destList) {
                var sourceList = sourceFunc();
                for (var i = 0; i < destList.length; i++) {
                    destList[i].longtitute = parseFloat(destList[i].longtitute);
                    destList[i].lattitute = parseFloat(destList[i].lattitute);
                    if (isLonLatValid(destList[i])) {
                        console.log(destList[i]);
                        mapLonLat(sourceList[destList[i].index], destList[i]);
                    }
                }
                sourceFunc(sourceList);
            },
            queryNearestRange: function(xCenter, yCenter) {
                return {
                    west: xCenter - 1e-6,
                    east: xCenter + 1e-6,
                    south: yCenter - 1e-6,
                    north: yCenter + 1e-6
                };
            },
            queryNearRange: function(xCenter, yCenter) {
                return {
                    west: xCenter - 1e-2,
                    east: xCenter + 1e-2,
                    south: yCenter - 1e-2,
                    north: yCenter + 1e-2
                };
            }
        };
    })
    .factory('generalChartService', function() {
        return {
            getPieOptions: function(data, setting, subNameFunc, subDataFunc) {
                var chart = new GradientPie();
                chart.title.text = setting.title;
                chart.series[0].name = setting.seriesTitle;
                angular.forEach(data, function(subData) {
                    chart.series[0].data.push({
                        name: subNameFunc(subData),
                        y: subDataFunc(subData)
                    });
                });
                return chart.options;
            },
            getColumnOptions: function(stat, setting, categoriesFunc, dataFunc) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitle;
                chart.xAxis[0].categories = categoriesFunc(stat);
                chart.series.push({
                    type: "column",
                    name: setting.ytitle,
                    data: dataFunc(stat)
                });
                return chart.options;
            },
            getStackColumnOptions: function(stats, setting, categoriesFunc, dataFuncList) {
                var chart = new StackColumnChart();
                chart.title.text = setting.title;
                chart.xAxis.title.text = setting.xtitle;
                chart.yAxis.title.text = setting.ytitle;
                chart.xAxis.categories = _.map(stats, function(stat) {
                    return categoriesFunc(stat);
                });
                angular.forEach(dataFuncList, function(dataFunc, $index) {
                    chart.series.push({
                        name: setting.seriesTitles[$index],
                        data: _.map(stats, function(stat) {
                            return dataFunc(stat);
                        })
                    });
                });

                return chart.options;
            },
            queryColumnOptions: function(setting, categories, data) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitle;
                chart.xAxis[0].categories = categories;
                if (setting.min) {
                    chart.setDefaultYAxis({ min: setting.min });
                }
                if (setting.max) {
                    chart.setDefaultYAxis({ max: setting.max });
                }
                chart.series.push({
                    type: "column",
                    name: setting.ytitle,
                    data: data
                });
                return chart.options;
            },
            queryDoubleColumnOptions: function(setting, categories, data1, data2) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitle;
                chart.xAxis[0].categories = categories;
                chart.series.push({
                    type: "column",
                    name: setting.ytitle1,
                    data: data1
                });
                chart.series.push({
                    type: "column",
                    name: setting.ytitle2,
                    data: data2
                });
                return chart.options;
            },
            queryMultipleColumnOptions: function(setting, categories, dataList, seriesTitle) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitle;
                chart.xAxis[0].categories = categories;
                angular.forEach(dataList, function(data, $index) {
                    chart.series.push({
                        type: "column",
                        name: seriesTitle[$index],
                        data: data
                    });
                });
                return chart.options;
            },
            queryMultipleComboOptions: function(setting, categories, dataList, seriesTitle, typeList) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitle;
                chart.xAxis[0].categories = categories;
                angular.forEach(dataList, function(data, $index) {
                    chart.series.push({
                        type: typeList[$index],
                        name: seriesTitle[$index],
                        data: data
                    });
                });
                return chart.options;
            },
            queryMultipleComboOptionsWithDoubleAxes: function(setting, categories, dataList, seriesTitle, typeList, yAxisList) {
                var chart = new ComboChart();
                chart.title.text = setting.title;
                chart.xAxis[0].title.text = setting.xtitle;
                chart.yAxis[0].title.text = setting.ytitles[0];
                chart.pushOneYAxis(setting.ytitles[1]);

                chart.xAxis[0].categories = categories;
                angular.forEach(dataList, function(data, $index) {
                    chart.series.push({
                        type: typeList[$index],
                        name: seriesTitle[$index],
                        data: data,
                        yAxis: yAxisList[$index]
                    });
                });
                return chart.options;
            },
            generateColumnData: function(stats, categoriesFunc, dataFuncs) {
                var result = {
                    categories: [],
                    dataList: []
                };
                angular.forEach(dataFuncs, function(func) {
                    result.dataList.push([]);
                });
                angular.forEach(stats, function(stat) {
                    result.categories.push(categoriesFunc(stat));
                    angular.forEach(dataFuncs, function(func, index) {
                        result.dataList[index].push(func(stat));
                    });
                });
                return result;
            },
            generateColumnDataByKeys: function(stats, categoriesKey, dataKeys) {
                var result = {
                    categories: [],
                    dataList: []
                };
                angular.forEach(dataKeys, function(key) {
                    result.dataList.push([]);
                });
                angular.forEach(stats, function(stat) {
                    result.categories.push(stat[categoriesKey]);
                    angular.forEach(dataKeys, function(key, index) {
                        result.dataList[index].push(stat[key]);
                    });
                });
                return result;
            },
            generateCompoundStats: function(views, getType, getSubType, getTotal) {
                var stats = [];
                angular.forEach(views, function(view) {
                    var type = getType !== undefined ? getType(view) : view.type;
                    var subType = getSubType !== undefined ? getSubType(view) : view.subType;
                    var total = getTotal !== undefined ? getTotal(view) : view.total;
                    var j;
                    for (j = 0; j < stats.length; j++) {
                        if (stats[j].type === (type || '无有效值')) {
                            stats[j].total += total;
                            stats[j].subData.push([subType || '无有效值', total]);
                            break;
                        }
                    }
                    if (j === stats.length) {
                        stats.push({
                            type: type || '无有效值',
                            total: total,
                            subData: [[subType || '无有效值', total]]
                        });
                    }
                });
                return stats;
            }
        };
    })
    .factory('parametersChartService', function(generalChartService) {
        return {
            getDistrictLteENodebPieOptions: function(data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区LTE基站数分布",
                    seriesTitle: "区域"
                }, function(subData) {
                    return subData.district;
                }, function(subData) {
                    return subData.totalLteENodebs;
                });
            },
            getDistrictLteCellPieOptions: function(data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区LTE小区数分布",
                    seriesTitle: "区域"
                }, function(subData) {
                    return subData.district;
                }, function(subData) {
                    return subData.totalLteCells;
                });
            },
            getDistrictNbIotCellPieOptions: function (data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区NB-IoT小区数分布",
                    seriesTitle: "区域"
                }, function (subData) {
                    return subData.district;
                }, function (subData) {
                    return subData.totalNbIotCells;
                });
            },
            getDistrictCdmaBtsPieOptions: function(data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区CDMA基站数分布",
                    seriesTitle: "区域"
                }, function(subData) {
                    return subData.district;
                }, function(subData) {
                    return subData.totalCdmaBts;
                });
            },
            getDistrictCdmaCellPieOptions: function(data, city) {
                return generalChartService.getPieOptions(data, {
                    title: city + "各区CDMA小区数分布",
                    seriesTitle: "区域"
                }, function(subData) {
                    return subData.district;
                }, function(subData) {
                    return subData.totalCdmaCells;
                });
            },
            getTownLteENodebPieOptions: function(data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇LTE基站数分布",
                    seriesTitle: "镇"
                }, function(subData) {
                    return subData.town;
                }, function(subData) {
                    return subData.totalLteENodebs;
                });
            },
            getTownLteCellPieOptions: function(data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇LTE小区数分布",
                    seriesTitle: "镇"
                }, function(subData) {
                    return subData.town;
                }, function(subData) {
                    return subData.totalLteCells;
                });
            },
            getTownNbIotCellPieOptions: function (data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇NB-IoT小区数分布",
                    seriesTitle: "镇"
                }, function (subData) {
                    return subData.town;
                }, function (subData) {
                    return subData.totalNbIotCells;
                });
            },
            getTownCdmaBtsPieOptions: function(data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇CDMA基站数分布",
                    seriesTitle: "镇"
                }, function(subData) {
                    return subData.town;
                }, function(subData) {
                    return subData.totalCdmaBts;
                });
            },
            getTownCdmaCellPieOptions: function(data, district) {
                return generalChartService.getPieOptions(data, {
                    title: district + "各镇CDMA小区数分布",
                    seriesTitle: "镇"
                }, function(subData) {
                    return subData.town;
                }, function(subData) {
                    return subData.totalCdmaCells;
                });
            },
            getHotSpotDtDistancePieOptions: function(name, stats) {
                return generalChartService.getPieOptions(stats, {
                    title: name + "测试里程分布",
                    seriesTitle: "测试文件"
                }, function (subData) {
                    return subData.csvFileName;
                }, function (subData) {
                    return subData.distanceInMeter;
                });
            },
            getCollegeDistributionForDownlinkFlow: function (data, theme) {
                theme = theme || "校园网";
                return generalChartService.getPieOptions(data, {
                    title: theme + "下行流量分布",
                    seriesTitle: "下行流量(MB)"
                }, function(subData) {
                    return subData.name || subData.hotspotName;
                }, function(subData) {
                    return subData.pdcpDownlinkFlow;
                });
            },
            getCollegeDistributionForUplinkFlow: function (data, theme) {
                theme = theme || "校园网";
                return generalChartService.getPieOptions(data, {
                    title: theme + "上行流量分布",
                    seriesTitle: "上行流量(MB)"
                }, function(subData) {
                    return subData.name || subData.hotspotName;
                }, function(subData) {
                    return subData.pdcpUplinkFlow;
                });
            },
            getCollegeDistributionForAverageUsers: function (data, theme) {
                theme = theme || "校园网";
                return generalChartService.getPieOptions(data, {
                    title: theme + "平均用户数分布",
                    seriesTitle: "平均用户数"
                }, function(subData) {
                    return subData.name || subData.hotspotName;
                }, function(subData) {
                    return subData.averageUsers;
                });
            },
            getCollegeDistributionForActiveUsers: function (data, theme) {
                theme = theme || "校园网";
                return generalChartService.getPieOptions(data, {
                    title: theme + "最大激活用户数分布",
                    seriesTitle: "最大激活用户数"
                }, function(subData) {
                    return subData.name || subData.hotspotName;
                }, function(subData) {
                    return subData.maxActiveUsers;
                });
            },
            getCellDistributionForDownlinkFlow: function(data, index) {
                return generalChartService.queryColumnOptions({
                    title: "小区下行流量分布",
                    xtitle: "小区名称",
                    ytitle: "下行流量(MB)"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForUplinkFlow: function(data, index) {
                return generalChartService.queryColumnOptions({
                    title: "小区上行流量分布",
                    xtitle: "小区名称",
                    ytitle: "上行流量(MB)"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForAverageUsers: function(data, index) {
                return generalChartService.queryColumnOptions({
                    title: "平均用户数分布",
                    xtitle: "小区名称",
                    ytitle: "平均用户数"
                }, data.categories, data.dataList[index]);
            },
            getCellDistributionForActiveUsers: function(data, index) {
                return generalChartService.queryColumnOptions({
                    title: "最大激活用户数分布",
                    xtitle: "小区名称",
                    ytitle: "最大激活用户数"
                }, data.categories, data.dataList[index]);
            },
            getDateFlowOptions: function(data, index1, index2) {
                return generalChartService.queryDoubleColumnOptions({
                    title: "流量变化趋势",
                    xtitle: "日期",
                    ytitle1: "下行流量(MB)",
                    ytitle2: "上行流量(MB)"
                }, data.categories, data.dataList[index1], data.dataList[index2]);
            },
            getDateUsersOptions: function(data, index1, index2) {
                return generalChartService.queryDoubleColumnOptions({
                    title: "用户数变化趋势",
                    xtitle: "日期",
                    ytitle1: "平均用户数",
                    ytitle2: "最大激活用户数"
                }, data.categories, data.dataList[index1], data.dataList[index2]);
            },
            getCellIndoorTypeColumnOptions: function(stats) {
                return generalChartService.getStackColumnOptions(stats, {
                    title: '各区室内外小区分布',
                    xtitle: '区域',
                    ytitle: '小区数',
                    seriesTitles: ['室内小区', '室外小区']
                }, function(stat) {
                    return stat.district;
                }, [
                    function(stat) {
                        return stat.totalIndoorCells;
                    }, function(stat) {
                        return stat.totalOutdoorCells;
                    }
                ]);
            },
            getCellBandClassColumnOptions: function(stats) {
                return generalChartService.getStackColumnOptions(stats, {
                    title: '各区小区频段分布',
                    xtitle: '区域',
                    ytitle: '小区数',
                    seriesTitles: ['2.1G频段', '1.8G频段', '800M频段-非NB-IoT', '800M频段-NB-IoT', 'TDD频段']
                }, function(stat) {
                    return stat.district;
                }, [
                    function(stat) {
                        return stat.band1Cells;
                    }, function(stat) {
                        return stat.band3Cells;
                    }, function(stat) {
                        return stat.band5Cells;
                    }, function (stat) {
                        return stat.nbIotCells;
                    }, function(stat) {
                        return stat.band41Cells;
                    }
                ]);
            }
        };
    });