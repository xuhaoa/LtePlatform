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
                        controller: "menu.query"
                    },
                    "contents": {
                        templateUrl: viewDir + "Query.html",
                        controller: "home.query"
                    }
                },
                url: "/query"
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
            //公共信息
            .state('common', {
                views: {                  
                    "contents": {
                        templateUrl: viewDir + "Common.html",
                        controller: "common.network"
                    }
                },
                url: "/common"
            })
            //网络巡检
            .state('checking', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Title.html",
                        controller: "menu.checking"
                    },
                    "contents": {
                        templateUrl: viewDir + "Checking.html",
                        controller: "checking.network"
                    },                    
                },
                url: "/checking"
            })
            //网络整治
            .state('fixing', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Title.html",
                        controller: "menu.fixing"
                    },
                    "contents": {
                        templateUrl: viewDir + "Fixing.html",
                        controller: "fixing.network"
                    },
                },
                url: "/fixing"
            })
            //网络故障
            .state('alarm', {
                views: {
                    'menu': {
                        templateUrl: viewDir + "AlarmSearchMenu.html",
                        controller: "menu.alarm"
                    },
                    "contents": {
                        templateUrl: viewDir + "Alarm.html",
                        controller: "alarm.network"
                    }

                },
                url: "/alarm"
            })
            .state('special-station', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Title.html",
                        controller: "menu.special"
                    },
                    "contents": {
                        templateUrl: viewDir + "SpecialStation.html",
                        controller: "special-station.network"
                    }

                },
                url: "/special-station"
            })
            .state('special-indoor', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Title.html",
                        controller: "menu.special-indoor"
                    },
                    "contents": {
                        templateUrl: viewDir + "SpecialStation.html",
                        controller: "special-indoor.network"
                    }

                },
                url: "/special-indoor"
            })
            .state('long-term', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Title.html",
                        controller: "menu.fault"
                    },
                    "contents": {
                        templateUrl: viewDir + "FaultStation.html",
                        controller: "fault-station.network"
                    }
                },
                url: "/long-term"
            })
            .state('clear-flow', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Title.html",
                        controller: "menu.flow"
                    },
                    "contents": {
                        templateUrl: viewDir + "ClearZero.html",
                        controller: "clear-flow.network"
                    }
                },
                url: "/clear-flow"
            })
            .state('clear-voice', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Title.html",
                        controller: "menu.voice"
                    },
                    "contents": {
                        templateUrl: viewDir + "ClearZero.html",
                        controller: "clear-voice.network"
                    }
                },
                url: "/clear-voice"
            })
            .state('flow', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.query"
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
                        controller: "menu.mr"
                    },
                    "contents": {
                        templateUrl: viewDir + "MrGrid.html",
                        controller: "network.analysis"
                    }
                },
                url: "/analysis"
            });
        $urlRouterProvider.otherwise('/');
    })

    .value("MyValue", { "distinctIndex":0 ,
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
            criteria: 0,
            sign: 0,
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
    .controller("menu.root", function($scope, appUrlService) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "站点信息",
            subItems: [
                {
                    displayName: "数据总览",
                    url: rootUrl + "/"
                }, {
                    displayName: "历史信息查询",
                    url: appUrlService.getParameterUrlHost() + 'cell-modify-record.php'
                }, {
                    displayName: "边界漫游",
                    url: appUrlService.getParameterUrlHost() + 'lteboundary.html'
                }
            ]
        };
    })
    .controller("menu.special", function ($scope, appUrlService) {
         var rootUrl = "/#";
         $scope.menuItem = {
             displayName: "网运专项-基站"
         };
    })
    .controller("menu.checking", function ($scope, appUrlService) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "网络巡检"
        };
    })
    .controller("menu.fixing", function ($scope, appUrlService) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "网络整治"
        };
    })
    .controller("menu.special-indoor", function ($scope, appUrlService) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "网运专项-室分"
        };
    })
    .controller("menu.fault", function ($scope, appUrlService) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "长期故障"
        };
    })
    .controller("menu.voice", function ($scope, appUrlService) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "清网排障-零话务"
        };
    })
     .controller("menu.flow", function ($scope, appUrlService) {
         var rootUrl = "/#";
         $scope.menuItem = {
             displayName: "清网排障-零流量"
         };
     })
    .controller("menu.query", function ($scope, appUrlService) {
        var rootUrl = "/#";
        $scope.menuItem = {
            displayName: "站点查询",
            subItems: [
                {
                    displayName: "数据查询",
                    url: rootUrl + "/query"
                }, {
                    displayName: "数据维护",
                    url: appUrlService.getParameterUrlHost() + 'main-lte-cell-info.php'
                }, {
                    displayName: "流量经营",
                    url: rootUrl + '/flow'
                }
            ]
        };
    })

    .controller("menu.station", function ($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {
        
        $scope.stationName = "";
        $scope.stations = [];
        $scope.areaNames = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
        $scope.search = function () {
            downSwitchService.getStationByName($scope.stationName, $scope.areaNames[MyValue.distinctIndex], 1, 10).then(function (response) {
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
    .controller("menu.common", function ($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];
        $scope.areaNames = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
        $scope.search = function () {
            downSwitchService.getStationByName($scope.stationName, $scope.areaNames[MyValue.distinctIndex], 1, 10).then(function (response) {
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

    .controller("menu.alarm", function ($scope, downSwitchService, MyValue, baiduMapService, parametersDialogService, baiduQueryService) {

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
    .controller("station.filter", function ($scope, downSwitchService, MyValue, baiduMapService, geometryService,
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
         { value: '', name: '所有配套机房' },
         { value: '是', name: '有配套机房' },
         { value: '否', name: '无配套机房' }
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
            downSwitchService.getStationByFilter(areaName, MyValue.stationGrade, MyValue.netType, MyValue.roomAttribution,
                 MyValue.towerAttribution, MyValue.isPower, MyValue.isBBU, 0, 10000).then(function (response) {
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
            var areaName = $scope.areaNames[MyValue.distinctIndex];
            baiduMapService.setCenter(MyValue.distinctIndex);
            if (MyValue.distinctIndex !== 0) {               
                $scope.getStations(areaName, MyValue.distinctIndex);
            } else {
                for (var i = 1; i < 6; ++i) {
                    $scope.getStations($scope.areaNames[i], i);
                }
            }

        };
        $scope.change = function () {           
            MyValue.stationGrade = $scope.selectedGrade;
            MyValue.netType = $scope.selectedNetType;
            MyValue.roomAttribution = $scope.selectedRoomAttribution;
            MyValue.towerAttribution = $scope.selectedTowerAttribution;
            MyValue.isPower = $scope.selectedIsPower;
            MyValue.isBBU = $scope.selectedIsBBU
            $scope.reflashMap();
        };
        $scope.reflashMap();
    })
    .controller("alarm.filter", function ($scope, downSwitchService, MyValue, baiduMapService, geometryService,
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
             { value: 'C', name: 'C' },
             { value: 'L', name: 'L' },
             { value: 'VL', name: 'VL' },
             { value: 'C+L', name: 'C+L' },
             { value: 'C+VL', name: 'C+VL' },
             { value: 'L+VL', name: 'L+VL' }
            ];
            $scope.isPowers = [
             { value: '', name: '所有动力' },
             { value: '是', name: '动力配套' },
             { value: '否', name: '非动力配套' }
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
                downSwitchService.getStationByFilter(areaName, MyValue.stationGrade, MyValue.netType, MyValue.roomAttribution,
                     MyValue.towerAttribution, MyValue.isPower, MyValue.isBBU, 0, 10000).then(function (response) {
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
                var areaName = $scope.areaNames[MyValue.distinctIndex];
                baiduMapService.setCenter(MyValue.distinctIndex);
                if (MyValue.distinctIndex !== 0) {
                    $scope.getStations(areaName, MyValue.distinctIndex);
                } else {
                    for (var i = 1; i < 6; ++i) {
                        $scope.getStations($scope.areaNames[i], i);
                    }
                }

            };
            $scope.change = function () {
                alert('change');
                MyValue.stationGrade = $scope.selectedGrade.value;
                MyValue.netType = $scope.selectedNetType.value;
                MyValue.roomAttribution = $scope.selectedRoomAttribution.value;
                MyValue.towerAttribution = $scope.selectedTowerAttribution.value;
                MyValue.isPower = $scope.selectedIsPower.value;
                MyValue.isBBU = $scope.selectedIsBBU.value;
                $scope.reflashMap();
            };
            change();
            
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
    .controller('menu.complain', function ($scope) {
        $scope.menuItem = {
            displayName: "投诉管理",
            subItems: [
                {
                    displayName: "统计分析",
                    url: '/#/complain/stat'
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
                    displayName: "负荷评估",
                    url: appUrlService.getParameterUrlHost() + 'ltecapability.html'
                }, {
                    displayName: "E-RAB优化",
                    url: appUrlService.getPlanUrlHost() + 'erab'
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
        }
    })
    .controller("home.network", function ($scope, appRegionService, networkElementService, baiduMapService, coverageDialogService,
        geometryService, parametersDialogService, neGeometryService, baiduQueryService, dumpPreciseService) {
        baiduMapService.initializeMap("map", 11);
        $scope.currentView = "LTE基站";
        $scope.showDistrictOutdoor = function(district, color) {
            var city = $scope.city.selected;
            baiduMapService.addDistrictBoundary(district, color);
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
            baiduMapService.addCityBoundary("佛山");
            angular.forEach($scope.districts, function(district, $index) {
                $scope.showDistrictOutdoor(district, $scope.colors[$index]);
            });
        };

        $scope.showDistrictIndoor = function(district, color) {
            var city = $scope.city.selected;
            baiduMapService.addDistrictBoundary(district, color);
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
            baiduMapService.addCityBoundary("佛山");
            angular.forEach($scope.districts, function (district, $index) {
                $scope.showDistrictIndoor(district, $scope.colors[$index]);
            });
        };

        $scope.showDistrictENodebs = function(district, color) {
            var city = $scope.city.selected;
            baiduMapService.addDistrictBoundary(district, color);
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
            baiduMapService.addCityBoundary("佛山");
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
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function(district, $index) {
                    $scope.showDistrictENodebs(district, $scope.colors[$index]);
                });
            }
        });
    })

    .controller("station.network", function ($scope, downSwitchService, MyValue, baiduMapService, geometryService,
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
        baiduMapService.setCenter(MyValue.distinctIndex);
        //获取站点
        $scope.getStations = function (areaName, index) {
            downSwitchService.getStationByFilter(areaName, MyValue.stationGrade, MyValue.netType, MyValue.roomAttribution,
                 MyValue.towerAttribution, MyValue.isPower, MyValue.isBBU, 0, 10000).then(function (response) {
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
        $scope.reflashMap = function (areaNameIndex) {
            baiduMapService.clearOverlays();
            MyValue.distinctIndex = areaNameIndex;
            var areaName = $scope.areaNames[areaNameIndex];
            $scope.distinct = $scope.distincts[areaNameIndex];
            baiduMapService.setCenter(areaNameIndex);
            if (MyValue.distinctIndex !== 0) {
                $scope.getStations(areaName, MyValue.distinctIndex);
            } else {
                for (var i = 1; i < 6; ++i) {
                    $scope.getStations($scope.areaNames[i], i);
                }
            }

        };
        $scope.showStationList = function() {
            parametersDialogService.showStationList();
        };
        
    })
    .controller("common.network", function ($scope, downSwitchService, MyValue, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
        $scope.areaNames = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
        $scope.types = new Array('JZ', 'SF');
            $scope.stationss = [];
            $scope.stationss[1] = [];
            $scope.stationss[2] = [];
            $scope.stationss[3] = [];
            $scope.stationss[4] = [];
            $scope.stationss[5] = [];
            baiduMapService.initializeMap("map", 13);
            baiduMapService.setCenter(MyValue.distinctIndex);
            //获取站点
            $scope.getStations = function (areaName, index,type) {
                downSwitchService.getCommonStations(areaName, type, 0, 10000).then(function (response) {
                         $scope.stationss[index] = response.result.rows;
                         var color = $scope.colors[index];
                         baiduQueryService.transformToBaidu($scope.stationss[index][0].longtitute, $scope.stationss[index][0].lattitute).then(function (coors) {
                             var xOffset = coors.x - $scope.stationss[index][0].longtitute;
                             var yOffset = coors.y - $scope.stationss[index][0].lattitute;
                             baiduMapService.drawPointCollection($scope.stationss[index], color, -xOffset, -yOffset, function (e) {
                                 parametersDialogService.showCommonStationInfo(e.point.data);
                             });
                         });
                     });
            };

            $scope.reflashMap = function (typeIndex) {
                baiduMapService.clearOverlays();
                $scope.type = $scope.types[typeIndex];
                MyValue.distinctIndex = 0;
                    for (var i = 1; i < 6; ++i) {
                        $scope.getStations($scope.areaNames[i], i, $scope.type);
                    }
            };

            $scope.showStationList = function () {
                //parametersDialogService.showStationList($scope.type);
                parametersDialogService.showCommonStationList($scope.type);
            };

            $scope.outportData = function () {
                location.href = "http://219.128.254.36:9000/LtePlatForm/lte/index.php/StationCommon/download/type/" + $scope.type;
            };
            $scope.reflashMap(0);

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

        $scope.colorAlarm = new Array("#FF0000","#FF8C00","#FFFF00");

        $scope.netType = 'L';
        $scope.levelIndex = 0;
        $scope.level = $scope.levelNames[$scope.levelIndex];
        $scope.distinctIndex = 5;

        //获取站点
        $scope.getStations = function (areaIndex, levelIndex) {
            var areaName = $scope.areaNames[areaIndex];
           
            downSwitchService.getAlarmStations(areaName, levelIndex, $scope.netType, 0, 10000).then(function (response) {
                
                $scope.stationss[areaIndex] = response.result.rows;               
                var color = $scope.colorAlarm[levelIndex];
                     baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute, $scope.stationss[areaIndex][0].lattitute).then(function (coors) {
                         var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                         var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                         baiduMapService.drawPointCollection($scope.stationss[areaIndex], color, -xOffset, -yOffset, function (e) {
                             parametersDialogService.showAlarmStationInfo(e.point.data,$scope.beginDate, $scope.endDate);
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
    .controller("checking.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
        $scope.areaNames = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
        $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
        $scope.statusNames = new Array('未巡检', '需整治', '正常', '全部');
        $scope.distinct = "佛山市";
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        $scope.stationss[3] = [];
        $scope.stationss[4] = [];
        $scope.stationss[5] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.colorAlarm = new Array("#FF0000", "#FF8C00", "#00FF00");

        $scope.statusIndex = 0;
        $scope.status = $scope.statusNames[$scope.statusIndex];
        $scope.distinctIndex = 0;

        //获取站点
        $scope.getStations = function (areaIndex, index) {
            var areaName = $scope.areaNames[areaIndex];
            var status = $scope.statusNames[index];
            downSwitchService.getCheckingStation(areaName, status, 0, 10000).then(function (response) {

                $scope.stationss[areaIndex] = response.result.rows;
                var color = $scope.colorAlarm[index];
                baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute, $scope.stationss[areaIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[areaIndex], color, -xOffset, -yOffset, function (e) {
                        parametersDialogService.showCheckingStationInfo(e.point.data);
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
    .controller("fixing.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService) {
        $scope.areaNames = new Array('全市', 'FS顺德', 'FS南海', 'FS禅城', 'FS三水', 'FS高明');
        $scope.distincts = new Array('佛山市', '顺德区', '南海区', '禅城区', '三水区', '高明区');
        $scope.statusNames = new Array('很紧急', '紧急', '极重要','重要','一般','整治完成', '全部');
        $scope.distinct = "佛山市";
        $scope.stationss = [];
        $scope.stationss[1] = [];
        $scope.stationss[2] = [];
        $scope.stationss[3] = [];
        $scope.stationss[4] = [];
        $scope.stationss[5] = [];
        baiduMapService.initializeMap("map", 13);

        $scope.colorAlarm = new Array("#FF0000", "#FF8C00", "#FFFF00","#FF00FF","#FF008C","#00FF00");

        $scope.statusIndex = 0;
        $scope.status = $scope.statusNames[$scope.statusIndex];
        $scope.distinctIndex = 0;

        //获取站点
        $scope.getStations = function (areaIndex, index) {
            var areaName = $scope.areaNames[areaIndex];
            var status = $scope.statusNames[index];
            downSwitchService.getFixingStation(areaName, status, 0, 10000).then(function (response) {

                $scope.stationss[areaIndex] = response.result.rows;
                var color = $scope.colorAlarm[index];
                baiduQueryService.transformToBaidu($scope.stationss[areaIndex][0].longtitute, $scope.stationss[areaIndex][0].lattitute).then(function (coors) {
                    var xOffset = coors.x - $scope.stationss[areaIndex][0].longtitute;
                    var yOffset = coors.y - $scope.stationss[areaIndex][0].lattitute;
                    baiduMapService.drawPointCollection($scope.stationss[areaIndex], color, -xOffset, -yOffset, function (e) {
                        parametersDialogService.showCheckingStationInfo(e.point.data);
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

    .controller("special-station.network", function ($scope, downSwitchService, baiduMapService, geometryService,
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
            downSwitchService.getSpecialStations(recoverName, 0, 10000).then(function (response) {
                $scope.stationss[recoverIndex] = response.result.rows;
                var color = $scope.colorFault[recoverIndex];
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
            if ($scope.recoverIndex == 2) {
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
            if ($scope.recoverIndex == 2) {
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
            if ($scope.recoverIndex == 2) {
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
            if ($scope.recoverIndex == 2) {
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
    })
    .controller('home.flow', function ($scope, baiduMapService, baiduQueryService, coverageDialogService, flowService) {
        baiduMapService.initializeMap("map", 11);
        $scope.showFeelingRate = function () {
            if (!$scope.flowGeoPoints) {
                alert("计算未完成！请稍后点击。");
                return;
            }
            $scope.currentView = "下行感知速率";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            baiduQueryService.transformToBaidu($scope.flowGeoPoints[0].longtitute, $scope.flowGeoPoints[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.flowGeoPoints[0].longtitute;
                var yOffset = coors.y - $scope.flowGeoPoints[0].lattitute;
                var points = _.map($scope.flowGeoPoints, function (stat) {
                    return { "lng": stat.longtitute + xOffset, "lat": stat.lattitute + yOffset, "count": stat.downlinkFeelingRate };
                });
                var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
                baiduMapService.addOverlays([heatmapOverlay]);
                heatmapOverlay.setDataSet({ data: points, max: 50 });
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
            baiduQueryService.transformToBaidu($scope.flowGeoPoints[0].longtitute, $scope.flowGeoPoints[0].lattitute).then(function (coors) {
                var xOffset = coors.x - $scope.flowGeoPoints[0].longtitute;
                var yOffset = coors.y - $scope.flowGeoPoints[0].lattitute;
                var points = _.map($scope.flowGeoPoints, function (stat) {
                    return { "lng": stat.longtitute + xOffset, "lat": stat.lattitute + yOffset, "count": stat.uplinkFeelingRate };
                });
                var heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
                baiduMapService.addOverlays([heatmapOverlay]);
                heatmapOverlay.setDataSet({ data: points, max: 10 });
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
    .controller("home.dt", function ($scope, baiduMapService, coverageService, appFormatService, parametersDialogService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        coverageService.queryAreaTestDate().then(function (result) {
            angular.forEach(result, function(item) {
                baiduMapService.drawCustomizeLabel(item.longtitute, item.lattitute + 0.005, item.cityName + item.districtName + item.townName,
                    '4G测试日期:' + appFormatService.getDateString(appFormatService.getDate(item.latestDate4G), 'yyyy-MM-dd')
                    + '<br/>3G测试日期:' + appFormatService.getDateString(appFormatService.getDate(item.latestDate3G), 'yyyy-MM-dd')
                    + '<br/>2G测试日期:' + appFormatService.getDateString(appFormatService.getDate(item.latestDate2G), 'yyyy-MM-dd'), 3);
                var marker = baiduMapService.generateIconMarker(item.longtitute, item.lattitute,
                    "/Content/Images/Hotmap/site_or.png");
                baiduMapService.addOneMarkerToScope(marker, parametersDialogService.showTownDtInfo, item);
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
    .controller("home.complain", function ($scope, baiduMapService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

    })
    .controller("network.analysis", function($scope, baiduMapService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
    })
    .controller("home.query", function ($scope, baiduMapService, neighborDialogService, dumpPreciseService, appRegionService,
        parametersDialogService) {
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
                angular.forEach(result, function(stat) {
                    appRegionService.queryTown($scope.city.selected, district, stat.town).then(function (town) {
                        angular.extend(stat, town);
                        var marker = baiduMapService.generateIconMarker(stat.longtitute, stat.lattitute,
                            "/Content/Images/Hotmap/site_or.png");
                        baiduMapService.addOneMarkerToScope(marker, function(item) {
                            parametersDialogService.showTownENodebInfo(item, $scope.city.selected, district);
                        }, stat);
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
        $scope.showPlanningSite = function(city, district, color) {
            baiduMapService.addDistrictBoundary(district, color);
            networkElementService.queryPlanningSites(city, district).then(function(sites) {
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
        $scope.showAllSites = function() {
            $scope.currentView = "所有站点";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
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
        $scope.showOpenSites = function() {
            $scope.currentView = "已开通站点";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            var city = $scope.city.selected;
            angular.forEach($scope.districts, function(district, $index) {
                $scope.showOpenSite(city, district, $scope.colors[$index]);
            });
        };
        $scope.districts = [];
        dumpPreciseService.generateUsersDistrict($scope.city.selected || "佛山", $scope.districts, function(district, $index) {
            $scope.showPlanningSite($scope.city.selected || "佛山", district, $scope.colors[$index]);
        });
    });
