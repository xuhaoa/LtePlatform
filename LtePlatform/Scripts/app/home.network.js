angular.module('home.network', ['app.common'])
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
            $scope.showDistrictOutdoor = function(district, color) {
                var city = $scope.city.selected;
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                $scope.legend.intervals.push({
                    threshold: district,
                    color: color
                });
                networkElementService.queryOutdoorCellSites(city, district).then(function(sites) {
                    collegeMapService.showOutdoorCellSites(sites, color);
                });
            };

            $scope.showOutdoorSites = function() {
                $scope.currentView = "室外小区";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary($scope.city.selected);
                $scope.initializeLegend();
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showDistrictOutdoor(district, $scope.colors[$index]);
                    });
            };

            $scope.showDistrictIndoor = function(district, color) {
                var city = $scope.city.selected;
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                $scope.legend.intervals.push({
                    threshold: district,
                    color: color
                });

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
    .controller("station.network",
        function($scope,
            downSwitchService,
            baiduMapService,
            geometryService,
            parametersDialogService,
            collegeMapService,
            dumpPreciseService,
            appUrlService) {
            $scope.districts = [];
            $scope.distinct = $scope.distincts[0];
            baiduMapService.initializeMap("map", 13);

            //获取站点
            $scope.getStations = function(areaName, index) {
                downSwitchService.getStationsByAreaName(areaName, 0, 10000).then(function(response) {
                    var stations = response.result.rows;
                    var color = $scope.colors[index];
                    $scope.legend.intervals.push({
                        threshold: areaName,
                        color: color
                    });
                    collegeMapService.showMaintainStations(stations, color);
                });
            };
            $scope.reflashMap = function(areaNameIndex) {
                baiduMapService.clearOverlays();
                $scope.initializeLegend();
                var areaName = $scope.areaNames[areaNameIndex];
                $scope.distinct = $scope.distincts[areaNameIndex];

                if (areaNameIndex !== 0) {
                    baiduMapService.setCenter(dumpPreciseService.getDistrictIndex(areaName));
                    $scope.getStations(areaName, areaNameIndex);
                } else {
                    baiduMapService.setCenter(0);
                    angular.forEach($scope.areaNames.slice(1, $scope.areaNames.length),
                        function(name, $index) {
                            $scope.getStations(name, $index);
                        });
                }

            };
            $scope.showStationList = function() {
                parametersDialogService.showStationList();
            };
            $scope.assessment = function() {
                parametersDialogService.showAssessmentDialog();
            };
            $scope.outportData = function() {
                location.href = appUrlService.getPhpHost() + "LtePlatForm/lte/index.php/Station/download";
            };

            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        $scope.initializeLegend();
                        baiduMapService.clearOverlays();
                        dumpPreciseService.generateUsersDistrict(city,
                            $scope.districts,
                            function(district, $index) {
                                $scope.pushStationArea(district);
                                $scope.getStations('FS' + district, $index + 1);
                            });
                    }
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
            $scope.showFeelingRate = function() {
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


            $scope.showFlow = function() {
                coverageDialogService.showFlowStats($scope.statDate.value || new Date());
            };
            $scope.showFlowTrend = function() {
                coverageDialogService.showFlowTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
            };
            $scope.showUsersTrend = function() {
                coverageDialogService.showUsersTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
            };
            $scope.showFeelingRateTrend = function() {
                coverageDialogService.showFeelingRateTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
            };
            $scope.showDownSwitchTrend = function() {
                coverageDialogService.showDownSwitchTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
            };
            $scope.showRank2RateTrend = function() {
                coverageDialogService.showRank2RateTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
            };
            flowService.queryENodebGeoFlowByDateSpan($scope.beginDate.value, $scope.endDate.value)
                .then(function(result) {
                    $scope.flowGeoPoints = result;
                    $scope.showFeelingRate();
                });
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
    .controller("home.mr",
        function($scope,
            baiduMapService,
            coverageService,
            kpiDisplayService,
            parametersMapService,
            appUrlService,
            coverageDialogService,
            dumpPreciseService,
            appRegionService) {
            baiduMapService.initializeMap("map", 13);

            $scope.currentDataLabel = "districtPoints";
            $scope.overlays = {
                coverage: [],
                sites: [],
                cells: []
            };
            $scope.initializeMap = function() {
                $scope.overlays.coverage = [];
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
            };

            $scope.showStats = function() {
                coverageDialogService.showAgpsStats($scope.data, $scope.legend.criteria);
            };
            $scope.showInfrasturcture = function() {
                parametersMapService.clearOverlaySites($scope.overlays.sites);
                parametersMapService.clearOverlaySites($scope.overlays.cells);
                parametersMapService.showElementsInOneTown($scope.city.selected,
                    $scope.district.selected,
                    $scope.town.selected,
                    $scope.beginDate,
                    $scope.endDate,
                    $scope.overlays.sites,
                    $scope.overlays.cells);
            };

            $scope.showTelecomCoverage = function() {
                $scope.currentView = "电信";
                $scope.initializeMap();
                var index = parseInt($scope.data.length / 2);
                baiduMapService.setCellFocus($scope.data[index].longtitute, $scope.data[index].lattitute, 15);
                $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
                kpiDisplayService.generateTelecomRsrpPoints($scope.coveragePoints, $scope.data);
                parametersMapService.showIntervalPoints($scope.coveragePoints.intervals, $scope.overlays.coverage);
            };
            $scope.displayTelecomAgps = function() {
                $scope.currentView = "电信";
                $scope.initializeMap();
                var index = parseInt($scope.telecomAgps.length / 2);
                baiduMapService.setCellFocus($scope.telecomAgps[index].longtitute,
                    $scope.telecomAgps[index].lattitute,
                    15);
                $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
                kpiDisplayService.generateAverageRsrpPoints($scope.coveragePoints, $scope.telecomAgps);
                parametersMapService.showIntervalPoints($scope.coveragePoints.intervals, $scope.overlays.coverage);
            };
            $scope.showUnicomCoverage = function() {
                $scope.currentView = "联通";
                $scope.initializeMap();
                $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
                kpiDisplayService.generateUnicomRsrpPoints($scope.coveragePoints, $scope.data);
                parametersMapService.showIntervalPoints($scope.coveragePoints.intervals);
            };
            $scope.displayUnicomAgps = function() {
                $scope.currentView = "联通";
                $scope.initializeMap();
                var index = parseInt($scope.unicomAgps.length / 2);
                baiduMapService.setCellFocus($scope.unicomAgps[index].longtitute,
                    $scope.unicomAgps[index].lattitute,
                    15);
                $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
                kpiDisplayService.generateAverageRsrpPoints($scope.coveragePoints, $scope.uniAgps);
                parametersMapService.showIntervalPoints($scope.coveragePoints.intervals, $scope.overlays.coverage);
            };
            $scope.showMobileCoverage = function() {
                $scope.currentView = "移动";
                $scope.initializeMap();
                $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
                kpiDisplayService.generateMobileRsrpPoints($scope.coveragePoints, $scope.data);
                parametersMapService.showIntervalPoints($scope.coveragePoints.intervals);
            };
            $scope.displayMobileAgps = function() {
                $scope.currentView = "移动";
                $scope.initializeMap();
                var index = parseInt($scope.mobileAgps.length / 2);
                baiduMapService.setCellFocus($scope.mobileAgps[index].longtitute,
                    $scope.mobileAgps[index].lattitute,
                    15);
                $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
                kpiDisplayService.generateAverageRsrpPoints($scope.coveragePoints, $scope.mobileAgps);
                parametersMapService.showIntervalPoints($scope.coveragePoints.intervals, $scope.overlays.coverage);
            };
            $scope.updateIndexedData = function() {
                var items = [];
                angular.forEach($scope.data,
                    function(data) {
                        data['topic'] = data.longtitute + ',' + data.lattitute;
                        items.push(data);
                    });
                appUrlService.refreshIndexedDb($scope.indexedDB.db, $scope.currentDataLabel, 'topic', items);
            };
            $scope.queryAndDisplayTelecom = function() {
                coverageService.queryAgisDtPointsByTopic($scope.beginDate.value,
                    $scope.endDate.value,
                    $scope.district.selected + $scope.town.selected).then(function(result) {
                    $scope.data = result;
                    $scope.showTelecomCoverage();
                });
            };
            $scope.showTelecomWeakCoverage = function() {
                $scope.currentView = "电信";
                $scope.initializeMap();
                var weakData = _.filter($scope.data, function(stat) { return stat.telecomRsrp < 40; });
                if (!weakData) return;
                var index = parseInt(weakData.length / 2);
                baiduMapService.setCellFocus(weakData[index].longtitute, weakData[index].lattitute, 15);
                $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
                kpiDisplayService.generateTelecomRsrpPoints($scope.coveragePoints, weakData);
                parametersMapService.showIntervalGrids($scope.coveragePoints.intervals, $scope.overlays.coverage);
            };
            $scope.showSmallRange = function() {
                coverageService.queryAgisDtPointsByTopic($scope.beginDate.value, $scope.endDate.value, '小范围')
                    .then(function(result) {
                        $scope.data = result;
                        $scope.currentDataLabel = 'rangePoints';
                        $scope.updateIndexedData();
                        $scope.showTelecomCoverage();
                    });
            };

            $scope.queryAgps = function() {
                $scope.currentDistrict = $scope.district.selected;
                $scope.currentTown = $scope.town.selected;
                switch ($scope.type.selected) {
                case '电信':
                    coverageService.queryAgpsTelecomByTown($scope.beginDate.value,
                        $scope.endDate.value,
                        $scope.district.selected,
                        $scope.town.selected).then(function(result) {
                        $scope.telecomAgps = result;
                    });
                    break;
                case '移动':
                    coverageService.queryAgpsMobileByTown($scope.beginDate.value,
                        $scope.endDate.value,
                        $scope.district.selected,
                        $scope.town.selected).then(function(result) {
                        $scope.mobileAgps = result;
                    });
                    break;
                case '联通':
                    coverageService.queryAgpsUnicomByTown($scope.beginDate.value,
                        $scope.endDate.value,
                        $scope.district.selected,
                        $scope.town.selected).then(function(result) {
                        $scope.unicomAgps = result;
                    });
                    break;
                }
            };
            $scope.updateTelecomAgps = function() {
                coverageService.updateAgpsTelecomView($scope.currentDistrict, $scope.currentTown, $scope.telecomAgps)
                    .then(function(result) {

                    });
            };
            $scope.updateMobileAgps = function() {
                coverageService.updateAgpsMobileView($scope.currentDistrict, $scope.currentTown, $scope.mobileAgps)
                    .then(function(result) {

                    });
            };
            $scope.updateUnicomAgps = function() {
                coverageService.updateAgpsUnicomView($scope.currentDistrict, $scope.currentTown, $scope.unicomAgps)
                    .then(function(result) {

                    });
            };
            $scope.type = {
                options: ['电信', '移动', '联通'],
                selected: '电信'
            };
            $scope.initializeRsrpLegend();
            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        var districts = [];
                        dumpPreciseService.generateUsersDistrict(city,
                            districts,
                            function(district, $index) {
                                if ($index === 0) {
                                    $scope.district = {
                                        options: districts,
                                        selected: districts[0]
                                    };
                                }
                            });
                    }
                });
            $scope.$watch('district.selected',
                function(district) {
                    if (district) {
                        appRegionService.queryTowns($scope.city.selected, district).then(function(towns) {
                            $scope.town = {
                                options: towns,
                                selected: towns[0]
                            };
                        });
                    }
                });
        })
    .controller("mr.grid",
        function($scope,
            baiduMapService,
            coverageService,
            dumpPreciseService,
            kpiDisplayService,
            baiduQueryService,
            coverageDialogService,
            appRegionService,
            parametersMapService,
            collegeMapService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");
            $scope.currentView = "自身覆盖";
            $scope.setRsrpLegend = function() {
                var legend = kpiDisplayService.queryCoverageLegend('rsrpInterval');
                $scope.legend.title = 'RSRP区间';
                $scope.legend.intervals = legend.criteria;
                $scope.colorDictionary = {};
                $scope.areaStats = {};
                angular.forEach(legend.criteria,
                    function(info) {
                        $scope.colorDictionary[info.threshold] = info.color;
                        $scope.areaStats[info.threshold] = 0;
                    });
            };
            $scope.setCompeteLegend = function() {
                var legend = kpiDisplayService.queryCoverageLegend('competeResult');
                $scope.legend.title = '竞争结果';
                $scope.legend.intervals = legend.criteria;
                $scope.colorDictionary = {};
                $scope.areaStats = {};
                angular.forEach(legend.criteria,
                    function(info) {
                        $scope.colorDictionary[info.threshold] = info.color;
                        $scope.areaStats[info.threshold] = 0;
                    });
            };
            $scope.showGridStats = function() {
                var keys = [];
                angular.forEach($scope.legend.intervals,
                    function(info) {
                        keys.push(info.threshold);
                    });
                coverageDialogService.showGridStats($scope.currentDistrict,
                    $scope.currentTown,
                    $scope.currentView,
                    $scope.legend.title,
                    $scope.areaStats,
                    keys);
            };
            $scope.showDistrictSelfCoverage = function(district, town, color) {
                baiduMapService.clearOverlays();
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                if (town === '全区') {
                    coverageService.queryMrGridSelfCoverage(district, $scope.endDate.value).then(function(result) {
                        var coors = result[0].coordinates.split(';')[0];
                        var longtitute = parseFloat(coors.split(',')[0]);
                        var lattitute = parseFloat(coors.split(',')[1]);
                        collegeMapService.showRsrpMrGrid(result,
                            longtitute,
                            lattitute,
                            $scope.areaStats,
                            $scope.colorDictionary);
                    });
                } else {
                    parametersMapService.showTownBoundaries($scope.city.selected, district, town, color);

                    coverageService.queryTownMrGridSelfCoverage(district, town, $scope.endDate.value)
                        .then(function(result) {
                            appRegionService.queryTown($scope.city.selected, district, town).then(function(stat) {
                                var longtitute = stat.longtitute;
                                var lattitute = stat.lattitute;
                                collegeMapService
                                    .showRsrpMrGrid(result,
                                        longtitute,
                                        lattitute,
                                        $scope.areaStats,
                                        $scope.colorDictionary);
                            });
                        });
                }

            };
            $scope.showDistrictCompeteCoverage = function(district, town, color, competeDescription) {
                baiduMapService.clearOverlays();
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                if (town === '全区') {
                    coverageService.queryMrGridCompete(district, $scope.endDate.value, competeDescription)
                        .then(function(result) {
                            var coors = result[0].coordinates.split(';')[0];
                            var longtitute = parseFloat(coors.split(',')[0]);
                            var lattitute = parseFloat(coors.split(',')[1]);
                            collegeMapService
                                .showRsrpMrGrid(result,
                                    longtitute,
                                    lattitute,
                                    $scope.areaStats,
                                    $scope
                                    .colorDictionary);
                        });
                } else {
                    parametersMapService.showTownBoundaries($scope.city.selected, district, town, color);
                    coverageService.queryTownMrGridCompete(district, town, $scope.endDate.value, competeDescription)
                        .then(function(result) {
                            appRegionService.queryTown($scope.city.selected, district, town).then(function(stat) {
                                var longtitute = stat.longtitute;
                                var lattitute = stat.lattitute;
                                collegeMapService
                                    .showRsrpMrGrid(result,
                                        longtitute,
                                        lattitute,
                                        $scope.areaStats,
                                        $scope.colorDictionary);
                            });
                        });
                }

            };
            $scope.showMrGrid = function(district, town) {
                $scope.currentDistrict = district;
                $scope.currentTown = town;
                if ($scope.currentView === '自身覆盖') {
                    $scope.setRsrpLegend();
                    $scope.showDistrictSelfCoverage(district, town, $scope.colors[0]);
                } else {
                    $scope.setCompeteLegend();
                    $scope.showDistrictCompeteCoverage(district, town, $scope.colors[0], $scope.currentView);
                }

            };
            $scope.showDistrictMrGrid = function(district) {
                $scope.showMrGrid(district.name, district.towns[0]);
            };
            $scope.showTelecomCoverage = function() {
                $scope.currentView = "自身覆盖";
                $scope.setRsrpLegend();
                $scope.showDistrictSelfCoverage($scope.currentDistrict, town, $scope.colors[0]);
            };
            $scope.showMobileCompete = function() {
                $scope.currentView = "移动竞对";
                $scope.setCompeteLegend();
                $scope.showDistrictCompeteCoverage($scope.currentDistrict,
                    $scope.currentTown,
                    $scope.colors[0],
                    $scope.currentView);
            };
            $scope.showUnicomCompete = function() {
                $scope.currentView = "联通竞对";
                $scope.setCompeteLegend();
                $scope.showDistrictCompeteCoverage($scope.currentDistrict,
                    $scope.currentTown,
                    $scope.colors[0],
                    $scope.currentView);
            };
            $scope.showOverallCompete = function() {
                $scope.currentView = "竞对总体";
                $scope.setCompeteLegend();
                $scope.showDistrictCompeteCoverage($scope.currentDistrict,
                    $scope.currentTown,
                    $scope.colors[0],
                    $scope.currentView);
            };
            $scope.districts = [];
            $scope.setRsrpLegend();
            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        var districts = [];
                        dumpPreciseService.generateUsersDistrict(city,
                            districts,
                            function(district, $index) {
                                appRegionService.queryTowns($scope.city.selected, district).then(function(towns) {
                                    towns.push('全区');
                                    $scope.districts.push({
                                        name: district,
                                        towns: towns
                                    });
                                    if ($index === 0) {
                                        $scope.showMrGrid(district, towns[0]);
                                    }
                                });
                            });
                    }
                });
        })
    .controller("mr.app",
        function($scope,
            baiduMapService,
            alarmsService,
            coverageDialogService,
            kpiDisplayService,
            parametersMapService,
            alarmImportService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");
            $scope.overlays = {
                planSites: [],
                sites: [],
                cells: []
            };
            $scope.initializeMap = function() {
                $scope.overlays.coverage = [];
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
            };

            $scope.currentCluster = {
                list: [],
                stat: {}
            };
            $scope.calculateCoordinate = function(list) {
                angular.forEach(list,
                    function(item) {
                        var sum = _.reduce(item.gridPoints,
                            function(memo, num) {
                                return {
                                    longtitute: memo.longtitute + num.longtitute,
                                    lattitute: memo.lattitute + num.lattitute
                                };
                            });
                        item.longtitute = sum.longtitute / item.gridPoints.length;
                        item.lattitute = sum.lattitute / item.gridPoints.length;
                        var bestPoint = _.min(item.gridPoints,
                            function(stat) {
                                return (stat.longtitute - item.longtitute) * (stat.longtitute - item.longtitute) +
                                    (stat.lattitute - item.lattitute) * (stat.lattitute - item.lattitute);
                            });
                        item.bestLongtitute = bestPoint.longtitute;
                        item.bestLattitute = bestPoint.lattitute;
                    });
            };
            $scope.showCurrentCluster = function() {
                $scope.initializeRsrpLegend();
                $scope.initializeMap();
                var gridList = $scope.currentCluster.list;
                if (!gridList.length) return;
                var index = parseInt(gridList.length / 2);
                baiduMapService.setCellFocus(gridList[index].longtitute, gridList[index].lattitute, 15);
                $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
                kpiDisplayService.generateRealRsrpPoints($scope.coveragePoints, gridList);
                parametersMapService.showIntervalGrids($scope.coveragePoints.intervals, $scope.overlays.coverage);
                if ($scope.currentCluster.stat) {
                    alarmImportService.updateClusterKpi($scope.currentCluster.stat,
                        function(stat) {
                            parametersMapService.displayClusterPoint(stat, $scope.currentCluster.list);
                        });
                } else {
                    parametersMapService.displayClusterPoint($scope.currentCluster.stat, $scope.currentCluster.list);
                }
            };
            $scope.showSubClusters = function(stats) {
                angular.forEach(stats,
                    function(stat) {
                        var gridList = stat.gridPoints;
                        var index = parseInt(gridList.length / 2);
                        baiduMapService.setCellFocus(gridList[index].longtitute, gridList[index].lattitute, 17);
                        $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
                        alarmsService.queryClusterGridKpis(gridList).then(function(list) {
                            stat.gridPoints = list;
                            kpiDisplayService.generateRealRsrpPoints($scope.coveragePoints, list);
                            parametersMapService
                                .showIntervalGrids($scope.coveragePoints.intervals, $scope.overlays.coverage);
                            alarmImportService.updateClusterKpi(stat,
                                function(item) {
                                    parametersMapService.displayClusterPoint(item, list);
                                });
                        });
                    });
            };
            $scope.showRange500Cluster = function() {
                $scope.initializeRsrpLegend();
                $scope.initializeMap();
                var range = baiduMapService.getCurrentMapRange(-0.012, -0.003);
                alarmsService.queryGridClusterRange('500', range.west, range.east, range.south, range.north)
                    .then(function(stats) {
                        $scope.showSubClusters(stats);
                    });
            };
            $scope.showRange1000Cluster = function() {
                $scope.initializeRsrpLegend();
                $scope.initializeMap();
                var range = baiduMapService.getCurrentMapRange(-0.012, -0.003);
                alarmsService.queryGridClusterRange('1000', range.west, range.east, range.south, range.north)
                    .then(function(stats) {
                        $scope.showSubClusters(stats);
                    });
            };
            $scope.showRangeAdvanceCluster = function() {
                $scope.initializeRsrpLegend();
                $scope.initializeMap();
                var range = baiduMapService.getCurrentMapRange(-0.012, -0.003);
                alarmsService.queryGridClusterRange('Advance8000', range.west, range.east, range.south, range.north)
                    .then(function(stats) {
                        $scope.showSubClusters(stats);
                    });
            };
            $scope.showInfrasturcture = function() {
                parametersMapService.clearOverlaySites($scope.overlays.sites);
                parametersMapService.clearOverlaySites($scope.overlays.cells);
                var gridList = $scope.currentCluster.list;
                var west = _.min(gridList, 'longtitute').longtitute - 0.01;
                var east = _.max(gridList, 'longtitute').longtitute + 0.01;
                var south = _.min(gridList, 'lattitute').lattitute - 0.01;
                var north = _.max(gridList, 'lattitute').lattitute + 0.01;
                parametersMapService.showElementsInRange(west,
                    east,
                    south,
                    north,
                    $scope.beginDate,
                    $scope.endDate,
                    $scope.overlays.sites,
                    $scope.overlays.cells);
            };

            $scope.showCluster500List = function() {
                if ($scope.cluster500List) {
                    coverageDialogService.showGridClusterStats("500个分簇结构",
                        $scope.cluster500List,
                        $scope.currentCluster,
                        $scope.showCurrentCluster);
                } else {
                    alarmsService.queryGridClusters('500').then(function(list) {
                        $scope.calculateCoordinate(list);
                        $scope.cluster500List = _.filter(list, function(stat) { return stat.gridPoints.length > 50 });
                        coverageDialogService.showGridClusterStats("500个分簇结构",
                            $scope.cluster500List,
                            $scope.currentCluster,
                            $scope.showCurrentCluster);
                    });
                }
            };
            $scope.showCluster1000List = function() {
                if ($scope.cluster1000List) {
                    coverageDialogService.showGridClusterStats("1000个分簇结构",
                        $scope.cluster1000List,
                        $scope.currentCluster,
                        $scope.showCurrentCluster);
                } else {
                    alarmsService.queryGridClusters('1000').then(function(list) {
                        $scope.calculateCoordinate(list);
                        $scope.cluster1000List = _.filter(list, function(stat) { return stat.gridPoints.length > 35 });
                        coverageDialogService.showGridClusterStats("1000个分簇结构",
                            $scope.cluster1000List,
                            $scope.currentCluster,
                            $scope.showCurrentCluster);
                    });
                }
            };
            $scope.showClusterAdvance = function() {
                if ($scope.clusterAdvanceList) {
                    coverageDialogService.showGridClusterStats("改进分簇结构",
                        $scope.clusterAdvanceList,
                        $scope.currentCluster,
                        $scope.showCurrentCluster);
                } else {
                    alarmsService.queryGridClusters('Advance8000').then(function(list) {
                        $scope.calculateCoordinate(list);
                        $scope.clusterAdvanceList = _
                            .filter(list, function(stat) { return stat.gridPoints.length > 5 });
                        coverageDialogService.showGridClusterStats("改进分簇结构",
                            $scope.clusterAdvanceList,
                            $scope.currentCluster,
                            $scope.showCurrentCluster);
                    });
                }
            }
            $scope.showCluster500Points = function() {
                parametersMapService.clearOverlaySites($scope.overlays.planSites);
                parametersMapService.displayClusterPoints($scope.cluster500List,
                    $scope.overlays.planSites,
                    50,
                    $scope.currentCluster.list[0]);
            };
            $scope.showCluster1000Points = function() {
                parametersMapService.clearOverlaySites($scope.overlays.planSites);
                parametersMapService.displayClusterPoints($scope.cluster1000List,
                    $scope.overlays.planSites,
                    35,
                    $scope.currentCluster.list[0]);
            };
            $scope.showClusterAdvancePoints = function() {
                parametersMapService.clearOverlaySites($scope.overlays.planSites);
                parametersMapService.displayClusterPoints($scope.clusterAdvanceList,
                    $scope.overlays.planSites,
                    5,
                    $scope.currentCluster.list[0]);
            };
        })
    .controller("home.complain",
        function($scope,
            baiduMapService,
            dumpPreciseService,
            complainService,
            mapDialogService,
            collegeMapService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");

            $scope.showDistrictComplains = function(district, color) {
                var city = $scope.city.selected;
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                $scope.legend.intervals.push({
                    threshold: district,
                    color: color
                });
                complainService.queryLastMonthOnlineListInOneDistrict($scope.endDate.value, city, district)
                    .then(function(sites) {
                        if (sites.length) {
                            collegeMapService.showComplainItems(sites, color);
                        }
                    });
            };
            $scope.showOssWorkItem = function() {
                $scope.legend.title = $scope.city.selected;
                $scope.initializeLegend();
                baiduMapService.clearOverlays();
                $scope.currentView = "电子运维工单";
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showDistrictComplains(district, $scope.colors[$index]);
                    });
            };

            $scope.showYesterdayItems = function() {
                mapDialogService.showYesterdayComplainItems($scope.city.selected);
            };
            $scope.showMonthlyTrend = function() {
                mapDialogService.showMonthComplainItems();
            };

            $scope.districts = [];
            $scope.currentView = "电子运维工单";
            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        $scope.legend.title = city;
                        $scope.initializeLegend();
                        dumpPreciseService.generateUsersDistrict(city,
                            $scope.districts,
                            function(district, $index) {
                                $scope.showDistrictComplains(district, $scope.colors[$index]);
                            });
                    }
                });

        })
    .controller("complain.micro",
        function($scope, baiduMapService, alarmsService, dumpPreciseService, mapDialogService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");

            alarmsService.queryMicroItems().then(function(items) {
                angular.forEach(items,
                    function(item) {
                        var marker = baiduMapService
                            .generateIconMarker(item.longtitute, item.lattitute, "/Content/themes/baidu/address.png");
                        baiduMapService.addOneMarkerToScope(marker,
                            function(stat) {
                                mapDialogService.showMicroAmpliferInfos(stat);
                            },
                            item);
                    });
            });

            $scope.districts = [];

            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        $scope.legend.title = city;
                        $scope.initializeLegend();
                        dumpPreciseService.generateUsersDistrict(city,
                            $scope.districts,
                            function(district, $index) {
                                baiduMapService.addDistrictBoundary(district, $scope.colors[$index]);
                            });
                    }
                });
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
    .controller("college.map",
        function($scope, collegeDialogService, baiduMapService, collegeMapService) {
            $scope.collegeInfo = {
                year: {
                    options: [2015, 2016, 2017, 2018, 2019],
                    selected: new Date().getYear() + 1900
                }
            };
            $scope.displayCollegeMap = function() {
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary($scope.city.selected);
                collegeMapService.showCollegeInfos(function(college) {
                        collegeDialogService.showCollegDialog(college, $scope.collegeInfo.year.selected);
                    },
                    $scope.collegeInfo.year.selected);
            };
            $scope.maintainInfo = function() {
                collegeDialogService.maintainCollegeInfo($scope.collegeInfo.year.selected);
            };
            $scope.showFlow = function() {
                collegeDialogService.showCollegeFlow($scope.collegeInfo.year.selected);
            };

            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");

            $scope.$watch('collegeInfo.year.selected',
                function(year) {
                    if (year > 0) {
                        $scope.displayCollegeMap();
                    }
                });
        })
    .controller("analysis.highway",
        function($scope, baiduMapService, basicImportService, parametersMapService) {
            baiduMapService.initializeMap("map", 11);
            $scope.showView = function(hotSpot) {
                $scope.currentView = hotSpot.hotspotName;
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                parametersMapService.showHotSpotCellSectors(hotSpot.hotspotName, $scope.beginDate, $scope.endDate);
                baiduMapService.setCellFocus(hotSpot.longtitute, hotSpot.lattitute, 13);
            };
            basicImportService.queryHotSpotsByType("高速公路").then(function(spots) {
                $scope.hotSpots = spots;
                $scope.showView($scope.hotSpots[0]);
            });
        })
    .controller("analysis.railway",
        function($scope, baiduMapService, basicImportService, parametersMapService) {
            baiduMapService.initializeMap("map", 11);
            $scope.showView = function(hotSpot) {
                $scope.currentView = hotSpot.hotspotName;
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                parametersMapService.showHotSpotCellSectors(hotSpot.hotspotName, $scope.beginDate, $scope.endDate);
                baiduMapService.setCellFocus(hotSpot.longtitute, hotSpot.lattitute, 13);
            };
            basicImportService.queryHotSpotsByType("高速铁路").then(function(spots) {
                $scope.hotSpots = spots;
                $scope.showView($scope.hotSpots[0]);
            });
        })
    .controller("analysis.subway",
        function($scope, baiduMapService, basicImportService, parametersMapService) {
            baiduMapService.initializeMap("map", 11);
            $scope.showView = function(hotSpot) {
                $scope.currentView = hotSpot.hotspotName;
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                parametersMapService.showHotSpotCellSectors(hotSpot.hotspotName, $scope.beginDate, $scope.endDate);
                baiduMapService.setCellFocus(hotSpot.longtitute, hotSpot.lattitute, 13);
            };
            basicImportService.queryHotSpotsByType("地铁").then(function(spots) {
                $scope.hotSpots = spots;
                $scope.showView($scope.hotSpots[0]);
            });
        })
    .controller("analysis.highvalue",
        function($scope, baiduMapService, basicImportService, parametersMapService) {
            baiduMapService.initializeMap("map", 11);
            $scope.showView = function(hotSpot) {
                $scope.currentView = hotSpot.hotspotName;
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                parametersMapService.showHotSpotCellSectors(hotSpot.hotspotName, $scope.beginDate, $scope.endDate);
                baiduMapService.setCellFocus(hotSpot.longtitute, hotSpot.lattitute, 13);
            };
            basicImportService.queryHotSpotsByType("高价值区域").then(function(spots) {
                $scope.hotSpots = spots;
                $scope.showView($scope.hotSpots[0]);
            });
        })
    .controller("home.college",
        function($scope,
            baiduMapService,
            collegeQueryService,
            parametersMapService,
            collegeService,
            collegeMapService,
            baiduQueryService) {
            baiduMapService.initializeMap("map", 11);
            $scope.year = new Date().getYear() + 1900;
            $scope.showView = function(college) {
                $scope.currentView = college.name;
                $scope.currentCollege = college;
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                collegeMapService.drawCollegeArea(college.id,
                    function(center) {
                        baiduQueryService.transformToBaidu(center.X, center.Y).then(function(coors) {
                            $scope.center = {
                                X: 2 * center.X - coors.x,
                                Y: 2 * center.Y - coors.y,
                                points: center.points
                            };
                        });
                    });

                parametersMapService.showHotSpotCellSectors(college.name, $scope.beginDate, $scope.endDate);
                parametersMapService.showCollegeENodebs(college.name, $scope.beginDate, $scope.endDate);
            };

            collegeQueryService.queryAll().then(function(spots) {
                $scope.hotSpots = spots;
                $scope.showView($scope.hotSpots[0]);
            });
        })
    .controller("college.coverage",
        function($scope,
            baiduMapService,
            collegeQueryService,
            mapDialogService,
            collegeMapService,
            parametersDialogService) {
            baiduMapService.initializeMap("map", 11);
            $scope.coverageOverlays = [];

            $scope.showOverallCoverage = function() {
                mapDialogService.showCollegeCoverageList($scope.beginDate, $scope.endDate);
            };

            $scope.showCoverageView = function(name) {
                $scope.currentView = name;
                collegeQueryService.queryByName(name).then(function(college) {
                    collegeMapService.drawCollegeArea(college.id, function() {});
                });
                parametersDialogService.showCollegeCoverage(name,
                    $scope.beginDate,
                    $scope.endDate,
                    $scope.coverageOverlays,
                    function(legend) {
                        $scope.legend.criteria = legend.criteria;
                        $scope.legend.title = legend.title;
                        $scope.legend.sign = legend.sign;
                    });
            };

            collegeQueryService.queryAll().then(function(spots) {
                $scope.hotSpots = spots;
                $scope.currentView = spots[0].name;
            });
        })
    .controller("query.topic",
        function($scope, baiduMapService, customerDialogService, basicImportService, mapDialogService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");
            $scope.query = function() {
                mapDialogService.showHotSpotsInfo($scope.hotSpotList);
            };

            $scope.updateMap = function() {
                basicImportService.queryAllHotSpots().then(function(result) {
                    $scope.hotSpotList = result;
                    angular.forEach(result,
                        function(item) {
                            baiduMapService.drawCustomizeLabel(item.longtitute,
                                item.lattitute + 0.005,
                                item.hotspotName,
                                '地址:' + item.address + '<br/>类型:' + item.typeDescription + '<br/>说明:' + item.sourceName,
                                3);
                            var marker = baiduMapService.generateIconMarker(item.longtitute,
                                item.lattitute,
                                "/Content/Images/Hotmap/site_or.png");
                            baiduMapService.addOneMarkerToScope(marker,
                                function(stat) {
                                    customerDialogService.modifyHotSpot(stat,
                                        function() {
                                            baiduMapService.switchMainMap();
                                            baiduMapService.clearOverlays();
                                            $scope.updateMap();
                                        },
                                        baiduMapService.switchMainMap);
                                },
                                item);
                        });
                });
            };
            $scope.addHotSpot = function() {
                customerDialogService.constructHotSpot(function() {
                        baiduMapService.switchMainMap();
                        baiduMapService.clearOverlays();
                        $scope.updateMap();
                    },
                    baiduMapService.switchMainMap);
            };
            $scope.updateMap();
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
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
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
                                    stat.cityName + stat.districtName + stat.townName,
                                    'LTE基站个数:' +
                                    stat.totalLteENodebs +
                                    '<br/>LTE小区个数:' +
                                    stat.totalLteCells +
                                    '<br/>CDMA基站个数:' +
                                    stat.totalCdmaBts +
                                    '<br/>CDMA小区个数:' +
                                    stat.totalCdmaCells,
                                    4);
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
    .controller("home.kpi",
        function($scope,
            baiduMapService,
            collegeMapService,
            dumpPreciseService,
            kpiPreciseService,
            networkElementService,
            baiduQueryService,
            neighborDialogService,
            mapDialogService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");
            $scope.currentView = "精确覆盖率";

            $scope.showPreciseRate = function(city, district, color) {
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                kpiPreciseService.queryTopKpisInDistrict($scope.beginDate.value,
                    $scope.endDate.value,
                    10,
                    '按照精确覆盖率升序',
                    city,
                    district).then(function(result) {
                    networkElementService.queryCellSectors(result).then(function(cells) {
                        baiduQueryService.transformToBaidu(cells[0].longtitute, cells[0].lattitute)
                            .then(function(coors) {
                                var xOffset = coors.x - cells[0].longtitute;
                                var yOffset = coors.y - cells[0].lattitute;
                                angular.forEach(cells,
                                    function(cell) {
                                        cell.longtitute += xOffset;
                                        cell.lattitute += yOffset;
                                        var sectorTriangle = baiduMapService.generateSector(cell, "blue", 5);
                                        baiduMapService
                                            .addOneSectorToScope(sectorTriangle,
                                                neighborDialogService.showPrecise,
                                                cell);
                                    });
                            });
                    });
                });
            };
            $scope.showTopPrecise = function() {
                $scope.currentView = "精确覆盖率";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                var city = $scope.city.selected;
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showPreciseRate(city, district, $scope.colors[$index]);
                    });
            };
            $scope.showDownSwitchSite = function(city, district, color) {
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                kpiPreciseService.queryTopDownSwitchInDistrict($scope.beginDate.value,
                    $scope.endDate.value,
                    10,
                    city,
                    district).then(function(result) {
                    angular.forEach(result,
                        function(item) {
                            networkElementService.queryCellInfo(item.eNodebId, item.sectorId).then(function(cell) {
                                collegeMapService.showFlowCellSector(cell, item, $scope.beginDate, $scope.endDate)
                            });
                        });

                });
            };
            $scope.showTopDownSwitch = function() {
                $scope.currentView = "4G下切3G";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                var city = $scope.city.selected;
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showDownSwitchSite(city, district, $scope.colors[$index]);
                    });
            };
            $scope.showRank2Site = function(city, district, color) {
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                kpiPreciseService.queryTopRank2InDistrict($scope.beginDate.value,
                    $scope.endDate.value,
                    10,
                    city,
                    district).then(function(result) {
                    angular.forEach(result,
                        function(item) {
                            networkElementService.queryCellInfo(item.eNodebId, item.sectorId).then(function(cell) {
                                collegeMapService.showFlowCellSector(cell, item, $scope.beginDate, $scope.endDate);
                            });
                        });
                });
            };
            $scope.showTopScheduling = function() {
                $scope.currentView = "4G双流比";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                var city = $scope.city.selected;
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showRank2Site(city, district, $scope.colors[$index]);
                    });
            };
            $scope.showTopRrcSite = function(city, district, color) {
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
                kpiPreciseService.queryTopRrcFailInDistrict($scope.beginDate.value,
                    $scope.endDate.value,
                    10,
                    city,
                    district).then(function(result) {
                    angular.forEach(result,
                        function(item) {
                            networkElementService.queryCellInfo(item.eNodebId, item.sectorId).then(function(cell) {
                                collegeMapService.showRrcCellSector(cell, item, $scope.beginDate, $scope.endDate);
                            });
                        });
                });
            };
            $scope.showTopRrc = function() {
                $scope.currentView = "RRC连接失败";
                baiduMapService.clearOverlays();
                baiduMapService.addCityBoundary("佛山");
                var city = $scope.city.selected;
                angular.forEach($scope.districts,
                    function(district, $index) {
                        $scope.showTopRrcSite(city, district, $scope.colors[$index]);
                    });
            };

            $scope.showPreciseStats = function() {
                mapDialogService.showPreciseTrend($scope.city, $scope.beginDate, $scope.endDate);
            };
            $scope.showRrcStats = function() {
                mapDialogService.showRrcTrend($scope.city, $scope.beginDate, $scope.endDate);
            };

            $scope.districts = [];
            dumpPreciseService.generateUsersDistrict($scope.city.selected || "佛山",
                $scope.districts,
                function(district, $index) {
                    $scope.showPreciseRate($scope.city.selected || "佛山", district, $scope.colors[$index]);
                });
        })
    .controller('kpi.quality',
        function($scope, baiduMapService, workItemDialog) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");

            $scope.showTodayKpi = function() {
                workItemDialog.showTodayKpi($scope.city.selected);
            }
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
    .controller("home.interference",
        function($scope, baiduMapService) {
            baiduMapService.initializeMap("map", 11);
            baiduMapService.addCityBoundary("佛山");
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