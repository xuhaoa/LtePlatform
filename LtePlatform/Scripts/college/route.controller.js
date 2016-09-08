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
        baiduMapService, geometryService, collegeService, collegeQueryService, collegeMapService,
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
    .controller('coverage.name', function ($scope, $stateParams, baiduMapService, collegeQueryService, geometryService,
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

        $scope.$watch('kpi.selected', function (kpi) {
            $scope.legend = kpiDisplayService.queryCoverageLegend(kpi);
        });

        $scope.showDtPoints = function() {
            $scope.coveragePoints = kpiDisplayService.initializeCoveragePoints($scope.legend);
            kpiDisplayService.generateCoveragePoints($scope.coveragePoints, $scope.data, $scope.kpi.selected);
            angular.forEach($scope.coverageOverlays, function(overlay) {
                baiduMapService.removeOverlay(overlay);
            });
            angular.forEach($scope.coveragePoints.intervals, function(interval) {
                var coors = interval.coors;
                if (coors.length > 0) {
                    geometryService.transformBaiduCoors(coors[0]).then(function(newCoor) {
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
            geometryService.transformToBaidu(center.X, center.Y).then(function (coors) {
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
    .controller("flow.name", function ($scope, $stateParams, collegeService, flowService,
        networkElementService, generalChartService, parametersChartService) {
        $scope.collegeInfo.url = $scope.rootPath + "flow";
        $scope.page.title = $stateParams.name + "流量分析";
        $scope.cellStatCount = 0;
        $scope.query = function() {
            angular.forEach($scope.cellList, function(cell) {
                flowService.queryAverageFlowByDateSpan(cell.eNodebId, cell.sectorId, $scope.beginDate.value, $scope.endDate.value).then(function (stat) {
                    if (stat) {
                        cell.pdcpDownlinkFlow = stat.pdcpDownlinkFlow;
                        cell.pdcpUplinkFlow = stat.pdcpUplinkFlow;
                        cell.averageUsers = stat.averageUsers;
                        cell.maxActiveUsers = stat.maxActiveUsers;
                    }

                    $scope.cellStatCount += 1;
                });
                networkElementService.queryLteRruFromCellName(cell.eNodebName+'-'+cell.sectorId).then(function (rru) {
                    cell.rruName = rru ? rru.rruName : '';
                });
            });
        };
        $scope.$watch('cellStatCount', function (count) {
            if ($scope.cellList && count === $scope.cellList.length && count > 0) {
                var result = generalChartService.generateColumnData($scope.cellList, function(stat) {
                    return stat.eNodebName + '-' + stat.sectorId;
                }, [
                    function(stat) {
                        return stat.pdcpDownlinkFlow;
                    }, function (stat) {
                        return stat.pdcpUplinkFlow;
                    }, function (stat) {
                        return stat.averageUsers;
                    }, function (stat) {
                        return stat.maxActiveUsers;
                    }
                ]);
                $("#downloadFlowConfig").highcharts(parametersChartService.getCellDistributionForDownlinkFlow(result, 0));
                $("#uploadFlowConfig").highcharts(parametersChartService.getCellDistributionForUplinkFlow(result, 1));
                $("#averageUsersConfig").highcharts(parametersChartService.getCellDistributionForAverageUsers(result, 2));
                $("#activeUsersConfig").highcharts(parametersChartService.getCellDistributionForActiveUsers(result, 3));
                $scope.cellStatCount = 0;
            }
        });
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
    })
    .controller('eNodeb.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryENodebs(name).then(function (result) {
            $scope.eNodebList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.eNodebList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('bts.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryBtss(name).then(function (result) {
            $scope.btsList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.btsList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('cell.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryCells(name).then(function (result) {
            $scope.cellList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.cellList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('cdmaCell.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryCdmaCells(name).then(function (result) {
            $scope.cdmaCellList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.cdmaCellList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('lte.distribution.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryLteDistributions(name).then(function (result) {
            $scope.distributionList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.distributionList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('cdma.distribution.dialog', function ($scope, $uibModalInstance, collegeService, name, dialogTitle) {
        $scope.dialogTitle = dialogTitle;
        collegeService.queryCdmaDistributions(name).then(function (result) {
            $scope.distributionList = result;
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.distributionList);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('year.info.dialog', function ($scope, $uibModalInstance, appFormatService,
        name, year, item) {
        $scope.dialogTitle = name + year + "年校园信息补充";
        $scope.dto = item;
        $scope.beginDate = {
            value: appFormatService.getDate(item.oldOpenDate),
            opened: false
        };
        $scope.endDate = {
            value: appFormatService.getDate(item.newOpenDate),
            opened: false
        };
        $scope.beginDate.value.setDate($scope.beginDate.value.getDate() + 365);
        $scope.endDate.value.setDate($scope.endDate.value.getDate() + 365);

        $scope.ok = function () {
            $scope.dto.oldOpenDate = $scope.beginDate.value;
            $scope.dto.newOpenDate = $scope.endDate.value;
            $scope.dto.year = year;
            $uibModalInstance.close($scope.dto);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('cell.supplement.dialog', function ($scope, $uibModalInstance, networkElementService, geometryService,
        eNodebs, cells, collegeName) {
        $scope.dialogTitle = collegeName + "LTE小区补充";
        $scope.supplementCells = [];
        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: true
        };
        $scope.gridOptions.multiSelect = true;
        $scope.gridOptions.columnDefs = [
          { name: '小区名称', field: 'cellName' },
          { name: '方位角', field: 'azimuth' },
          { name: '下倾角', field: 'downTilt' },
          { name: '频点', field: 'frequency' },
          { name: '室内外', field: 'indoor' },
          { name: '与基站距离', field: 'distance' },
          { name: 'RRU名称', field: 'rruName' }
        ];

        angular.forEach(eNodebs, function (eNodeb) {
            networkElementService.queryCellInfosInOneENodeb(eNodeb.eNodebId).then(function (cellInfos) {
                angular.forEach(cellInfos, function (dstCell) {
                    var i;
                    for (i = 0; i < cells.length; i++) {
                        if (dstCell.cellName === cells[i].eNodebName + '-' + cells[i].sectorId) {
                            break;
                        }
                    }
                    if (i === cells.length) {
                        dstCell.distance = geometryService.getDistance(eNodeb.lattitute, eNodeb.longtitute, dstCell.lattitute, dstCell.longtitute);
                        networkElementService.queryLteRruFromCellName(dstCell.cellName).then(function (rru) {
                            dstCell.rruName = rru ? rru.rruName : '';
                            $scope.supplementCells.push(dstCell);
                        });
                    }
                });
                $scope.gridOptions.data = $scope.supplementCells;
            });
        });

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('cell.position.supplement.dialog', function ($scope, $uibModalInstance, collegeMapService, geometryService, collegeService,
        networkElementService, collegeName) {
        $scope.dialogTitle = collegeName + "LTE小区补充";
        $scope.supplementCells = [];
        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: true
        };
        $scope.gridOptions.multiSelect = true;
        $scope.gridOptions.columnDefs = [
          { name: '小区名称', field: 'cellName' },
          { name: '方位角', field: 'azimuth' },
          { name: '下倾角', field: 'downTilt' },
          { name: '频点', field: 'frequency' },
          { name: '天线挂高', field: 'height' },
          { name: '室内外', field: 'indoor' },
          { name: 'RRU名称', field: 'rruName' }
        ];

        collegeMapService.queryCenterAndCallback(collegeName, function(center) {
            var ids = [];
            collegeService.queryCells(collegeName).then(function(cells) {
                angular.forEach(cells, function(cell) {
                    ids.push({
                        eNodebId: cell.eNodebId,
                        sectorId: cell.sectorId
                    });
                });
                geometryService.transformToBaidu(center.X, center.Y).then(function(coors) {
                    collegeService.queryRange(collegeName).then(function(range) {
                        networkElementService.queryRangeCells({
                            west: range.west + center.X - coors.x,
                            east: range.east + center.X - coors.x,
                            south: range.south + center.Y - coors.y,
                            north: range.north + center.Y - coors.y
                        }).then(function (results) {
                            angular.forEach(results, function(item) {
                                var i;
                                for (i = 0; i < ids.length; i++) {
                                    if (ids[i].eNodebId === item.eNodebId && ids[i].sectorId === item.sectorId) {
                                        break;
                                    }
                                }
                                if (i === ids.length) {
                                    networkElementService.queryCellInfo(item.eNodebId,item.sectorId).then(function(view) {
                                        networkElementService.queryLteRruFromCellName(view.cellName).then(function(rru) {
                                            view.rruName = rru ? rru.rruName : '';
                                            $scope.supplementCells.push(view);
                                        });
                                    });
                                }
                            });
                        });
                        $scope.gridOptions.data = $scope.supplementCells;
                    });
                });
            });
        });

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('eNodeb.supplement.dialog', function ($scope, $uibModalInstance, networkElementService, geometryService, collegeService,
        center, collegeName) {
        $scope.dialogTitle = collegeName + "LTE基站补充";
        $scope.supplementCells = [];
        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: true
        };
        $scope.gridOptions.multiSelect = true;
        $scope.gridOptions.columnDefs = [
            { field: 'eNodebId', name: 'LTE基站编号' },
            { field: 'name', name: '基站名称', width: 120 },
            { field: 'planNum', name: '规划编号' },
            { field: 'openDate', name: '入网日期', cellFilter: 'date: "yyyy-MM-dd"' },
            { field: 'address', name: '地址', width: 300, enableColumnResizing: false },
            { field: 'factory', name: '厂家' },
            {
                name: 'IP',
                cellTemplate: '<span class="text-primary">{{row.entity.ip.addressString}}</span>',
                width: 100
            },
            { name: '与中心距离', field: 'distance', cellFilter: 'number: 2' }
        ];

        geometryService.transformToBaidu(center.X, center.Y).then(function (coors) {
            collegeService.queryRange(collegeName).then(function (range) {
                var ids = [];
                collegeService.queryENodebs(collegeName).then(function (eNodebs) {
                    angular.forEach(eNodebs, function (eNodeb) {
                        ids.push(eNodeb.eNodebId);
                    });
                    networkElementService.queryRangeENodebs({
                        west: range.west + center.X - coors.x,
                        east: range.east + center.X - coors.x,
                        south: range.south + center.Y - coors.y,
                        north: range.north + center.Y - coors.y,
                        excludedIds: ids
                    }).then(function (results) {
                        angular.forEach(results, function (item) {
                            item.distance = geometryService.getDistance(item.lattitute, item.longtitute, coors.y, coors.x);
                        });
                        $scope.gridOptions.data = results;
                    });
                });
            });
        });

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })

    .controller('bts.supplement.dialog', function ($scope, $uibModalInstance, networkElementService, geometryService, collegeService,
        center, collegeName) {
        $scope.dialogTitle = collegeName + "CDMA基站补充";
        $scope.supplementCells = [];
        $scope.gridOptions = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
            rowHeight: 35,
            showGridFooter: true
        };
        $scope.gridOptions.multiSelect = true;
        $scope.gridOptions.columnDefs = [
            { field: 'btsId', name: 'CDMA基站编号' },
            { field: 'name', name: '基站名称', width: 120 },
            { field: 'btsId', name: 'BSC编号' },
            { field: 'longtitute', name: '经度' },
            { field: 'lattitute', name: '纬度' },
            { field: 'address', name: '地址', width: 300, enableColumnResizing: false },
            { field: 'isInUse', name: '是否在用', cellFilter: 'yesNoChinese' },
            { name: '与中心距离', field: 'distance', cellFilter: 'number: 2' }
        ];

        geometryService.transformToBaidu(center.X, center.Y).then(function (coors) {
            collegeService.queryRange(collegeName).then(function (range) {
                var ids = [];
                collegeService.queryBtss(collegeName).then(function (btss) {
                    angular.forEach(btss, function (bts) {
                        ids.push(bts.btsId);
                    });
                    networkElementService.queryRangeBtss({
                        west: range.west + center.X - coors.x,
                        east: range.east + center.X - coors.x,
                        south: range.south + center.Y - coors.y,
                        north: range.north + center.Y - coors.y,
                        excludedIds: ids
                    }).then(function (results) {
                        angular.forEach(results, function (item) {
                            item.distance = geometryService.getDistance(item.lattitute, item.longtitute, coors.y, coors.x);
                        });
                        $scope.supplementCells = results;
                        $scope.gridOptions.data = results;
                    });
                });
            });
        });

        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
        };

        $scope.ok = function () {
            $uibModalInstance.close($scope.gridApi.selection.getSelectedRows());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('college.supplement.dialog', function ($scope, $uibModalInstance,
        customerQueryService, appFormatService,dialogTitle, view) {
        $scope.dialogTitle = dialogTitle;
        $scope.view = view;

        $scope.ok = function () {
            $scope.view.district = $scope.district.selected;
            $scope.view.town = $scope.town.selected;
            $uibModalInstance.close($scope.view);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('college.test3G.dialog', function ($scope, $uibModalInstance, collegeName,
        collegeDtService, coverageService, collegeMapService, geometryService) {
        $scope.dialogTitle = collegeName + "-3G测试结果上报";
        $scope.item = collegeDtService.default3GTestView(collegeName, '饭堂', '许良镇');

        var queryRasterInfo = function (files, index, data, callback) {
            coverageService.queryDetailsByRasterInfo(files[index], '3G').then(function (result) {
                data.push.apply(data, result);
                if (index < files.length - 1) {
                    queryRasterInfo(files, index + 1, data, callback);
                } else {
                    callback(data);
                }
            });
        };
        collegeMapService.queryCenterAndCallback(collegeName, function (center) {
            geometryService.transformToBaidu(center.X, center.Y).then(function (coors) {
                $scope.center = {
                    centerX: 2 * center.X - coors.x,
                    centerY: 2 * center.Y - coors.y
                };
            });
        });

        $scope.matchCoverage = function () {
            collegeDtService.queryRaster($scope.center, '3G', $scope.beginDate.value, $scope.endDate.value, function (files) {
                if (files.length) {
                    var data = [];
                    queryRasterInfo(files, 0, data, function (result) {
                        console.log(result);
                    });
                }
            });
        };
        $scope.ok = function () {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('college.test4G.dialog', function ($scope, $uibModalInstance, collegeName,
        collegeDtService, collegeService, networkElementService, collegeMapService, geometryService, coverageService, appFormatService) {
        $scope.dialogTitle = collegeName + "-4G测试结果上报";
        $scope.item = collegeDtService.default4GTestView(collegeName, '饭堂', '许良镇');
        collegeService.queryCells(collegeName).then(function(cellList) {
            var names = [];
            angular.forEach(cellList, function(cell) {
                names.push(cell.cellName);
            });
            $scope.cellName = {
                options: names,
                selected: names[0]
            };
        });
        collegeMapService.queryCenterAndCallback(collegeName, function (center) {
            geometryService.transformToBaidu(center.X, center.Y).then(function (coors) {
                $scope.center = {
                    centerX: 2 * center.X - coors.x,
                    centerY: 2 * center.Y - coors.y
                };
            });
        });
        $scope.$watch('cellName.selected', function (cellName) {
            if (cellName) {
                networkElementService.queryLteRruFromCellName(cellName).then(function(rru) {
                    $scope.rru = rru;
                });
            }
        });

        var queryRasterInfo = function (files, index, data, callback) {
            coverageService.queryDetailsByRasterInfo(files[index], '4G').then(function (result) {
                data.push.apply(data, result);
                if (index < files.length - 1) {
                    queryRasterInfo(files, index + 1, data, callback);
                } else {
                    callback(data);
                }
            });
        };

        $scope.matchCoverage = function() {
            collegeDtService.queryRaster($scope.center, '4G', $scope.beginDate.value, $scope.endDate.value, function (files) {
                if (files.length) {
                    var data = [];
                    queryRasterInfo(files, 0, data, function(result) {
                        var testEvaluations = appFormatService.calculateAverages(result, [
                            function(point) {
                                return point.rsrp;
                            }, function(point) {
                                return point.sinr;
                            }, function(point) {
                                return point.pdcpThroughputDl > 10 ? point.pdcpThroughputDl : 0;
                            }, function(point) {
                                return point.pdcpThroughputUl > 1 ? point.pdcpThroughputUl : 0;
                            }
                        ]);
                        $scope.item.rsrp = testEvaluations[0].sum / testEvaluations[0].count;
                        $scope.item.sinr = testEvaluations[1].sum / testEvaluations[1].count;
                        $scope.item.downloadRate = testEvaluations[2].sum / testEvaluations[2].count * 1024;
                        $scope.item.uploadRate = testEvaluations[3].sum / testEvaluations[3].count * 1024;
                    });
                }
            });
        };

        $scope.ok = function () {
            $scope.item.cellName = $scope.cellName.selected;
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('emergency.college.dialog', function ($scope, $uibModalInstance, serialNumber, collegeName,
        collegeQueryService, appFormatService, customerQueryService, appRegionService) {
        $scope.dialogTitle = collegeName + "应急通信车申请-" + serialNumber;
        $scope.dto = {
            projectName: collegeName + "应急通信车申请",
            expectedPeople: 500000,
            vehicles: 1,
            area: collegeName,
            department: "南海区分公司客响维护部",
            person: "刘文清",
            phone: "13392293722",
            vehicleLocation: "门口东边100米处",
            otherDescription: "应急通信车申请。",
            townId: 1
        };
        customerQueryService.queryDemandLevelOptions().then(function (options) {
            $scope.demandLevel = {
                options: options,
                selected: options[0]
            };
        });
        customerQueryService.queryVehicleTypeOptions().then(function (options) {
            $scope.vehicularType = {
                options: options,
                selected: options[17]
            };
        });
        var transmitOptions = customerQueryService.queryTransmitFunctionOptions();
        $scope.transmitFunction = {
            options: transmitOptions,
            selected: transmitOptions[0]
        };
        var electrictOptions = customerQueryService.queryElectricSupplyOptions();
        $scope.electricSupply = {
            options: electrictOptions,
            selected: electrictOptions[0]
        };
        collegeQueryService.queryByNameAndYear(collegeName, $scope.collegeInfo.year.selected).then(function(item) {
            $scope.itemBeginDate = {
                value: appFormatService.getDate(item.oldOpenDate),
                opened: false
            };
            $scope.itemEndDate = {
                value: appFormatService.getDate(item.newOpenDate),
                opened: false
            };
            $scope.dto.expectedPeople = item.expectedSubscribers;
        });
        customerQueryService.queryOneVip(serialNumber).then(function(item) {
            angular.forEach($scope.district.options, function (district) {
                if (district === item.district) {
                    $scope.district.selected = item.district;
                }
            });
            appRegionService.queryTowns($scope.city.selected, $scope.district.selected).then(function(towns) {
                $scope.town.options = towns;
                $scope.town.selected = towns[0];
                angular.forEach(towns, function (town) {
                    if (town === item.town) {
                        $scope.town.selected = town;
                    }
                });
            });
        });

        $scope.ok = function () {
            $scope.dto.demandLevelDescription = $scope.demandLevel.selected;
            $scope.dto.beginDate = $scope.itemBeginDate.value;
            $scope.dto.endDate = $scope.itemEndDate.value;
            $scope.dto.vehicularTypeDescription = $scope.vehicularType.selected;
            $scope.dto.transmitFunction = $scope.transmitFunction.selected;
            $scope.dto.district = $scope.district.selected;
            $scope.dto.town = $scope.town.selected;
            $scope.dto.electricSupply = $scope.electricSupply.selected;
            $uibModalInstance.close($scope.dto);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('test.process.dialog', function ($scope, $uibModalInstance, collegeName, collegeQueryService, appFormatService) {
        $scope.dialogTitle = collegeName + "校园网测试信息确认";

        $scope.query = function() {
            collegeQueryService.queryCollege3GTestList($scope.beginDate.value, $scope.endDate.value, collegeName).then(function(test3G) {
                $scope.items3G = test3G;
            });
            collegeQueryService.queryCollege4GTestList($scope.beginDate.value, $scope.endDate.value, collegeName).then(function (test4G) {
                $scope.items4G = test4G;
                var testEvaluations = appFormatService.calculateAverages(test4G, [
                    function(point) {
                        return point.rsrp;
                    }, function(point) {
                        return point.sinr;
                    }, function(point) {
                        return point.downloadRate;
                    }, function(point) {
                        return point.uploadRate;
                    }
                ]);
                $scope.averageRsrp = testEvaluations[0].sum / testEvaluations[0].count;
                $scope.averageSinr = testEvaluations[1].sum / testEvaluations[1].count;
                $scope.averageDownloadRate = testEvaluations[2].sum / testEvaluations[2].count;
                $scope.averageUploadRate = testEvaluations[3].sum / testEvaluations[3].count;
            });
        };
        $scope.query();

        $scope.ok = function () {
            $uibModalInstance.close($("#reports").html());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('trace.planning.dialog', function($scope, $uibModalInstance, collegeName,
    geometryService, collegeService, networkElementService, collegeMapService) {
        $scope.dialogTitle = collegeName + "校园网规划站点跟踪";

        collegeMapService.queryCenterAndCallback(collegeName, function(center) {
            geometryService.transformToBaidu(center.X, center.Y).then(function (coors) {
                collegeService.queryRange(collegeName).then(function (range) {
                    networkElementService.queryRangePlanningSites({
                        west: range.west + center.X - coors.x,
                        east: range.east + center.X - coors.x,
                        south: range.south + center.Y - coors.y,
                        north: range.north + center.Y - coors.y
                    }).then(function (results) {
                        console.log(results);
                    });
                });
            });
        });

        $scope.ok = function () {
            $uibModalInstance.close($("#reports").html());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller('map.college.dialog', function ($scope, $uibModalInstance, college, dialogTitle,
        collegeQueryService, generalChartService, parametersChartService, emergencyService) {
        $scope.college = college;
        $scope.dialogTitle = dialogTitle;
        $scope.query = function() {
            collegeQueryService.queryCollegeDateFlows(college.name, $scope.beginDate.value, $scope.endDate.value).then(function(stats) {
                var result = generalChartService.generateColumnData(stats, function (stat) {
                    return stat.statTime;
                }, [
                    function (stat) {
                        return stat.pdcpDownlinkFlow;
                    }, function (stat) {
                        return stat.pdcpUplinkFlow;
                    }, function (stat) {
                        return stat.averageUsers;
                    }, function (stat) {
                        return stat.maxActiveUsers;
                    }
                ]);
                $("#flowConfig").highcharts(parametersChartService.getDateFlowOptions(result, 0, 1));
                $("#usersConfig").highcharts(parametersChartService.getDateUsersOptions(result, 2, 3));
            });
        };
        $scope.query();
        collegeQueryService.queryByNameAndYear(college.name, $scope.collegeInfo.year.selected).then(function (info) {
            if (info) {
                $scope.college.expectedSubscribers = info.expectedSubscribers;
                $scope.college.oldOpenDate = info.oldOpenDate;
                $scope.college.newOpenDate = info.newOpenDate;
            }
        });
        emergencyService.queryCollegeVipDemand($scope.collegeInfo.year.selected, college.name).then(function (item) {
            if (item) {
                $scope.college.serialNumber = item.serialNumber;
                $scope.college.currentStateDescription = item.currentStateDescription;
            }
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.college);
        };

        $scope.cancel = function () {
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
        $scope.saveCircleParameters = function (circle) {
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
        $scope.savePolygonParameters = function (polygon) {
            $scope.collegeRegion.regionType = 2;
            var pts = polygon.getPath();
            $scope.collegeRegion.info = geometryService.getPathInfo(pts);
            $scope.collegeRegion.area = BMapLib.GeoUtils.getPolygonArea(pts);
        };
        $timeout(function () {
            baiduMapService.initializeMap('map', 12);
            baiduMapService.initializeDrawingManager();
            baiduMapService.addDrawingEventListener('circlecomplete', $scope.saveCircleParameters);
            baiduMapService.addDrawingEventListener('rectanglecomplete', $scope.saveRetangleParameters);
            baiduMapService.addDrawingEventListener('polygoncomplete', $scope.savePolygonParameters);
        }, 500);
        $scope.matchPlace = function () {
            geometryService.queryBaiduPlace($scope.collegeName).then(function (result) {
                angular.forEach(result, function (place) {
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
            appRegionService.queryTown($scope.city.selected, $scope.district.selected, $scope.town.selected).then(function (town) {
                if (town) {
                    $scope.college.townId = town.id;
                    $uibModalInstance.close($scope.college);
                }
            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
