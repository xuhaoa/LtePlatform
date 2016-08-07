angular.module('myApp', ['college.main', 'college.query', 'college.coverage', 'college.test']);

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
            title: "校园网总览"
        };
        collegeService.queryNames().then(function(result) {
            $rootScope.collegeInfo.names = result;
        });

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
        baiduMapService,
        collegeService,
        collegeQueryService,
        collegeMapService,
        parametersMapService,
        parametersDialogService) {

        $scope.collegeInfo.url = $scope.rootPath + "map";
        $scope.collegeName = $stateParams.name;
        baiduMapService.initializeMap("all-map", 15);

        collegeQueryService.queryByName($scope.collegeName).then(function(college) {
            collegeMapService.drawCollegeArea(college.id);
        });

        switch ($stateParams.type) {
        case 'lte':
            collegeService.queryENodebs($scope.collegeName).then(function(eNodebs) {
                parametersMapService.showENodebsElements(eNodebs, parametersDialogService.showENodebInfo);
            });
            collegeService.queryCells($scope.collegeName).then(function(cells) {
                parametersMapService.showCellSectors(cells, parametersDialogService.showCollegeCellInfo);
            });
            break;
        case 'cdma':
            collegeService.queryBtss($scope.collegeName).then(function(btss) {
                parametersMapService.showENodebsElements(btss, parametersDialogService.showENodebInfo);
            });
            collegeService.queryCdmaCells($scope.collegeName).then(function(cells) {
                parametersMapService.showCellSectors(cells, parametersDialogService.showCollegeCdmaCellInfo);
            });
            break;
        case 'lteDistribution':
            collegeService.queryLteDistributions($scope.collegeName).then(function(distributions) {
                parametersMapService.showENodebsElements(distributions, parametersDialogService.showDistributionInfo);
            });
            break;
        default:
            collegeService.queryCdmaDistributions($scope.collegeName).then(function(distributions) {
                parametersMapService.showENodebsElements(distributions, parametersDialogService.showDistributionInfo);
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
    .controller('college.new.dialog', function ($scope, $uibModalInstance, baiduMapService, $timeout) {
        $scope.dialogTitle = "新建校园信息";
        $timeout(function() {
            baiduMapService.initializeMap('map', 12);
            baiduMapService.initializeDrawingManager();
        }, 500);
        
        $scope.saveCollege = function() {

        };
        $scope.ok = function () {
            $uibModalInstance.close($scope.college);
            $scope.saveCollege();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
