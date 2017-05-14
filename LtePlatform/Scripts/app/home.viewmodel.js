angular.module("myApp", ['app.common'])
    .config(function($stateProvider, $urlRouterProvider) {
        var viewDir = "/appViews/Home/";
        $stateProvider
            .state('list', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "Network.html",
                        controller: "home.network"
                    }
                },
                url: "/"
            })
            .state('query', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "Query.html",
                        controller: "home.query"
                    }
                },
                url: "/query"
            })
            .state('building', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "Query.html",
                        controller: "evaluation.home"
                    }
                },
                url: "/building"
            })
            .state('topic', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.kpi"
                    },
                    "contents": {
                        templateUrl: "/appViews/Parameters/Topic.html",
                        controller: "query.topic"
                    }
                },
                url: "/topic"
            })

            .state('station', {
                views: {
                    'menu': {
                        templateUrl: viewDir + "StationSearchMenu.html",
                        controller: "menu.station"
                    },
                    "contents": {
                        templateUrl: viewDir + "Station.html",
                        controller: "station.network"
                    },
                    "filter": {
                        templateUrl: viewDir + "StationFilter.html",
                        controller: "station.filter"
                    }

                },
                url: "/station"
            })
            .state('flow', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "Flow.html",
                        controller: "home.flow"
                    }
                },
                url: "/flow"
            })
            .state('dt', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.dt"
                    },
                    "contents": {
                        templateUrl: viewDir + "Network.html",
                        controller: "home.dt"
                    }
                },
                url: "/dt"
            })
            .state('kpi', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.kpi"
                    },
                    "contents": {
                        templateUrl: viewDir + "Kpi.html",
                        controller: "home.kpi"
                    }
                },
                url: "/kpi"
            })
            .state('plan', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.plan"
                    },
                    "contents": {
                        templateUrl: viewDir + "Plan.html",
                        controller: "home.plan"
                    }
                },
                url: "/plan"
            })
            .state('complain', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.complain"
                    },
                    "contents": {
                        templateUrl: viewDir + "Complain.html",
                        controller: "home.complain"
                    }
                },
                url: "/complain"
            })
            .state('college', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.college"
                    },
                    "contents": {
                        templateUrl: "/appViews/College/Root.html",
                        controller: "home.college"
                    }
                },
                url: "/college"
            })
            .state('mr', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.mr"
                    },
                    "contents": {
                        templateUrl: viewDir + "Mr.html",
                        controller: "home.mr"
                    }
                },
                url: "/mr"
            })
            .state('grid', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.mr"
                    },
                    "contents": {
                        templateUrl: viewDir + "MrGrid.html",
                        controller: "mr.grid"
                    }
                },
                url: "/grid"
            })
            .state('app', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.mr"
                    },
                    "contents": {
                        templateUrl: viewDir + "MrGrid.html",
                        controller: "mr.app"
                    }
                },
                url: "/app"
            })
            .state('analysis', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.analysis"
                    },
                    "contents": {
                        templateUrl: viewDir + "Analysis.html",
                        controller: "network.analysis"
                    }
                },
                url: "/analysis"
            })
            .state('collegeMap', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.analysis"
                    },
                    "contents": {
                        templateUrl: '/appViews/College/CollegeMenu.html',
                        controller: "college.map"
                    }
                },
                url: "/collegeMap"
            })
            .state('highway', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.analysis"
                    },
                    "contents": {
                        templateUrl: '/appViews/Evaluation/Highway.html',
                        controller: "analysis.highway"
                    }
                },
                url: "/highway"
            })
            .state('railway', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.analysis"
                    },
                    "contents": {
                        templateUrl: '/appViews/Evaluation/Railway.html',
                        controller: "analysis.railway"
                    }
                },
                url: "/railway"
            })
            .state('subway', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.analysis"
                    },
                    "contents": {
                        templateUrl: '/appViews/Evaluation/Subway.html',
                        controller: "analysis.subway"
                    }
                },
                url: "/subway"
            })
            .state('highvalue', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.analysis"
                    },
                    "contents": {
                        templateUrl: '/appViews/Evaluation/HighValue.html',
                        controller: "analysis.highvalue"
                    }
                },
                url: "/highvalue"
            })

            .state('alarm', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Evaluation/AlarmSearchMenu.html",
                        controller: "menu.alarm"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Alarm.html",
                        controller: "alarm.network"
                    }

                },
                url: "/alarm"
            })
            .state('special-station', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.checking"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/SpecialStation.html",
                        controller: "special-station.network"
                    }

                },
                url: "/special-station"
            })
            .state('special-indoor', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.checking"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/SpecialStation.html",
                        controller: "special-indoor.network"
                    }

                },
                url: "/special-indoor"
            })
            .state('long-term', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.checking"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/FaultStation.html",
                        controller: "fault-station.network"
                    }
                },
                url: "/long-term"
            })
            .state('clear-flow', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.checking"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/ClearZero.html",
                        controller: "clear-flow.network"
                    }
                },
                url: "/clear-flow"
            })
            .state('clear-voice', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.checking"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/ClearZero.html",
                        controller: "clear-voice.network"
                    }
                },
                url: "/clear-voice"
            });
        $urlRouterProvider.otherwise('/');
    })

    .value("distinctIndex", 0)
    .value("myValue", {
        "distinctIndex": 0,
        "stationGrade": "A",
        "netType": "L",
        "roomAttribution": "电信",
        "towerAttribution": "电信",
        "isPower": "是",
        "isBBU": "否"
    })

    .run(function ($rootScope, appUrlService, appRegionService, geometryService) {
        $rootScope.rootPath = "/#/";

        $rootScope.page = {
            title: "基础数据总览"
        };
        appUrlService.initializeAuthorization();
        $rootScope.legend = {
            criteria: [],
            intervals: [],
            sign: true,
            title: ''
        };

        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $rootScope.beginDate = {
            value: new Date(lastWeek.getFullYear(), lastWeek.getMonth(), lastWeek.getDate(), 8),
            opened: false
        };
        var today = new Date();
        $rootScope.endDate = {
            value: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8),
            opened: false
        };
        $rootScope.closeAlert = function(messages, index) {
            messages.splice(index, 1);
        };
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        $rootScope.statDate = {
            value: yesterday,
            opened: false
        };

        $rootScope.status = {
            isopen: false
        };
        $rootScope.city = {
            selected: "",
            options: []
        };
        appRegionService.initializeCities()
            .then(function(result) {
                $rootScope.city.options = result;
                $rootScope.city.selected = result[0];
            });

        $rootScope.indexedDB = {
            name: 'ouyh18',
            version: 7,
            db: null
        };
        $rootScope.colors = geometryService.queryMapColors();
    })
    .controller("menu.root", function($scope) {
        $scope.menuItem = {
            displayName: "站点信息",
            subItems: [
                {
                    displayName: "数据总览",
                    url: "/#/"
                }, {
                    displayName: "数据查询",
                    url: "/#/query"
                }, {
                    displayName: "流量经营",
                    url: '/#/flow'
                }, {
                    displayName: "万栋楼宇",
                    url: '/#/building'
                }
            ]
        };
    })

    .controller("menu.station", function ($scope, downSwitchService, distinctIndex, baiduMapService, parametersDialogService, baiduQueryService) {
        $scope.stationName = "";
        $scope.stations = [];
        $scope.areaNames = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
        $scope.search = function () {
            downSwitchService.getStationByName($scope.stationName, $scope.areaNames[distinctIndex], 1, 10).then(function(response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            parametersDialogService.showStationInfo($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
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
                    parametersDialogService.showStationInfo(this.data);
                });
            });
        });
    })

    .controller("station.filter", function ($scope, downSwitchService, myValue, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
        $scope.grades = [
            { value: '', name: '所有级别' },
            { value: 'A', name: '站点级别A' },
            { value: 'B', name: '站点级别B' },
            { value: 'C', name: '站点级别C' },
            { value: 'D', name: '站点级别D' }
        ];
        $scope.roomAttributions = [
            { value: '', name: '所有机房' },
            { value: '电信', name: '电信机房' },
            { value: '铁塔', name: '铁塔机房' },
            { value: '联通', name: '联通机房' }
        ];
        $scope.towerAttributions = [
            { value: '', name: '全部杆塔' },
            { value: '电信', name: '电信杆塔' },
            { value: '铁塔', name: '铁塔杆塔' },
            { value: '联通', name: '联通杆塔' }
        ];
        $scope.isBBUs = [
            { value: '', name: '全部BBU' },
            { value: '是', name: 'BBU池' },
            { value: '否', name: '非BBU池' }
        ];
        $scope.netTypes = [
            { value: '', name: '全部网络' },
            { value: 'C', name: 'C网络' },
            { value: 'L', name: 'L网络' },
            { value: 'VL', name: 'VL网络' },
            { value: 'C+L', name: 'C+L网络' },
            { value: 'C+VL', name: 'C+VL网络' },
            { value: 'L+VL', name: 'L+VL网络' }
        ];
        $scope.isPowers = [
            { value: '', name: '所有动力配套' },
            { value: '是', name: '有动力配套' },
            { value: '否', name: '没有动力配套' }
        ];

        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        $scope.stationss[3] = [];
        $scope.stationss[4] = [];
        $scope.stationss[5] = [];
        $scope.areaNames = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
        baiduMapService.initializeMap("map", 13);

        $scope.getStations = function (areaName, index) {
            downSwitchService.getStationByFilter(areaName, myValue.stationGrade, myValue.netType, myValue.roomAttribution,
                 myValue.towerAttribution, myValue.isPower, myValue.isBBU, 0, 10000).then(function (response) {
                     $scope.stationss[index] = response.result.rows;
                     var color = $scope.colors[index];
                     baiduQueryService.transformToBaidu($scope.stationss[index][0].longtitute, $scope.stationss[index][0].lattitute).then(function (coors) {
                         var xOffset = coors.x - $scope.stationss[index][0].longtitute;
                         var yOffset = coors.y - $scope.stationss[index][0].lattitute;
                         baiduMapService.drawPointCollection($scope.stationss[index], color, -xOffset, -yOffset, function (e) {
                             parametersDialogService.showStationInfo(e.point.data);
                         });
                     });
                 });
        };

        $scope.reflashMap = function () {

            baiduMapService.clearOverlays();
            var areaName = $scope.areaNames[myValue.distinctIndex];
            baiduMapService.setCenter(myValue.distinctIndex);
            if (myValue.distinctIndex !== 0) {
                $scope.getStations(areaName, myValue.distinctIndex);
            } else {
                for (var i = 1; i < 6; ++i) {
                    $scope.getStations($scope.areaNames[i], i);
                }
            }

        };
        $scope.change = function () {
            myValue.stationGrade = $scope.selectedGrade;
            myValue.netType = $scope.selectedNetType;
            myValue.roomAttribution = $scope.selectedRoomAttribution;
            myValue.towerAttribution = $scope.selectedTowerAttribution;
            myValue.isPower = $scope.selectedIsPower;
            myValue.isBBU = $scope.selectedIsBBU;
            $scope.reflashMap();
        };
        //$scope.reflashMap();
    })

    .controller("menu.alarm", function ($scope, downSwitchService, baiduMapService, parametersDialogService, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];

        $scope.search = function () {
            downSwitchService.getAlarmStationByName($scope.stationName, 1, 10).then(function (response) {
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

    .controller('menu.checking', function ($scope) {
        $scope.menuItem = {
            displayName: "网络整治",
            subItems: [
                {
                    displayName: "网运专项-基站",
                    url: '/#/special-station'
                }, {
                    displayName: "网运专项-室分",
                    url: '/#/special-indoor'
                }, {
                    displayName: "长期故障",
                    url: '/#/long-term'
                }, {
                    displayName: "清网排障-零流量",
                    url: '/#/clear-flow'
                }, {
                    displayName: "清网排障-零话务",
                    url: '/#/clear-voice'
                }
            ]
        };
    })

    .controller('menu.plan', function($scope, appUrlService) {
        $scope.menuItem = {
            displayName: "规划支撑",
            subItems: [
                {
                    displayName: "规划辅助",
                    url: appUrlService.getPlanUrlHost() + 'guihua'
                }, {
                    displayName: "完整准确性保障",
                    url: appUrlService.getParameterUrlHost() + 'zhunquexing2.php'
                }, {
                    displayName: "工程入网",
                    url: appUrlService.getParameterUrlHost() + 'zhunquexing2.php'
                }
            ]
        };
    })

    .controller('menu.complain', function ($scope, appUrlService) {
        $scope.menuItem = {
            displayName: "投诉管理",
            subItems: [
                {
                    displayName: "统计分析",
                    url: '/#/complain'
                }, {
                    displayName: "在线支撑",
                    url: appUrlService.getCustomerHost() + 'IndexOfComplaints.aspx'
                }
            ]
        };
    })
    .controller('menu.college', function ($scope) {
        $scope.menuItem = {
            displayName: "校园网专题",
            subItems: [
                {
                    displayName: "小区分布",
                    url: '/#/college'
                }
            ]
        };
    })

    .controller('menu.kpi', function($scope, appUrlService) {
        $scope.menuItem = {
            displayName: "指标优化",
            subItems: [
                {
                    displayName: "指标总览",
                    url: "/Rutrace",
                    tooltip: "4G总体指标"
                }, {
                    displayName: "质量分析",
                    url: appUrlService.getTopnUrlHost() + '2g_home',
                    tooltip: "4G网络质量分析与日常优化"
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
    .controller('menu.mr', function ($scope) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "MR分析",
            subItems: [
                {
                    displayName: "模拟路测",
                    url: rootUrl + "/mr"
                },{
                    displayName: "栅格分析",
                    url: rootUrl + "/grid"
                }, {
                    displayName: "APP分析",
                    url: rootUrl + "/app"
                }, {
                    displayName: "工单管控",
                    url: "/Kpi/WorkItem",
                    tooltip: "对接本部优化部4G网优平台，结合日常优化，实现对日常工单的监控和分析"
                }
            ]
        }
    })
    .controller('menu.dt', function ($scope, appUrlService) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "路测管理",
            subItems: [
                {
                    displayName: "路测数据总览",
                    url: rootUrl + "/dt"
                }, {
                    displayName: "路测分析",
                    url: appUrlService.getDtUrlHost()
                }, {
                    displayName: "CQT管理",
                    url: appUrlService.getPlanUrlHost() + 'CQT'
                }
            ]
        };
    })
    .controller("menu.analysis", function($scope) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "网络分析",
            subItems: [
                {
                    displayName: "室内分布",
                    url: rootUrl + "/analysis"
                }, {
                    displayName: "校园网地图",
                    url: rootUrl + "/collegeMap"
                }, {
                    displayName: "高速专题",
                    url: rootUrl + "/highway"
                }, {
                    displayName: "高铁专题",
                    url: rootUrl + "/railway"
                }, {
                    displayName: "地铁专题",
                    url: rootUrl + "/subway"
                }, {
                    displayName: "高价值区域",
                    url: rootUrl + "/highvalue"
                }
            ]
        }
    })

    .controller("home.network", function ($scope, appRegionService, networkElementService, baiduMapService, coverageDialogService,
        geometryService, parametersDialogService, neGeometryService, baiduQueryService, dumpPreciseService) {
        baiduMapService.initializeMap("map", 11);
        $scope.currentView = "LTE基站";
        $scope.showDistrictOutdoor = function(district, color) {
            var city = $scope.city.selected;
            baiduMapService.addDistrictBoundary(district, color);
            $scope.legend.intervals.push({
                threshold: district,
                color: color
            });
            networkElementService.queryOutdoorCellSites(city, district).then(function(sites) {
                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                    var xOffset = coors.x - sites[0].longtitute;
                    var yOffset = coors.y - sites[0].lattitute;
                    baiduMapService.drawMultiPoints(sites, color, -xOffset, -yOffset, function(e) {
                        var xCenter = e.point.lng - xOffset;
                        var yCenter = e.point.lat - yOffset;
                        networkElementService.queryRangeSectors(
                            neGeometryService.queryNearestRange(xCenter, yCenter), []).then(function(sectors) {
                            parametersDialogService.showCellsInfo(sectors);
                        });
                    });
                });
            });
        };
        
        $scope.showOutdoorSites = function () {
            $scope.currentView = "室外小区";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary($scope.city.selected);
            $scope.legend.title = $scope.city.selected;
            $scope.legend.intervals = [];
            angular.forEach($scope.districts, function(district, $index) {
                $scope.showDistrictOutdoor(district, $scope.colors[$index]);
            });
        };

        $scope.showDistrictIndoor = function(district, color) {
            var city = $scope.city.selected;
            baiduMapService.addDistrictBoundary(district, color);
            $scope.legend.intervals.push({
                threshold: district,
                color: color
            });
            networkElementService.queryIndoorCellSites(city, district).then(function(sites) {
                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                    var xOffset = coors.x - sites[0].longtitute;
                    var yOffset = coors.y - sites[0].lattitute;
                    baiduMapService.drawMultiPoints(sites, color, -xOffset, -yOffset, function(e) {
                        var xCenter = e.point.lng - xOffset;
                        var yCenter = e.point.lat - yOffset;
                        networkElementService.queryRangeSectors(
                            neGeometryService.queryNearestRange(xCenter, yCenter), []).then(function(sectors) {
                            parametersDialogService.showCellsInfo(sectors);
                        });
                    });
                });
            });
        };

        $scope.showIndoorSites = function () {
            $scope.currentView = "室内小区";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary($scope.city.selected);
            $scope.legend.title = $scope.city.selected;
            $scope.legend.intervals = [];
            angular.forEach($scope.districts, function (district, $index) {
                $scope.showDistrictIndoor(district, $scope.colors[$index]);
            });
        };

        $scope.showDistrictENodebs = function(district, color) {
            var city = $scope.city.selected;
            baiduMapService.addDistrictBoundary(district, color);
            $scope.legend.intervals.push({
                threshold: district,
                color: color
            });
            networkElementService.queryENodebsInOneDistrict(city, district).then(function (sites) {
                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function (coors) {
                    var xOffset = coors.x - sites[0].longtitute;
                    var yOffset = coors.y - sites[0].lattitute;
                    baiduMapService.drawMultiPoints(sites, color, -xOffset, -yOffset, function (e) {
                        var xCenter = e.point.lng - xOffset;
                        var yCenter = e.point.lat - yOffset;
                        var container = neGeometryService.queryNearestRange(xCenter, yCenter);
                        container.excludedIds = [];
                        networkElementService.queryRangeENodebs(container).then(function(items) {
                            if (items.length) {
                                parametersDialogService.showENodebInfo(items[0], $scope.beginDate, $scope.endDate);
                            }
                        });
                    });
                });
            });
        };
        $scope.showLteENodebs = function() {
            $scope.currentView = "LTE基站";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary($scope.city.selected);
            $scope.legend.title = $scope.city.selected;
            $scope.legend.intervals = [];
            angular.forEach($scope.districts, function(district, $index) {
                $scope.showDistrictENodebs(district, $scope.colors[$index]);
            });
        };

        $scope.showLteTownStats = function () {
            var city = $scope.city.selected;
            coverageDialogService.showTownStats(city);
        };
        $scope.showCdmaTownStats = function () {
            var city = $scope.city.selected;
            coverageDialogService.showCdmaTownStats(city);
        };
        $scope.districts = [];
        
        $scope.$watch('city.selected', function(city) {
            if (city) {
                $scope.legend.title = city;
                $scope.legend.intervals = [];
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function(district, $index) {
                    $scope.showDistrictENodebs(district, $scope.colors[$index]);
                });
            }
        });
    })

    .controller("evaluation.home", function ($scope, baiduMapService, baiduQueryService,
        parametersMapService, parametersDialogService) {
        baiduMapService.initializeMap("map", 12);
        baiduQueryService.queryWandonglouyu().then(function (buildings) {
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            parametersMapService.showPhpElements(buildings, parametersDialogService.showBuildingInfo);
        });
    })
    .controller("station.network", function ($scope, downSwitchService, distinctIndex, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
        $scope.areaNames = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
        $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
        $scope.distinct = "佛山市";
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        $scope.stationss[3] = [];
        $scope.stationss[4] = [];
        $scope.stationss[5] = [];
        baiduMapService.initializeMap("map", 13);
        baiduMapService.setCenter(distinctIndex);
        //获取站点
        $scope.getStations = function (areaName, index) {
            downSwitchService.getStationsByAreaName(areaName, 0, 10000).then(function (response) {
                $scope.stationss[index] = response.result.rows;
                var color = $scope.colors[index];        
                baiduQueryService.transformToBaidu($scope.stationss[index][0].longtitute, $scope.stationss[index][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[index][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[index][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[index], color, -xOffset, -yOffset, function (e) {
                        console.log(e.point.data);
                    });
                });
            });
        };
        $scope.reflashMap = function (areaNameIndex) {
            baiduMapService.clearOverlays();
            distinctIndex = areaNameIndex;
            var areaName = $scope.areaNames[areaNameIndex];
            $scope.distinct = $scope.distincts[areaNameIndex];
            baiduMapService.setCenter(areaNameIndex);
            if (distinctIndex !== 0) {
                $scope.getStations(areaName, distinctIndex);
            } else {
                for (var i = 1; i < 6; ++i) {
                    $scope.getStations($scope.areaNames[i], i);
                }
            }

        };
        $scope.showStationList = function() {
            parametersDialogService.showStationList();
        };
        $scope.reflashMap(0);
    })

    .controller('home.flow', function ($scope, baiduMapService, baiduQueryService, coverageDialogService, flowService, chartCalculateService) {
        baiduMapService.initializeMap("map", 11);
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
            baiduQueryService.transformToBaidu($scope.flowGeoPoints[0].longtitute, $scope.flowGeoPoints[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.flowGeoPoints[0].longtitute;
                var yOffset = coors.y - $scope.flowGeoPoints[0].lattitute;
                var points = _.map($scope.flowGeoPoints, function (stat) {
                    return { "lng": stat.longtitute + xOffset, "lat": stat.lattitute + yOffset, "count": stat.downlinkFeelingRate };
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

        $scope.showUplinkFeelingRate = function () {
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
            baiduQueryService.transformToBaidu($scope.flowGeoPoints[0].longtitute, $scope.flowGeoPoints[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.flowGeoPoints[0].longtitute;
                var yOffset = coors.y - $scope.flowGeoPoints[0].lattitute;
                var points = _.map($scope.flowGeoPoints, function (stat) {
                    return { "lng": stat.longtitute + xOffset, "lat": stat.lattitute + yOffset, "count": stat.uplinkFeelingRate };
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


        $scope.showFlow = function () {
            coverageDialogService.showFlowStats($scope.statDate.value || new Date());
        };
        $scope.showFlowTrend = function () {
            coverageDialogService.showFlowTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
        };
        $scope.showUsersTrend = function () {
            coverageDialogService.showUsersTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
        };
        $scope.showFeelingRateTrend = function () {
            coverageDialogService.showFeelingRateTrend($scope.city.selected, $scope.beginDate, $scope.endDate);
        };
        flowService.queryENodebGeoFlowByDateSpan($scope.beginDate.value, $scope.endDate.value).then(function (result) {
            $scope.flowGeoPoints = result;
            $scope.showFeelingRate();
        });
    })
    .controller("home.dt", function ($scope, baiduMapService, coverageService, appFormatService, parametersDialogService,
        appRegionService, baiduQueryService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        $scope.legend.intervals = [];
        coverageService.queryAreaTestDate().then(function (result) {
            angular.forEach(result, function(item, $index) {
                if (item.cityName) {
                    baiduMapService.drawCustomizeLabel(item.longtitute, item.lattitute + 0.005, item.cityName + item.districtName + item.townName,
                        '4G测试日期:' + appFormatService.getDateString(appFormatService.getDate(item.latestDate4G), 'yyyy-MM-dd')
                        + '<br/>3G测试日期:' + appFormatService.getDateString(appFormatService.getDate(item.latestDate3G), 'yyyy-MM-dd')
                        + '<br/>2G测试日期:' + appFormatService.getDateString(appFormatService.getDate(item.latestDate2G), 'yyyy-MM-dd'), 3);
                    var marker = baiduMapService.generateIconMarker(item.longtitute, item.lattitute,
                        "/Content/Images/Hotmap/site_or.png");
                    baiduMapService.addOneMarkerToScope(marker, parametersDialogService.showTownDtInfo, item);
                    appRegionService.queryTownBoundaries(item.cityName, item.districtName, item.townName).then(function (boundaries) {
                        angular.forEach(boundaries, function (boundary) {
                            baiduQueryService.transformToBaidu(boundary.boundaryGeoPoints[0].longtitute, boundary.boundaryGeoPoints[0].lattitute).then(function (coors) {
                                var xOffset = coors.x - boundary.boundaryGeoPoints[0].longtitute;
                                var yOffset = coors.y - boundary.boundaryGeoPoints[0].lattitute;
                                baiduMapService.addBoundary(boundary.boundaryGeoPoints, $scope.colors[$index % $scope.colors.length], xOffset, yOffset);
                            });
                        });
                    });
                }

            });

        });

    })
    .controller("home.mr", function ($scope, baiduMapService, coverageService, kpiDisplayService, parametersMapService, appUrlService,
    coverageDialogService) {
        baiduMapService.initializeMap("map", 13);
        
        var legend = kpiDisplayService.queryCoverageLegend('RSRP');
        $scope.legend.title = 'RSRP';
        $scope.legend.criteria = legend.criteria;
        $scope.legend.sign = legend.sign;
        $scope.currentDataLabel = "districtPoints";
        $scope.showStats = function() {
            coverageDialogService.showAgpsStats($scope.data);
        };
        $scope.showTelecomCoverage = function () {
            $scope.currentView = "电信";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
            kpiDisplayService.generateTelecomRsrpPoints($scope.coveragePoints, $scope.data);
            parametersMapService.showIntervalPoints($scope.coveragePoints.intervals);
        };
        $scope.showUnicomCoverage = function () {
            $scope.currentView = "联通";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
            kpiDisplayService.generateUnicomRsrpPoints($scope.coveragePoints, $scope.data);
            parametersMapService.showIntervalPoints($scope.coveragePoints.intervals);
        };
        $scope.showMobileCoverage = function () {
            $scope.currentView = "移动";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
            kpiDisplayService.generateMobileRsrpPoints($scope.coveragePoints, $scope.data);
            parametersMapService.showIntervalPoints($scope.coveragePoints.intervals);
        };
        $scope.updateIndexedData = function() {
            var items = [];
            angular.forEach($scope.data, function(data) {
                data['topic'] = data.longtitute + ',' + data.lattitute;
                items.push(data);
            });
            appUrlService.refreshIndexedDb($scope.indexedDB.db, $scope.currentDataLabel, 'topic', items);
        };
        $scope.showDistrictRange = function() {
            coverageService.queryAgisDtPointsByTopic($scope.beginDate.value, $scope.endDate.value, '禅城').then(function (result) {
                $scope.data = result;
                $scope.currentDataLabel = 'districtPoints';
                $scope.updateIndexedData();
                $scope.showTelecomCoverage();
            });
        };
        $scope.showSmallRange = function() {
            coverageService.queryAgisDtPointsByTopic($scope.beginDate.value, $scope.endDate.value, '小范围').then(function(result) {
                $scope.data = result;
                $scope.currentDataLabel = 'rangePoints';
                $scope.updateIndexedData();
                $scope.showTelecomCoverage();
            });
        };
        $scope.switchData = function() {
            if ($scope.currentDataLabel === 'districtPoints') {
                $scope.currentDataLabel = 'rangePoints';
            } else {
                $scope.currentDataLabel = 'districtPoints';
            }
            appUrlService.fetchStoreByCursor($scope.indexedDB.db, $scope.currentDataLabel, function (items) {
                $scope.data = items;
                $scope.showTelecomCoverage();
            });
        };
        appUrlService.initializeIndexedDb($scope.indexedDB, ['districtPoints','rangePoints'], "topic", function () {
            appUrlService.fetchStoreByCursor($scope.indexedDB.db, 'districtPoints', function(items) {
                $scope.data = items;
                $scope.showTelecomCoverage();
            });
        });
    })
    .controller("mr.grid", function ($scope, baiduMapService, coverageService, authorizeService, kpiDisplayService,
        baiduQueryService, coverageDialogService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        $scope.currentView = "自身覆盖";
        $scope.setRsrpLegend = function() {
            var legend = kpiDisplayService.queryCoverageLegend('rsrpInterval');
            $scope.legend.title = 'RSRP区间';
            $scope.legend.criteria = legend.criteria;
            $scope.colorDictionary = {};
            angular.forEach(legend.criteria, function(info) {
                $scope.colorDictionary[info.threshold] = info.color;
            });
            $scope.legend.sign = legend.sign;
        };
        $scope.setCompeteLegend = function() {
            var legend = kpiDisplayService.queryCoverageLegend('competeResult');
            $scope.legend.title = '竞争结果';
            $scope.legend.criteria = legend.criteria;
            $scope.colorDictionary = {};
            angular.forEach(legend.criteria, function(info) {
                $scope.colorDictionary[info.threshold] = info.color;
                
            });
            $scope.legend.sign = legend.sign;
        };
        $scope.showGridStats = function () {
            var keys = [];
            angular.forEach($scope.legend.criteria, function (info) {
                keys.push(info.threshold);
            });
            coverageDialogService.showGridStats($scope.currentDistrict, $scope.currentView, $scope.legend.title, $scope.areaStats, keys);
        };
        $scope.showDistrictSelfCoverage = function (district, color) {
            baiduMapService.clearOverlays();
            baiduMapService.addDistrictBoundary(district, color);
            $scope.areaStats = {};
            angular.forEach($scope.legend.criteria, function(info) {
                $scope.areaStats[info.threshold] = 0;
            });
            coverageService.queryMrGridSelfCoverage(district, $scope.endDate.value).then(function (result) {
                baiduQueryService.transformToBaidu(113, 23).then(function(coors) {
                    var xOffset = coors.x - 113;
                    var yOffset = coors.y - 23;
                    angular.forEach(result, function(item) {
                        var gridColor = $scope.colorDictionary[item.rsrpLevelDescription];
                        var polygon = baiduMapService.drawPolygonWithColor(item.coordinates, gridColor, -xOffset, -yOffset);
                        var area = BMapLib.GeoUtils.getPolygonArea(polygon);
                        
                        if (area > 0) {
                            $scope.areaStats[item.rsrpLevelDescription] += area;
                        }
                    });
                });
            });
        };
        $scope.showDistrictCompeteCoverage = function (district, color, competeDescription) {
            baiduMapService.clearOverlays();
            baiduMapService.addDistrictBoundary(district, color);
            $scope.areaStats = {};
            angular.forEach($scope.legend.criteria, function (info) {
                $scope.areaStats[info.threshold] = 0;
            });
            coverageService.queryMrGridCompete(district, $scope.endDate.value, competeDescription).then(function(result) {
                baiduQueryService.transformToBaidu(113, 23).then(function (coors) {
                    var xOffset = coors.x - 113;
                    var yOffset = coors.y - 23;
                    angular.forEach(result, function (item) {
                        var gridColor = $scope.colorDictionary[item.rsrpLevelDescription];
                        var polygon = baiduMapService.drawPolygonWithColor(item.coordinates, gridColor, -xOffset, -yOffset);
                        var area = BMapLib.GeoUtils.getPolygonArea(polygon);

                        if (area > 0) {
                            $scope.areaStats[item.rsrpLevelDescription] += area;
                        }
                    });
                });
            });
        };
        $scope.showMrGrid = function (district) {
            $scope.currentDistrict = district;
            if ($scope.currentView === '自身覆盖') {
                $scope.setRsrpLegend();
                $scope.showDistrictSelfCoverage(district, $scope.colors[0]);
            } else {
                $scope.showDistrictCompeteCoverage(district, $scope.colors[0], $scope.currentView);
            }
            
        };
        $scope.showTelecomCoverage = function () {
            $scope.currentView = "自身覆盖";
            $scope.setRsrpLegend();
            $scope.showDistrictSelfCoverage($scope.currentDistrict, $scope.colors[0]);
        };
        $scope.showMobileCompete = function () {
            $scope.currentView = "移动竞对";
            $scope.setCompeteLegend();
            $scope.showDistrictCompeteCoverage($scope.currentDistrict, $scope.colors[0], $scope.currentView);
        };
        $scope.showUnicomCompete = function() {
            $scope.currentView = "联通竞对";
            $scope.setCompeteLegend();
            $scope.showDistrictCompeteCoverage($scope.currentDistrict, $scope.colors[0], $scope.currentView);
        };
        $scope.showOverallCompete = function() {
            $scope.currentView = "竞对总体";
            $scope.setCompeteLegend();
            $scope.showDistrictCompeteCoverage($scope.currentDistrict, $scope.colors[0], $scope.currentView);
        };
        $scope.districts = [];
        $scope.setRsrpLegend();
        authorizeService.queryCurrentUserName().then(function (userName) {
            authorizeService.queryRolesInUser(userName).then(function (roles) {
                angular.forEach(roles, function (role) {
                    var district = authorizeService.queryRoleDistrict(role);
                    if (district) {
                        $scope.districts.push(district);
                    }
                });
                if ($scope.districts.length > 0) {
                    $scope.currentDistrict = $scope.districts[0];
                    $scope.showDistrictSelfCoverage($scope.districts[0], $scope.colors[0]);
                }
            });
        });
    })
    .controller("mr.app", function ($scope, baiduMapService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

    })
    .controller("home.complain", function ($scope, baiduMapService, dumpPreciseService, complainService, baiduQueryService, neGeometryService,
        networkElementService, parametersDialogService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

        $scope.showDistrictComplains = function(district, color) {
            var city = $scope.city.selected;
            baiduMapService.addDistrictBoundary(district, color);
            $scope.legend.intervals.push({
                threshold: district,
                color: color
            });
            complainService.queryLastMonthOnlineListInOneDistrict($scope.endDate.value, city, district).then(function (sites) {
                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function (coors) {
                    var xOffset = coors.x - sites[0].longtitute;
                    var yOffset = coors.y - sites[0].lattitute;
                    baiduMapService.drawMultiPoints(sites, color, -xOffset, -yOffset, function (e) {
                        var xCenter = e.point.lng - xOffset;
                        var yCenter = e.point.lat - yOffset;
                        var container = neGeometryService.queryNearestRange(xCenter, yCenter);
                        networkElementService.queryRangeComplains(container).then(function (items) {
                            if (items.length) {
                                parametersDialogService.showOnlineSustainInfos(items);
                            }
                        });
                    });
                });
            });
        };

        $scope.districts = [];

        $scope.$watch('city.selected', function (city) {
            if (city) {
                $scope.legend.title = city;
                $scope.legend.intervals = [];
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function (district, $index) {
                    $scope.showDistrictComplains(district, $scope.colors[$index]);
                });
            }
        });

    })
    .controller("network.analysis", function ($scope, baiduMapService, networkElementService, dumpPreciseService,
        baiduQueryService, neGeometryService, parametersMapService) {
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
        $scope.showDistrictDistributions = function (district) {
            baiduMapService.addDistrictBoundary(district);
            networkElementService.queryDistributionsInOneDistrict(district).then(function (sites) {
                angular.forEach(sites, function(site) {
                    $scope.indoorDistributions.push(site);
                });
                parametersMapService.displaySourceDistributions($scope.indoorDistributions, $scope.distributionFilters, $scope.colors);
            });
        };

        $scope.showSourceDistributions = function () {
            $scope.currentView = "信源类别";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary($scope.city.selected);
            $scope.updateSourceLegendDefs();
            
            angular.forEach($scope.districts, function (district) {
                baiduMapService.addDistrictBoundary(district);
            });
            parametersMapService.displaySourceDistributions($scope.indoorDistributions, $scope.distributionFilters, $scope.colors);
        };
        $scope.showScaleDistributions = function() {
            $scope.currentView = "规模";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary($scope.city.selected);
            $scope.updateScaleLegendDefs();

            angular.forEach($scope.districts, function(district) {
                baiduMapService.addDistrictBoundary(district);
            });
            parametersMapService.displaySourceDistributions($scope.indoorDistributions, $scope.scaleFilters, $scope.colors);
        };

        $scope.updateSourceLegendDefs = function() {
            $scope.legend.title = "信源类别";
            $scope.legend.intervals = [];
            var sourceDefs = ['LC信源', '纯L信源', '纯C信源', '非RRU信源'];
            angular.forEach(sourceDefs, function(def, $index) {
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
            angular.forEach(sourceDefs, function(def, $index) {
                $scope.legend.intervals.push({
                    threshold: def,
                    color: $scope.colors[$index]
                });
            });
        };

        $scope.$watch('city.selected', function (city) {
            if (city) {
                $scope.legend.title = '信源类别';
                $scope.updateSourceLegendDefs();
                $scope.indoorDistributions = [];
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function (district) {
                    $scope.showDistrictDistributions(district);
                });
            }
        });
    })
    .controller("college.map", function ($scope, collegeDialogService, baiduMapService, collegeMapService, parametersDialogService) {
        $scope.collegeInfo = {
            year: {
                options: [2015, 2016, 2017, 2018, 2019],
                selected: new Date().getYear() + 1900
            }
        };
        $scope.displayCollegeMap = function () {
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary($scope.city.selected);
            collegeMapService.showCollegeInfos(function(college) {
                collegeDialogService.showCollegDialog(college, $scope.collegeInfo.year.selected);
            }, $scope.collegeInfo.year.selected);
        };
        $scope.maintainInfo = function() {
            parametersDialogService.maintainCollegeInfo($scope.collegeInfo.year.selected);
        };
        $scope.showFlow = function() {
            parametersDialogService.showCollegeFlow($scope.collegeInfo.year.selected);
        };

        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

        $scope.$watch('collegeInfo.year.selected', function(year) {
            if (year > 0) {
                $scope.displayCollegeMap();
            }
        });
    })
    .controller("analysis.highway", function ($scope, baiduMapService, basicImportService, parametersMapService) {
        baiduMapService.initializeMap("map", 11);
        $scope.showView = function (hotSpot) {
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
    .controller("analysis.railway", function ($scope, baiduMapService, basicImportService, parametersMapService) {
        baiduMapService.initializeMap("map", 11);
        $scope.showView = function (hotSpot) {
            $scope.currentView = hotSpot.hotspotName;
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            parametersMapService.showHotSpotCellSectors(hotSpot.hotspotName, $scope.beginDate, $scope.endDate);
            baiduMapService.setCellFocus(hotSpot.longtitute, hotSpot.lattitute, 13);
        };
        basicImportService.queryHotSpotsByType("高速铁路").then(function (spots) {
            $scope.hotSpots = spots;
            $scope.showView($scope.hotSpots[0]);
        });
    })
    .controller("analysis.subway", function ($scope, baiduMapService, basicImportService, parametersMapService) {
        baiduMapService.initializeMap("map", 11);
        $scope.showView = function (hotSpot) {
            $scope.currentView = hotSpot.hotspotName;
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            parametersMapService.showHotSpotCellSectors(hotSpot.hotspotName, $scope.beginDate, $scope.endDate);
            baiduMapService.setCellFocus(hotSpot.longtitute, hotSpot.lattitute, 13);
        };
        basicImportService.queryHotSpotsByType("地铁").then(function (spots) {
            $scope.hotSpots = spots;
            $scope.showView($scope.hotSpots[0]);
        });
    })
    .controller("analysis.highvalue", function ($scope, baiduMapService, basicImportService, parametersMapService) {
        baiduMapService.initializeMap("map", 11);
        $scope.showView = function (hotSpot) {
            $scope.currentView = hotSpot.hotspotName;
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            parametersMapService.showHotSpotCellSectors(hotSpot.hotspotName, $scope.beginDate, $scope.endDate);
            baiduMapService.setCellFocus(hotSpot.longtitute, hotSpot.lattitute, 13);
        };
        basicImportService.queryHotSpotsByType("高价值区域").then(function (spots) {
            $scope.hotSpots = spots;
            $scope.showView($scope.hotSpots[0]);
        });
    })
    .controller("home.college", function ($scope, baiduMapService, collegeQueryService, parametersMapService, collegeService,
        collegeMapService, baiduQueryService, collegeDialogService) {
        baiduMapService.initializeMap("map", 11);
        $scope.year = new Date().getYear() + 1900;
        $scope.showView = function (college) {
            $scope.currentView = college.name;
            $scope.currentCollege = college;
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            collegeMapService.drawCollegeArea(college.id, function (center) {
                baiduQueryService.transformToBaidu(center.X, center.Y).then(function (coors) {
                    $scope.center = {
                        X: 2 * center.X - coors.x,
                        Y: 2 * center.Y - coors.y,
                        points: center.points
                    };
                });
            });
            
            parametersMapService.showHotSpotCellSectors(college.name, $scope.beginDate, $scope.endDate);
        };

        $scope.addENodebs = function () {
            collegeDialogService.addENodeb($scope.currentView, $scope.center, function (count) {
                $scope.page.messages.push({
                    type: 'success',
                    contents: '增加ENodeb' + count + '个'
                });
                $scope.showView($scope.currentCollege);
            });
        };
        $scope.addBts = function () {
            collegeDialogService.addBts($scope.currentView, $scope.center, function (count) {
                $scope.page.messages.push({
                    type: 'success',
                    contents: '增加Bts' + count + '个'
                });
                $scope.showView($scope.currentCollege);
            });
        };

        collegeQueryService.queryAll().then(function (spots) {
            $scope.hotSpots = spots;
            $scope.showView($scope.hotSpots[0]);
        });
    })

    .controller("query.topic", function ($scope, baiduMapService, customerDialogService, basicImportService, parametersDialogService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        $scope.query = function () {
            parametersDialogService.showHotSpotsInfo($scope.hotSpotList);
        };

        $scope.updateMap = function() {
            basicImportService.queryAllHotSpots().then(function(result) {
                $scope.hotSpotList = result;
                angular.forEach(result, function (item) {
                    baiduMapService.drawCustomizeLabel(item.longtitute, item.lattitute + 0.005,
                        item.hotspotName,
                        '地址:' + item.address
                        + '<br/>类型:' + item.typeDescription
                        + '<br/>说明:' + item.sourceName, 3);
                    var marker = baiduMapService.generateIconMarker(item.longtitute, item.lattitute,
                        "/Content/Images/Hotmap/site_or.png");
                    baiduMapService.addOneMarkerToScope(marker, function(stat) {
                        customerDialogService.modifyHotSpot(stat, function () {
                            baiduMapService.switchMainMap();
                            baiduMapService.clearOverlays();
                            $scope.updateMap();
                        }, baiduMapService.switchMainMap);
                    }, item);
                });
            });
        };
        $scope.addHotSpot = function () {
            customerDialogService.constructHotSpot(function () {
                baiduMapService.switchMainMap();
                baiduMapService.clearOverlays();
                $scope.updateMap();
            }, baiduMapService.switchMainMap);
        };
        $scope.updateMap();
    })
    .controller("home.query", function ($scope, baiduMapService, neighborDialogService, dumpPreciseService, appRegionService,
        parametersDialogService, baiduQueryService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        $scope.currentView = "镇区站点";
        $scope.queryConditions = function () {
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
            baiduMapService.addDistrictBoundary(district, color);
            appRegionService.queryTownInfrastructures($scope.city.selected, district).then(function(result) {
                angular.forEach(result, function(stat, $index) {
                    appRegionService.queryTown($scope.city.selected, district, stat.town).then(function (town) {
                        angular.extend(stat, town);
                        baiduMapService.drawCustomizeLabel(stat.longtitute, stat.lattitute + 0.005,
                            stat.cityName + stat.districtName + stat.townName,
                            'LTE基站个数:' + stat.totalLteENodebs + '<br/>LTE小区个数:' + stat.totalLteCells
                            + '<br/>CDMA基站个数:' + stat.totalCdmaBts + '<br/>CDMA小区个数:' + stat.totalCdmaCells, 4);
                        var marker = baiduMapService.generateIconMarker(stat.longtitute, stat.lattitute,
                            "/Content/Images/Hotmap/site_or.png");
                        baiduMapService.addOneMarkerToScope(marker, function(item) {
                            parametersDialogService.showTownENodebInfo(item, $scope.city.selected, district);
                        }, stat);
                        appRegionService.queryTownBoundaries(stat.cityName, stat.districtName, stat.townName).then(function (boundaries) {
                            angular.forEach(boundaries, function (boundary) {
                                baiduQueryService.transformToBaidu(boundary.boundaryGeoPoints[0].longtitute, boundary.boundaryGeoPoints[0].lattitute).then(function (coors) {
                                    var xOffset = coors.x - boundary.boundaryGeoPoints[0].longtitute;
                                    var yOffset = coors.y - boundary.boundaryGeoPoints[0].lattitute;
                                    baiduMapService.addBoundary(boundary.boundaryGeoPoints, $scope.colors[$index % $scope.colors.length], xOffset, yOffset);
                                });
                            });
                        });
                    });
                });
            });
        };
        $scope.showTownSites = function() {
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            $scope.currentView = "镇区站点";
            angular.forEach($scope.districts, function(district, $index) {
                $scope.showDistrictTownStat(district, $scope.colors[$index]);
            });
        };
        $scope.districts = [];
        $scope.$watch('city.selected', function (city) {
            if (city) {
                $scope.legend.intervals = [];
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function (district, $index) {
                    $scope.showDistrictTownStat(district, $scope.colors[$index]);
                });
                
            }
        });
    })
    .controller("home.kpi", function ($scope, baiduMapService, dumpPreciseService, kpiPreciseService, networkElementService, baiduQueryService,
    neighborDialogService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        $scope.currentView = "精确覆盖率";

        $scope.showPreciseRate = function(city, district, color) {
            baiduMapService.addDistrictBoundary(district, color);
            kpiPreciseService.queryTopKpisInDistrict($scope.beginDate.value, $scope.endDate.value, 10,
                '按照精确覆盖率升序', city, district).then(function(result) {
                networkElementService.queryCellSectors(result).then(function(cells) {
                    baiduQueryService.transformToBaidu(cells[0].longtitute, cells[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - cells[0].longtitute;
                        var yOffset = coors.y - cells[0].lattitute;
                        angular.forEach(cells, function(cell) {
                            cell.longtitute += xOffset;
                            cell.lattitute += yOffset;
                            var sectorTriangle = baiduMapService.generateSector(cell, "blue", 5);
                            baiduMapService.addOneSectorToScope(sectorTriangle, neighborDialogService.showPrecise, cell);
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
            angular.forEach($scope.districts, function(district, $index) {
                $scope.showPreciseRate(city, district, $scope.colors[$index]);
            });
        };
        $scope.showDownSwitchSite = function (city, district, color) {
            baiduMapService.addDistrictBoundary(district, color);
            kpiPreciseService.queryTopDownSwitchInDistrict($scope.beginDate.value, $scope.endDate.value, 10,
                city, district).then(function (result) {
                angular.forEach(result, function(item) {
                    networkElementService.queryCellInfo(item.eNodebId, item.sectorId).then(function(cell) {
                        baiduQueryService.transformToBaidu(cell.longtitute, cell.lattitute).then(function(coors) {
                            item = angular.extend(item, cell);
                            cell.longtitute = coors.x;
                            cell.lattitute = coors.y;
                            var sectorTriangle = baiduMapService.generateSector(cell, "blue", 5);
                            baiduMapService.addOneSectorToScope(sectorTriangle, neighborDialogService.showFlowCell, {
                                item: item,
                                beginDate: $scope.beginDate,
                                endDate: $scope.endDate
                            });
                        });
                    });
                });

            });
        };
        $scope.showTopDownSwitch = function() {
            $scope.currentView = "4G下切3G";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            var city = $scope.city.selected;
            angular.forEach($scope.districts, function(district, $index) {
                $scope.showDownSwitchSite(city, district, $scope.colors[$index]);
            });
        };
        $scope.showRank2Site = function (city, district, color) {
            baiduMapService.addDistrictBoundary(district, color);
            kpiPreciseService.queryTopRank2InDistrict($scope.beginDate.value, $scope.endDate.value, 10,
                city, district).then(function (result) {
                    angular.forEach(result, function (item) {
                        networkElementService.queryCellInfo(item.eNodebId, item.sectorId).then(function (cell) {
                            baiduQueryService.transformToBaidu(cell.longtitute, cell.lattitute).then(function (coors) {
                                item = angular.extend(item, cell);
                                cell.longtitute = coors.x;
                                cell.lattitute = coors.y;
                                var sectorTriangle = baiduMapService.generateSector(cell, "blue", 5);
                                baiduMapService.addOneSectorToScope(sectorTriangle, neighborDialogService.showFlowCell, {
                                    item: item,
                                    beginDate: $scope.beginDate,
                                    endDate: $scope.endDate
                                });
                            });
                        });
                    });

                });
        };
        $scope.showTopScheduling = function () {
            $scope.currentView = "4G双流比";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            var city = $scope.city.selected;
            angular.forEach($scope.districts, function (district, $index) {
                $scope.showRank2Site(city, district, $scope.colors[$index]);
            });
        };
        $scope.districts = [];
        dumpPreciseService.generateUsersDistrict($scope.city.selected || "佛山", $scope.districts, function(district, $index) {
            $scope.showPreciseRate($scope.city.selected || "佛山", district, $scope.colors[$index]);
        });

    })
    .controller("home.plan", function ($scope, baiduMapService, dumpPreciseService, networkElementService, geometryService,
        neGeometryService, parametersDialogService, baiduQueryService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        $scope.currentView = "所有站点";

        $scope.updateConstructionLegendDefs = function () {
            $scope.legend.title = "开通情况";
            $scope.legend.intervals = [];
            var sourceDefs = ['建设中', '已开通'];
            angular.forEach(sourceDefs, function (def, $index) {
                $scope.legend.intervals.push({
                    threshold: def,
                    color: $scope.colors[$index]
                });
            });
        };
        $scope.updateBelongingLegendDefs = function () {
            $scope.legend.title = "站点归属";
            $scope.legend.intervals = [];
            var sourceDefs = ['电信自建', '铁塔建设', '未确定'];
            angular.forEach(sourceDefs, function (def, $index) {
                $scope.legend.intervals.push({
                    threshold: def,
                    color: $scope.colors[$index+1]
                });
            });
        };

        $scope.showPlanningSite = function(city, district, color) {
            baiduMapService.addDistrictBoundary(district, color);
            networkElementService.queryOpenningSites(city, district).then(function(sites) {
                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                    var xOffset = coors.x - sites[0].longtitute;
                    var yOffset = coors.y - sites[0].lattitute;
                    baiduMapService.drawMultiPoints(sites, $scope.colors[0], -xOffset, -yOffset, function(e) {
                        var xCenter = e.point.lng - xOffset;
                        var yCenter = e.point.lat - yOffset;
                        networkElementService.queryRangePlanningSites(
                            neGeometryService.queryNearestRange(xCenter, yCenter)).then(function(sectors) {
                            if (sectors.length > 0) {
                                parametersDialogService.showPlanningSitesInfo(sectors[0]);
                            }

                        });
                    });
                });
            });
            networkElementService.queryOpennedSites(city, district).then(function (sites) {
                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function (coors) {
                    var xOffset = coors.x - sites[0].longtitute;
                    var yOffset = coors.y - sites[0].lattitute;
                    baiduMapService.drawMultiPoints(sites, $scope.colors[1], -xOffset, -yOffset, function (e) {
                        var xCenter = e.point.lng - xOffset;
                        var yCenter = e.point.lat - yOffset;
                        networkElementService.queryRangePlanningSites(
                            neGeometryService.queryNearestRange(xCenter, yCenter)).then(function (sectors) {
                                if (sectors.length > 0) {
                                    parametersDialogService.showPlanningSitesInfo(sectors[0]);
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
            angular.forEach($scope.districts, function(district, $index) {
                $scope.showPlanningSite(city, district, $scope.colors[$index]);
            });
        };
        $scope.showOpenningSite = function(city, district, color) {
            baiduMapService.addDistrictBoundary(district, color);
            networkElementService.queryOpenningSites(city, district).then(function(sites) {
                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                    var xOffset = coors.x - sites[0].longtitute;
                    var yOffset = coors.y - sites[0].lattitute;
                    baiduMapService.drawMultiPoints(sites, color, -xOffset, -yOffset, function(e) {
                        var xCenter = e.point.lng - xOffset;
                        var yCenter = e.point.lat - yOffset;
                        networkElementService.queryRangePlanningSites(
                            neGeometryService.queryNearestRange(xCenter, yCenter)).then(function(sectors) {
                            if (sectors.length > 0) {
                                parametersDialogService.showPlanningSitesInfo(sectors[0]);
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
            angular.forEach($scope.districts, function(district, $index) {
                $scope.showOpenningSite(city, district, $scope.colors[$index]);
            });
        };
        $scope.showOpenSite = function(city, district, color) {
            baiduMapService.addDistrictBoundary(district, color);
            networkElementService.queryOpennedSites(city, district).then(function(sites) {
                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                    var xOffset = coors.x - sites[0].longtitute;
                    var yOffset = coors.y - sites[0].lattitute;
                    var keys = ['电信自建', '铁塔建设', null];
                    angular.forEach(keys, function(key, $index) {
                        var subSites = _.filter(sites, { siteCategory: key });
                        baiduMapService.drawMultiPoints(subSites, $scope.colors[$index + 1], -xOffset, -yOffset, function (e) {
                            var xCenter = e.point.lng - xOffset;
                            var yCenter = e.point.lat - yOffset;
                            networkElementService.queryRangePlanningSites(
                                neGeometryService.queryNearestRange(xCenter, yCenter)).then(function(sectors) {
                                if (sectors.length > 0) {
                                    parametersDialogService.showPlanningSitesInfo(sectors[0]);
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
            angular.forEach($scope.districts, function(district, $index) {
                $scope.showOpenSite(city, district, $scope.colors[$index]);
            });
        };
        $scope.districts = [];
        $scope.updateConstructionLegendDefs();
        dumpPreciseService.generateUsersDistrict($scope.city.selected || "佛山", $scope.districts, function(district, $index) {
            $scope.showPlanningSite($scope.city.selected || "佛山", district, $scope.colors[$index]);
        });
    })

    .controller("alarm.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
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
                        parametersDialogService.showAlarmStationInfo(e.point.data, $scope.beginDate, $scope.endDate);
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

    .controller("special-station.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {

        $scope.isRecovers = new Array('未恢复', '已恢复', '全部');
        $scope.isRecover = new Array('否', '是');
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.recoverIndex = 0;
        $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];



        //获取站点
        $scope.getStations = function (recoverIndex) {
            var recoverName = $scope.isRecover[recoverIndex];
            downSwitchService.getSpecialStations(recoverName, 0, 10000).then(function (response) {
                $scope.stationss[recoverIndex] = response.result.rows;
                var color = $scope.colors[recoverIndex];
                baiduQueryService.transformToBaidu($scope.stationss[recoverIndex][0].longtitute, $scope.stationss[recoverIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[recoverIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[recoverIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[recoverIndex], color, -xOffset, -yOffset, function (e) {
                        parametersDialogService.showSpecialStationInfo(e.point.data);
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
        $scope.reflashMap();
    })
    .controller("special-indoor.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {

        $scope.isRecovers = new Array('未恢复', '已恢复', '全部');
        $scope.isRecover = new Array('否', '是');
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.colorFault = new Array("#FF0000", "#00FF00");


        $scope.recoverIndex = 0;
        $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];



        //获取站点
        $scope.getStations = function (recoverIndex) {

            var recoverName = $scope.isRecover[recoverIndex];
            downSwitchService.getSpecialIndoor(recoverName, 0, 10000).then(function (response) {

                $scope.stationss[recoverIndex] = response.result.rows;
                var color = $scope.colorFault[recoverIndex];
                baiduQueryService.transformToBaidu($scope.stationss[recoverIndex][0].longtitute, $scope.stationss[recoverIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[recoverIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[recoverIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[recoverIndex], color, -xOffset, -yOffset, function (e) {
                        parametersDialogService.showSpecialIndoorInfo(e.point.data);
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
        $scope.reflashMap();
    })
    .controller("clear-voice.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {

        $scope.isRecovers = new Array('未解决', '已解决', '全部');
        $scope.isRecover = new Array('未解决', '已解决');
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.colorFault = new Array("#FF0000", "#00FF00");


        $scope.recoverIndex = 0;
        $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];



        //获取站点
        $scope.getStations = function (recoverIndex) {

            var recoverName = $scope.isRecover[recoverIndex];
            downSwitchService.getZeroVoice(recoverName, 0, 10000).then(function (response) {

                $scope.stationss[recoverIndex] = response.result.rows;
                var color = $scope.colorFault[recoverIndex];
                baiduQueryService.transformToBaidu($scope.stationss[recoverIndex][0].longtitute, $scope.stationss[recoverIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[recoverIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[recoverIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[recoverIndex], color, -xOffset, -yOffset, function (e) {
                        parametersDialogService.showZeroVoiceInfo(e.point.data);
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
        $scope.reflashMap();
    })
    .controller("clear-flow.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {

        $scope.isRecovers = new Array('未解决', '已解决', '全部');
        $scope.isRecover = new Array('未解决', '已解决');
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.colorFault = new Array("#FF0000", "#00FF00");


        $scope.recoverIndex = 0;
        $scope.recoverName = $scope.isRecovers[$scope.recoverIndex];



        //获取站点
        $scope.getStations = function (recoverIndex) {

            var recoverName = $scope.isRecover[recoverIndex];
            downSwitchService.getZeroFlow(recoverName, 0, 10000).then(function (response) {

                $scope.stationss[recoverIndex] = response.result.rows;
                var color = $scope.colorFault[recoverIndex];
                baiduQueryService.transformToBaidu($scope.stationss[recoverIndex][0].longtitute, $scope.stationss[recoverIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[recoverIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[recoverIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[recoverIndex], color, -xOffset, -yOffset, function (e) {
                        parametersDialogService.showZeroFlowInfo(e.point.data);
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
        $scope.reflashMap();
    })

    .controller("fault-station.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {



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
                        parametersDialogService.showFaultStationInfo(e.point.data);
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
