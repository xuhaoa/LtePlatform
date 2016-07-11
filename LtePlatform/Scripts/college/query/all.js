﻿app.controller("all.query", function ($scope, collegeService, collegeQueryService) {
    $scope.collegeInfo.url = $scope.rootPath + "query";
    $scope.page.title = "基础信息查看";
    $scope.collegeYearList = [];

    $scope.$watch('collegeInfo.year.selected', function(year) {
        collegeService.queryStats(year).then(function(colleges) {
            $scope.collegeList = colleges;
        });
        collegeQueryService.queryYearList(year).then(function (colleges) {
            $scope.collegeYearList = colleges;
        });
    });

});