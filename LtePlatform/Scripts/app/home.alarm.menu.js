angular.module('home.alarm.menu', ['app.common', 'home.station'])
    .controller("menu.alarm-station",
        function($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {
            $scope.stationName = "";
            $scope.stations = [];

            $scope.search = function() {
                downSwitchService.getAlarmStationByName($scope.stationName, 'JZ', '', 1, 10).then(function(response) {
                    $scope.stations = response.result.rows;
                });
            }
            $scope.showStationInfo = function(index) {
                document.getElementById("cardlist").style.display = "none";
                parametersDialogService.showAlarmStationInfo($scope.stations[index - 1]);
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
                                    parametersDialogService
                                        .showAlarmStationInfo(this.data, $scope.beginDate, $scope.endDate);
                                });
                        });
                });
        })
    .controller("menu.alarm-indoor",
        function($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

            $scope.stationName = "";
            $scope.stations = [];

            $scope.search = function() {
                downSwitchService.getAlarmStationByName($scope.stationName, 'SF', '', 1, 10).then(function(response) {
                    $scope.stations = response.result.rows;
                });
            }
            $scope.showStationInfo = function(index) {
                document.getElementById("cardlist").style.display = "none";
                parametersDialogService.showAlarmStationInfo($scope.stations[index - 1]);
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
                                    parametersDialogService
                                        .showAlarmStationInfo(this.data, $scope.beginDate, $scope.endDate);
                                });
                        });
                });
        })
    .controller("menu.resource-station",
        function($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

            $scope.stationName = "";
            $scope.stations = [];

            $scope.search = function() {
                downSwitchService.getCommonStations($scope.stationName, 'JZ', '', 1, 10).then(function(response) {
                    $scope.stations = response.result.rows;
                });
            }
            $scope.showStationInfo = function(index) {
                document.getElementById("cardlist").style.display = "none";
                parametersDialogService.showCommonStationInfo($scope.stations[index - 1]);
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
                                    parametersDialogService.showCommonStationInfo(this.data);
                                });
                        });
                });
        })
    .controller("menu.resource-indoor",
        function($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

            $scope.stationName = "";
            $scope.stations = [];

            $scope.search = function() {
                downSwitchService.getCommonStations($scope.stationName, 'SF', '', 1, 10).then(function(response) {
                    $scope.stations = response.result.rows;
                });
            }
            $scope.showStationInfo = function(index) {
                document.getElementById("cardlist").style.display = "none";
                parametersDialogService.showCommonStationInfo($scope.stations[index - 1]);
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
                                    parametersDialogService.showCommonStationInfo(this.data);
                                });
                        });
                });
        })
    .controller("resource-station.network",
        function($scope,
            downSwitchService,
            MyValue,
            baiduMapService,
            geometryService,
            parametersDialogService,
            baiduQueryService) {
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
            $scope.getStations = function(areaName, index, type) {
                downSwitchService.getResourceStations(areaName, type, 0, 10000).then(function(response) {
                    if (response.result.rows.length == 0) {
                        return;
                    }
                    $scope.stationss[index] = response.result.rows;
                    var color = $scope.colors[index];
                    baiduQueryService.transformToBaidu($scope.stationss[index][0].longtitute,
                        $scope.stationss[index][0].lattitute).then(function(coors) {
                        var xOffset = coors.x - $scope.stationss[index][0].longtitute;
                        var yOffset = coors.y - $scope.stationss[index][0].lattitute;
                        baiduMapService.drawPointCollection($scope.stationss[index],
                            index,
                            -xOffset,
                            -yOffset,
                            function() {
                                parametersDialogService.showResourceInfo(this.data);
                            });
                    });
                });
            };

            $scope.reflashMap = function(areaNameIndex, type) {
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
            $scope.changeArea = function(areaNameIndex) {
                $scope.reflashMap(areaNameIndex, 'JZ');
            }
            $scope.changeType = function(typeIndex) {
                $scope.type = $scope.types[typeIndex];
                $scope.typeDisplay = $scope.typesDisplay[typeIndex];
                $scope.reflashMap(MyValue.distinctIndex, $scope.type);
            }
            $scope.reflashMap(0, 'JZ');

        })
    .controller("resource-indoor.network",
        function($scope,
            downSwitchService,
            MyValue,
            baiduMapService,
            geometryService,
            parametersDialogService,
            baiduQueryService) {
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
            $scope.getStations = function(areaName, index, type) {
                downSwitchService.getResourceStations(areaName, type, 0, 10000).then(function(response) {
                    if (response.result.rows.length == 0) {
                        return;
                    }
                    $scope.stationss[index] = response.result.rows;
                    var color = $scope.colors[index];
                    baiduQueryService.transformToBaidu($scope.stationss[index][0].longtitute,
                        $scope.stationss[index][0].lattitute).then(function(coors) {
                        var xOffset = coors.x - $scope.stationss[index][0].longtitute;
                        var yOffset = coors.y - $scope.stationss[index][0].lattitute;
                        baiduMapService.drawPointCollection($scope.stationss[index],
                            index,
                            -xOffset,
                            -yOffset,
                            function() {
                                parametersDialogService.showResourceInfo(this.data);
                            });
                    });
                });
            };

            $scope.reflashMap = function(areaNameIndex, type) {
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
            $scope.changeArea = function(areaNameIndex) {
                $scope.reflashMap(areaNameIndex, 'SF');
            }
            $scope.changeType = function(typeIndex) {
                $scope.type = $scope.types[typeIndex];
                $scope.typeDisplay = $scope.typesDisplay[typeIndex];
                $scope.reflashMap(MyValue.distinctIndex, $scope.type);
            }
            $scope.reflashMap(0, 'SF');

        })
    .controller("menu.operation-station",
        function($scope, downSwitchService, distinctIndex, baiduMapService, workItemDialog, baiduQueryService) {
            $scope.stationName = "";
            $scope.stations = [];
            $scope.search = function() {
                downSwitchService.getStationByName($scope.stationName, 1, 10)
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
    .controller("menu.operation-indoor",
        function($scope, downSwitchService, distinctIndex, baiduMapService, workItemDialog, baiduQueryService) {
            $scope.stationName = "";
            $scope.stations = [];
            $scope.search = function() {
                downSwitchService.getIndoorByName($scope.stationName, 1, 10)
                    .then(function(response) {
                        $scope.stations = response.result.rows;
                        $scope.displayStations();
                    });
            };
            $scope.showStationInfo = function(index) {
                document.getElementById("cardlist").style.display = "none";
                workItemDialog.showIndoorInfo($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
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
                                workItemDialog.showIndoorInfo(this.data, $scope.beginDate, $scope.endDate);
                            });
                    });
            };
        })
    .controller("menu.common-station",
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
    .controller("menu.common-indoor",
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
        });