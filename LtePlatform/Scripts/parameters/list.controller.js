angular.module('myApp', ['app.common'])
    .config(function($stateProvider, $urlRouterProvider) {
        var viewDir = "/appViews/Parameters/";
        $stateProvider
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
            .state('topicCells', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.topic"
                    },
                    "contents": {
                        templateUrl: viewDir + "Region/TopicCells.html",
                        controller: "topic.cells"
                    }
                },
                url: "/topicCells/:name"
            })
            .state('buildings', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.topic"
                    },
                    "contents": {
                        templateUrl: "/appViews/Evaluation/Home.html",
                        controller: "evaluation.home"
                    }
                },
                url: "/buildings"
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
                    }, {
                        displayName: "万栋楼宇优化",
                        url: rootUrl + "/buildings"
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
        $rootScope.closeAlert = function (messages, index) {
            messages.splice(index, 1);
        };
    })
    .controller("evaluation.home", function ($scope, $http, baiduMapService, baiduQueryService,
        parametersMapService, parametersDialogService) {
        baiduQueryService.queryWandonglouyu().then(function (buildings) {
            baiduMapService.initializeMap("map", 12);
            parametersMapService.showPhpElements(buildings, parametersDialogService.showBuildingInfo);
        });
    })
    .controller("query.topic", function ($scope, customerDialogService, basicImportService) {
        $scope.page.title = "专题优化管理";
        $scope.query = function () {
            basicImportService.queryAllHotSpots().then(function (result) {
                $scope.hotSpotList = result;
            });
        };
        $scope.addHotSpot = function () {
            customerDialogService.constructHotSpot(function() {
                $scope.query();
            });
        };
        $scope.query();
    })
    .controller("cdmaCell.info", function ($scope, $stateParams, networkElementService) {
        $scope.page.title = $stateParams.name + "-" + $stateParams.sectorId + "小区信息";
        $scope.isHuaweiCell = false;
        
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
    .controller("menu.lte", function ($scope, $stateParams, menuItemService) {
        $scope.menuTitle = $stateParams.name + "详细信息";

        menuItemService.updateMenuItem($scope.menuItems, 1,
            $stateParams.name + "LTE基础信息",
            $scope.rootPath + "eNodebInfo" + "/" + $stateParams.eNodebId + "/" + $stateParams.name);

    })
    .controller("menu.topic", function ($scope, $stateParams, menuItemService) {
        $scope.menuTitle = $stateParams.name + "热点小区信息";

        menuItemService.updateMenuItem($scope.menuItems, 1,
            $stateParams.name + "热点小区信息",
            $scope.rootPath + "topic" + "/" + $stateParams.name);

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

    .controller("topic.cells", function ($scope, $stateParams, complainService) {
        $scope.page.title = $stateParams.name + "热点小区信息";
        complainService.queryHotSpotCells($stateParams.name).then(function (existedCells) {
            $scope.cellList = existedCells;
        });
    })

    .controller('map.building.dialog', function ($scope, $uibModalInstance, building, dialogTitle) {
        $scope.building = building;
        $scope.dialogTitle = dialogTitle;

        $scope.ok = function () {
            $uibModalInstance.close($scope.building);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });