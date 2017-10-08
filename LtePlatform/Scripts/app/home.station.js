angular.module('home.station', ['app.common'])
    .value("distinctIndex", 0)
    .value("myValue",
    {
        "distinctIndex": 0,
        "stationGrade": "",
        "indoorGrade": "",
        "netType": "",
        "indoorNetType": "",
        "roomAttribution": "",
        "towerAttribution": "",
        "isPower": "",
        "isBBU": "",
        "isNew": "",
        "indoortype": "",
        "coverage": ""
    })
    .controller("operation-station.filter",
        function($scope, downSwitchService, myValue, baiduMapService, collegeMapService, dumpPreciseService) {
            $scope.changeTimes = 0;
            $scope.getStations = function(areaName, index) {
                downSwitchService.getStationByFilter(areaName,
                    myValue.stationGrade,
                    myValue.netType,
                    myValue.roomAttribution,
                    myValue.towerAttribution,
                    myValue.isPower,
                    myValue.isBBU,
                    0,
                    10000).then(function(response) {
                    var stations = response.result.rows;
                    if (stations.length) {
                        var color = $scope.colors[index];
                        $scope.legend.intervals.push({
                            threshold: areaName,
                            color: color
                        });
                        collegeMapService.showMaintainStations(stations, color);
                    }

                });
            };

            $scope.reflashMap = function() {
                baiduMapService.clearOverlays();
                $scope.initializeLegend();
                var areaName = $scope.areaNames[myValue.distinctIndex];
                if (myValue.distinctIndex !== 0) {
                    baiduMapService.setCenter(dumpPreciseService.getDistrictIndex(areaName));
                    $scope.getStations(areaName, myValue.distinctIndex);
                } else {
                    baiduMapService.setCenter(0);
                    angular.forEach($scope.areaNames.slice(1, $scope.areaNames.length),
                        function(name, $index) {
                            $scope.getStations(name, $index);
                        });
                }

            };
            $scope.change = function() {
                $scope.changeTimes += 1;
                myValue.stationGrade = $scope.selectedGrade || "";
                myValue.netType = $scope.selectedNetType || "";
                myValue.roomAttribution = $scope.selectedRoomAttribution || "";
                myValue.towerAttribution = $scope.selectedTowerAttribution || "";
                myValue.isPower = $scope.selectedIsPower || "";
                myValue.isBBU = $scope.selectedIsBBU || "";
                if ($scope.changeTimes > 6)
                    $scope.reflashMap();
            };
        })
    .controller("operation-indoor.filter",
        function($scope, downSwitchService, myValue, baiduMapService, collegeMapService, dumpPreciseService) {
            $scope.changeTimes = 0;
            $scope.getStations = function(areaName, index) {
                areaName = areaName.replace('FS', '');
                downSwitchService.getIndoorByFilter(areaName,
                    myValue.indoorGrade,
                    myValue.indoorNetType,
                    myValue.isNew,
                    myValue.indoortype,
                    myValue.coverage,
                    0,
                    10000).then(function(response) {
                    var stations = response.result.rows;
                    var color = $scope.colors[index];
                    $scope.legend.intervals.push({
                        threshold: areaName,
                        color: color
                    });
                    collegeMapService.showIndoorStations(stations, color);
                });
            };

            $scope.reflashMap = function() {
                baiduMapService.clearOverlays();
                $scope.initializeLegend();
                var areaName = $scope.areaNames[myValue.distinctIndex];
                if (myValue.distinctIndex !== 0) {
                    baiduMapService.setCenter(dumpPreciseService.getDistrictIndex(areaName));
                    $scope.getStations(areaName, myValue.distinctIndex);
                } else {
                    baiduMapService.setCenter(0);
                    angular.forEach($scope.areaNames.slice(1, $scope.areaNames.length),
                        function(name, $index) {
                            $scope.getStations(name, $index);
                        });
                }

            };
            $scope.change = function() {
                $scope.changeTimes += 1;
                myValue.indoorGrade = $scope.selectedIndoorGrade || "";
                myValue.indoorNetType = $scope.selectedIndoorNetType || "";
                myValue.isNew = $scope.selectedIsNew || "";
                myValue.indoortype = $scope.selectedIndoortype || "";
                if ($scope.changeTimes > 6)
                    $scope.reflashMap();
            };
        })
    .controller("operation-station.network",
        function($scope,
            downSwitchService,
            myValue,
            baiduMapService,
            geometryService,
            parametersDialogService,
            collegeMapService,
            dumpPreciseService,
            appUrlService,
            generalMapService) {
            $scope.distinct = $scope.distincts[0];
            baiduMapService.initializeMap("map", 13);

            $scope.getStations = function(areaName, index) {
                downSwitchService.getStationByFilter(areaName,
                    myValue.stationGrade,
                    myValue.netType,
                    myValue.roomAttribution,
                    myValue.towerAttribution,
                    myValue.isPower,
                    myValue.isBBU,
                    0,
                    10000).then(function(response) {
                    var stations = response.result.rows;
                    if (stations.length) {
                        var color = $scope.colors[index];
                        $scope.legend.intervals.push({
                            threshold: areaName,
                            color: color
                        });
                        collegeMapService.showMaintainStations(stations, color, $scope.beginDate, $scope.endDate);
                    }

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
            $scope.districts = [];
            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        $scope.initializeLegend();
                        baiduMapService.clearOverlays();
                        if ($scope.distincts.length === 1) {
                            generalMapService
                                .generateUsersDistrictsAndDistincts(city,
                                    $scope.districts,
                                    $scope.distincts,
                                    $scope.areaNames,
                                    function(district, $index) {
                                        $scope.getStations('FS' + district, $index + 1);
                                    });
                        } else {
                            generalMapService.generateUsersDistrictsOnly(city,
                                $scope.districts,
                                function(district, $index) {
                                    $scope.getStations('FS' + district, $index + 1);
                                });
                        }
                    }
                });

        })
    .controller("operation-indoor.network",
        function($scope,
            downSwitchService,
            myValue,
            baiduMapService,
            geometryService,
            parametersDialogService,
            collegeMapService,
            dumpPreciseService,
            appUrlService,
            generalMapService) {
            $scope.distinct = $scope.distincts[0];
            baiduMapService.initializeMap("map", 13);

            //获取站点
            $scope.getStations = function(areaName, index) {
                areaName = areaName.replace('FS', '');
                downSwitchService.getIndoorByFilter(areaName,
                    myValue.indoorGrade,
                    myValue.indoorNetType,
                    myValue.isNew,
                    myValue.indoortype,
                    myValue.coverage,
                    0,
                    10000).then(function(response) {
                    var stations = response.result.rows;
                    var color = $scope.colors[index];
                    $scope.legend.intervals.push({
                        threshold: areaName,
                        color: color
                    });
                    if (stations.length) {
                        collegeMapService.showIndoorStations(stations, color, $scope.beginDate, $scope.endDate);
                    }
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
            $scope.outportData = function() {
                location.href = appUrlService.getPhpHost() + "LtePlatForm/lte/index.php/Indoor/download";
            };

            $scope.districts = [];
            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        $scope.initializeLegend();
                        baiduMapService.clearOverlays();
                        if ($scope.distincts.length === 1) {
                            generalMapService
                                .generateUsersDistrictsAndDistincts(city,
                                    $scope.districts,
                                    $scope.distincts,
                                    $scope.areaNames,
                                    function(district, $index) {
                                        $scope.getStations('FS' + district, $index + 1);
                                    });
                        } else {
                            generalMapService.generateUsersDistrictsOnly(city,
                                $scope.districts,
                                function(district, $index) {
                                    $scope.getStations('FS' + district, $index + 1);
                                });
                        }
                    }
                });

        })
    .controller("alarm-station.network",
        function($scope,
            downSwitchService,
            baiduMapService,
            geometryService,
            parametersDialogService,
            baiduQueryService) {
            $scope.areaNames = new Array('', 'SD', 'NH', 'CC', 'SS', 'GM');
            $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
            $scope.levelNames = new Array('C', 'D', '全部');
            $scope.distinct = "佛山市";
            $scope.stationss = [];
            $scope.stationss[1] = [];
            $scope.stationss[2] = [];
            $scope.stationss[3] = [];
            $scope.stationss[4] = [];
            $scope.stationss[5] = [];
            baiduMapService.initializeMap("map", 13);

            $scope.colorAlarm = new Array("#FF0000", "#FF8C00");

            $scope.levelIndex = 0;
            $scope.level = $scope.levelNames[$scope.levelIndex];
            $scope.distinctIndex = 0;

            //获取站点
            $scope.getStations = function(areaIndex, levelIndex) {
                var areaName = $scope.areaNames[areaIndex];
                var levelName = $scope.levelNames[levelIndex];
                downSwitchService.getAlarmStations(areaName, levelName, 'JZ', 0, 10000).then(function(response) {
                    if (response.result.rows.length == 0) {
                        return;
                    }
                    $scope.stationss[areaIndex] = response.result.rows;
                    var color = $scope.colorAlarm[levelIndex];
                    baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute,
                        $scope.stationss[areaIndex][0].lattitute).then(function(coors) {
                        var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                        var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                        baiduMapService.drawPointCollection($scope.stationss[areaIndex],
                            areaIndex,
                            -xOffset,
                            -yOffset,
                            function() {
                                parametersDialogService
                                    .showAlarmStationInfo(this.data, $scope.beginDate, $scope.endDate);
                            });
                    });
                });
            };

            $scope.changeDistinct = function(index) {

                $scope.distinctIndex = index;
                $scope.distinct = $scope.distincts[$scope.distinctIndex];

                $scope.reflashMap();
            };
            $scope.changeLevel = function(index) {
                $scope.levelIndex = index;
                $scope.level = $scope.levelNames[$scope.levelIndex];

                $scope.reflashMap();
            };
            $scope.changeNetType = function(netType) {
                $scope.netType = netType;

                $scope.reflashMap();
            };
            $scope.reflashMap = function() {
                baiduMapService.clearOverlays();
                baiduMapService.setCenter($scope.distinctIndex);
                if ($scope.distinctIndex !== 0) {
                    if ($scope.levelIndex !== 2) {
                        $scope.getStations($scope.distinctIndex, $scope.levelIndex);
                    } else {
                        for (var i = 0; i < 2; ++i) {
                            $scope.getStations($scope.distinctIndex, i);
                        }
                    }
                } else {
                    if ($scope.levelIndex !== 2) {
                        for (var i = 1; i < 6; ++i) {
                            $scope.getStations(i, $scope.levelIndex);
                        }
                    } else {
                        for (var i = 1; i < 6; ++i) {
                            for (var j = 0; j < 2; ++j)
                                $scope.getStations(i, j);
                        }
                    }
                }
            };
            $scope.reflashMap();
        })
    .controller("alarm-indoor.network",
        function($scope,
            downSwitchService,
            baiduMapService,
            geometryService,
            parametersDialogService,
            baiduQueryService) {
            $scope.areaNames = new Array('', 'SD', 'NH', 'CC', 'SS', 'GM');
            $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
            $scope.levelNames = new Array('C', 'D', '全部');
            $scope.distinct = "佛山市";
            $scope.stationss = [];
            $scope.stationss[1] = [];
            $scope.stationss[2] = [];
            $scope.stationss[3] = [];
            $scope.stationss[4] = [];
            $scope.stationss[5] = [];
            baiduMapService.initializeMap("map", 13);

            $scope.colorAlarm = new Array("#FF0000", "#FF8C00");

            $scope.levelIndex = 0;
            $scope.level = $scope.levelNames[$scope.levelIndex];
            $scope.distinctIndex = 5;

            //获取站点
            $scope.getStations = function(areaIndex, levelIndex) {
                var areaName = $scope.areaNames[areaIndex];
                var levelName = $scope.levelNames[levelIndex];
                downSwitchService.getAlarmStations(areaName, levelName, 'SF', 0, 10000).then(function(response) {
                    if (response.result.rows.length == 0) {
                        return;
                    }
                    $scope.stationss[areaIndex] = response.result.rows;
                    var color = $scope.colorAlarm[levelIndex];
                    baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute,
                        $scope.stationss[areaIndex][0].lattitute).then(function(coors) {
                        var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                        var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                        baiduMapService.drawPointCollection($scope.stationss[areaIndex],
                            areaIndex,
                            -xOffset,
                            -yOffset,
                            function() {
                                parametersDialogService
                                    .showAlarmStationInfo(this.data, $scope.beginDate, $scope.endDate);
                            });
                    });
                });
            };

            $scope.changeDistinct = function(index) {

                $scope.distinctIndex = index;
                $scope.distinct = $scope.distincts[$scope.distinctIndex];

                $scope.reflashMap();
            };
            $scope.changeLevel = function(index) {
                $scope.levelIndex = index;
                $scope.level = $scope.levelNames[$scope.levelIndex];

                $scope.reflashMap();
            };
            $scope.changeNetType = function(netType) {
                $scope.netType = netType;

                $scope.reflashMap();
            };
            $scope.reflashMap = function() {
                baiduMapService.clearOverlays();
                baiduMapService.setCenter($scope.distinctIndex);
                if ($scope.distinctIndex !== 0) {
                    if ($scope.levelIndex !== 2) {
                        $scope.getStations($scope.distinctIndex, $scope.levelIndex);
                    } else {
                        for (var i = 0; i < 2; ++i) {
                            $scope.getStations($scope.distinctIndex, i);
                        }
                    }
                } else {
                    if ($scope.levelIndex !== 2) {
                        for (var i = 1; i < 6; ++i) {
                            $scope.getStations(i, $scope.levelIndex);
                        }
                    } else {
                        for (var i = 1; i < 6; ++i) {
                            for (var j = 0; j < 2; ++j)
                                $scope.getStations(i, j);
                        }
                    }
                }
            };
            $scope.reflashMap();
        });

