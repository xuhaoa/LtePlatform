angular.module('college.module', ['college.dt', 'college.info', 'college.infrastructure']);

angular.module('college.dt', ['ui.grid'])
    .controller('CollegeDtController', function($scope) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'name', name: '校园名称' },
                { field: 'area', name: '区域面积（平方米）', cellFilter: 'number: 2' },
                { field: 'centerX', name: '中心经度', cellFilter: 'number: 4' },
                { field: 'centerY', name: '中心纬度', cellFilter: 'number: 4' },
                {
                    field: 'file2Gs.length',
                    name: '2G文件数',
                    cellTooltip: function(row, col) {
                        var html = '';
                        angular.forEach(row.entity.file2Gs, function(file) {
                            html += file.csvFileName + ', 网格数: ' + file.rasterNums.length + '\n';
                        });
                        return html;
                    }
                },
                {
                    field: 'file3Gs.length',
                    name: '3G文件数',
                    cellTooltip: function (row, col) {
                        var html = '';
                        angular.forEach(row.entity.file3Gs, function (file) {
                            html += file.csvFileName + ', 网格数: ' + file.rasterNums.length + '\n';
                        });
                        return html;
                    }
                },
                {
                    field: 'file4Gs.length',
                    name: '4G文件数',
                    cellTooltip: function (row, col) {
                        var html = '';
                        angular.forEach(row.entity.file4Gs, function (file) {
                            html += file.csvFileName + ', 网格数: ' + file.rasterNums.length + '\n';
                        });
                        return html;
                    }
                }
            ],
            data: $scope.colleges
        };
    })
    .directive('collegeDtList', function ($compile) {
        return {
            controller: 'CollegeDtController',
            controllerAs: 'collegeDt',
            restrict: 'EA',
            replace: true,
            scope: {
                colleges: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                element.append(linkDom);
            }
        };
    });

angular.module('college.info', ['customer.service'])
    .controller('CollegeInfoController', function($scope) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'name', name: '校园名称', width: 200, enableColumnResizing: false },
                { field: 'totalStudents', name: '在校学生数' },
                { field: 'graduateStudents', name: '毕业用户数' },
                { field: 'currentSubscribers', name: '当前用户数' },
                { field: 'newSubscribers', name: '新发展用户数' },
                { field: 'expectedSubscribers', name: '预计到达用户数' },
                { field: 'oldOpenDate', name: '老生开学日期', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'newOpenDate', name: '新生开学日期', cellFilter: 'date: "yyyy-MM-dd"' }
            ],
            data: []
        };
    })
    .directive('collegeInfoList', function ($compile) {
        return {
            controller: 'CollegeInfoController',
            controllerAs: 'collegeInfo',
            restrict: 'EA',
            replace: true,
            scope: {
                colleges: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('colleges', function(colleges) {
                    scope.gridOptions.data = colleges;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })
    .controller('CollegeSupportController', function ($scope, emergencyService) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'name', name: '校园名称', width: 200, enableColumnResizing: false },
                { field: 'currentSubscribers', name: '当前用户数' },
                { field: 'newSubscribers', name: '新发展用户数' },
                { field: 'expectedSubscribers', name: '预计到达用户数' },
                { field: 'oldOpenDate', name: '老生开学日期', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'newOpenDate', name: '新生开学日期', cellFilter: 'date: "yyyy-MM-dd"' },
                {
                    name: '支撑任务',
                    cellTemplate: '<button class="btn btn-sm btn-primary" ng-click="grid.appScope.constructSupport(row.entity)">新增/修改</button>'
                }
            ],
            data: []
        };
        $scope.constructSupport = function(college) {
            console.log(college);
            emergencyService.queryCollegeVipDemand($scope.year, college.name).then(function(items) {
                console.log(items);
            });
        };
    })
    .directive('collegeSupportList', function ($compile) {
        return {
            controller: 'CollegeSupportController',
            restrict: 'EA',
            replace: true,
            scope: {
                colleges: '=',
                year: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('colleges', function (colleges) {
                    scope.gridOptions.data = colleges;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    });

angular.module('college.infrastructure', ['college.service'])
    .controller('CollegeStatController', function ($scope, collegeDialogService) {
        $scope.showENodebs = function(name) {
            collegeDialogService.showENodebs(name);
        };

        $scope.showCells = function(name) {
            collegeDialogService.showCells(name);
        };

        $scope.showBtss = function(name) {
            collegeDialogService.showBtss(name);
        };

        $scope.showCdmaCells = function(name) {
            collegeDialogService.showCdmaCells(name);
        };

        $scope.showLteDistributions = function(name) {
            collegeDialogService.showLteDistributions(name);
        };

        $scope.showCdmaDistributions = function(name) {
            collegeDialogService.showCdmaDistributions(name);
        };
        $scope.gridOptions = {
            columnDefs: [
                { field: 'name', name: '校园名称', width: 170, enableColumnResizing: false },
                { field: 'expectedSubscribers', name: '用户数', width: 40 },
                { field: 'area', name: '区域面积（平方米）', cellFilter: 'number: 2', width: 90, enableColumnResizing: false },
                {
                    name: '4G基站数',
                    cellTemplate: '<button class="btn btn-sm btn-primary" ng-click="grid.appScope.showENodebs(row.entity.name)">' +
                        '详情<span class="badge pull-right">{{row.entity.totalLteENodebs}}</span></button>'
                },
                {
                    name: '4G小区数',
                    cellTemplate: '<button class="btn btn-sm btn-primary" ng-click="grid.appScope.showCells(row.entity.name)">' +
                        '详情<span class="badge pull-right">{{row.entity.totalLteCells}}</span></button>'
                },
                {
                    name: '3G基站数',
                    cellTemplate: '<button class="btn btn-sm btn-default" ng-click="grid.appScope.showBtss(row.entity.name)">' +
                        '详情<span class="badge pull-right">{{row.entity.totalCdmaBts}}</span></button>'
                },
                {
                    name: '3G小区数',
                    cellTemplate: '<button class="btn btn-sm btn-default" ng-click="grid.appScope.showCdmaCells(row.entity.name)">' +
                        '详情<span class="badge pull-right">{{row.entity.totalCdmaCells}}</span></button>'
                },
                {
                    name: '4G室分数',
                    cellTemplate: '<button class="btn btn-sm btn-success" ng-click="grid.appScope.showLteDistributions(row.entity.name)">' +
                        '详情<span class="badge pull-right">{{row.entity.totalLteIndoors}}</span></button>'
                },
                {
                    name: '3G室分数',
                    cellTemplate: '<button class="btn btn-sm btn-success" ng-click="grid.appScope.showCdmaDistributions(row.entity.name)">' +
                        '详情<span class="badge pull-right">{{row.entity.totalCdmaIndoors}}</span></button>'
                },
                {
                    name: '详细信息',
                    cellTemplate: '<a ng-href="{{grid.appScope.rootPath}}query/{{row.entity.name}}" class="btn btn-sm btn-success">详细</a>',
                    width: 40
                }
            ],
            data: []
        };
    })
    .directive('collegeStatTable', function ($compile) {
        return {
            controller: 'CollegeStatController',
            restrict: 'EA',
            replace: true,
            scope: {
                collegeList: '=',
                rootPath: '='
            },
            template: '<div></div>',
            link: function(scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('collegeList', function (colleges) {
                    scope.gridOptions.data = colleges;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    });