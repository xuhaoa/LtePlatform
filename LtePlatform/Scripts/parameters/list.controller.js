angular.module('myApp', ['app.common'])
    .config(function($stateProvider, $urlRouterProvider) {
        var viewDir = "/appViews/Parameters/";
        $stateProvider
            .state('list', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "List.html",
                        controller: "parameters.list"
                    }
                },
                url: "/"
            })
            .state('query', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "QueryMap.html",
                        controller: "query.map"
                    }
                },
                url: "/query"
            })
            .state('topic', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "Topic.html",
                        controller: "query.topic"
                    }
                },
                url: "/topic"
            })
            .state('eNodebList', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.town"
                    },
                    "contents": {
                        templateUrl: viewDir + "Region/ENodebTable.html",
                        controller: "eNodeb.list"
                    }
                },
                url: "/eNodebList/:city/:district/:town"
            })
            .state('btsList', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.town"
                    },
                    "contents": {
                        templateUrl: viewDir + "Region/BtsTable.html",
                        controller: "bts.list"
                    }
                },
                url: "/btsList/:city/:district/:town"
            })
            .state('eNodebInfo', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.lte"
                    },
                    "contents": {
                        templateUrl: viewDir + "Region/ENodebInfo.html",
                        controller: "eNodeb.info"
                    }
                },
                url: "/eNodebInfo/:eNodebId/:name"
            })
            .state('Alarm', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.lte"
                    },
                    "contents": {
                        templateUrl: viewDir + "Region/Alarm.html",
                        controller: "eNodeb.alarm"
                    }
                },
                url: "/alarm/:eNodebId/:name"
            })
            .state('Flow', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.lte"
                    },
                    "contents": {
                        templateUrl: viewDir + "Region/ENodebFlow.html",
                        controller: "eNodeb.flow"
                    }
                },
                url: "/flow/:eNodebId/:name"
            })
            .state('btsInfo', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.cdma"
                    },
                    "contents": {
                        templateUrl: viewDir + "Region/BtsInfo.html",
                        controller: "bts.info"
                    }
                },
                url: "/btsInfo/:btsId/:name"
            })
            .state('cellInfo', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.lte"
                    },
                    "contents": {
                        templateUrl: viewDir + "Region/CellInfo.html",
                        controller: "cell.info"
                    }
                },
                url: "/cellInfo/:eNodebId/:name/:sectorId"
            })
            .state('cdmaCellInfo', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.cdma"
                    },
                    "contents": {
                        templateUrl: viewDir + "Region/CdmaCellDetails.html",
                        controller: "cdmaCell.info"
                    }
                },
                url: "/cdmaCellInfo/:btsId/:name/:sectorId"
            });
        $urlRouterProvider.otherwise('/');
    })
    .run(function($rootScope) {
        var rootUrl = "/Parameters/List#";
        $rootScope.menuItems = [
            {
                displayName: "总体情况",
                isActive: true,
                subItems: [
                    {
                        displayName: "基础数据总览",
                        url: rootUrl + "/"
                    }, {
                        displayName: "小区地图查询",
                        url: rootUrl + "/query"
                    }, {
                        displayName: "专题优化管理",
                        url: rootUrl + "/topic"
                    }
                ]
            }, {
                displayName: "详细查询",
                isActive: false,
                subItems: []
            }
        ];
        $rootScope.menu = {
            accordions: {
            
            }
        };
        $rootScope.rootPath = rootUrl + "/";

        $rootScope.viewData = {
            workItems: []
        };
        $rootScope.page = {
            title: "基础数据总览"
        };
    })
    .controller("parameters.list", function($scope, appRegionService, parametersChartService) {
        $scope.page.title = "基础数据总览";
        $scope.city = {
            selected: "",
            options: []
        };
        $scope.showCityStats = function() {
            appRegionService.queryDistrictInfrastructures($scope.city.selected).then(function(result) {
                appRegionService.accumulateCityStat(result, $scope.city.selected);
                $scope.districtStats = result;

                $("#cityLteENodebConfig").highcharts(parametersChartService.getDistrictLteENodebPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
                $("#cityLteCellConfig").highcharts(parametersChartService.getDistrictLteCellPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
                $("#cityCdmaENodebConfig").highcharts(parametersChartService.getDistrictCdmaBtsPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
                $("#cityCdmaCellConfig").highcharts(parametersChartService.getDistrictCdmaCellPieOptions(result.slice(0, result.length - 1),
                    $scope.city.selected));
            });
        };
        $scope.$watch('currentDistrict', function(district) {
            if ($scope.city === undefined) return;
            appRegionService.queryTownInfrastructures($scope.city.selected, district).then(function(result) {
                $scope.townStats = result;
                $("#districtLteENodebConfig").highcharts(parametersChartService.getTownLteENodebPieOptions(result, district));
                $("#districtLteCellConfig").highcharts(parametersChartService.getTownLteCellPieOptions(result, district));
                $("#districtCdmaENodebConfig").highcharts(parametersChartService.getTownCdmaBtsPieOptions(result, district));
                $("#districtCdmaCellConfig").highcharts(parametersChartService.getTownCdmaCellPieOptions(result, district));
            });
        });

        appRegionService.initializeCities().then(function(result) {
            $scope.city.options = result;
            $scope.city.selected = result[0];
            $scope.showCityStats();
        });
    })
    .controller("query.map", function($scope, $uibModal, $log, appRegionService, baiduMapService, parametersMapService,
        parametersDialogService) {
        $scope.page.title = "小区地图查询";
        $scope.network = {
            options: ["LTE", "CDMA"],
            selected: "LTE"
        };
        $scope.city = {
            selected: "",
            options: []
        };
        $scope.queryText = "";

        $scope.updateDistricts = function() {
            appRegionService.queryDistricts($scope.city.selected).then(function(result) {
                $scope.district.options = result;
                $scope.district.selected = result[0];
            });
        };
        $scope.updateTowns = function() {
            appRegionService.queryTowns($scope.city.selected, $scope.district.selected).then(function(result) {
                $scope.town.options = result;
                $scope.town.selected = result[0];
            });
        };

        $scope.queryItems = function() {
            baiduMapService.clearOverlays();
            if ($scope.network.selected === "LTE") {
                if ($scope.queryText.trim() === "") {
                    parametersMapService.showElementsInOneTown($scope.city.selected, $scope.district.selected, $scope.town.selected,
                        parametersDialogService.showENodebInfo, parametersDialogService.showCellInfo);
                } else {
                    parametersMapService.showElementsWithGeneralName($scope.queryText, parametersDialogService.showENodebInfo, parametersDialogService.showCellInfo);
                }
            } else {
                if ($scope.queryText.trim() === "") {
                    parametersMapService.showCdmaInOneTown($scope.city.selected, $scope.district.selected, $scope.town.selected,
                        parametersDialogService.showBtsInfo, parametersDialogService.showCdmaCellInfo);
                } else {
                    parametersMapService.showCdmaWithGeneralName($scope.queryText, parametersDialogService.showBtsInfo, parametersDialogService.showCdmaCellInfo);
                }
            }
        };

        appRegionService.initializeCities().then(function(result) {
            $scope.city.options = result;
            $scope.city.selected = result[0];
            baiduMapService.initializeMap("map", 12);
            appRegionService.queryDistricts($scope.city.selected).then(function(districts) {
                $scope.district = {
                    options: districts,
                    selected: districts[0]
                };
                appRegionService.queryTowns($scope.city.selected, $scope.district.selected).then(function(towns) {
                    $scope.town = {
                        options: towns,
                        selected: towns[0]
                    };
                });
            });
        });
    })
    .controller("query.topic", function ($scope, customerDialogService, basicImportService) {
        $scope.page.title = "专题优化管理";
        $scope.query=function() {
            basicImportService.queryAllHotSpots().then(function(result) {
                $scope.hotSpotList = result;
            });
        }
        $scope.addHotSpot = function () {
            customerDialogService.constructHotSpot(function() {
                $scope.query();
            });
        };
        $scope.query();
    })
    .controller("bts.info", function ($scope, $stateParams, networkElementService) {
        $scope.page.title = $stateParams.name + "CDMA基础信息";
        networkElementService.queryBtsInfo($stateParams.btsId).then(function (result) {
            $scope.btsDetails = result;
        });
        networkElementService.queryCdmaCellViews($stateParams.name).then(function (result) {
            $scope.cdmaCellList = result;
        });
    })
    .controller("cdmaCell.info", function ($scope, $stateParams, networkElementService) {
        $scope.page.title = $stateParams.name + "-" + $stateParams.sectorId + "小区信息";
        $scope.isHuaweiCell = false;
        networkElementService.queryCdmaCellInfo($stateParams.btsId, $stateParams.sectorId).then(function (result) {
            $scope.cdmaCellDetails = result;
        });
    })
    .controller("cell.info", function ($scope, $stateParams, neighborMongoService) {
        $scope.page.title = $stateParams.name + "-" + $stateParams.sectorId + "小区信息";
        $scope.isHuaweiCell = false;
        $scope.eNodebId = $stateParams.eNodebId;
        $scope.sectorId = $stateParams.sectorId;
        $scope.showNeighbors = function () {
            neighborMongoService.queryNeighbors($stateParams.eNodebId, $stateParams.sectorId).then(function (result) {
                $scope.mongoNeighbors = result;
            });
        };

    })
    .controller("eNodeb.alarm", function ($scope, $stateParams, alarmsService) {
        $scope.eNodebName = $stateParams.name;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 30);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
        $scope.alarmLevel = {
            options: ["严重告警", "重要以上告警", "所有告警"],
            selected: "重要以上告警"
        };
        $scope.alarms = [];

        $scope.searchAlarms = function () {
            alarmsService.queryENodebAlarmsByDateSpanAndLevel($stateParams.eNodebId,
                $scope.beginDate.value, $scope.endDate.value, $scope.alarmLevel.selected).then(function (result) {
                    $scope.alarms = result;
                });
        };

        $scope.searchAlarms();
    })
    .controller("eNodeb.flow", function ($scope, $stateParams, networkElementService, flowService) {
        $scope.eNodebName = $stateParams.name;
        var lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        $scope.beginDate = {
            value: lastWeek,
            opened: false
        };
        $scope.endDate = {
            value: new Date(),
            opened: false
        };
        $scope.queryFlow = function () {
            angular.forEach($scope.cellList, function (cell) {
                flowService.queryCellFlowByDateSpan(cell.eNodebId, cell.sectorId,
                    $scope.beginDate.value, $scope.endDate.value).then(function (flowList) {
                        cell.flowList = flowList;
                    });
            });
        };

        networkElementService.queryCellViewsInOneENodeb($stateParams.eNodebId).then(function (result) {
            $scope.cellList = result;
            $scope.queryFlow();
        });
    })
    .controller("eNodeb.info", function ($scope, $stateParams, networkElementService, cellHuaweiMongoService,
        alarmImportService, intraFreqHoService, interFreqHoService, appRegionService) {
        $scope.page.title = $stateParams.name + "LTE基础信息";

        appRegionService.queryENodebTown($stateParams.eNodebId).then(function (result) {
            $scope.city = result.item1;
            $scope.district = result.item2;
            $scope.town = result.item3;
        });

        //查询基站基本信息
        networkElementService.queryENodebInfo($stateParams.eNodebId).then(function (result) {
            $scope.eNodebDetails = result;
            if (result.factory === '华为') {
                cellHuaweiMongoService.queryLocalCellDef(result.eNodebId).then(function (cellDef) {
                    alarmImportService.updateHuaweiAlarmInfos(cellDef).then(function () { });
                });
            }
        });

        //查询该基站下带的小区列表
        networkElementService.queryCellViewsInOneENodeb($stateParams.eNodebId).then(function (result) {
            $scope.cellList = result;
        });

        //查询基站同频切换参数
        intraFreqHoService.queryENodebParameters($stateParams.eNodebId).then(function (result) {
            $scope.intraFreqHo = result;
        });

        //查询基站异频切换参数
        interFreqHoService.queryENodebParameters($stateParams.eNodebId).then(function (result) {
            $scope.interFreqHo = result;
        });
    })
    .controller("eNodeb.list", function ($scope, $stateParams, networkElementService) {
        $scope.page.title = $stateParams.city + $stateParams.district + $stateParams.town + "LTE基站列表";
        networkElementService.queryENodebsInOneTown($stateParams.city, $stateParams.district, $stateParams.town).then(function (result) {
            $scope.eNodebList = result;
        });
    })
    .controller("bts.list", function ($scope, $stateParams, networkElementService) {
        $scope.page.title = $stateParams.city + $stateParams.district + $stateParams.town + "CDMA基站列表";
        networkElementService.queryBtssInOneTown($stateParams.city, $stateParams.district, $stateParams.town).then(function (result) {
            $scope.btsList = result;
        });
    })
    .controller("menu.root", function ($scope) {
        $scope.menuTitle = "功能列表";
    })
    .controller("menu.cdma", function ($scope, $stateParams, networkElementService, menuItemService) {
        $scope.menuTitle = $stateParams.name + "详细信息";

        menuItemService.updateMenuItem($scope.menuItems, 1,
            $stateParams.name + "CDMA基础信息",
            $scope.rootPath + "btsInfo" + "/" + $stateParams.btsId + "/" + $stateParams.name);
        $scope.menu.accordions[$stateParams.name + "CDMA基础信息"] = true;

        networkElementService.queryCdmaSectorIds($stateParams.name).then(function (result) {
            angular.forEach(result, function (sectorId) {
                menuItemService.updateMenuItem($scope.menuItems, 1,
                    $stateParams.name + "-" + sectorId + "小区信息",
                    $scope.rootPath + "cdmaCellInfo" + "/" + $stateParams.btsId + "/" + $stateParams.name + "/" + sectorId,
                    $stateParams.name + "CDMA基础信息");
            });
        });
    })
    .controller("menu.lte", function ($scope, $stateParams, networkElementService, menuItemService) {
        $scope.menuTitle = $stateParams.name + "详细信息";

        menuItemService.updateMenuItem($scope.menuItems, 1,
            $stateParams.name + "LTE基础信息",
            $scope.rootPath + "eNodebInfo" + "/" + $stateParams.eNodebId + "/" + $stateParams.name);
        $scope.menu.accordions[$stateParams.name + "LTE基础信息"] = true;

        networkElementService.queryCellSectorIds($stateParams.name).then(function (result) {
            angular.forEach(result, function (sectorId) {
                menuItemService.updateMenuItem($scope.menuItems, 1,
                    $stateParams.name + "-" + sectorId + "小区信息",
                    $scope.rootPath + "cellInfo" + "/" + $stateParams.eNodebId + "/" + $stateParams.name + "/" + sectorId,
                    $stateParams.name + "LTE基础信息");
            });
        });
    })
    .controller("menu.town", function ($scope, $stateParams, menuItemService) {
        $scope.menuTitle = $stateParams.city + $stateParams.district + $stateParams.town + "基础信息";

        menuItemService.updateMenuItem($scope.menuItems, 0,
            $stateParams.city + $stateParams.district + $stateParams.town + "LTE基站列表",
            $scope.rootPath + "eNodebList" + "/" + $stateParams.city + "/" + $stateParams.district + "/" + $stateParams.town);
        menuItemService.updateMenuItem($scope.menuItems, 0,
            $stateParams.city + $stateParams.district + $stateParams.town + "CDMA基站列表",
            $scope.rootPath + "btsList" + "/" + $stateParams.city + "/" + $stateParams.district + "/" + $stateParams.town);
    })

    .controller('hot.spot.dialog', function ($scope, dialogTitle, $uibModalInstance) {
        $scope.dialogTitle = dialogTitle;
        $scope.spotType= {
            options: ["楼宇", "校园网", "医院", "商场", "交通枢纽", "其他"],
            selected: "楼宇"
        }
        $scope.ok = function () {
            $scope.dto.typeDescription = $scope.spotType.selected;
            $uibModalInstance.close($scope.dto);
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });