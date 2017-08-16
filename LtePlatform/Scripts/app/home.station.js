angular.module('home.station', ['app.common'])
    .value("distinctIndex", 0)
    .value("myValue",
    {
        "distinctIndex": 0,
        "stationGrade": "A",
        "indoorGrade": "",
        "netType": "L",
        "indoorNetType": "",
        "roomAttribution": "电信",
        "towerAttribution": "电信",
        "isPower": "是",
        "isBBU": "否",
        "isNew": "",
        "indoortype": "",
        "coverage": ""
    })
    .controller("menu.station",
        function($scope, downSwitchService, distinctIndex, baiduMapService, workItemDialog, baiduQueryService) {
            $scope.stationName = "";
            $scope.stations = [];
            $scope.search = function() {
                downSwitchService.getStationByName($scope.stationName, $scope.areaNames[distinctIndex], 1, 10)
                    .then(function(response) {
                        $scope.stations = response.result.rows;
                        $scope.displayStations();
                    });
            };
            $scope.showStationInfo = function(index) {
                document.getElementById("cardlist").style.display = "none";
                workItemDialog.showStationInfo($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
            };
            $scope.displayStations = function() {
                baiduMapService.clearOverlays();
                document.getElementById("cardlist").style.display = "inline";
                baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute)
                    .then(function(coors) {
                        var xOffset = coors.x - $scope.stations[0].longtitute;
                        var yOffset = coors.y - $scope.stations[0].lattitute;
                        baiduMapService.drawPointsUsual($scope.stations,
                            -xOffset,
                            -yOffset,
                            function() {
                                workItemDialog.showStationInfo(this.data, $scope.beginDate, $scope.endDate);
                            });
                    });
            };
        })
    .controller("menu.common",
        function($scope, downSwitchService, myValue, baiduMapService, workItemDialog, baiduQueryService) {

            $scope.stationName = "";
            $scope.stations = [];
            $scope.search = function() {
                downSwitchService.getStationByName($scope.stationName, $scope.areaNames[myValue.distinctIndex], 1, 10)
                    .then(function(response) {
                        $scope.stations = response.result.rows;
                    });
            }
            $scope.showStationInfo = function(index) {
                document.getElementById("cardlist").style.display = "none";
                workItemDialog.showStationInfo($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
            }
            $scope.$watch('stations',
                function() {
                    baiduMapService.clearOverlays();
                    if (!$scope.stations.length)
                        return;
                    document.getElementById("cardlist").style.display = "inline";
                    baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute)
                        .then(function(coors) {
                            var xOffset = coors.x - $scope.stations[0].longtitute;
                            var yOffset = coors.y - $scope.stations[0].lattitute;
                            baiduMapService.drawPointsUsual($scope.stations,
                                -xOffset,
                                -yOffset,
                                function() {
                                    workItemDialog.showStationInfo(this.data);
                                });
                        });
                });
        })
    .controller("station.filter",
        function($scope, downSwitchService, myValue, baiduMapService, collegeMapService, dumpPreciseService) {
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
                    var color = $scope.colors[index];
                    $scope.legend.intervals.push({
                        threshold: areaName,
                        color: color
                    });
                    collegeMapService.showMaintainStations(stations, color);
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
                myValue.stationGrade = $scope.selectedGrade;
                myValue.netType = $scope.selectedNetType;
                myValue.roomAttribution = $scope.selectedRoomAttribution;
                myValue.towerAttribution = $scope.selectedTowerAttribution;
                myValue.isPower = $scope.selectedIsPower;
                myValue.isBBU = $scope.selectedIsBBU;
                $scope.reflashMap();
            };
        })
    .controller("operation-indoor.filter",
        function($scope, downSwitchService, myValue, baiduMapService, collegeMapService, dumpPreciseService) {
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
                myValue.indoorGrade = $scope.selectedIndoorGrade;
                myValue.indoorNetType = $scope.selectedIndoorNetType;
                myValue.isNew = $scope.selectedIsNew;
                myValue.indoortype = $scope.selectedIndoortype;
                $scope.reflashMap();
            };
        })
    .controller("operation-indoor.network",
        function($scope,
            downSwitchService,
            baiduMapService,
            geometryService,
            parametersDialogService,
            collegeMapService,
            dumpPreciseService,
            myValue,
            appUrlService) {
            $scope.districts = [];
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
                        collegeMapService.showIndoorStations(stations, color);
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

            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        $scope.initializeLegend();
                        baiduMapService.clearOverlays();
                        dumpPreciseService.generateUsersDistrict(city,
                            $scope.districts,
                            function(district, $index) {
                                $scope.pushStationArea(district);
                                $scope.getStations(district, $index + 1);
                            });
                    }
                });

        })
    .controller("common.network",
        function($scope,
            downSwitchService,
            myValue,
            baiduMapService,
            geometryService,
            mapDialogService,
            baiduQueryService,
            appUrlService,
            dumpPreciseService) {
            $scope.districts = [];
            $scope.alphabetNames = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
            $scope.types = new Array('JZ', 'SF');
            baiduMapService.initializeMap("map", 13);
            baiduMapService.setCenter(myValue.distinctIndex);
            //获取站点
            $scope.getStations = function(areaName, index, type) {
                downSwitchService.getCommonStations(areaName, type, 0, 10000).then(function(response) {
                    var stations = response.result.rows;
                    if (stations.length) {
                        var color = $scope.colors[index];
                        baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute)
                            .then(function(coors) {
                                var xOffset = coors.x - stations[0].longtitute;
                                var yOffset = coors.y - stations[0].lattitute;
                                baiduMapService.drawPointCollection(stations,
                                    color,
                                    -xOffset,
                                    -yOffset,
                                    function(e) {
                                        mapDialogService.showCommonStationInfo(e.point.data);
                                    });
                            });
                    }
                });
            };

            $scope.reflashMap = function(typeIndex) {
                baiduMapService.clearOverlays();
                $scope.type = $scope.types[typeIndex];
                myValue.distinctIndex = 0;
                for (var i = 1; i < 6; ++i) {
                    $scope.getStations($scope.alphabetNames[i], i, $scope.type);
                }
            };

            $scope.showStationList = function() {
                mapDialogService.showCommonStationList($scope.type);
            };

            $scope.$watch('type',
                function(type) {
                    $scope.outportHref = appUrlService.getPhpHost() +
                        "LtePlatForm/lte/index.php/StationCommon/download/type/" +
                        type;
                });

            $scope.$watch('city.selected',
                function(city) {
                    if (city) {
                        $scope.initializeLegend();
                        dumpPreciseService.generateUsersDistrict(city,
                            $scope.districts,
                            function(district) {
                                $scope.pushStationArea(district);
                            });
                        $scope.type = $scope.types[0];
                        myValue.distinctIndex = 0;
                        $scope.legend.title = "区域";
                        for (var i = 1; i < 6; ++i) {
                            $scope.getStations($scope.alphabetNames[i], i, $scope.type);
                            $scope.legend.intervals.push({
                                threshold: $scope.alphabetNames[i],
                                color: $scope.colors[i]
                            });
                        }
                    }
                });

    })
    .controller("alarm.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        mapDialogService, baiduQueryService) {
        $scope.areaNames = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
        $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
        $scope.levelNames = new Array('紧急', '重要', '一般', '全部');
        $scope.distinct = "佛山市";
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        $scope.stationss[3] = [];
        $scope.stationss[4] = [];
        $scope.stationss[5] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.netType = 'L';
        $scope.levelIndex = 0;
        $scope.level = $scope.levelNames[$scope.levelIndex];
        $scope.distinctIndex = 0;

        //获取站点
        $scope.getStations = function (areaIndex, levelIndex) {
            var areaName = $scope.areaNames[areaIndex];

            downSwitchService.getAlarmStations(areaName, levelIndex, $scope.netType, 0, 10000).then(function (response) {

                $scope.stationss[areaIndex] = response.result.rows;
                var color = $scope.colors[levelIndex];
                baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute, $scope.stationss[areaIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[areaIndex], color, -xOffset, -yOffset, function (e) {
                        mapDialogService.showAlarmStationInfo(e.point.data, $scope.beginDate, $scope.endDate);
                    });
                });
            });
        };

        $scope.changeDistinct = function (index) {

            $scope.distinctIndex = index;
            $scope.distinct = $scope.distincts[$scope.distinctIndex];

            $scope.reflashMap();
        };
        $scope.changeLevel = function (index) {
            $scope.levelIndex = index;
            $scope.level = $scope.levelNames[$scope.levelIndex];

            $scope.reflashMap();
        };
        $scope.changeNetType = function (netType) {
            $scope.netType = netType;

            $scope.reflashMap();
        };
        $scope.reflashMap = function () {
            baiduMapService.clearOverlays();
            baiduMapService.setCenter($scope.distinctIndex);
            if ($scope.distinctIndex !== 0) {
                if ($scope.levelIndex !== 3) {
                    $scope.getStations($scope.distinctIndex, $scope.levelIndex);
                } else {
                    for (var i = 0; i < 3; ++i) {
                        $scope.getStations($scope.distinctIndex, i);
                    }
                }
            } else {
                if ($scope.levelIndex !== 3) {
                    for (var i = 1; i < 6; ++i) {
                        $scope.getStations(i, $scope.levelIndex);
                    }
                } else {
                    for (var i = 1; i < 6; ++i) {
                        for (var j = 0; j < 3; ++j)
                            $scope.getStations(i, j);
                    }
                }
            }
        };
        $scope.reflashMap();
    })

    .controller("fixing.network", function ($scope, $location, downSwitchService, baiduMapService, geometryService,
        mapDialogService, baiduQueryService, dumpPreciseService) {
        $scope.districts = [];
        $scope.distinct = $scope.distincts[0];
        $scope.alphabetNames = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
        $scope.statusNames = new Array('很紧急', '紧急', '极重要', '重要', '一般', '整治完成', '全部');
        baiduMapService.initializeMap("map", 13);

        $scope.statusIndex = 0;
        $scope.status = $scope.statusNames[$scope.statusIndex];
        $scope.distinctIndex = 0;

        //获取站点
        $scope.getStations = function (areaIndex, status, color) {
            var areaName = $scope.alphabetNames[areaIndex];
            var category = $location.path() === '/fixing' ? 'JZ' : 'SF';
            downSwitchService.getFixingStation(areaName, status, category, 0, 10000).then(function (response) {

                var stations = response.result.rows;
                if (stations.length) {
                    baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute).then(function (coors) {
                        var xOffset = coors.x - stations[0].longtitute;
                        var yOffset = coors.y - stations[0].lattitute;
                        baiduMapService.drawPointCollection(stations, color, -xOffset, -yOffset, function (e) {
                            mapDialogService.showFixingStationInfo(e.point.data);
                        });
                    });
                }

            });
        };

        $scope.changeDistinct = function (index) {

            $scope.distinctIndex = index;
            $scope.distinct = $scope.distincts[$scope.distinctIndex];

            $scope.reflashMap();
        };
        $scope.changeStatus = function (index) {
            $scope.statusIndex = index;
            $scope.status = $scope.statusNames[$scope.statusIndex];

            $scope.reflashMap();
        };

        $scope.reflashMap = function () {
            baiduMapService.clearOverlays();
            baiduMapService.setCenter($scope.distinctIndex);
            if ($scope.distinctIndex !== 0) {
                if ($scope.statusIndex !== 6) {
                    $scope.getStations($scope.distinctIndex, $scope.statusNames[$scope.statusIndex], $scope.colors[$scope.statusIndex]);
                } else {
                    for (var i = 0; i < 6; ++i) {
                        $scope.getStations($scope.distinctIndex, $scope.statusNames[i], $scope.colors[i]);
                    }
                }
            } else {
                if ($scope.statusIndex !== 6) {
                    for (var i = 1; i < 6; ++i) {
                        $scope.getStations(i, $scope.statusNames[$scope.statusIndex], $scope.colors[$scope.statusIndex]);
                    }
                } else {
                    for (var i = 1; i < 6; ++i) {
                        for (var j = 0; j < 6; ++j)
                            $scope.getStations(i, $scope.statusNames[j], $scope.colors[j]);
                    }
                }
            }
        };

        $scope.$watch('city.selected', function (city) {
            if (city) {
                $scope.initializeLegend();
                baiduMapService.clearOverlays();
                $scope.legend.title = "站点状态";
                $scope.legend.intervals = [];
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function (district, $index) {
                    $scope.pushStationArea(district);
                    angular.forEach($scope.statusNames.slice(0, $scope.statusNames.length - 1), function (status, $subIndex) {
                        $scope.getStations($index + 1, status, $scope.colors[$subIndex]);
                        if ($index === 0) {
                            $scope.legend.intervals.push({
                                threshold: status,
                                color: $scope.colors[$subIndex]
                            });
                        }
                    });

                });
            }
        });
    })
    .controller("checking.network", function ($scope, $location, downSwitchService, baiduMapService, geometryService,
        collegeMapService, dumpPreciseService) {
        $scope.districts = [];
        $scope.distinct = $scope.distincts[0];
        $scope.statusNames = new Array('未巡检', '需整治', '正常', '全部');
        baiduMapService.initializeMap("map", 13);

        $scope.statusIndex = 0;
        $scope.status = $scope.statusNames[$scope.statusIndex];
        $scope.distinctIndex = 0;

        $scope.getStations = function (areaIndex, status, color) {
            var areaName = $scope.areaNames[areaIndex];
            var category = $location.path() === '/checking' ? 'JZ' : 'SF';
            downSwitchService.getCheckingStation(areaName, status, category, 0, 10000).then(function (response) {
                var stations = response.result.rows;
                if (stations.length) {
                    collegeMapService.showCheckingStations(stations, color);
                }
            });
        };

        $scope.changeDistinct = function (index) {

            $scope.distinctIndex = index;
            $scope.distinct = $scope.distincts[$scope.distinctIndex];

            $scope.reflashMap();
        };
        $scope.changeStatus = function (index) {
            $scope.statusIndex = index;
            $scope.status = $scope.statusNames[$scope.statusIndex];

            $scope.reflashMap();
        };

        $scope.reflashMap = function () {
            baiduMapService.clearOverlays();
            baiduMapService.setCenter($scope.distinctIndex);
            if ($scope.distinctIndex !== 0) {
                if ($scope.statusIndex !== 3) {
                    $scope.getStations($scope.distinctIndex, $scope.statusNames[$scope.statusIndex], $scope.colors[$scope.statusIndex]);
                } else {
                    for (var i = 0; i < 3; ++i) {
                        $scope.getStations($scope.distinctIndex, $scope.statusNames[i], $scope.colors[i]);
                    }
                }
            } else {
                if ($scope.statusIndex !== 3) {
                    for (var i = 1; i < 6; ++i) {
                        $scope.getStations(i, $scope.statusNames[$scope.statusIndex], $scope.colors[$scope.statusIndex]);
                    }
                } else {
                    for (var i = 1; i < 6; ++i) {
                        for (var j = 0; j < 3; ++j)
                            $scope.getStations(i, $scope.statusNames[j], $scope.colors[j]);
                    }
                }
            }
        };
        $scope.$watch('city.selected', function (city) {
            if (city) {
                $scope.initializeLegend();
                baiduMapService.clearOverlays();
                $scope.legend.title = "站点状态";
                $scope.legend.intervals = [];
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function (district, $index) {
                    $scope.pushStationArea(district);
                    angular.forEach($scope.statusNames.slice(0, $scope.statusNames.length - 1), function (status, $subIndex) {
                        $scope.getStations($index + 1, status, $scope.colors[$subIndex]);
                        if ($index === 0) {
                            $scope.legend.intervals.push({
                                threshold: status,
                                color: $scope.colors[$subIndex]
                            });
                        }
                    });

                });
            }
        });
    })
    .controller("resource.network", function ($scope, $location, downSwitchService, baiduMapService, dumpPreciseService,
        mapDialogService, baiduQueryService) {
        $scope.districts = [];
        $scope.distinct = $scope.distincts[0];
        $scope.alphabetNames = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
        baiduMapService.initializeMap("map", 13);

        $scope.statusIndex = 0;
        $scope.distinctIndex = 0;

        $scope.getStations = function (areaIndex, color) {
            var areaName = $scope.alphabetNames[areaIndex];
            var category = $location.path() === '/resource' ? 'JZ' : 'SF';
            downSwitchService.getResourceStations(areaName, category, 0, 10000).then(function (response) {

                var stations = response.result.rows;
                if (stations.length) {
                    baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute).then(function (coors) {
                        var xOffset = coors.x - stations[0].longtitute;
                        var yOffset = coors.y - stations[0].lattitute;
                        baiduMapService.drawPointCollection(stations, color, -xOffset, -yOffset, function (e) {
                            mapDialogService.showResourceInfo(e.point.data);
                        });
                    });
                }

            });
        };

        $scope.reflashMap = function () {
            baiduMapService.clearOverlays();
            baiduMapService.setCenter($scope.distinctIndex);
            if ($scope.distinctIndex !== 0) {
                $scope.getStations($scope.distinctIndex, $scope.colors[$scope.distinctIndex]);
            } else {
                for (var i = 1; i < 6; ++i) {
                    $scope.getStations(i, $scope.colors[i]);
                }
            }
        };
        $scope.changeArea = function (areaNameIndex) {
            $scope.distinctIndex = areaNameIndex;
            $scope.reflashMap();
        };
        $scope.$watch('city.selected', function (city) {
            if (city) {
                $scope.initializeLegend();
                baiduMapService.clearOverlays();
                $scope.legend.title = city;
                $scope.legend.intervals = [];
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function (district, $index) {
                    $scope.pushStationArea(district);
                    $scope.getStations($index + 1, $scope.colors[$index]);
                    $scope.legend.intervals.push({
                        threshold: district,
                        color: $scope.colors[$index]
                    });
                });
            }
        });
    })

    .controller("special-station.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        mapDialogService, baiduQueryService) {

        $scope.isRecovers = new Array('未恢复', '已恢复', '全部');
        $scope.isRecover = new Array('否', '是');
        baiduMapService.initializeMap("map", 13);

        $scope.recoverIndex = 0;
        $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];



        //获取站点
        $scope.getStations = function (recoverIndex) {
            var recoverName = $scope.isRecover[recoverIndex];
            downSwitchService.getSpecialStations(recoverName, 0, 10000).then(function (response) {
                var stations = response.result.rows;
                var color = $scope.colors[recoverIndex];
                baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute).then(function (coors) {
                    var xOffset = coors.x - stations[0].longtitute;
                    var yOffset = coors.y - stations[0].lattitute;
                    baiduMapService.drawPointCollection(stations, color, -xOffset, -yOffset, function (e) {
                        mapDialogService.showSpecialStationInfo(e.point.data);
                    });
                });
            });
        };


        $scope.changeRecover = function (index) {
            $scope.recoverIndex = index;
            $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];
            $scope.reflashMap();
        };

        $scope.reflashMap = function () {
            baiduMapService.clearOverlays();
            baiduMapService.setCenter(0);
            if ($scope.recoverIndex === 2) {
                for (var i = 0; i < 2; ++i) {
                    $scope.getStations(i);
                }
            } else {
                $scope.getStations($scope.recoverIndex);
            }

        };
        $scope.initializeLegend();
        $scope.legend.title = "故障状态";
        $scope.initializeFaultLegend($scope.colors);
        $scope.reflashMap();
    })
    .controller("special-indoor.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        mapDialogService, baiduQueryService) {

        $scope.isRecovers = new Array('未恢复', '已恢复', '全部');
        $scope.isRecover = new Array('否', '是');
        baiduMapService.initializeMap("map", 13);

        $scope.colorFault = new Array("#FF0000", "#00FF00");

        $scope.recoverIndex = 0;
        $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];

        //获取站点
        $scope.getStations = function (recoverIndex) {

            var recoverName = $scope.isRecover[recoverIndex];
            downSwitchService.getSpecialIndoor(recoverName, 0, 10000).then(function (response) {

                var stations = response.result.rows;
                var color = $scope.colorFault[recoverIndex];
                baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute).then(function (coors) {
                    var xOffset = coors.x - stations[0].longtitute;
                    var yOffset = coors.y - stations[0].lattitute;
                    baiduMapService.drawPointCollection(stations, color, -xOffset, -yOffset, function (e) {
                        mapDialogService.showSpecialIndoorInfo(e.point.data);
                    });
                });
            });
        };


        $scope.changeRecover = function (index) {
            $scope.recoverIndex = index;
            $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];
            $scope.reflashMap();
        };

        $scope.reflashMap = function () {
            baiduMapService.clearOverlays();
            baiduMapService.setCenter(0);
            if ($scope.recoverIndex === 2) {
                for (var i = 0; i < 2; ++i) {
                    $scope.getStations(i);
                }
            } else {
                $scope.getStations($scope.recoverIndex);
            }

        };
        $scope.initializeLegend();
        $scope.initializeFaultLegend($scope.colorFault);
        $scope.reflashMap();
    })
    .controller("clear-voice.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        mapDialogService, baiduQueryService) {

        $scope.isRecovers = new Array('未解决', '已解决', '全部');
        $scope.isRecover = new Array('未解决', '已解决');
        baiduMapService.initializeMap("map", 13);

        $scope.colorFault = new Array("#FF0000", "#00FF00");


        $scope.recoverIndex = 0;
        $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];



        //获取站点
        $scope.getStations = function (recoverIndex) {

            var recoverName = $scope.isRecover[recoverIndex];
            downSwitchService.getZeroVoice(recoverName, 0, 10000).then(function (response) {

                var stations = response.result.rows;
                var color = $scope.colorFault[recoverIndex];
                baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute).then(function (coors) {
                    var xOffset = coors.x - stations[0].longtitute;
                    var yOffset = coors.y - stations[0].lattitute;
                    baiduMapService.drawPointCollection(stations, color, -xOffset, -yOffset, function (e) {
                        mapDialogService.showZeroVoiceInfo(e.point.data);
                    });
                });
            });
        };


        $scope.changeRecover = function (index) {
            $scope.recoverIndex = index;
            $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];
            $scope.reflashMap();
        };

        $scope.reflashMap = function () {
            baiduMapService.clearOverlays();
            baiduMapService.setCenter(0);
            if ($scope.recoverIndex === 2) {
                for (var i = 0; i < 2; ++i) {
                    $scope.getStations(i);
                }
            } else {
                $scope.getStations($scope.recoverIndex);
            }

        };
        $scope.initializeLegend();
        $scope.initializeSolveLegend($scope.colorFault);
        $scope.reflashMap();
    })
    .controller("clear-flow.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        mapDialogService, baiduQueryService) {

        $scope.isRecovers = new Array('未解决', '已解决', '全部');
        $scope.isRecover = new Array('未解决', '已解决');
        baiduMapService.initializeMap("map", 13);

        $scope.colorFault = new Array("#FF0000", "#00FF00");

        $scope.recoverIndex = 0;
        $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];


        //获取站点
        $scope.getStations = function (recoverIndex) {

            var recoverName = $scope.isRecover[recoverIndex];
            downSwitchService.getZeroFlow(recoverName, 0, 10000).then(function (response) {
                var stations = response.result.rows;
                var color = $scope.colorFault[recoverIndex];
                baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute).then(function (coors) {
                    var xOffset = coors.x - stations[0].longtitute;
                    var yOffset = coors.y - stations[0].lattitute;
                    baiduMapService.drawPointCollection(stations, color, -xOffset, -yOffset, function (e) {
                        mapDialogService.showZeroFlowInfo(e.point.data);
                    });
                });
            });
        };

        $scope.changeRecover = function (index) {
            $scope.recoverIndex = index;
            $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];
            $scope.reflashMap();
        };

        $scope.reflashMap = function () {
            baiduMapService.clearOverlays();
            baiduMapService.setCenter(0);
            if ($scope.recoverIndex === 2) {
                for (var i = 0; i < 2; ++i) {
                    $scope.getStations(i);
                }
            } else {
                $scope.getStations($scope.recoverIndex);
            }

        };
        $scope.initializeLegend();
        $scope.initializeSolveLegend($scope.colorFault);
        $scope.reflashMap();
    })

    .controller("fault-station.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        mapDialogService, baiduQueryService) {
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.colorFault = new Array("#FF0000", "#00FF00");

        //获取站点
        $scope.getStations = function () {
            downSwitchService.getFaultStations(0, 10000).then(function (response) {

                $scope.stationss[1] = response.result.rows;
                var color = $scope.colorFault[0];
                baiduQueryService.transformToBaidu($scope.stationss[1][0].longtitute, $scope.stationss[1][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[1][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[1][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[1], color, -xOffset, -yOffset, function (e) {
                        mapDialogService.showFaultStationInfo(e.point.data);
                    });
                });
            });
        };
        $scope.reflashMap = function () {
            baiduMapService.clearOverlays();
            baiduMapService.setCenter(0);
            $scope.getStations();
        };
        $scope.reflashMap();
    });
