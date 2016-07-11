angular.module('college.module', ['college.dt', 'college.info', 'college.infrastructure']);

angular.module('college.dt', ['ui.grid'])
    .controller('CollegeDtController', function($scope) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'name', name: '校园名称' },
                { field: 'area', name: '区域面积（平方米）', cellFilter: 'number: 2' },
                { field: 'centerX', name: '中心经度', cellFilter: 'number: 4' },
                { field: 'centerY', name: '中心纬度', cellFilter: 'number: 4' },
                { field: 'file2Gs', name: '2G文件数' },
                { field: 'file3Gs', name: '3G文件数' },
                { field: 'file4Gs', name: '4G文件数' }
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

angular.module('college.info', [])
    .controller('CollegeInfoController', function($scope) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'name', name: '校园名称' },
                { field: 'totalStudents', name: '在校学生数' },
                { field: 'graduateStudents', name: '毕业用户数' },
                { field: 'currentSubscribers', name: '当前用户数' },
                { field: 'newSubscribers', name: '新发展用户数' },
                { field: 'expectedSubscribers', name: '预计到达用户数' },
                { field: 'oldOpenDate', name: '老生开学日期', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'newOpenDate', name: '新生开学日期', cellFilter: 'date: "yyyy-MM-dd"' }
            ],
            data: $scope.colleges
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
                var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                element.append(linkDom);
            }
        };
    });

angular.module('college.infrastructure', ['college'])
    .controller('CollegeStatController', function($scope, collegeDialogService) {
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
    })
    .value('collegeRoot', '/directives/college/')
    .directive('collegeStatTable', function (collegeRoot) {
        return {
            controller: 'CollegeStatController',
            controllerAs: 'collegeStat',
            restrict: 'EA',
            replace: true,
            scope: {
                collegeList: '='
            },
            templateUrl: collegeRoot + 'stat/Table.html',
            link: function(scope, element, attrs) {

            }
        };
    });