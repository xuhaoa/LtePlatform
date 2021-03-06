﻿angular.module('home.network', ['app.common'])
    .controller("home.network",
        function($scope,
            appRegionService,
            networkElementService,
            baiduMapService,
            coverageDialogService,
            dumpPreciseService,
            collegeMapService) {
            baiduMapService.initializeMap("map", 11);
            $scope.currentView = "LTE基站";

            $scope.updateDistrictLegend = function(district, color) {
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                $scope.legend.intervals.push({
                    threshold: district,
                    color: color
                });
            };

            $scope.showDistrictOutdoor = function (district, color) {
                $scope.updateDistrictLegend(district, color);
                var city = $scope.city.selected;
                networkElementService.queryOutdoorCellSites(city, district).then(function(sites) {
                    collegeMapService.showOutdoorCellSites(sites, color);
                });
            };

            $scope.showOutdoorSites = function() {
                $scope.currentView = "室外小区-1.8G/2.1G";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary($scope.city.selected);
                $scope.initializeLegend();
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showDistrictOutdoor(district, $scope.colors[$index]);
                    });
            };

            $scope.showDistrictVolte = function (district, color) {
                $scope.updateDistrictLegend(district, color);
                var city = $scope.city.selected;
                networkElementService.queryVolteCellSites(city, district).then(function (sites) {
                    collegeMapService.showOutdoorCellSites(sites, color);
                });
            };

            $scope.showVolteSites = function () {
                $scope.currentView = "室外小区-800M/VoLTE";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary($scope.city.selected);
                $scope.initializeLegend();
                angular.forEach($scope.districts,
                    function (district, $index) {
                        $scope.showDistrictVolte(district, $scope.colors[$index]);
                    });
            };

            $scope.showDistrictNbIot = function (district, color) {
                $scope.updateDistrictLegend(district, color);
                var city = $scope.city.selected;
                networkElementService.queryNbIotCellSites(city, district).then(function (sites) {
                    collegeMapService.showOutdoorCellSites(sites, color);
                });
            };

            $scope.showNbIotSites = function () {
                $scope.currentView = "室外小区-NB-IoT";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary($scope.city.selected);
                $scope.initializeLegend();
                angular.forEach($scope.districts,
                    function (district, $index) {
                        $scope.showDistrictNbIot(district, $scope.colors[$index]);
                    });
            };

            $scope.showDistrictIndoor = function(district, color) {
                $scope.updateDistrictLegend(district, color);
                var city = $scope.city.selected;

                networkElementService.queryIndoorCellSites(city, district).then(function(sites) {
                    collegeMapService.showIndoorCellSites(sites, color);
                });
            };

            $scope.showIndoorSites = function() {
                $scope.currentView = "室内小区";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary($scope.city.selected);
                $scope.initializeLegend();
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showDistrictIndoor(district, $scope.colors[$index]);
                    });
            };

            $scope.showDistrictENodebs = function(district, color) {
                var city = $scope.city.selected;
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                $scope.legend.intervals.push({
                    threshold: district,
                    color: color
                });
                $scope.page.myPromise = networkElementService.queryENodebsInOneDistrict(city, district);
                $scope.page.myPromise.then(function(sites) {
                    collegeMapService.showENodebSites(sites, color, $scope.beginDate, $scope.endDate);
                });
            };
            $scope.showLteENodebs = function() {
                $scope.currentView = "LTE基站";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary($scope.city.selected);
                $scope.initializeLegend();
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showDistrictENodebs(district, $scope.colors[$index]);
                    });
            };

            $scope.showLteTownStats = function() {
                var city = $scope.city.selected;
                coverageDialogService.showTownStats(city);
            };
            $scope.showCdmaTownStats = function() {
                var city = $scope.city.selected;
                coverageDialogService.showCdmaTownStats(city);
            };
            $scope.districts = [];

            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        $scope.initializeLegend();
                        dumpPreciseService.generateUsersDistrict(city,
                            $scope.districts,
                            function(district, $index) {
                                $scope.showDistrictENodebs(district, $scope.colors[$index]);
                            });
                    }
                });
        })
    .controller("evaluation.home",
        function($scope,
            baiduMapService,
            baiduQueryService,
            parametersMapService,
            mapDialogService) {
            baiduMapService.initializeMap("map", 12);
            baiduQueryService.queryWandonglouyu().then(function(buildings) {
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                parametersMapService.showPhpElements(buildings, mapDialogService.showBuildingInfo);
            });
        })
    .controller('home.flow',
        function($scope,
            baiduMapService,
            baiduQueryService,
            coverageDialogService,
            flowService,
            chartCalculateService) {
            baiduMapService.initializeMap("map", 11);
            $scope.frequencyOption = 'all';

            $scope.showFeelingRate = function () {
                if (!$scope.flowGeoPoints) {
                    alert("计算未完成！请稍后点击。");
                    return;
                }
                $scope.currentView = "下行感知速率";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                $scope.legend.intervals = [];
                var max = 60;
                var gradient = chartCalculateService.updateHeatMapIntervalDefs($scope.legend.intervals, max);
                $scope.legend.title = '速率（Mbit/s）';
                baiduQueryService.transformToBaidu($scope.flowGeoPoints[0].longtitute,
                    $scope.flowGeoPoints[0].lattitute).then(function(coors) {
                    var xOffset = coors.x - $scope.flowGeoPoints[0].longtitute;
                    var yOffset = coors.y - $scope.flowGeoPoints[0].lattitute;
                    var points = _.map($scope.flowGeoPoints,
                        function(stat) {
                            return {
                                "lng": stat.longtitute + xOffset,
                                "lat": stat.lattitute + yOffset,
                                "count": stat.downlinkFeelingRate
                            };
                        });

                    var heatmapOverlay = new BMapLib.HeatmapOverlay({
                        "radius": 10,
                        "opacity": 50,
                        "gradient": gradient
                    });
                    baiduMapService.addOverlays([heatmapOverlay]);
                    heatmapOverlay.setDataSet({ data: points, max: max });
                    heatmapOverlay.show();
                });
            };

            $scope.showUplinkFeelingRate = function() {
                if (!$scope.flowGeoPoints) {
                    alert("计算未完成！请稍后点击。");
                    return;
                }
                $scope.currentView = "上行感知速率";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                $scope.legend.intervals = [];
                var max = 10;
                var gradient = chartCalculateService.updateHeatMapIntervalDefs($scope.legend.intervals, max);
                baiduQueryService.transformToBaidu($scope.flowGeoPoints[0].longtitute,
                    $scope.flowGeoPoints[0].lattitute).then(function(coors) {
                    var xOffset = coors.x - $scope.flowGeoPoints[0].longtitute;
                    var yOffset = coors.y - $scope.flowGeoPoints[0].lattitute;
                    var points = _.map($scope.flowGeoPoints,
                        function(stat) {
                            return {
                                "lng": stat.longtitute + xOffset,
                                "lat": stat.lattitute + yOffset,
                                "count": stat.uplinkFeelingRate
                            };
                        });
                    var heatmapOverlay = new BMapLib.HeatmapOverlay({
                        "radius": 10,
                        "opacity": 50,
                        "gradient": gradient
                    });
                    baiduMapService.addOverlays([heatmapOverlay]);
                    heatmapOverlay.setDataSet({ data: points, max: max });
                    heatmapOverlay.show();
                });

            };

            $scope.showHotMap = function() {
                $scope.calculating = true;
                flowService.queryENodebGeoFlowByDateSpan($scope.beginDate.value,
                        $scope.endDate.value,
                        $scope.frequencyOption)
                    .then(function(result) {
                        $scope.flowGeoPoints = result;
                        $scope.showFeelingRate();
                        $scope.calculating = false;
                    });
            };

            $scope.displayAllFrequency = function() {
                if ($scope.frequencyOption !== 'all') {
                    $scope.frequencyOption = 'all';
                    $scope.showHotMap();
                }
            };
            $scope.display1800Frequency = function() {
                if ($scope.frequencyOption !== '1800') {
                    $scope.frequencyOption = '1800';
                    $scope.showHotMap();
                }
            };
            $scope.display2100Frequency = function () {
                if ($scope.frequencyOption !== '2100') {
                    $scope.frequencyOption = '2100';
                    $scope.showHotMap();
                }
            };
            $scope.display800Frequency = function () {
                if ($scope.frequencyOption !== '800') {
                    $scope.frequencyOption = '800';
                    $scope.showHotMap();
                }
            };
            $scope.showFlow = function() {
                coverageDialogService.showFlowStats($scope.statDate.value || new Date(), $scope.frequencyOption);
            };
            $scope.showFlowTrend = function() {
                coverageDialogService.showFlowTrend($scope.city.selected, $scope.beginDate, $scope.endDate, $scope.frequencyOption);
            };
            $scope.showUsersTrend = function() {
                coverageDialogService.showUsersTrend($scope.city.selected, $scope.beginDate, $scope.endDate, $scope.frequencyOption);
            };
            $scope.showFeelingRateTrend = function() {
                coverageDialogService.showFeelingRateTrend($scope.city.selected, $scope.beginDate, $scope.endDate, $scope.frequencyOption);
            };
            $scope.showDownSwitchTrend = function() {
                coverageDialogService.showDownSwitchTrend($scope.city.selected, $scope.beginDate, $scope.endDate, $scope.frequencyOption);
            };
            $scope.showRank2RateTrend = function() {
                coverageDialogService.showRank2RateTrend($scope.city.selected, $scope.beginDate, $scope.endDate, $scope.frequencyOption);
            };
            $scope.showHotMap();
        })
    .controller("home.dt",
        function($scope,
            baiduMapService,
            coverageService,
            appFormatService,
            parametersDialogService,
            parametersMapService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");
            $scope.legend.intervals = [];
            coverageService.queryAreaTestDate().then(function(result) {
                angular.forEach(result,
                    function(item, $index) {
                        if (item.cityName) {
                            baiduMapService.drawCustomizeLabel(item.longtitute,
                                item.lattitute + 0.005,
                                item.districtName + item.townName,
                                '4G测试日期:' +
                                appFormatService
                                .getDateString(appFormatService.getDate(item.latestDate4G), 'yyyy-MM-dd') +
                                '<br/>3G测试日期:' +
                                appFormatService
                                .getDateString(appFormatService.getDate(item.latestDate3G), 'yyyy-MM-dd') +
                                '<br/>2G测试日期:' +
                                appFormatService
                                .getDateString(appFormatService.getDate(item.latestDate2G), 'yyyy-MM-dd'),
                                3);
                            var marker = baiduMapService.generateIconMarker(item.longtitute,
                                item.lattitute,
                                "/Content/Images/Hotmap/site_or.png");
                            baiduMapService.addOneMarkerToScope(marker, parametersDialogService.showTownDtInfo, item);
                            parametersMapService
                                .showTownBoundaries(item.cityName,
                                    item.districtName,
                                    item.townName,
                                    $scope.colors[$index % $scope.colors.length]);
                        }
                    });
            });
            $scope.manageCsvFiles = function() {
                parametersDialogService.manageCsvDtInfos($scope.longBeginDate, $scope.endDate);
            };
        })
    .controller("network.analysis",
        function($scope,
            baiduMapService,
            networkElementService,
            dumpPreciseService,
            baiduQueryService,
            neGeometryService,
            parametersMapService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");
            $scope.currentView = "信源类别";
            $scope.districts = [];
            $scope.distributionFilters = [
                function(site) {
                    return site.isLteRru && site.isCdmaRru;
                }, function(site) {
                    return site.isLteRru && !site.isCdmaRru;
                }, function(site) {
                    return !site.isLteRru && site.isCdmaRru;
                }, function(site) {
                    return !site.isLteRru && !site.isCdmaRru;
                }
            ];
            $scope.scaleFilters = [
                function(site) {
                    return site.scaleDescription === '超大型';
                }, function(site) {
                    return site.scaleDescription === '大型';
                }, function(site) {
                    return site.scaleDescription === '中型';
                }, function(site) {
                    return site.scaleDescription === '小型';
                }
            ];
            $scope.showDistrictDistributions = function(district) {
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区');
                networkElementService.queryDistributionsInOneDistrict(district).then(function(sites) {
                    angular.forEach(sites,
                        function(site) {
                            $scope.indoorDistributions.push(site);
                        });
                    parametersMapService
                        .displaySourceDistributions($scope.indoorDistributions,
                            $scope.distributionFilters,
                            $scope.colors);
                });
            };

            $scope.showSourceDistributions = function() {
                $scope.currentView = "信源类别";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary($scope.city.selected);
                $scope.updateSourceLegendDefs();

                angular.forEach($scope.districts,
                    function(district) {
                        baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区');
                    });
                parametersMapService
                    .displaySourceDistributions($scope.indoorDistributions, $scope.distributionFilters, $scope.colors);
            };
            $scope.showScaleDistributions = function() {
                $scope.currentView = "规模";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary($scope.city.selected);
                $scope.updateScaleLegendDefs();

                angular.forEach($scope.districts,
                    function(district) {
                        baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区');
                    });
                parametersMapService
                    .displaySourceDistributions($scope.indoorDistributions, $scope.scaleFilters, $scope.colors);
            };

            $scope.updateSourceLegendDefs = function() {
                $scope.legend.title = "信源类别";
                $scope.legend.intervals = [];
                var sourceDefs = ['LC信源', '纯L信源', '纯C信源', '非RRU信源'];
                angular.forEach(sourceDefs,
                    function(def, $index) {
                        $scope.legend.intervals.push({
                            threshold: def,
                            color: $scope.colors[$index]
                        });
                    });
            };
            $scope.updateScaleLegendDefs = function() {
                $scope.legend.title = "规模";
                $scope.legend.intervals = [];
                var sourceDefs = ['超大型', '大型', '中型', '小型'];
                angular.forEach(sourceDefs,
                    function(def, $index) {
                        $scope.legend.intervals.push({
                            threshold: def,
                            color: $scope.colors[$index]
                        });
                    });
            };

            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        $scope.legend.title = '信源类别';
                        $scope.updateSourceLegendDefs();
                        $scope.indoorDistributions = [];
                        dumpPreciseService.generateUsersDistrict(city,
                            $scope.districts,
                            function(district) {
                                $scope.showDistrictDistributions(district);
                            });
                    }
                });
        })
    .controller("home.query",
        function($scope,
            baiduMapService,
            neighborDialogService,
            dumpPreciseService,
            appRegionService,
            mapDialogService,
            parametersMapService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");
            $scope.currentView = "镇区站点";
            $scope.queryConditions = function() {
                baiduMapService.clearOverlays();
                neighborDialogService.setQueryConditions($scope.city, $scope.beginDate, $scope.endDate);
            };
            $scope.queryByTowns = function() {
                neighborDialogService.queryList($scope.city);
            };
            $scope.queryType = function() {
                neighborDialogService.queryCellTypeChart($scope.city);
            };
            $scope.showDistrictTownStat = function(district, color) {
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                appRegionService.queryTownInfrastructures($scope.city.selected, district).then(function(result) {
                    angular.forEach(result,
                        function(stat, $index) {
                            appRegionService.queryTown($scope.city.selected, district, stat.town).then(function(town) {
                                angular.extend(stat, town);
                                baiduMapService.drawCustomizeLabel(stat.longtitute,
                                    stat.lattitute + 0.005,
                                    stat.districtName + stat.townName,
                                    'LTE基站个数:' +
                                    stat.totalLteENodebs +
                                    '<br/>LTE小区个数:' +
                                    stat.totalLteCells +
                                    '<br/>NB-IoT小区个数:' +
                                    stat.totalNbIotCells +
                                    '<br/>CDMA基站个数:' +
                                    stat.totalCdmaBts +
                                    '<br/>CDMA小区个数:' +
                                    stat.totalCdmaCells,
                                    5);
                                var marker = baiduMapService.generateIconMarker(stat.longtitute,
                                    stat.lattitute,
                                    "/Content/Images/Hotmap/site_or.png");
                                baiduMapService.addOneMarkerToScope(marker,
                                    function(item) {
                                        mapDialogService.showTownENodebInfo(item, $scope.city.selected, district);
                                        parametersMapService
                                            .showTownBoundaries(item.cityName,
                                                item.districtName,
                                                item.townName,
                                                $scope.colors[$index % $scope.colors.length]);
                                    },
                                    stat);
                            });
                        });
                });
            };
            $scope.showTownSites = function() {
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                $scope.currentView = "镇区站点";
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showDistrictTownStat(district, $scope.colors[$index]);
                    });
            };
            $scope.showAreaDivision = function() {
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                $scope.currentView = "区域划分";
                parametersMapService.showAreaBoundaries();
            };
            $scope.districts = [];
            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        $scope.legend.intervals = [];
                        dumpPreciseService.generateUsersDistrict(city,
                            $scope.districts,
                            function(district, $index) {
                                $scope.showDistrictTownStat(district, $scope.colors[$index]);
                            });

                    }
                });
        })
    .controller("home.plan",
        function($scope,
            baiduMapService,
            dumpPreciseService,
            networkElementService,
            geometryService,
            neGeometryService,
            mapDialogService,
            baiduQueryService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");
            $scope.currentView = "所有站点";

            $scope.updateConstructionLegendDefs = function() {
                $scope.legend.title = "开通情况";
                $scope.legend.intervals = [];
                var sourceDefs = ['建设中', '已开通'];
                angular.forEach(sourceDefs,
                    function(def, $index) {
                        $scope.legend.intervals.push({
                            threshold: def,
                            color: $scope.colors[$index]
                        });
                    });
            };
            $scope.updateBelongingLegendDefs = function() {
                $scope.legend.title = "站点归属";
                $scope.legend.intervals = [];
                var sourceDefs = ['电信自建', '铁塔建设', '未确定'];
                angular.forEach(sourceDefs,
                    function(def, $index) {
                        $scope.legend.intervals.push({
                            threshold: def,
                            color: $scope.colors[$index + 1]
                        });
                    });
            };

            $scope.showPlanningSite = function(city, district, color) {
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                networkElementService.queryOpenningSites(city, district).then(function(sites) {
                    baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - sites[0].longtitute;
                        var yOffset = coors.y - sites[0].lattitute;
                        baiduMapService.drawMultiPoints(sites,
                            $scope.colors[0],
                            -xOffset,
                            -yOffset,
                            function(e) {
                                var xCenter = e.point.lng - xOffset;
                                var yCenter = e.point.lat - yOffset;
                                networkElementService.queryRangePlanningSites(
                                    neGeometryService.queryNearestRange(xCenter, yCenter)).then(function(sectors) {
                                    if (sectors.length > 0) {
                                        mapDialogService.showPlanningSitesInfo(sectors[0]);
                                    }

                                });
                            });
                    });
                });
                networkElementService.queryOpennedSites(city, district).then(function(sites) {
                    baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - sites[0].longtitute;
                        var yOffset = coors.y - sites[0].lattitute;
                        baiduMapService.drawMultiPoints(sites,
                            $scope.colors[1],
                            -xOffset,
                            -yOffset,
                            function(e) {
                                var xCenter = e.point.lng - xOffset;
                                var yCenter = e.point.lat - yOffset;
                                networkElementService.queryRangePlanningSites(
                                    neGeometryService.queryNearestRange(xCenter, yCenter)).then(function(sectors) {
                                    if (sectors.length > 0) {
                                        mapDialogService.showPlanningSitesInfo(sectors[0]);
                                    }

                                });
                            });
                    });
                });
            };
            $scope.showAllSites = function() {
                $scope.currentView = "所有站点";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                $scope.updateConstructionLegendDefs();
                var city = $scope.city.selected;
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showPlanningSite(city, district, $scope.colors[$index]);
                    });
            };
            $scope.showOpenningSite = function(city, district, color) {
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                networkElementService.queryOpenningSites(city, district).then(function(sites) {
                    baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - sites[0].longtitute;
                        var yOffset = coors.y - sites[0].lattitute;
                        baiduMapService.drawMultiPoints(sites,
                            color,
                            -xOffset,
                            -yOffset,
                            function(e) {
                                var xCenter = e.point.lng - xOffset;
                                var yCenter = e.point.lat - yOffset;
                                networkElementService.queryRangePlanningSites(
                                    neGeometryService.queryNearestRange(xCenter, yCenter)).then(function(sectors) {
                                    if (sectors.length > 0) {
                                        mapDialogService.showPlanningSitesInfo(sectors[0]);
                                    }

                                });
                            });
                    });
                });
            };
            $scope.showOpenningSites = function() {
                $scope.currentView = "待开通站点";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                var city = $scope.city.selected;
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showOpenningSite(city, district, $scope.colors[$index]);
                    });
            };
            $scope.showOpenSite = function(city, district, color) {
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                networkElementService.queryOpennedSites(city, district).then(function(sites) {
                    baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - sites[0].longtitute;
                        var yOffset = coors.y - sites[0].lattitute;
                        var keys = ['电信自建', '铁塔建设', null];
                        angular.forEach(keys,
                            function(key, $index) {
                                var subSites = _.filter(sites, { siteCategory: key });
                                baiduMapService.drawMultiPoints(subSites,
                                    $scope.colors[$index + 1],
                                    -xOffset,
                                    -yOffset,
                                    function(e) {
                                        var xCenter = e.point.lng - xOffset;
                                        var yCenter = e.point.lat - yOffset;
                                        networkElementService.queryRangePlanningSites(
                                                neGeometryService.queryNearestRange(xCenter, yCenter))
                                            .then(function(sectors) {
                                                if (sectors.length > 0) {
                                                    mapDialogService.showPlanningSitesInfo(sectors[0]);
                                                }

                                            });
                                    });
                            });
                    });
                });
            };
            $scope.showOpenSites = function() {
                $scope.currentView = "已开通站点";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                $scope.updateBelongingLegendDefs();
                var city = $scope.city.selected;
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showOpenSite(city, district, $scope.colors[$index]);
                    });
            };
            $scope.districts = [];
            $scope.updateConstructionLegendDefs();
            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        dumpPreciseService.generateUsersDistrict(city,
                            $scope.districts,
                            function(district, $index) {
                                $scope.showPlanningSite(city, district, $scope.colors[$index]);
                            });
                    }
                });

        })
    .controller("bts.construction",
        function($scope,
            baiduMapService,
            dumpPreciseService,
            appRegionService,
            flowService,
            collegeMapService,
            geometryService,
            parametersDialogService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");
            $scope.legend.title = "建设状态";
            $scope.legend.intervals = [
                {
                    threshold: "审计会审",
                    color: "#ffdf47"
                }, {
                    threshold: "天馈施工",
                    color: "#ff883a"
                }, {
                    threshold: "整体完工",
                    color: "#63afff"
                }, {
                    threshold: "基站开通",
                    color: "#00c952"
                }, {
                    threshold: "其他",
                    color: "#ff0000"
                }
            ];

            $scope.status = {
                options: geometryService.constructionStateOptions,
                selected: '全部'
            };
            $scope.bts = {
                name: '',
                outOfBoundary: true
            };

            $scope.district = {
                options: ['全部'],
                selected: '全部'
            };

            $scope.town = {
                options: ['全部'],
                selected: '全部'
            };

            $scope.showConstructionSites = function(sites) {
                if ($scope.status.selected === '全部') {
                    var states = $scope.status.options.slice(1, $scope.status.options.length - 1);
                    angular.forEach(states,
                        function(status) {
                            var subSites = _.filter(sites, { status: status });
                            if (subSites.length) {
                                collegeMapService.showConstructionSites(subSites,
                                    status,
                                    function(site) {
                                        parametersDialogService.showConstructionInfo(site);
                                    });
                            }
                        });
                } else {
                    var filterSites = _.filter(sites, { status: $scope.status.selected });
                    if (filterSites.length) {
                        collegeMapService.showConstructionSites(filterSites,
                            $scope.status.selected,
                            function(site) {
                                parametersDialogService.showConstructionInfo(site);
                            });
                    }
                }
            };

            $scope.queryConstructionPoints = function() {
                baiduMapService.clearOverlays();
                if ($scope.bts.outOfBoundary) {
                    flowService.queryConstructionByTownAndName($scope.district.selected,
                        $scope.town.selected,
                        $scope.bts.name).then(function(sites) {
                        $scope.showConstructionSites(sites);
                    });
                } else {
                    flowService.queryConstructionByTownAndNameInBoundary($scope.district.selected,
                        $scope.town.selected,
                        $scope.bts.name,
                        baiduMapService.getRange()).then(function(sites) {
                        $scope.showConstructionSites(sites);
                    });
                }
            };

            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        dumpPreciseService.generateUsersDistrict(city, $scope.district.options);
                    }
                });
            $scope.$watch('district.selected',
                function(district) {
                    if (district && district !== '全部') {
                        appRegionService.queryTowns($scope.city.selected, district).then(function(towns) {
                            $scope.town.options = ['全部'];
                            angular.forEach(towns,
                                function(town) {
                                    $scope.town.options.push(town);
                                });
                        });
                    }
                });
        });