app.controller("all.query", function ($scope, collegeService, collegeQueryService, collegeDialogService) {
    $scope.collegeInfo.url = $scope.rootPath + "query";
    $scope.page.title = "基础信息查看";
    $scope.collegeYearList = [];
    $scope.collegeName = $scope.collegeInfo.names[0];
    $scope.collegeExisted = true;

    $scope.$watch('collegeInfo.year.selected', function(year) {
        collegeService.queryStats(year).then(function(colleges) {
            $scope.collegeList = colleges;
        });
        collegeQueryService.queryYearList(year).then(function (colleges) {
            $scope.collegeYearList = colleges;
        });
        collegeQueryService.queryByNameAndYear($scope.collegeName, year).then(function (info) {
            $scope.collegeExisted = !!info;
        });
    });
    $scope.$watch('collegeName', function(name) {
        collegeQueryService.queryByNameAndYear(name, $scope.collegeInfo.year.selected).then(function(info) {
            $scope.collegeExisted = !!info;
        });
    });
    $scope.addOneCollegeMarkerInfo = function() {
        collegeQueryService.queryByNameAndYear($scope.collegeName, $scope.collegeInfo.year.selected - 1).then(function(item) {
            if (item) {
                collegeDialogService.addYearInfo(item, $scope.collegeName, $scope.collegeInfo.year.selected);
            }
        });
    };
});