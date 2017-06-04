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
                        templateUrl: "/appViews/Home/StationSearchMenu.html",
                        controller: "menu.station"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Station.html",
                        controller: "station.network"
                    },
                    "filter": {
                        templateUrl: "/appViews/Home/StationFilter.html",
                        controller: "station.filter"
                    }

                },
                url: "/station"
            })
            .state('operation-indoor', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/Home/StationSearchMenu.html",
                        controller: "menu.station"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Station.html",
                        controller: "station.network"
                    },
                    "filter": {
                        templateUrl: "/appViews/Home/StationFilter.html",
                        controller: "station.filter"
                    }

                },
                url: "/operation-indoor"
            })
            .state('common', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/BasicKpi/CommonMenu.html",
                        controller: "menu.common"
                    },
                    "contents": {
                        templateUrl: "/appViews/BasicKpi/Common.html",
                        controller: "common.network"
                    }
                },
                url: "/common"
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
            .state('interference', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.plan"
                    },
                    "contents": {
                        templateUrl: viewDir + "Plan.html",
                        controller: "home.interference"
                    }
                },
                url: "/interference"
            })

            .state('complain', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.complain"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Complain.html",
                        controller: "home.complain"
                    }
                },
                url: "/complain"
            })
            .state('micro', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.complain"
                    },
                    "contents": {
                        templateUrl: "/appViews/Home/Micro.html",
                        controller: "complain.micro"
                    }
                },
                url: "/micro"
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
                        controller: "menu.root"
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

            .state('checking', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.checking"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Checking.html",
                        controller: "checking.network"
                    }
                },
                url: "/checking"
            })

            .state('fixing', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.fixing"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Fixing.html",
                        controller: "fixing.network"
                    }
                },
                url: "/fixing"
            })
            .state('special-station', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.fixing"
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
                        controller: "menu.fixing"
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
                        controller: "menu.fixing"
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
                        controller: "menu.fixing"
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
                        controller: "menu.fixing"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/ClearZero.html",
                        controller: "clear-voice.network"
                    }
                },
                url: "/clear-voice"
            })

            .state('construction', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.construction"
                    },
                    "contents": {
                        templateUrl: "/appViews/Parameters/Region/BtsConstruction.html",
                        controller: "bts.construction"
                    }
                },
                url: "/construction"
            })
            .state('blueprint', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/DropDownMenu.html",
                        controller: "menu.construction"
                    },
                    "contents": {
                        templateUrl: "/appViews/Parameters/Region/BluePrint.html",
                        controller: "bts.blueprint"
                    }
                },
                url: "/blueprint"
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
            title: "基础数据总览",
            myPromise: null
        };
        appUrlService.initializeAuthorization();
        $rootScope.legend = {
            criteria: [],
            intervals: [],
            sign: true,
            title: ''
        };
        $rootScope.initializeLegend = function () {
            $rootScope.legend.title = $rootScope.city.selected;
            $rootScope.legend.intervals = [];
            $rootScope.legend.criteria = [];
        };
        $rootScope.initializeFaultLegend = function(colors) {
            $rootScope.legend.title = "故障状态";
            $rootScope.legend.intervals = [
                {
                    threshold: '未恢复',
                    color: colors[0]
                }, {
                    threshold: '已恢复',
                    color: colors[1]
                }
            ];
        };
        $rootScope.initializeSolveLegend = function(colors) {
            $rootScope.legend.title = "问题状态";
            $rootScope.legend.intervals = [
                {
                    threshold: '未解决',
                    color: colors[0]
                }, {
                    threshold: '已解决',
                    color: colors[1]
                }
            ];
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

        $rootScope.areaNames = ['全市'];
        $rootScope.distincts = ['佛山市'];
        $rootScope.pushStationArea = function(district) {
            $rootScope.areaNames.push('FS' + district);
            $rootScope.distincts.push(district + '区');
        };
    })
    .controller("menu.root", function($scope) {
        $scope.menuItem = {
            displayName: "站点信息",
            subItems: [
                {
                    displayName: "数据总览",
                    url: "/#/"
                }, {
                    displayName: "室内分布",
                    url: "/#/analysis"
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

    .controller("menu.station", function ($scope, downSwitchService, distinctIndex, baiduMapService, workItemDialog, baiduQueryService) {
        $scope.stationName = "";
        $scope.stations = [];
        $scope.search = function () {
            downSwitchService.getStationByName($scope.stationName, $scope.areaNames[distinctIndex], 1, 10).then(function(response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            workItemDialog.showStationInfo($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
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
                    workItemDialog.showStationInfo(this.data, $scope.beginDate, $scope.endDate);
                });
            });
        });
    })

    .controller("menu.common", function ($scope, downSwitchService, myValue, baiduMapService, workItemDialog, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];
        $scope.search = function () {
            downSwitchService.getStationByName($scope.stationName, $scope.areaNames[myValue.distinctIndex], 1, 10).then(function (response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            workItemDialog.showStationInfo($scope.stations[index - 1], $scope.beginDate, $scope.endDate);
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
                    workItemDialog.showStationInfo(this.data);
                });
            });
        });
    })


    .controller("station.filter", function ($scope, downSwitchService, myValue, baiduMapService, collegeMapService, dumpPreciseService) {
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
        
        $scope.getStations = function (areaName, index) {
            downSwitchService.getStationByFilter(areaName, myValue.stationGrade, myValue.netType, myValue.roomAttribution,
                 myValue.towerAttribution, myValue.isPower, myValue.isBBU, 0, 10000).then(function (response) {
                     var stations = response.result.rows;
                     var color = $scope.colors[index];
                     $scope.legend.intervals.push({
                         threshold: areaName,
                         color: color
                     });
                     collegeMapService.showMaintainStations(stations, color);
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
                angular.forEach($scope.areaNames.slice(1, $scope.areaNames.length), function (name, $index) {
                    $scope.getStations(name, $index);
                });
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
    })

    .controller("menu.alarm", function ($scope, downSwitchService, baiduMapService, mapDialogService, baiduQueryService) {

        $scope.stationName = "";
        $scope.stations = [];

        $scope.search = function () {
            downSwitchService.getAlarmStationByName($scope.stationName, 1, 10).then(function (response) {
                $scope.stations = response.result.rows;
            });
        }
        $scope.showStationInfo = function (index) {
            document.getElementById("cardlist").style.display = "none";
            mapDialogService.showAlarmStationInfo($scope.stations[index - 1]);
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
                    mapDialogService.showAlarmStationInfo(this.data, $scope.beginDate, $scope.endDate);
                });
            });
        });
    })

    .controller('menu.checking', function($scope) {
        $scope.menuItem = {
            displayName: "网络巡检",
            subItems: [
                {
                    displayName: "网络巡检",
                    url: '/#/checking'
                }, {
                    displayName: "长期故障",
                    url: '/#/long-term'
                }
            ]
        };
    })
    .controller('menu.fixing', function ($scope) {
        $scope.menuItem = {
            displayName: "网络整治",
            subItems: [
                {
                    displayName: "网络整治",
                    url: '/#/fixing'
                }, {
                    displayName: "网运专项-基站",
                    url: '/#/special-station'
                }, {
                    displayName: "网运专项-室分",
                    url: '/#/special-indoor'
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
                    displayName: "干扰管理",
                    url: '/#/interference'
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
                    displayName: "手机伴侣",
                    url: '/#/micro'
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
        $scope.menuItem = {
            displayName: "四高一地",
            subItems: [
                {
                    displayName: "高校专题",
                    url: "/#/collegeMap"
                }, {
                    displayName: "高速专题",
                    url: "/#/highway"
                }, {
                    displayName: "高铁专题",
                    url: "/#/railway"
                }, {
                    displayName: "高价值区域",
                    url: "/#/highvalue"
                }, {
                    displayName: "地铁专题",
                    url: "/#/subway"
                }
            ]
        }
    })
    .controller('menu.construction', function ($scope) {
        $scope.menuItem = {
            displayName: "基站建设",
            subItems: [
                {
                    displayName: "建设情况",
                    url: "/#/construction"
                }, {
                    displayName: "图纸管理",
                    url: "/#/blueprint"
                }
            ]
        };
    })

    .controller("home.network", function ($scope, appRegionService, networkElementService, baiduMapService, coverageDialogService,
        geometryService, parametersDialogService, mapDialogService, neGeometryService, baiduQueryService, dumpPreciseService) {
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
                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                    var xOffset = coors.x - sites[0].longtitute;
                    var yOffset = coors.y - sites[0].lattitute;
                    baiduMapService.drawMultiPoints(sites, color, -xOffset, -yOffset, function(e) {
                        var xCenter = e.point.lng - xOffset;
                        var yCenter = e.point.lat - yOffset;
                        networkElementService.queryRangeSectors(
                            neGeometryService.queryNearestRange(xCenter, yCenter), []).then(function(sectors) {
                            mapDialogService.showCellsInfo(sectors);
                        });
                    });
                });
            });
        };
        
        $scope.showOutdoorSites = function () {
            $scope.currentView = "室外小区";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary($scope.city.selected);
            $scope.initializeLegend();
            angular.forEach($scope.districts, function(district, $index) {
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
                baiduQueryService.transformToBaidu(sites[0].longtitute, sites[0].lattitute).then(function(coors) {
                    var xOffset = coors.x - sites[0].longtitute;
                    var yOffset = coors.y - sites[0].lattitute;
                    baiduMapService.drawMultiPoints(sites, color, -xOffset, -yOffset, function(e) {
                        var xCenter = e.point.lng - xOffset;
                        var yCenter = e.point.lat - yOffset;
                        networkElementService.queryRangeSectors(
                            neGeometryService.queryNearestRange(xCenter, yCenter), []).then(function(sectors) {
                            mapDialogService.showCellsInfo(sectors);
                        });
                    });
                });
            });
        };

        $scope.showIndoorSites = function () {
            $scope.currentView = "室内小区";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary($scope.city.selected);
            $scope.initializeLegend();
            angular.forEach($scope.districts, function (district, $index) {
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
            $scope.page.myPromise.then(function (sites) {
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
            $scope.initializeLegend();
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
                $scope.initializeLegend();
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function(district, $index) {
                    $scope.showDistrictENodebs(district, $scope.colors[$index]);
                });
            }
        });
    })

    .controller("evaluation.home", function ($scope, baiduMapService, baiduQueryService,
        parametersMapService, mapDialogService) {
        baiduMapService.initializeMap("map", 12);
        baiduQueryService.queryWandonglouyu().then(function (buildings) {
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary("佛山");
            parametersMapService.showPhpElements(buildings, mapDialogService.showBuildingInfo);
        });
    })

    .controller("station.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, collegeMapService, dumpPreciseService) {
        $scope.districts = [];
        $scope.distinct = $scope.distincts[0];
        baiduMapService.initializeMap("map", 13);
        
        //获取站点
        $scope.getStations = function (areaName, index) {
            downSwitchService.getStationsByAreaName(areaName, 0, 10000).then(function (response) {
                var stations = response.result.rows;
                var color = $scope.colors[index];
                $scope.legend.intervals.push({
                    threshold: areaName,
                    color: color
                });
                collegeMapService.showMaintainStations(stations, color);
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
                angular.forEach($scope.areaNames.slice(1, $scope.areaNames.length), function(name, $index) {
                    $scope.getStations(name, $index);
                });
            }

        };
        $scope.showStationList = function() {
            parametersDialogService.showStationList();
        };

        $scope.$watch('city.selected', function (city) {
            if (city) {
                $scope.initializeLegend();
                baiduMapService.clearOverlays();
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function (district, $index) {
                    $scope.pushStationArea(district);
                    $scope.getStations('FS' + district, $index + 1);
                });
            }
        });
        
    })
    .controller("common.network", function ($scope, downSwitchService, myValue, baiduMapService, geometryService,
        mapDialogService, baiduQueryService, appUrlService, dumpPreciseService) {
        $scope.districts = [];
        $scope.alphabetNames = new Array('FS', 'SD', 'NH', 'CC', 'SS', 'GM');
        $scope.types = new Array('JZ', 'SF');
        baiduMapService.initializeMap("map", 13);
        baiduMapService.setCenter(myValue.distinctIndex);
        //获取站点
        $scope.getStations = function (areaName, index, type) {
            downSwitchService.getCommonStations(areaName, type, 0, 10000).then(function (response) {
                var stations = response.result.rows;
                if (stations.length) {
                    var color = $scope.colors[index];
                    baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - stations[0].longtitute;
                        var yOffset = coors.y - stations[0].lattitute;
                        baiduMapService.drawPointCollection(stations, color, -xOffset, -yOffset, function(e) {
                            mapDialogService.showCommonStationInfo(e.point.data);
                        });
                    });
                }
            });
        };

        $scope.reflashMap = function (typeIndex) {
            baiduMapService.clearOverlays();
            $scope.type = $scope.types[typeIndex];
            myValue.distinctIndex = 0;
            for (var i = 1; i < 6; ++i) {
                $scope.getStations($scope.alphabetNames[i], i, $scope.type);
            }
        };

        $scope.showStationList = function () {
            mapDialogService.showCommonStationList($scope.type);
        };

        $scope.outportData = function () {
            location.href = appUrlService.getPhpHost() + "LtePlatForm/lte/index.php/StationCommon/download/type/" + $scope.type;
        };
        
        $scope.$watch('city.selected', function (city) {
            if (city) {
                $scope.initializeLegend();
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function (district) {
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
        parametersMapService) {
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
                    parametersMapService.showTownBoundaries(item.cityName, item.districtName, item.townName, $scope.colors[$index % $scope.colors.length]);
                }

            });

        });

    })

    .controller("home.mr", function ($scope, baiduMapService, coverageService, kpiDisplayService, parametersMapService, appUrlService,
    coverageDialogService, dumpPreciseService, appRegionService) {
        baiduMapService.initializeMap("map", 13);
        
        var legend = kpiDisplayService.queryCoverageLegend('RSRP');
        $scope.legend.title = 'RSRP';
        $scope.legend.criteria = legend.criteria;
        $scope.legend.intervals = [];
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
        $scope.queryAgps = function() {
            switch ($scope.type.selected) {
                case '电信':
                    coverageService.queryAgpsTelecomByTown($scope.beginDate.value, $scope.endDate.value, $scope.district.selected, $scope.town.selected).then(function(result) {
                        $scope.telecomAgps = result;
                    });
                    break;
                case '移动':
                    coverageService.queryAgpsMobileByTown($scope.beginDate.value, $scope.endDate.value, $scope.district.selected, $scope.town.selected).then(function (result) {
                        $scope.mobileAgps = result;
                    });
                    break;
            }
        };
        appUrlService.initializeIndexedDb($scope.indexedDB, ['districtPoints','rangePoints'], "topic", function () {
            appUrlService.fetchStoreByCursor($scope.indexedDB.db, 'districtPoints', function(items) {
                $scope.data = items;
                $scope.showTelecomCoverage();
            });
        });
        $scope.type = {
            options: ['电信', '移动', '联通'],
            selected: '电信'
        };
        $scope.$watch('city.selected', function (city) {
            if (city) {
                var districts = [];
                dumpPreciseService.generateUsersDistrict(city, districts, function(district, $index) {
                    if ($index === 0) {
                        $scope.district = {
                            options: districts,
                            selected: districts[0]
                        };
                    }
                });
            }
        });
        $scope.$watch('district.selected', function (district) {
            if (district) {
                appRegionService.queryTowns($scope.city.selected, district).then(function (towns) {
                    $scope.town = {
                        options: towns,
                        selected: towns[0]
                    };
                });
            }
        });
    })
    .controller("mr.grid", function ($scope, baiduMapService, coverageService, dumpPreciseService, kpiDisplayService,
        baiduQueryService, coverageDialogService, appRegionService, parametersMapService, collegeMapService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        $scope.currentView = "自身覆盖";
        $scope.setRsrpLegend = function() {
            var legend = kpiDisplayService.queryCoverageLegend('rsrpInterval');
            $scope.legend.title = 'RSRP区间';
            $scope.legend.intervals = legend.criteria;
            $scope.colorDictionary = {};
            $scope.areaStats = {};
            angular.forEach(legend.criteria, function(info) {
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
            angular.forEach(legend.criteria, function(info) {
                $scope.colorDictionary[info.threshold] = info.color;
                $scope.areaStats[info.threshold] = 0;
            });
        };
        $scope.showGridStats = function () {
            var keys = [];
            angular.forEach($scope.legend.intervals, function (info) {
                keys.push(info.threshold);
            });
            coverageDialogService.showGridStats($scope.currentDistrict, $scope.currentTown, $scope.currentView,
                $scope.legend.title, $scope.areaStats, keys);
        };
        $scope.showDistrictSelfCoverage = function (district, town, color) {
            baiduMapService.clearOverlays();
            baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
            if (town === '全区') {
                coverageService.queryMrGridSelfCoverage(district, $scope.endDate.value).then(function(result) {
                    var coors = result[0].coordinates.split(';')[0];
                    var longtitute = parseFloat(coors.split(',')[0]);
                    var lattitute = parseFloat(coors.split(',')[1]);
                    collegeMapService.showRsrpMrGrid(result, longtitute, lattitute, $scope.areaStats, $scope.colorDictionary);
                });
            } else {
                parametersMapService.showTownBoundaries($scope.city.selected, district, town, color);

                coverageService.queryTownMrGridSelfCoverage(district, town, $scope.endDate.value).then(function(result) {
                    appRegionService.queryTown($scope.city.selected, district, town).then(function(stat) {
                        var longtitute = stat.longtitute;
                        var lattitute = stat.lattitute;
                        collegeMapService.showRsrpMrGrid(result, longtitute, lattitute, $scope.areaStats, $scope.colorDictionary);
                    });
                });
            }

        };
        $scope.showDistrictCompeteCoverage = function (district, town, color, competeDescription) {
            baiduMapService.clearOverlays();
            baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
            if (town === '全区') {
                coverageService.queryMrGridCompete(district, $scope.endDate.value, competeDescription).then(function(result) {
                    var coors = result[0].coordinates.split(';')[0];
                    var longtitute = parseFloat(coors.split(',')[0]);
                    var lattitute = parseFloat(coors.split(',')[1]);
                    collegeMapService.showRsrpMrGrid(result, longtitute, lattitute, $scope.areaStats, $scope.colorDictionary);
                });
            } else {
                parametersMapService.showTownBoundaries($scope.city.selected, district, town, color);
                coverageService.queryTownMrGridCompete(district, town, $scope.endDate.value, competeDescription).then(function(result) {
                    appRegionService.queryTown($scope.city.selected, district, town).then(function(stat) {
                        var longtitute = stat.longtitute;
                        var lattitute = stat.lattitute;
                        collegeMapService.showRsrpMrGrid(result, longtitute, lattitute, $scope.areaStats, $scope.colorDictionary);
                    });
                });
            }

        };
        $scope.showMrGrid = function (district, town) {
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
        $scope.showDistrictMrGrid = function (district) {
            $scope.showMrGrid(district.name, district.towns[0]);
        };
        $scope.showTelecomCoverage = function () {
            $scope.currentView = "自身覆盖";
            $scope.setRsrpLegend();
            $scope.showDistrictSelfCoverage($scope.currentDistrict, town, $scope.colors[0]);
        };
        $scope.showMobileCompete = function () {
            $scope.currentView = "移动竞对";
            $scope.setCompeteLegend();
            $scope.showDistrictCompeteCoverage($scope.currentDistrict, $scope.currentTown, $scope.colors[0], $scope.currentView);
        };
        $scope.showUnicomCompete = function() {
            $scope.currentView = "联通竞对";
            $scope.setCompeteLegend();
            $scope.showDistrictCompeteCoverage($scope.currentDistrict, $scope.currentTown, $scope.colors[0], $scope.currentView);
        };
        $scope.showOverallCompete = function() {
            $scope.currentView = "竞对总体";
            $scope.setCompeteLegend();
            $scope.showDistrictCompeteCoverage($scope.currentDistrict, $scope.currentTown, $scope.colors[0], $scope.currentView);
        };
        $scope.districts = [];
        $scope.setRsrpLegend();
        $scope.$watch('city.selected', function(city) {
            if (city) {
                var districts = [];
                dumpPreciseService.generateUsersDistrict(city, districts, function(district, $index) {
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
    .controller("mr.app", function ($scope, baiduMapService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

    })

    .controller("home.complain", function ($scope, baiduMapService, dumpPreciseService, complainService, baiduQueryService, neGeometryService,
        networkElementService, mapDialogService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

        $scope.showDistrictComplains = function(district, color) {
            var city = $scope.city.selected;
            baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
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
                                mapDialogService.showOnlineSustainInfos(items);
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
                $scope.initializeLegend();
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function (district, $index) {
                    $scope.showDistrictComplains(district, $scope.colors[$index]);
                });
            }
        });

    })
    .controller("complain.micro", function ($scope, baiduMapService, alarmsService, dumpPreciseService, mapDialogService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");

        alarmsService.queryMicroItems().then(function(items) {
            angular.forEach(items, function(item) {
                var marker = baiduMapService.generateIconMarker(item.longtitute, item.lattitute, "/Content/themes/baidu/address.png");
                baiduMapService.addOneMarkerToScope(marker, function(stat) {
                    mapDialogService.showMicroAmpliferInfos(stat);
                }, item);
            });
        });

        $scope.districts = [];

        $scope.$watch('city.selected', function (city) {
            if (city) {
                $scope.legend.title = city;
                $scope.initializeLegend();
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function (district, $index) {
                    baiduMapService.addDistrictBoundary(district, $scope.colors[$index]);
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
            baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区');
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
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区');
            });
            parametersMapService.displaySourceDistributions($scope.indoorDistributions, $scope.distributionFilters, $scope.colors);
        };
        $scope.showScaleDistributions = function() {
            $scope.currentView = "规模";
            baiduMapService.clearOverlays();
            baiduMapService.addCityBoundary($scope.city.selected);
            $scope.updateScaleLegendDefs();

            angular.forEach($scope.districts, function(district) {
                baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区');
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
    .controller("college.map", function ($scope, collegeDialogService, baiduMapService, collegeMapService) {
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
            collegeDialogService.maintainCollegeInfo($scope.collegeInfo.year.selected);
        };
        $scope.showFlow = function() {
            collegeDialogService.showCollegeFlow($scope.collegeInfo.year.selected);
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
        collegeMapService, baiduQueryService) {
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
            parametersMapService.showCollegeENodebs(college.name, $scope.beginDate, $scope.endDate);
        };

        collegeQueryService.queryAll().then(function (spots) {
            $scope.hotSpots = spots;
            $scope.showView($scope.hotSpots[0]);
        });
    })

    .controller("query.topic", function ($scope, baiduMapService, customerDialogService, basicImportService, mapDialogService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        $scope.query = function () {
            mapDialogService.showHotSpotsInfo($scope.hotSpotList);
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
        mapDialogService, parametersMapService) {
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
            baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
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
                            mapDialogService.showTownENodebInfo(item, $scope.city.selected, district);
                            parametersMapService.showTownBoundaries(item.cityName, item.districtName, item.townName, $scope.colors[$index % $scope.colors.length]);
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
            baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
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
            baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
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
            baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
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
        neGeometryService, mapDialogService, baiduQueryService) {
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
            baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
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
                                mapDialogService.showPlanningSitesInfo(sectors[0]);
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
            angular.forEach($scope.districts, function(district, $index) {
                $scope.showPlanningSite(city, district, $scope.colors[$index]);
            });
        };
        $scope.showOpenningSite = function(city, district, color) {
            baiduMapService.addDistrictBoundary($scope.city.selected + '市' + district + '区', color);
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
            angular.forEach($scope.districts, function(district, $index) {
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
                    angular.forEach(keys, function(key, $index) {
                        var subSites = _.filter(sites, { siteCategory: key });
                        baiduMapService.drawMultiPoints(subSites, $scope.colors[$index + 1], -xOffset, -yOffset, function (e) {
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
        $scope.$watch('city.selected', function(city) {
            if (city) {
                dumpPreciseService.generateUsersDistrict(city, $scope.districts, function (district, $index) {
                    $scope.showPlanningSite(city, district, $scope.colors[$index]);
                });
            }
        });
        
    })
    .controller("home.interference", function ($scope, baiduMapService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
    })

    .controller("bts.construction", function ($scope, baiduMapService, dumpPreciseService, appRegionService, flowService, collegeMapService,
    geometryService, parametersDialogService) {
        baiduMapService.initializeMap("map", 11);
        baiduMapService.addCityBoundary("佛山");
        $scope.legend.title = "建设状态";
        $scope.legend.intervals = [{
            threshold: "审计会审",
            color: "#ffdf47"
        },{
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
        }];

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
                angular.forEach(states, function(status) {
                    var subSites = _.filter(sites, { status: status });
                    if (subSites.length) {
                        collegeMapService.showConstructionSites(subSites, status, function(site) {
                            parametersDialogService.showConstructionInfo(site);
                        });
                    }
                });
            } else {
                var filterSites = _.filter(sites, { status: $scope.status.selected });
                if (filterSites.length) {
                    collegeMapService.showConstructionSites(filterSites, $scope.status.selected, function(site) {
                        parametersDialogService.showConstructionInfo(site);
                    });
                }
            }
        };

        $scope.queryConstructionPoints = function () {
            baiduMapService.clearOverlays();
            if ($scope.bts.outOfBoundary) {
                flowService.queryConstructionByTownAndName($scope.district.selected,
                    $scope.town.selected, $scope.bts.name).then(function (sites) {
                    $scope.showConstructionSites(sites);
                });
            } else {
                flowService.queryConstructionByTownAndNameInBoundary($scope.district.selected,
                    $scope.town.selected, $scope.bts.name, baiduMapService.getRange()).then(function (sites) {
                    $scope.showConstructionSites(sites);
                });
            }
        };

        $scope.$watch('city.selected', function (city) {
            if (city) {
                dumpPreciseService.generateUsersDistrict(city, $scope.district.options);
            }
        });
        $scope.$watch('district.selected', function(district) {
            if (district && district !== '全部') {
                appRegionService.queryTowns($scope.city.selected, district).then(function(towns) {
                    $scope.town.options = ['全部'];
                    angular.forEach(towns, function(town) {
                        $scope.town.options.push(town);
                    });
                });
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
    
    .controller("fixing.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        mapDialogService, baiduQueryService, dumpPreciseService) {
        $scope.districts = [];
        $scope.distinct = $scope.distincts[0];
        $scope.statusNames = new Array('很紧急', '紧急', '极重要','重要','一般','整治完成', '全部');
        baiduMapService.initializeMap("map", 13);

        $scope.statusIndex = 0;
        $scope.status = $scope.statusNames[$scope.statusIndex];
        $scope.distinctIndex = 0;

        //获取站点
        $scope.getStations = function (areaIndex, status, color) {
            var areaName = $scope.areaNames[areaIndex];
            downSwitchService.getFixingStation(areaName, status, 0, 10000).then(function (response) {

                var stations = response.result.rows;
                if (stations.length) {
                    baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - stations[0].longtitute;
                        var yOffset = coors.y - stations[0].lattitute;
                        baiduMapService.drawPointCollection(stations, color, -xOffset, -yOffset, function(e) {
                            mapDialogService.showCheckingStationInfo(e.point.data);
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
    .controller("checking.network", function ($scope, downSwitchService, baiduMapService, geometryService,
        parametersDialogService, baiduQueryService, dumpPreciseService) {
        $scope.districts = [];
        $scope.distinct = $scope.distincts[0];
        $scope.statusNames = new Array('未巡检', '需整治', '正常', '全部');
        baiduMapService.initializeMap("map", 13);

        $scope.statusIndex = 0;
        $scope.status = $scope.statusNames[$scope.statusIndex];
        $scope.distinctIndex = 0;

        //获取站点
        $scope.getStations = function (areaIndex, status, color) {
            var areaName = $scope.areaNames[areaIndex];
            downSwitchService.getCheckingStation(areaName, status, 0, 10000).then(function (response) {
                var stations = response.result.rows;
                if (stations.length) {
                    baiduQueryService.transformToBaidu(stations[0].longtitute, stations[0].lattitute).then(function(coors) {
                        var xOffset = coors.x - stations[0].longtitute;
                        var yOffset = coors.y - stations[0].lattitute;
                        baiduMapService.drawPointCollection(stations, color, -xOffset, -yOffset, function(e) {
                            parametersDialogService.showCheckingStationInfo(e.point.data);
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
