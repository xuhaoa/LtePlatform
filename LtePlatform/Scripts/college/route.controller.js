angular.module('myApp', ['college.main', 'college.query', 'college.test']);

angular.module('college.main', ['app.common'])
    .config(function($stateProvider, $urlRouterProvider) {
        var viewDir = "/appViews/College/";
        $stateProvider
            .state('map', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "AllMap.html",
                        controller: "all.map"
                    },
                    'collegeList': {
                        templateUrl: viewDir + "CollegeMenuType.html",
                        controller: "college.menu"
                    }
                },
                url: "/"
            }).state('collegeMap', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "CollegeMap.html",
                        controller: "map.name"
                    },
                    'collegeList': {
                        templateUrl: viewDir + "CollegeMenuType.html",
                        controller: "college.menu"
                    }
                },
                url: "/map/:name/:type"
            }).state('query', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "Stat.html",
                        controller: "all.query"
                    },
                    'collegeList': {
                        templateUrl: viewDir + "CollegeMenu.html",
                        controller: "college.menu"
                    }
                },
                url: "/query"
            }).state('collegeQuery', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "/Infrastructure/CollegeQuery.html",
                        controller: "query.name"
                    },
                    'collegeList': {
                        templateUrl: viewDir + "CollegeMenu.html",
                        controller: "college.menu"
                    }
                },
                url: "/query/:name"
            }).state('coverage', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "/Coverage/All.html",
                        controller: "all.coverage"
                    },
                    'collegeList': {
                        templateUrl: viewDir + "CollegeMenu.html",
                        controller: "college.menu"
                    }
                },
                url: "/coverage"
            }).state('collegeCoverage', {
                views: {
                    'menu': {
                        templateUrl: "/appViews/GeneralMenu.html",
                        controller: "menu.root"
                    },
                    "contents": {
                        templateUrl: viewDir + "/Coverage/CollegeMap.html",
                        controller: "coverage.name"
                    },
                    'collegeList': {
                        templateUrl: viewDir + "CollegeMenu.html",
                        controller: "college.menu"
                    }
                },
                url: "/coverage/:name"
            });
        $urlRouterProvider.otherwise('/');
    })
    .run(function($rootScope, collegeService) {
        var rootUrl = "/College/Map#";
        $rootScope.menuItems = [];
        $rootScope.rootPath = rootUrl + "/";

        $rootScope.collegeInfo = {
            year: {
                options: [2015, 2016, 2017],
                selected: new Date().getYear() + 1900
            },
            url: $rootScope.rootPath + "map",
            names: [],
            type: ""
        };
        $rootScope.page = {
            title: "校园网总览",
            messages: []
        };
        collegeService.queryNames().then(function(result) {
            $rootScope.collegeInfo.names = result;
        });
        $rootScope.city = {
            selected: "",
            options: []
        };
        $rootScope.district = {
            options: [],
            selected: ""
        };
        $rootScope.town = {
            options: [],
            selected: ""
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
        $rootScope.closeAlert = function($index) {
            $rootScope.page.messages.splice($index, 1);
        };
    })

    .controller("menu.root", function ($scope) {
        $scope.menuTitle = "功能列表";
        var rootUrl = "/College/Map#";
        $scope.menuItems = [
            {
                displayName: "覆盖情况",
                tag: "coverage",
                isActive: true,
                subItems: [
                    {
                        displayName: "校园网总览",
                        url: rootUrl + "/"
                    }, {
                        displayName: "基础信息查看",
                        url: rootUrl + "/query"
                    }, {
                        displayName: "校园覆盖",
                        url: rootUrl + "/coverage"
                    }
                ]
            }, {
                displayName: "日常管理",
                tag: "management",
                isActive: true,
                subItems: [
                    {
                        displayName: "测试报告",
                        url: rootUrl + "/test"
                    }, {
                        displayName: "指标报告",
                        url: rootUrl + "/kpi"
                    }, {
                        displayName: "精确覆盖",
                        url: rootUrl + "/precise"
                    }
                ]
            }
        ];
    })
    .controller("college.menu", function ($scope, $stateParams) {
        $scope.collegeInfo.type = $stateParams.type || 'lte';
        $scope.collegeName = $stateParams.name;
    })
    .controller("all.map", function($scope, $uibModal, $log, baiduMapService, collegeMapService) {
        $scope.collegeInfo.url = $scope.rootPath + "map";
        $scope.page.title = "校园网总览";

        var showCollegDialogs = function(college) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/appViews/College/Table/CollegeMapInfoBox.html',
                controller: 'map.college.dialog',
                size: 'sm',
                resolve: {
                    dialogTitle: function() {
                        return college.name + "-" + "基本信息";
                    },
                    college: function() {
                        return college;
                    }
                }
            });
            modalInstance.result.then(function(info) {
                console.log(info);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        baiduMapService.initializeMap("all-map", 11);
        baiduMapService.addCityBoundary("佛山");

        collegeMapService.showCollegeInfos(showCollegDialogs, $scope.collegeInfo.year.selected);
    })
    .controller("map.name", function($scope, $uibModal, $stateParams, $log,
        baiduMapService, geometryService, collegeService, collegeQueryService, collegeMapService,
        parametersMapService, parametersDialogService) {

        $scope.collegeInfo.url = $scope.rootPath + "map";
        $scope.collegeName = $stateParams.name;
        $scope.addENodebs = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/appViews/College/Infrastructure/CellSupplementDialog.html',
                controller: 'eNodeb.supplement.dialog',
                size: 'lg',
                resolve: {
                    collegeName: function () {
                        return $scope.collegeName;
                    },
                    center: function () {
                        return $scope.center;
                    }
                }
            });
            modalInstance.result.then(function (info) {
                var ids = [];
                angular.forEach(info, function(eNodeb) {
                    ids.push(eNodeb.eNodebId);
                });
                collegeQueryService.saveCollegeENodebs({
                    collegeName: $scope.collegeName,
                    eNodebIds: ids
                }).then(function(count) {
                    $scope.page.messages.push({
                        type: 'success',
                        contents: '增加ENodeb' + count + '个'
                    });
                });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.addBts = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/appViews/College/Infrastructure/CellSupplementDialog.html',
                controller: 'bts.supplement.dialog',
                size: 'lg',
                resolve: {
                    collegeName: function () {
                        return $scope.collegeName;
                    },
                    center: function () {
                        return $scope.center;
                    }
                }
            });
            modalInstance.result.then(function (info) {
                var ids = [];
                angular.forEach(info, function (bts) {
                    ids.push(bts.btsId);
                });
                collegeQueryService.saveCollegeBtss({
                    collegeName: $scope.collegeName,
                    btsIds: ids
                }).then(function (count) {
                    $scope.page.messages.push({
                        type: 'success',
                        contents: '增加Bts' + count + '个'
                    });
                });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        baiduMapService.initializeMap("all-map", 15);

        collegeQueryService.queryByName($scope.collegeName).then(function(college) {
            collegeMapService.drawCollegeArea(college.id, function (center) {
                geometryService.transformToBaidu(center.X, center.Y).then(function(coors) {
                    $scope.center = {
                        X: 2 * center.X - coors.x,
                        Y: 2 * center.Y - coors.y,
                        points: center.points
                    };
                });
            });
        });

        switch ($stateParams.type) {
        case 'lte':
            collegeService.queryENodebs($scope.collegeName).then(function (eNodebs) {
                if (eNodebs.length) {
                    parametersMapService.showENodebsElements(eNodebs, parametersDialogService.showENodebInfo);
                }
            });
            collegeService.queryCells($scope.collegeName).then(function (cells) {
                if (cells.length) {
                    parametersMapService.showCellSectors(cells, parametersDialogService.showCollegeCellInfo);
                }
            });
            break;
        case 'cdma':
            collegeService.queryBtss($scope.collegeName).then(function (btss) {
                if (btss.length) {
                    parametersMapService.showENodebsElements(btss, parametersDialogService.showENodebInfo);
                }
            });
            collegeService.queryCdmaCells($scope.collegeName).then(function (cells) {
                if (cells.length) {
                    parametersMapService.showCellSectors(cells, parametersDialogService.showCollegeCdmaCellInfo);
                }
            });
            break;
        case 'lteDistribution':
            collegeService.queryLteDistributions($scope.collegeName).then(function (distributions) {
                if (distributions.length) {
                    parametersMapService.showENodebsElements(distributions, parametersDialogService.showDistributionInfo);
                }
            });
            break;
        default:
            collegeService.queryCdmaDistributions($scope.collegeName).then(function (distributions) {
                if (distributions.length) {
                    parametersMapService.showENodebsElements(distributions, parametersDialogService.showDistributionInfo);
                }
            });
            break;
        }
    })
    .controller('map.college.dialog', function($scope, $uibModalInstance, college, dialogTitle) {
        $scope.college = college;
        $scope.dialogTitle = dialogTitle;

        $scope.ok = function() {
            $uibModalInstance.close($scope.college);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('college.new.dialog', function ($scope, $uibModalInstance, baiduMapService, geometryService, appRegionService, $timeout) {
        $scope.dialogTitle = "新建校园信息";
        $scope.collegeRegion = {
            area: 0,
            regionType: 0,
            info: ""
        };
        appRegionService.initializeCities().then(function(cities) {
            $scope.city.options = cities;
            $scope.city.selected = cities[0];
            appRegionService.queryDistricts($scope.city.selected).then(function(districts) {
                $scope.district.options = districts;
                $scope.district.selected = districts[0];
            });
        });
        $scope.saveCircleParameters = function(circle) {
            var center = circle.getCenter();
            var radius = circle.getRadius();
            $scope.collegeRegion.regionType = 0;
            $scope.collegeRegion.area = BMapLib.GeoUtils.getCircleArea(circle);
            $scope.collegeRegion.info = center.lng + ';' + center.lat + ';' + radius;
        };
        $scope.saveRetangleParameters = function (rect) {
            $scope.collegeRegion.regionType = 1;
            var pts = rect.getPath();
            $scope.collegeRegion.info = geometryService.getPathInfo(pts);
            $scope.collegeRegion.area = BMapLib.GeoUtils.getPolygonArea(pts);
        };
        $scope.savePolygonParameters = function(polygon) {
            $scope.collegeRegion.regionType = 2;
            var pts = polygon.getPath();
            $scope.collegeRegion.info = geometryService.getPathInfo(pts);
            $scope.collegeRegion.area = BMapLib.GeoUtils.getPolygonArea(pts);
        };
        $timeout(function() {
            baiduMapService.initializeMap('map', 12);
            baiduMapService.initializeDrawingManager();
            baiduMapService.addDrawingEventListener('circlecomplete', $scope.saveCircleParameters);
            baiduMapService.addDrawingEventListener('rectanglecomplete', $scope.saveRetangleParameters);
            baiduMapService.addDrawingEventListener('polygoncomplete', $scope.savePolygonParameters);
        }, 500);
        $scope.matchPlace = function() {
            geometryService.queryBaiduPlace($scope.collegeName).then(function(result) {
                angular.forEach(result, function(place) {
                    var marker = baiduMapService.generateMarker(place.location.lng, place.location.lat);
                    baiduMapService.addOneMarker(marker);
                    baiduMapService.drawLabel(place.name, place.location.lng, place.location.lat);
                });
            });
        };
        $scope.ok = function () {
            $scope.college = {
                name: $scope.collegeName,
                townId: 0,
                collegeRegion: $scope.collegeRegion
            };
            appRegionService.queryTown($scope.city.selected, $scope.district.selected, $scope.town.selected).then(function(town) {
                if (town) {
                    $scope.college.townId = town.id;
                    $uibModalInstance.close($scope.college);
                }
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller("all.coverage", function ($scope, collegeMapService, collegeDtService) {
        $scope.collegeInfo.url = $scope.rootPath + "coverage";
        $scope.page.title = "校园覆盖";
        $scope.dtInfos = [];

        $scope.query = function () {
            angular.forEach($scope.dtInfos, function (info) {
                collegeDtService.updateFileInfo(info, $scope.beginDate.value, $scope.endDate.value);
            });
        };

        collegeMapService.showDtInfos($scope.dtInfos, $scope.beginDate.value, $scope.endDate.value);
    })
    .controller('coverage.name', function ($scope, $stateParams, collegeMapService, collegeDtService, coverageService) {
        $scope.page.title = $stateParams.name + '覆盖情况评估';
        $scope.includeAllFiles = false;
        $scope.network = {
            options: ['2G', '3G', '4G'],
            selected: '2G'
        };
        $scope.dataFile = {
            options: [],
            selected: ''
        };
        $scope.data = [];

        $scope.query = function() {
            switch ($scope.network.selected) {
            case '2G':
                $scope.kpi = {
                    options: ['Ec/Io', 'RxAGC', 'TxPower'],
                    selected: 'Ec/Io'
                };
                break;
            case '3G':
                $scope.kpi = {
                    options: ['SINR', 'RxAGC0', 'RxAGC1'],
                    selected: 'SINR'
                };
                break;
            default:
                $scope.kpi = {
                    options: ['RSRP', 'SINR'],
                    selected: 'RSRP'
                };
                break;
            }
            if ($scope.center) {
                collegeDtService.queryRaster($scope.center, $scope.network.selected, $scope.beginDate.value, $scope.endDate.value, function(files) {
                    $scope.dataFile.options = files;
                    if (files.length) {
                        $scope.dataFile.selected = files[0];
                    }
                });
            }
        };

        $scope.$watch('network.selected', function() {
            $scope.query();
        });

        var queryRasterInfo = function(index) {
            coverageService.queryByRasterInfo($scope.dataFile.options[index], $scope.network.selected).then(function(result) {
                $scope.data.push.apply($scope.data, result);
                if (index < $scope.dataFile.options.length - 1) {
                    queryRasterInfo(index + 1);
                } else {
                    console.log($scope.data);
                }
            });
        };

        $scope.showResults = function () {
            $scope.data = [];
            if ($scope.includeAllFiles) {
                queryRasterInfo(0);
            } else {
                coverageService.queryByRasterInfo($scope.dataFile.selected, $scope.network.selected).then(function (result) {
                    $scope.data = result;
                    console.log($scope.data);
                });
            }
        };

        collegeMapService.queryCenterAndCallback($stateParams.name, function(center) {
            $scope.center = {
                centerX: center.X,
                centerY: center.Y
            };
            $scope.query();
        });
    });
