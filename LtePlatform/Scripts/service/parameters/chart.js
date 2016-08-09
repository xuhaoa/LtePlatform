angular.module('parameters.chart', [])
    .factory('parametersChartService', function() {
        return {
            getDistrictLteENodebPieOptions: function(data, city) {
                var chart = new GradientPie();
                chart.title.text = city + "各区LTE基站数分布";
                chart.series[0].name = "区域";
                for (var i = 0; i < data.length; i++) {
                    chart.series[0].data.push({
                        name: data[i].district,
                        y: data[i].totalLteENodebs
                    });
                }
                return chart.options;
            },
            getDistrictLteCellPieOptions: function(data, city) {
                var chart = new GradientPie();
                chart.title.text = city + "各区LTE小区数分布";
                chart.series[0].name = "区域";
                for (var i = 0; i < data.length; i++) {
                    chart.series[0].data.push({
                        name: data[i].district,
                        y: data[i].totalLteCells
                    });
                }
                return chart.options;
            },
            getDistrictCdmaBtsPieOptions: function (data, city) {
                var chart = new GradientPie();
                chart.title.text = city + "各区CDMA基站数分布";
                chart.series[0].name = "区域";
                for (var i = 0; i < data.length; i++) {
                    chart.series[0].data.push({
                        name: data[i].district,
                        y: data[i].totalCdmaBts
                    });
                }
                return chart.options;
            },
            getDistrictCdmaCellPieOptions: function (data, city) {
                var chart = new GradientPie();
                chart.title.text = city + "各区CDMA小区数分布";
                chart.series[0].name = "区域";
                for (var i = 0; i < data.length; i++) {
                    chart.series[0].data.push({
                        name: data[i].district,
                        y: data[i].totalCdmaCells
                    });
                }
                return chart.options;
            },
            getTownLteENodebPieOptions: function (data, district) {
                var chart = new GradientPie();
                chart.title.text = district + "各镇LTE基站数分布";
                chart.series[0].name = "镇";
                for (var i = 0; i < data.length; i++) {
                    chart.series[0].data.push({
                        name: data[i].town,
                        y: data[i].totalLteENodebs
                    });
                }
                return chart.options;
            },
            getTownLteCellPieOptions: function (data, district) {
                var chart = new GradientPie();
                chart.title.text = district + "各镇LTE小区数分布";
                chart.series[0].name = "镇";
                for (var i = 0; i < data.length; i++) {
                    chart.series[0].data.push({
                        name: data[i].town,
                        y: data[i].totalLteCells
                    });
                }
                return chart.options;
            },
            getTownCdmaBtsPieOptions: function (data, district) {
                var chart = new GradientPie();
                chart.title.text = district + "各镇CDMA基站数分布";
                chart.series[0].name = "镇";
                for (var i = 0; i < data.length; i++) {
                    chart.series[0].data.push({
                        name: data[i].town,
                        y: data[i].totalCdmaBts
                    });
                }
                return chart.options;
            },
            getTownCdmaCellPieOptions: function (data, district) {
                var chart = new GradientPie();
                chart.title.text = district + "各镇CDMA小区数分布";
                chart.series[0].name = "镇";
                for (var i = 0; i < data.length; i++) {
                    chart.series[0].data.push({
                        name: data[i].town,
                        y: data[i].totalCdmaCells
                    });
                }
                return chart.options;
            }
        };
    })
    .factory('neGeometryService', function () {
        var isLongtituteValid = function (longtitute) {
            return (!isNaN(longtitute)) && longtitute > 112 && longtitute < 114;
        };

        var isLattituteValid = function (lattitute) {
            return (!isNaN(lattitute)) && lattitute > 22 && lattitute < 24;
        };

        var isLonLatValid = function (item) {
            return isLongtituteValid(item.longtitute) && isLattituteValid(item.lattitute);
        };

        var mapLonLat = function (source, destination) {
            source.longtitute = destination.longtitute;
            source.lattitute = destination.lattitute;
        };

        return {
            queryENodebLonLatEdits: function (eNodebs) {
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
            queryBtsLonLatEdits: function (btss) {
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
            queryCellLonLatEdits: function (cells) {
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
            queryCdmaCellLonLatEdits: function (cells) {
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
            mapLonLatEdits: function (sourceFunc, destList) {
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
            }
        };
    });