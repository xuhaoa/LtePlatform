angular.module('myApp', ['app.common'])
    .config(function($stateProvider, $urlRouterProvider) {
        var viewDir = "/appViews/College/";
        $stateProvider
            .state('root', {
                templateUrl: viewDir + "Root.html"
            })
            .state('root.map', {
                views: {
                    "contents": {
                        template: '<div id="all-map" style="width: 100%;height: 600px;overflow: hidden;margin:0;"></div>',
                        controller: "all.map"
                    },
                    'collegeList': {
                        templateUrl: viewDir + "CollegeMenuType.html",
                        controller: "college.menu"
                    }
                },
                url: "/"
            }).state('root.collegeMap', {
                views: {
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
            }).state('root.query', {
                views: {
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
            }).state('root.collegeQuery', {
                views: {
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
            }).state('root.coverage', {
                views: {
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
            }).state('root.collegeCoverage', {
                views: {
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
            }).state('root.support', {
                views: {
                    "contents": {
                        templateUrl: viewDir + "/Coverage/Support.html",
                        controller: "all.support"
                    },
                    'collegeList': {
                        templateUrl: viewDir + "/Coverage/SupportMenu.html",
                        controller: "support.menu"
                    }
                },
                url: "/support"
            }).state('root.collegeSupport', {
                views: {
                    "contents": {
                        templateUrl: viewDir + "/Coverage/CollegeSupport.html",
                        controller: "support.name"
                    },
                    'collegeList': {
                        templateUrl: viewDir + "/Coverage/SupportMenu.html",
                        controller: "support.menu"
                    }
                },
                url: "/support/:number"
            }).state('root.flow', {
                views: {
                    "contents": {
                        templateUrl: viewDir + "/Test/Flow.html",
                        controller: "all.flow"
                    },
                    'collegeList': {
                        templateUrl: viewDir + "CollegeMenu.html",
                        controller: "college.menu"
                    }
                },
                url: "/flow"
            }).state('root.collegeFlow', {
                views: {
                    "contents": {
                        templateUrl: viewDir + "/Test/CollegeFlow.html",
                        controller: "flow.name"
                    },
                    'collegeList': {
                        templateUrl: viewDir + "CollegeMenu.html",
                        controller: "college.menu"
                    }
                },
                url: "/flow/:name"
            });
        $urlRouterProvider.otherwise('/');
    })
    .run(function ($rootScope, collegeService, appRegionService) {
        $rootScope.menuTitle = "功能列表";
        var rootUrl = "/College/Map#";
        $rootScope.menuItems = [
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
                displayName: "容量质量",
                tag: "management",
                isActive: true,
                subItems: [
                    {
                        displayName: "支撑任务",
                        url: rootUrl + "/support"
                    }, {
                        displayName: "流量分析",
                        url: rootUrl + "/flow"
                    }, {
                        displayName: "精确覆盖",
                        url: rootUrl + "/precise"
                    }
                ]
            }
        ];
        $rootScope.rootPath = rootUrl + "/";
        $rootScope.menuPath = "/appViews/GeneralMenu.html";

        $rootScope.collegeInfo = {
            year: {
                options: [2015, 2016, 2017],
                selected: new Date().getYear() + 1900
            },
            url: $rootScope.rootPath + "map",
            names: [],
            type: "",
            supportInfos: []
        };
        $rootScope.page = {
            title: "校园网总览",
            messages: [],
            projecteName: ""
        };
        collegeService.queryNames().then(function(result) {
            $rootScope.collegeInfo.names = result;
        });
        $rootScope.town = {
            options: [],
            selected: ""
        };
        appRegionService.initializeCities().then(function (cities) {
            $rootScope.city = {
                selected: cities[0],
                options: cities
            };
            appRegionService.queryDistricts(cities[0]).then(function (districts) {
                $rootScope.district = {
                    options: districts,
                    selected: districts[0]
                };
            });
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
        $rootScope.closeAlert = function($index) {
            $rootScope.page.messages.splice($index, 1);
        };
    })

    .controller("college.menu", function ($scope, $stateParams) {
        $scope.collegeInfo.type = $stateParams.type || 'lte';
        $scope.collegeName = $stateParams.name;
    })
    .controller("support.menu", function ($scope, emergencyService) {
        $scope.collegeInfo.url = $scope.rootPath + "support";
        emergencyService.queryCollegeVipDemands($scope.collegeInfo.year.selected).then(function(items) {
            $scope.collegeInfo.supportInfos = items;
        });
    })
    .controller("all.map", function($scope, collegeDialogService, baiduMapService, collegeMapService) {
        $scope.collegeInfo.url = $scope.rootPath + "map";
        $scope.page.title = "校园网总览";

        var showCollegDialogs = function(college) {
            collegeDialogService.showCollegDialog(college);
        };

        baiduMapService.initializeMap("all-map", 11);
        baiduMapService.addCityBoundary("佛山");

        collegeMapService.showCollegeInfos(showCollegDialogs, $scope.collegeInfo.year.selected);
    })
    .controller("map.name", function($scope, $stateParams,
        baiduMapService, baiduQueryService, collegeService, collegeQueryService, collegeMapService,
        parametersMapService, parametersDialogService, collegeDialogService) {

        $scope.collegeInfo.url = $scope.rootPath + "map";
        $scope.collegeName = $stateParams.name;
        $scope.addENodebs = function () {
            collegeDialogService.addENodeb($scope.collegeName, $scope.center, function (count) {
                $scope.page.messages.push({
                    type: 'success',
                    contents: '增加ENodeb' + count + '个'
                });
            });
        };
        $scope.addBts = function() {
            collegeDialogService.addBts($scope.collegeName, $scope.center, function (count) {
                $scope.page.messages.push({
                    type: 'success',
                    contents: '增加Bts' + count + '个'
                });
            });
        };

        baiduMapService.initializeMap("all-map", 15);

        collegeQueryService.queryByName($scope.collegeName).then(function(college) {
            collegeMapService.drawCollegeArea(college.id, function (center) {
                baiduQueryService.transformToBaidu(center.X, center.Y).then(function (coors) {
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
    .controller('coverage.name', function ($scope, $stateParams, baiduMapService, collegeQueryService, baiduQueryService,
        collegeMapService, collegeDtService, coverageService, kpiDisplayService) {
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
        $scope.coverageOverlays = [];

        $scope.query = function () {
            $scope.kpi = kpiDisplayService.queryKpiOptions($scope.network.selected);
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

        $scope.showDtPoints = function () {
            $scope.legend = kpiDisplayService.queryCoverageLegend($scope.kpi.selected);
            $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
            kpiDisplayService.generateCoveragePoints($scope.coveragePoints, $scope.data, $scope.kpi.selected);
            angular.forEach($scope.coverageOverlays, function(overlay) {
                baiduMapService.removeOverlay(overlay);
            });
            angular.forEach($scope.coveragePoints.intervals, function(interval) {
                var coors = interval.coors;
                if (coors.length > 0) {
                    baiduQueryService.transformBaiduCoors(coors[0]).then(function (newCoor) {
                        var xoffset = coors[0].longtitute - newCoor.longtitute;
                        var yoffset = coors[0].lattitute - newCoor.lattitute;
                        $scope.coverageOverlays.push(baiduMapService.drawMultiPoints(coors, interval.color, xoffset, yoffset));
                    });
                }
            });
        };

        var queryRasterInfo = function(index) {
            coverageService.queryByRasterInfo($scope.dataFile.options[index], $scope.network.selected).then(function(result) {
                $scope.data.push.apply($scope.data, result);
                if (index < $scope.dataFile.options.length - 1) {
                    queryRasterInfo(index + 1);
                } else {
                    $scope.showDtPoints();
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
                    $scope.showDtPoints();
                });
            }
        };

        collegeMapService.queryCenterAndCallback($stateParams.name, function(center) {
            baiduQueryService.transformToBaidu(center.X, center.Y).then(function (coors) {
                $scope.center = {
                    centerX: 2 * center.X - coors.x,
                    centerY: 2 * center.Y - coors.y
                };
            });
            $scope.query();
            baiduMapService.initializeMap("all-map", 15);
            collegeQueryService.queryByName($stateParams.name).then(function (college) {
                collegeMapService.drawCollegeArea(college.id, function () {});
            });
        });
    })


    .controller("all.flow", function ($scope, collegeQueryService, parametersChartService) {
        $scope.collegeInfo.url = $scope.rootPath + "flow";
        $scope.page.title = "流量分析";
        $scope.collegeStatCount = 0;
        $scope.query = function() {
            angular.forEach($scope.collegeList, function(college) {
                collegeQueryService.queryCollegeFlow(college.name, $scope.beginDate.value, $scope.endDate.value).then(function(stat) {
                    college.pdcpDownlinkFlow = stat.pdcpDownlinkFlow;
                    college.pdcpUplinkFlow = stat.pdcpUplinkFlow;
                    college.averageUsers = stat.averageUsers;
                    college.cellCount = stat.cellCount;
                    college.maxActiveUsers = stat.maxActiveUsers;
                    $scope.collegeStatCount += 1;
                });
            });
        };
        $scope.$watch('collegeStatCount', function(count) {
            if ($scope.collegeList && count === $scope.collegeList.length && count > 0) {
                $("#downloadFlowConfig").highcharts(parametersChartService.getCollegeDistributionForDownlinkFlow($scope.collegeList));
                $("#uploadFlowConfig").highcharts(parametersChartService.getCollegeDistributionForUplinkFlow($scope.collegeList));
                $("#averageUsersConfig").highcharts(parametersChartService.getCollegeDistributionForAverageUsers($scope.collegeList));
                $("#activeUsersConfig").highcharts(parametersChartService.getCollegeDistributionForActiveUsers($scope.collegeList));
                $scope.collegeStatCount = 0;
            }
        });
        collegeQueryService.queryYearList($scope.collegeInfo.year.selected).then(function (colleges) {
            $scope.collegeList = colleges;
            $scope.query();
        });
    })
    .controller("flow.name", function ($scope, $stateParams, collegeService, appKpiService, kpiChartService) {
        $scope.page.title = $stateParams.name + "流量分析";
        $scope.flowStats = [];
        $scope.mergeStats = [];
        $scope.query = function() {
            appKpiService.calculateFlowStats($scope.cellList, $scope.flowStats, $scope.mergeStats, $scope.beginDate, $scope.endDate);
        };
        $scope.showCharts = function() {
            kpiChartService.showFlowCharts($scope.flowStats, $stateParams.name, $scope.mergeStats);
        };
        collegeService.queryCells($stateParams.name).then(function(cells) {
            $scope.cellList = cells;
            $scope.query();
        });
    })
    .controller("all.support", function ($scope, collegeQueryService, emergencyService) {
        $scope.page.title = "支撑任务";
        $scope.updateInfos = function (year) {
            collegeQueryService.queryYearList(year).then(function (colleges) {
                $scope.collegeYearList = colleges;
            });
        };
        $scope.query = function() {
            emergencyService.queryCollegeVipDemands($scope.collegeInfo.year.selected).then(function(items) {
                $scope.collegeInfo.supportInfos = items;
            });
        };

        $scope.$watch('collegeInfo.year.selected', function (year) {
            $scope.updateInfos(year);
        });
    })
    .controller("support.name", function ($scope, $stateParams, customerQueryService, emergencyService, collegeDialogService) {
        $scope.queryProcessList = function() {
            emergencyService.queryVipProcessList($stateParams.number).then(function(items) {
                $scope.processItems = items;
            });
        };
        $scope.query = function() {
            customerQueryService.queryOneVip($stateParams.number).then(function(item) {
                $scope.item = item;
                $scope.page.projectName = item.projectName;
                if ($scope.item.nextStateDescription) {
                    $scope.processInfo = "已发起" + $scope.item.nextStateDescription + "流程";
                } else {
                    $scope.processInfo = "";
                }
            });
            $scope.queryProcessList();
        };
        $scope.createProcess = function () {
            emergencyService.createVipProcess($scope.item).then(function (process) {
                if (process) {
                    process.beginInfo = $scope.processInfo;
                    emergencyService.updateVipProcess(process).then(function () {
                        $scope.query();
                    });
                }
            });
        };
        $scope.construct3GTest = function() {
            collegeDialogService.construct3GTest($scope.item.area);
        };
        $scope.construct4GTest = function () {
            collegeDialogService.construct4GTest($scope.item.area);
        };

        $scope.query();
    })
    .controller("all.query", function ($scope, collegeService, collegeQueryService, collegeDialogService, appFormatService) {
        $scope.collegeInfo.url = $scope.rootPath + "query";
        $scope.page.title = "基础信息查看";
        $scope.collegeYearList = [];
        $scope.collegeName = $scope.collegeInfo.names[0];
        $scope.collegeExisted = true;

        $scope.updateInfos = function (year) {
            collegeService.queryStats(year).then(function (colleges) {
                $scope.collegeList = colleges;
            });
            collegeQueryService.queryYearList(year).then(function (colleges) {
                $scope.collegeYearList = colleges;
            });
            collegeQueryService.queryByNameAndYear($scope.collegeName, year).then(function (info) {
                $scope.collegeExisted = !!info;
            });
        };

        $scope.$watch('collegeInfo.year.selected', function (year) {
            $scope.updateInfos(year);
        });
        $scope.$watch('collegeName', function (name) {
            collegeQueryService.queryByNameAndYear(name, $scope.collegeInfo.year.selected).then(function (info) {
                $scope.collegeExisted = !!info;
            });
        });
        $scope.addOneCollegeMarkerInfo = function () {
            collegeQueryService.queryByNameAndYear($scope.collegeName, $scope.collegeInfo.year.selected - 1).then(function (item) {
                if (!item) {
                    var begin = new Date();
                    begin.setDate(begin.getDate() - 365 - 7);
                    var end = new Date();
                    end.setDate(end.getDate() - 365);
                    collegeQueryService.queryByName($scope.collegeName).then(function (college) {
                        item = {
                            oldOpenDate: appFormatService.getDateString(begin, 'yyyy-MM-dd'),
                            newOpenDate: appFormatService.getDateString(end, 'yyyy-MM-dd'),
                            collegeId: college.id
                        };
                        collegeDialogService.addYearInfo(item, $scope.collegeName, $scope.collegeInfo.year.selected, function () {
                            $scope.updateInfos($scope.collegeInfo.year.selected);
                        });
                    });
                } else {
                    collegeDialogService.addYearInfo(item, $scope.collegeName, $scope.collegeInfo.year.selected, function () {
                        $scope.updateInfos($scope.collegeInfo.year.selected);
                    });
                }
            });
        };
        $scope.createNewCollege = function () {
            collegeDialogService.addNewCollege($scope.updateInfos);
        };
    })
    .controller("query.name", function ($scope, $stateParams, collegeService, collegeDialogService) {
        $scope.collegeInfo.url = $scope.rootPath + "query";
        $scope.collegeName = $stateParams.name;
        $scope.parametersPath = "/Parameters/List#/";
        $scope.updateLteCells = function () {
            collegeService.queryCells($scope.collegeName).then(function (cells) {
                $scope.cellList = cells;
            });
        };
        $scope.supplementCells = function () {
            collegeDialogService.supplementENodebCells($scope.eNodebList, $scope.cellList, $scope.collegeName, $scope.updateLteCells);
        };
        $scope.supplementLonelyCells = function() {
            collegeDialogService.supplementPositionCells($scope.collegeName, $scope.updateLteCells);
        };
        collegeService.queryENodebs($scope.collegeName).then(function (eNodebs) {
            $scope.eNodebList = eNodebs;
        });
        $scope.updateLteCells();
        collegeService.queryBtss($scope.collegeName).then(function (btss) {
            $scope.btsList = btss;
        });
        collegeService.queryCdmaCells($scope.collegeName).then(function (cells) {
            $scope.cdmaCellList = cells;
        });
    });
