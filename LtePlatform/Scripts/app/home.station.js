﻿angular.module('home.station', ['app.common'])
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
            workItemDialog.showStationInfoDialog($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
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
                            workItemDialog.showStationInfoDialog(this.data, $scope.beginDate, $scope.endDate);
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
            workItemDialog.showIndoorInfoDialog($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
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
                            workItemDialog.showIndoorInfoDialog(this.data, $scope.beginDate, $scope.endDate);
                        });
                });
        };
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
        downSwitchService.getStationCntToBeAdd('JZ').then(function (response) {
            $scope.toAddCnt = response.result;
        });

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
        $scope.showAddStationList = function () {
            parametersDialogService.showAddStationList('JZ');
        }
        $scope.assessment = function () {
            parametersDialogService.showAssessmentListDialog();
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

        downSwitchService.getStationCntToBeAdd('SF').then(function (response) {
            $scope.toAddCnt = response.result;
        });
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
        $scope.showAddStationList = function () {
            parametersDialogService.showAddStationList('SF');
        }
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
            parametersDialogService.showIndoorList();
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
   


