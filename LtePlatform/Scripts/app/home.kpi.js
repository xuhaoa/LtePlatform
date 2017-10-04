angular.module('home.kpi', ['app.common'])
    .controller('menu.kpi',
        function($scope, appUrlService) {
            $scope.menuItem = {
                displayName: "指标优化",
                subItems: [
                    {
                        displayName: "指标总览",
                        url: "/#/kpi",
                        tooltip: "4G总体指标"
                    }, {
                        displayName: "专题优化",
                        url: '/#/topic'
                    }, {
                        displayName: "容量优化",
                        url: appUrlService.getPlanUrlHost() + 'erab'
                    }, {
                        displayName: "室分专项",
                        url: appUrlService.getDistributionHost()
                    }
                ]
            };
        })
    .controller("home.kpi",
        function($scope,
            baiduMapService,
            generalMapService,
            collegeMapService,
            dumpPreciseService,
            kpiPreciseService,
            networkElementService,
            baiduQueryService,
            neighborDialogService,
            mapDialogService,
            workItemDialog) {
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
                        var validCoor = _.find(cells, function(stat) { return stat.longtitute && stat.lattitute; });
                        baiduQueryService.transformToBaidu(validCoor.longtitute, validCoor.lattitute)
                            .then(function(coors) {
                                var xOffset = coors.x - validCoor.longtitute;
                                var yOffset = coors.y - validCoor.lattitute;
                                generalMapService
                                    .showGeneralCells(cells, xOffset, yOffset, neighborDialogService.showPrecise);
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
                                if (cell) {
                                    collegeMapService.showFlowCellSector(cell, item, $scope.beginDate, $scope.endDate);
                                }
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
                            networkElementService.queryCellInfo(item.eNodebId, item.sectorId).then(function (cell) {
                                if (cell) {
                                    collegeMapService.showFlowCellSector(cell, item, $scope.beginDate, $scope.endDate);
                                }
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

            $scope.showTodayKpi = function () {
                workItemDialog.showTodayOverallKpi($scope.city.selected);
            }

            $scope.showPreciseStats = function() {
                mapDialogService.showPreciseTrend($scope.city, $scope.beginDate, $scope.endDate);
            };
            $scope.showRrcStats = function() {
                mapDialogService.showRrcTrend($scope.city, $scope.beginDate, $scope.endDate);
            };
            $scope.showCqiStats = function () {
                mapDialogService.showCqiTrend($scope.city, $scope.beginDate, $scope.endDate);
            };
            $scope.showDownSwitchStats = function() {
                mapDialogService.showDownSwitchTrend($scope.city, $scope.beginDate, $scope.endDate);
            };

            $scope.districts = [];
            dumpPreciseService.generateUsersDistrict($scope.city.selected || "佛山",
                $scope.districts,
                function(district, $index) {
                    $scope.showPreciseRate($scope.city.selected || "佛山", district, $scope.colors[$index]);
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
        });