angular.module('myApp', ['parameters.main', 'parameters.menu', 'parameters.details']);

angular.module('parameters.main', ['app.common'])
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
                        displayName: "基础数据总揽",
                        url: rootUrl + "/"
                    }, {
                        displayName: "小区地图查询",
                        url: rootUrl + "/query"
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
    });