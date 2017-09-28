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
    .controller("menu.operation-station",
    function ($scope, downSwitchService, distinctIndex, baiduMapService, workItemDialog, baiduQueryService) {
        $scope.stationName = "";
        $scope.stations = [];
        $scope.search = function () {
            downSwitchService.getStationByName($scope.stationName, 1, 10)
                .then(function (response) {
                    $scope.stations = response.result.rows;
                    $scope.displayStations();
                });
        };
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            workItemDialog.showStationInfo($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
        };
        $scope.displayStations = function () {
            baiduMapService.clearOverlays();
            document.getElementById("cardlist").style.display = "inline";
            baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute)
                .then(function (coors) {
                    var xOffset = coors.x - $scope.stations[0].longtitute;
                    var yOffset = coors.y - $scope.stations[0].lattitute;
                    baiduMapService.drawPointsUsual($scope.stations,
                        -xOffset,
                        -yOffset,
                        function () {
                            workItemDialog.showStationInfo(this.data, $scope.beginDate, $scope.endDate);
                        });
                });
        };
    })
    .controller("menu.operation-indoor",
    function ($scope, downSwitchService, distinctIndex, baiduMapService, workItemDialog, baiduQueryService) {
        $scope.stationName = "";
        $scope.stations = [];
        $scope.search = function () {
            downSwitchService.getIndoorByName($scope.stationName, 1, 10)
                .then(function (response) {
                    $scope.stations = response.result.rows;
                    $scope.displayStations();
                });
        };
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            workItemDialog.showIndoorInfo($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
        };
        $scope.displayStations = function () {
            baiduMapService.clearOverlays();
            document.getElementById("cardlist").style.display = "inline";
            baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute)
                .then(function (coors) {
                    var xOffset = coors.x - $scope.stations[0].longtitute;
                    var yOffset = coors.y - $scope.stations[0].lattitute;
                    baiduMapService.drawPointsUsual($scope.stations,
                        -xOffset,
                        -yOffset,
                        function () {
                            workItemDialog.showIndoorInfo(this.data, $scope.beginDate, $scope.endDate);
                        });
                });
        };
    })
    .controller("menu.common-station",
    function ($scope, downSwitchService, myValue, baiduMapService, workItemDialog, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];
        $scope.search = function () {
            downSwitchService.getStationByName($scope.stationName, $scope.areaNames[myValue.distinctIndex], 1, 10)
                .then(function (response) {
                    $scope.stations = response.result.rows;
                });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            workItemDialog.showStationInfo($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
        }
        $scope.$watch('stations',
            function () {
                baiduMapService.clearOverlays();
                if (!$scope.stations.length)
                    return;
                document.getElementById("cardlist").style.display = "inline";
                baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute)
                    .then(function (coors) {
                        var xOffset = coors.x - $scope.stations[0].longtitute;
                        var yOffset = coors.y - $scope.stations[0].lattitute;
                        baiduMapService.drawPointsUsual($scope.stations,
                            -xOffset,
                            -yOffset,
                            function () {
                                workItemDialog.showStationInfo(this.data);
                            });
                    });
            });
    })
    .controller("menu.common-indoor",
    function ($scope, downSwitchService, myValue, baiduMapService, workItemDialog, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];
        $scope.search = function () {
            downSwitchService.getStationByName($scope.stationName, $scope.areaNames[myValue.distinctIndex], 1, 10)
                .then(function (response) {
                    $scope.stations = response.result.rows;
                });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            workItemDialog.showStationInfo($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
        }
        $scope.$watch('stations',
            function () {
                baiduMapService.clearOverlays();
                if (!$scope.stations.length)
                    return;
                document.getElementById("cardlist").style.display = "inline";
                baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute)
                    .then(function (coors) {
                        var xOffset = coors.x - $scope.stations[0].longtitute;
                        var yOffset = coors.y - $scope.stations[0].lattitute;
                        baiduMapService.drawPointsUsual($scope.stations,
                            -xOffset,
                            -yOffset,
                            function () {
                                workItemDialog.showStationInfo(this.data);
                            });
                    });
            });
    })
    .controller("menu.alarm-station", function ($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];

        $scope.search = function () {
            downSwitchService.getAlarmStationByName($scope.stationName, 'JZ', '', 1, 10).then(function (response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            parametersDialogService.showAlarmStationInfo($scope.stations[index - 1]);
        }
        $scope.$watch('stations', function () {
            baiduMapService.clearOverlays();
            if (!$scope.stations.length)
                return;
            document.getElementById("cardlist").style.display = "inline";
            baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.stations[0].longtitute;
                var yOffset = coors.y - $scope.stations[0].lattitute;
                baiduMapService.drawPointsUsual($scope.stations, -xOffset, -yOffset, function () {
                    parametersDialogService.showAlarmStationInfo(this.data, $scope.beginDate, $scope.endDate);
                });
            });
        });
    })
    .controller("menu.alarm-indoor", function ($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];

        $scope.search = function () {
            downSwitchService.getAlarmStationByName($scope.stationName, 'SF', '', 1, 10).then(function (response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            parametersDialogService.showAlarmStationInfo($scope.stations[index - 1]);
        }
        $scope.$watch('stations', function () {
            baiduMapService.clearOverlays();
            if (!$scope.stations.length)
                return;
            document.getElementById("cardlist").style.display = "inline";
            baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.stations[0].longtitute;
                var yOffset = coors.y - $scope.stations[0].lattitute;
                baiduMapService.drawPointsUsual($scope.stations, -xOffset, -yOffset, function () {
                    parametersDialogService.showAlarmStationInfo(this.data, $scope.beginDate, $scope.endDate);
                });
            });
        });
    })
    .controller("menu.checking-station", function ($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];

        $scope.search = function () {
            downSwitchService.getCheckingStationByName($scope.stationName, 'JZ', '', 1, 10).then(function (response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            parametersDialogService.showCommonStationInfo($scope.stations[index - 1]);
        }
        $scope.$watch('stations', function () {
            baiduMapService.clearOverlays();
            if (!$scope.stations.length)
                return;
            document.getElementById("cardlist").style.display = "inline";
            baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.stations[0].longtitute;
                var yOffset = coors.y - $scope.stations[0].lattitute;
                baiduMapService.drawPointsUsual($scope.stations, -xOffset, -yOffset, function () {
                    parametersDialogService.showCommonStationInfo(this.data);
                });
            });
        });
    })
    .controller("menu.checking-indoor", function ($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];

        $scope.search = function () {
            downSwitchService.getCheckingStationByName($scope.stationName, 'SF', '', 1, 10).then(function (response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            parametersDialogService.showCommonStationInfo($scope.stations[index - 1]);
        }
        $scope.$watch('stations', function () {
            baiduMapService.clearOverlays();
            if (!$scope.stations.length)
                return;
            document.getElementById("cardlist").style.display = "inline";
            baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.stations[0].longtitute;
                var yOffset = coors.y - $scope.stations[0].lattitute;
                baiduMapService.drawPointsUsual($scope.stations, -xOffset, -yOffset, function () {
                    parametersDialogService.showCommonStationInfo(this.data);
                });
            });
        });
    })

    .controller("menu.fixing-station", function ($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];

        $scope.search = function () {
            downSwitchService.getFixingStationByName($scope.stationName, 'JZ', '', 1, 10).then(function (response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            parametersDialogService.showFixingStationInfo($scope.stations[index - 1]);
        }
        $scope.$watch('stations', function () {
            baiduMapService.clearOverlays();
            if (!$scope.stations.length)
                return;
            document.getElementById("cardlist").style.display = "inline";
            baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.stations[0].longtitute;
                var yOffset = coors.y - $scope.stations[0].lattitute;
                baiduMapService.drawPointsUsual($scope.stations, -xOffset, -yOffset, function () {
                    parametersDialogService.showFixingStationInfo(this.data);
                });
            });
        });
    })
    .controller("menu.fixing-indoor", function ($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];

        $scope.search = function () {
            downSwitchService.getFixingStationByName($scope.stationName, 'SF', '', 1, 10).then(function (response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            parametersDialogService.showFixingStationInfo($scope.stations[index - 1]);
        }
        $scope.$watch('stations', function () {
            baiduMapService.clearOverlays();
            if (!$scope.stations.length)
                return;
            document.getElementById("cardlist").style.display = "inline";
            baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.stations[0].longtitute;
                var yOffset = coors.y - $scope.stations[0].lattitute;
                baiduMapService.drawPointsUsual($scope.stations, -xOffset, -yOffset, function () {
                    parametersDialogService.showFixingStationInfo(this.data);
                });
            });
        });
    })

    .controller("menu.resource-station", function ($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];

        $scope.search = function () {
            downSwitchService.getCommonStations($scope.stationName, 'JZ', '', 1, 10).then(function (response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            parametersDialogService.showCommonStationInfo($scope.stations[index - 1]);
        }
        $scope.$watch('stations', function () {
            baiduMapService.clearOverlays();
            if (!$scope.stations.length)
                return;
            document.getElementById("cardlist").style.display = "inline";
            baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.stations[0].longtitute;
                var yOffset = coors.y - $scope.stations[0].lattitute;
                baiduMapService.drawPointsUsual($scope.stations, -xOffset, -yOffset, function () {
                    parametersDialogService.showCommonStationInfo(this.data);
                });
            });
        });
    })
    .controller("menu.resource-indoor", function ($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];

        $scope.search = function () {
            downSwitchService.getCommonStations($scope.stationName, 'SF', '', 1, 10).then(function (response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            parametersDialogService.showCommonStationInfo($scope.stations[index - 1]);
        }
        $scope.$watch('stations', function () {
            baiduMapService.clearOverlays();
            if (!$scope.stations.length)
                return;
            document.getElementById("cardlist").style.display = "inline";
            baiduQueryService.transformToBaidu($scope.stations[0].longtitute, $scope.stations[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.stations[0].longtitute;
                var yOffset = coors.y - $scope.stations[0].lattitute;
                baiduMapService.drawPointsUsual($scope.stations, -xOffset, -yOffset, function () {
                    parametersDialogService.showCommonStationInfo(this.data);
                });
            });
        });
    })
    .controller("operation-station.filter",
    function ($scope, downSwitchService, myValue, baiduMapService, collegeMapService, dumpPreciseService) {
        $scope.changeTimes = 0;
        $scope.getStations = function (areaName, index) {
            downSwitchService.getStationByFilter(areaName,
                myValue.stationGrade,
                myValue.netType,
                myValue.roomAttribution,
                myValue.towerAttribution,
                myValue.isPower,
                myValue.isBBU,
                0,
                10000).then(function (response) {
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

        $scope.reflashMap = function () {
            baiduMapService.clearOverlays();
            $scope.initializeLegend();
            var areaName = $scope.areaNames[myValue.distinctIndex];
            if (myValue.distinctIndex !== 0) {
                baiduMapService.setCenter(dumpPreciseService.getDistrictIndex(areaName));
                $scope.getStations(areaName, myValue.distinctIndex);
            } else {
                baiduMapService.setCenter(0);
                angular.forEach($scope.areaNames.slice(1, $scope.areaNames.length),
                    function (name, $index) {
                        $scope.getStations(name, $index);
                    });
            }

        };
        $scope.change = function () {
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
    function ($scope, downSwitchService, myValue, baiduMapService, collegeMapService, dumpPreciseService) {
        $scope.changeTimes = 0;
        $scope.getStations = function (areaName, index) {
            areaName = areaName.replace('FS', '');
            downSwitchService.getIndoorByFilter(areaName,
                myValue.indoorGrade,
                myValue.indoorNetType,
                myValue.isNew,
                myValue.indoortype,
                myValue.coverage,
                0,
                10000).then(function (response) {
                    var stations = response.result.rows;
                    var color = $scope.colors[index];
                    $scope.legend.intervals.push({
                        threshold: areaName,
                        color: color
                    });
                    collegeMapService.showIndoorStations(stations, color);
                });
        };

        $scope.reflashMap = function () {
            baiduMapService.clearOverlays();
            $scope.initializeLegend();
            var areaName = $scope.areaNames[myValue.distinctIndex];
            if (myValue.distinctIndex !== 0) {
                baiduMapService.setCenter(dumpPreciseService.getDistrictIndex(areaName));
                $scope.getStations(areaName, myValue.distinctIndex);
            } else {
                baiduMapService.setCenter(0);
                angular.forEach($scope.areaNames.slice(1, $scope.areaNames.length),
                    function (name, $index) {
                        $scope.getStations(name, $index);
                    });
            }

        };
        $scope.change = function () {
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
    function ($scope,
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
        /*$scope.getStations = function(areaName, index) {
            downSwitchService.getStationsByAreaName(areaName, 0, 10000).then(function(response) {
                var stations = response.result.rows;
                var color = $scope.colors[index];
                $scope.legend.intervals.push({
                    threshold: areaName,
                    color: color
                });
                collegeMapService.showMaintainStations(stations, color);
            });
        };*/
        $scope.getStations = function (areaName, index) {
            downSwitchService.getStationByFilter(areaName,
                myValue.stationGrade,
                myValue.netType,
                myValue.roomAttribution,
                myValue.towerAttribution,
                myValue.isPower,
                myValue.isBBU,
                0,
                10000).then(function (response) {
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
        $scope.reflashMap = function (areaNameIndex) {
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
                    function (name, $index) {
                        $scope.getStations(name, $index);
                    });
            }

        };
        $scope.showStationList = function () {
            parametersDialogService.showStationList();
        };
        $scope.assessment = function () {
            parametersDialogService.showAssessmentDialog();
        };
        $scope.outportData = function () {
            location.href = appUrlService.getPhpHost() + "LtePlatForm/lte/index.php/Station/download";
        };
        $scope.districts = [];
        $scope.$watch('city.selected',
            function (city) {
                if (city) {
                    $scope.initializeLegend();
                    baiduMapService.clearOverlays();
                    if ($scope.distincts.length === 1) {
                        generalMapService
                            .generateUsersDistrictsAndDistincts(city,
                            $scope.districts,
                            $scope.distincts,
                            $scope.areaNames,
                            function (district, $index) {
                                $scope.getStations('FS' + district, $index + 1);
                            });
                    } else {
                        generalMapService.generateUsersDistrictsOnly(city,
                            $scope.districts,
                            function (district, $index) {
                                $scope.getStations('FS' + district, $index + 1);
                            });
                    }
                }
            });

    })
    .controller("operation-indoor.network",
    function ($scope,
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
        $scope.getStations = function (areaName, index) {
            areaName = areaName.replace('FS', '');
            downSwitchService.getIndoorByFilter(areaName,
                myValue.indoorGrade,
                myValue.indoorNetType,
                myValue.isNew,
                myValue.indoortype,
                myValue.coverage,
                0,
                10000).then(function (response) {
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
        $scope.reflashMap = function (areaNameIndex) {
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
                    function (name, $index) {
                        $scope.getStations(name, $index);
                    });
            }

        };
        $scope.showStationList = function () {
            parametersDialogService.showStationList();
        };
        $scope.outportData = function () {
            location.href = appUrlService.getPhpHost() + "LtePlatForm/lte/index.php/Indoor/download";
        };

        $scope.districts = [];
        $scope.$watch('city.selected',
            function (city) {
                if (city) {
                    $scope.initializeLegend();
                    baiduMapService.clearOverlays();
                    if ($scope.distincts.length === 1) {
                        generalMapService
                            .generateUsersDistrictsAndDistincts(city,
                            $scope.districts,
                            $scope.distincts,
                            $scope.areaNames,
                            function (district, $index) {
                                $scope.getStations('FS' + district, $index + 1);
                            });
                    } else {
                        generalMapService.generateUsersDistrictsOnly(city,
                            $scope.districts,
                            function (district, $index) {
                                $scope.getStations('FS' + district, $index + 1);
                            });
                    }
                }
            });

    })
    .controller("common-station.network",
        function($scope,
            downSwitchService,
            myValue,
            baiduMapService,
            geometryService,
            dumpPreciseService,
            mapDialogService,
            baiduQueryService,
            appUrlService,
            generalMapService) {
            $scope.districts = [];
            $scope.alphabetNames = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
            $scope.types = new Array('JZ', 'SF');
            baiduMapService.initializeMap("map", 13);
            baiduMapService.setCenter(myValue.distinctIndex);
            //获取站点
            $scope.getStations = function(areaName, index) {
                downSwitchService.getCommonStations('', "JZ",areaName,  0, 10000).then(function(response) {
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

            $scope.reflashMap = function (areaNameIndex) {
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
                        function (name, $index) {
                            $scope.getStations(name, $index);
                        });
                }

            };

            $scope.showStationList = function() {
                mapDialogService.showCommonStationList('JZ');
            };

            $scope.outportHref = appUrlService.getPhpHost() +
                        "LtePlatForm/lte/index.php/StationCommon/download/type/JZ";

            $scope.districts = [];
            $scope.$watch('city.selected',
                function (city) {
                    if (city) {
                        $scope.initializeLegend();
                        baiduMapService.clearOverlays();
                        if ($scope.distincts.length === 1) {
                            generalMapService
                                .generateUsersDistrictsAndDistincts(city,
                                $scope.districts,
                                $scope.distincts,
                                $scope.areaNames,
                                function (district, $index) {
                                    $scope.getStations('FS' + district, $index + 1);
                                });
                        } else {
                            generalMapService.generateUsersDistrictsOnly(city,
                                $scope.districts,
                                function (district, $index) {
                                    $scope.getStations('FS' + district, $index + 1);
                                });
                        }
                    }
                });

    })
    .controller("common-indoor.network",
    function ($scope,
        downSwitchService,
        myValue,
        baiduMapService,
        geometryService,
        dumpPreciseService,
        mapDialogService,
        baiduQueryService,
        appUrlService,
        generalMapService) {
        $scope.districts = [];
        $scope.alphabetNames = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
        $scope.types = new Array('JZ', 'SF');
        baiduMapService.initializeMap("map", 13);
        baiduMapService.setCenter(myValue.distinctIndex);
        //获取站点
        $scope.getStations = function (areaName, index) {
            downSwitchService.getCommonStations('', "SF", areaName, 0, 10000).then(function (response) {
                var stations = response.result.rows;
                if (stations.length) {
                    var color = $scope.colors[index];
                    baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute)
                        .then(function (coors) {
                            var xOffset = coors.x - stations[0].longtitute;
                            var yOffset = coors.y - stations[0].lattitute;
                            baiduMapService.drawPointCollection(stations,
                                color,
                                -xOffset,
                                -yOffset,
                                function (e) {
                                    mapDialogService.showCommonStationInfo(e.point.data);
                                });
                        });
                }
            });
        };

        $scope.reflashMap = function (areaNameIndex) {
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
                    function (name, $index) {
                        $scope.getStations(name, $index);
                    });
            }

        };

        $scope.showStationList = function () {
            mapDialogService.showCommonStationList('SF');
        };

        $scope.outportHref = appUrlService.getPhpHost() +
            "LtePlatForm/lte/index.php/StationCommon/download/type/SF";

        $scope.districts = [];
        $scope.$watch('city.selected',
            function (city) {
                if (city) {
                    $scope.initializeLegend();
                    baiduMapService.clearOverlays();
                    if ($scope.distincts.length === 1) {
                        generalMapService
                            .generateUsersDistrictsAndDistincts(city,
                            $scope.districts,
                            $scope.distincts,
                            $scope.areaNames,
                            function (district, $index) {
                                $scope.getStations('FS' + district, $index + 1);
                            });
                    } else {
                        generalMapService.generateUsersDistrictsOnly(city,
                            $scope.districts,
                            function (district, $index) {
                                $scope.getStations('FS' + district, $index + 1);
                            });
                    }
                }
            });

    })
    .controller("alarm-station.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
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
        $scope.getStations = function (areaIndex, levelIndex) {
            var areaName = $scope.areaNames[areaIndex];
            var levelName = $scope.levelNames[levelIndex];
            downSwitchService.getAlarmStations(areaName, levelName, 'JZ', 0, 10000).then(function (response) {
                if (response.result.rows.length == 0) {
                    return;
                }
                $scope.stationss[areaIndex] = response.result.rows;
                var color = $scope.colorAlarm[levelIndex];
                baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute, $scope.stationss[areaIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[areaIndex], areaIndex, -xOffset, -yOffset, function () {
                        parametersDialogService.showAlarmStationInfo(this.data, $scope.beginDate, $scope.endDate);
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
    .controller("alarm-indoor.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
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
        $scope.getStations = function (areaIndex, levelIndex) {
            var areaName = $scope.areaNames[areaIndex];
            var levelName = $scope.levelNames[levelIndex];
            downSwitchService.getAlarmStations(areaName, levelName, 'SF', 0, 10000).then(function (response) {
                if (response.result.rows.length == 0) {
                    return;
                }
                $scope.stationss[areaIndex] = response.result.rows;
                var color = $scope.colorAlarm[levelIndex];
                baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute, $scope.stationss[areaIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[areaIndex], areaIndex, -xOffset, -yOffset, function () {
                        parametersDialogService.showAlarmStationInfo(this.data, $scope.beginDate, $scope.endDate);
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
    .controller("checking-station.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
        $scope.areaNames = new Array('', 'SD', 'NH', 'CC', 'SS', 'GM');
        $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
        $scope.statusNames = new Array('未巡检', '已巡检', '全部');
        $scope.distinct = "佛山市";
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        $scope.stationss[3] = [];
        $scope.stationss[4] = [];
        $scope.stationss[5] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.colorAlarm = new Array("#FF0000", "#00FF00");

        $scope.statusIndex = 0;
        $scope.status = $scope.statusNames[$scope.statusIndex];
        $scope.distinctIndex = 0;

        //获取站点
        $scope.getStations = function (areaIndex, index) {
            var areaName = $scope.areaNames[areaIndex];
            var status = $scope.statusNames[index];
            downSwitchService.getCheckingStation(areaName, status, 'JZ', 0, 10000).then(function (response) {
                if (response.result.rows.length == 0) {
                    return;
                }
                $scope.stationss[areaIndex] = response.result.rows;
                var color = $scope.colorAlarm[index];
                baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute, $scope.stationss[areaIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[areaIndex], areaIndex, -xOffset, -yOffset, function () {
                        if (status == '已巡检') {
                            parametersDialogService.showCheckingStationInfo(this.data);
                        } else {
                            parametersDialogService.showCommonStationInfo(this.data);
                        }


                    });
                });

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
                    $scope.getStations($scope.distinctIndex, $scope.statusIndex);
                } else {
                    for (var i = 0; i < 3; ++i) {
                        $scope.getStations($scope.distinctIndex, i);
                    }
                }
            } else {
                if ($scope.statusIndex !== 3) {
                    for (var i = 1; i < 6; ++i) {
                        $scope.getStations(i, $scope.statusIndex);
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
    .controller("checking-indoor.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
        $scope.areaNames = new Array('', 'SD', 'NH', 'CC', 'SS', 'GM');
        $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
        $scope.statusNames = new Array('未巡检', '已巡检', '全部');
        $scope.distinct = "佛山市";
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        $scope.stationss[3] = [];
        $scope.stationss[4] = [];
        $scope.stationss[5] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.colorAlarm = new Array("#FF0000", "#00FF00");

        $scope.statusIndex = 0;
        $scope.status = $scope.statusNames[$scope.statusIndex];
        $scope.distinctIndex = 0;

        //获取站点
        $scope.getStations = function (areaIndex, index) {
            var areaName = $scope.areaNames[areaIndex];
            var status = $scope.statusNames[index];
            downSwitchService.getCheckingStation(areaName, status, 'SF', 0, 10000).then(function (response) {
                if (response.result.rows.length == 0) {
                    return;
                }
                $scope.stationss[areaIndex] = response.result.rows;
                var color = $scope.colorAlarm[index];
                baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute, $scope.stationss[areaIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[areaIndex], areaIndex, -xOffset, -yOffset, function () {
                        if (status == '已巡检') {
                            parametersDialogService.showCheckingStationInfo(this.data);
                        } else {
                            parametersDialogService.showCommonStationInfo(this.data);
                        }
                    });
                });
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
                    $scope.getStations($scope.distinctIndex, $scope.statusIndex);
                } else {
                    for (var i = 0; i < 3; ++i) {
                        $scope.getStations($scope.distinctIndex, i);
                    }
                }
            } else {
                if ($scope.statusIndex !== 3) {
                    for (var i = 1; i < 6; ++i) {
                        $scope.getStations(i, $scope.statusIndex);
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

    .controller("fixing-station.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
        $scope.areaNames = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
        $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
        $scope.statusNames = new Array('很紧急', '紧急', '极重要', '重要', '一般', '整治完成', '全部');
        $scope.distinct = "佛山市";
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        $scope.stationss[3] = [];
        $scope.stationss[4] = [];
        $scope.stationss[5] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.colorAlarm = new Array("#FF0000", "#FF8C00", "#FFFF00", "#FF00FF", "#FF008C", "#00FF00");

        $scope.statusIndex = 6;
        $scope.status = $scope.statusNames[$scope.statusIndex];
        $scope.distinctIndex = 0;

        //获取站点
        $scope.getStations = function (areaIndex, index) {
            var areaName = $scope.areaNames[areaIndex];
            var status = $scope.statusNames[index];
            downSwitchService.getFixingStation(areaName, status, 'JZ', 0, 10000).then(function (response) {
                if (response.result.rows.length == 0) {
                    return;
                }
                $scope.stationss[areaIndex] = response.result.rows;
                var color = $scope.colorAlarm[index];
                baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute, $scope.stationss[areaIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[areaIndex], areaIndex, -xOffset, -yOffset, function () {
                        parametersDialogService.showFixingStationInfo(this.data);
                    });
                });
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
                    $scope.getStations($scope.distinctIndex, $scope.statusIndex);
                } else {
                    for (var i = 0; i < 6; ++i) {
                        $scope.getStations($scope.distinctIndex, i);
                    }
                }
            } else {
                if ($scope.statusIndex !== 6) {
                    for (var i = 1; i < 6; ++i) {
                        $scope.getStations(i, $scope.statusIndex);
                    }
                } else {
                    for (var i = 1; i < 6; ++i) {
                        for (var j = 0; j < 6; ++j)
                            $scope.getStations(i, j);
                    }
                }
            }
        };
        $scope.reflashMap();
    })
    .controller("fixing-indoor.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
        $scope.areaNames = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
        $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
        $scope.statusNames = new Array('很紧急', '紧急', '极重要', '重要', '一般', '整治完成', '全部');
        $scope.distinct = "佛山市";
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        $scope.stationss[3] = [];
        $scope.stationss[4] = [];
        $scope.stationss[5] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.colorAlarm = new Array("#FF0000", "#FF8C00", "#FFFF00", "#FF00FF", "#FF008C", "#00FF00");

        $scope.statusIndex = 6;
        $scope.status = $scope.statusNames[$scope.statusIndex];
        $scope.distinctIndex = 0;

        //获取站点
        $scope.getStations = function (areaIndex, index) {
            var areaName = $scope.areaNames[areaIndex];
            var status = $scope.statusNames[index];
            downSwitchService.getFixingStation(areaName, status, 'SF', 0, 10000).then(function (response) {
                if (response.result.rows.length == 0) {
                    return;
                }
                $scope.stationss[areaIndex] = response.result.rows;
                var color = $scope.colorAlarm[index];
                baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute, $scope.stationss[areaIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[areaIndex], areaIndex, -xOffset, -yOffset, function () {
                        parametersDialogService.showFixingStationInfo(this.data);
                    });
                });
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
                    $scope.getStations($scope.distinctIndex, $scope.statusIndex);
                } else {
                    for (var i = 0; i < 6; ++i) {
                        $scope.getStations($scope.distinctIndex, i);
                    }
                }
            } else {
                if ($scope.statusIndex !== 6) {
                    for (var i = 1; i < 6; ++i) {
                        $scope.getStations(i, $scope.statusIndex);
                    }
                } else {
                    for (var i = 1; i < 6; ++i) {
                        for (var j = 0; j < 6; ++j)
                            $scope.getStations(i, j);
                    }
                }
            }
        };
        $scope.reflashMap();
    })

    .controller("resource-station.network", function ($scope, downSwitchService, MyValue, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
        $scope.areaNames = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
        $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
        $scope.distinct = "佛山市";
        $scope.types = new Array('JZ', 'SF');
        $scope.typesDisplay = new Array('基站', '室分');
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        $scope.stationss[3] = [];
        $scope.stationss[4] = [];
        $scope.stationss[5] = [];
        baiduMapService.initializeMap("map", 13);
        baiduMapService.setCenter(MyValue.distinctIndex);
        $scope.type = 'JZ';
        $scope.typeDisplay = '基站';
        //获取站点
        $scope.getStations = function (areaName, index, type) {
            downSwitchService.getResourceStations(areaName, type, 0, 10000).then(function (response) {
                if (response.result.rows.length == 0) {
                    return;
                }
                $scope.stationss[index] = response.result.rows;
                var color = $scope.colors[index];
                baiduQueryService.transformToBaidu($scope.stationss[index][0].longtitute, $scope.stationss[index][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[index][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[index][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[index], index, -xOffset, -yOffset, function () {
                        parametersDialogService.showResourceInfo(this.data);
                    });
                });
            });
        };

        $scope.reflashMap = function (areaNameIndex, type) {
            baiduMapService.clearOverlays();
            MyValue.distinctIndex = areaNameIndex;
            var areaName = $scope.areaNames[areaNameIndex];
            $scope.distinct = $scope.distincts[areaNameIndex];
            baiduMapService.setCenter(areaNameIndex);
            if (MyValue.distinctIndex !== 0) {
                $scope.getStations(areaName, MyValue.distinctIndex, type);
            } else {
                for (var i = 1; i < 6; ++i) {
                    $scope.getStations($scope.areaNames[i], i, type);
                }
            }
        };
        $scope.changeArea = function (areaNameIndex) {
            $scope.reflashMap(areaNameIndex, 'JZ');
        }
        $scope.changeType = function (typeIndex) {
            $scope.type = $scope.types[typeIndex];
            $scope.typeDisplay = $scope.typesDisplay[typeIndex];
            $scope.reflashMap(MyValue.distinctIndex, $scope.type);
        }
        $scope.reflashMap(0, 'JZ');

    })
    .controller("resource-indoor.network", function ($scope, downSwitchService, MyValue, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
        $scope.areaNames = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
        $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
        $scope.distinct = "佛山市";
        $scope.types = new Array('JZ', 'SF');
        $scope.typesDisplay = new Array('基站', '室分');
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        $scope.stationss[3] = [];
        $scope.stationss[4] = [];
        $scope.stationss[5] = [];
        baiduMapService.initializeMap("map", 13);
        baiduMapService.setCenter(MyValue.distinctIndex);
        $scope.type = 'JZ';
        $scope.typeDisplay = '基站';
        //获取站点
        $scope.getStations = function (areaName, index, type) {
            downSwitchService.getResourceStations(areaName, type, 0, 10000).then(function (response) {
                if (response.result.rows.length == 0) {
                    return;
                }
                $scope.stationss[index] = response.result.rows;
                var color = $scope.colors[index];
                baiduQueryService.transformToBaidu($scope.stationss[index][0].longtitute, $scope.stationss[index][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[index][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[index][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[index], index, -xOffset, -yOffset, function () {
                        parametersDialogService.showResourceInfo(this.data);
                    });
                });
            });
        };

        $scope.reflashMap = function (areaNameIndex, type) {
            baiduMapService.clearOverlays();
            MyValue.distinctIndex = areaNameIndex;
            var areaName = $scope.areaNames[areaNameIndex];
            $scope.distinct = $scope.distincts[areaNameIndex];
            baiduMapService.setCenter(areaNameIndex);
            if (MyValue.distinctIndex !== 0) {
                $scope.getStations(areaName, MyValue.distinctIndex, type);
            } else {
                for (var i = 1; i < 6; ++i) {
                    $scope.getStations($scope.areaNames[i], i, type);
                }
            }
        };
        $scope.changeArea = function (areaNameIndex) {
            $scope.reflashMap(areaNameIndex, 'SF');
        }
        $scope.changeType = function (typeIndex) {
            $scope.type = $scope.types[typeIndex];
            $scope.typeDisplay = $scope.typesDisplay[typeIndex];
            $scope.reflashMap(MyValue.distinctIndex, $scope.type);
        }
        $scope.reflashMap(0, 'SF');

    })
