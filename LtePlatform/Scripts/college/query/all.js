app.controller("all.query", function($scope, collegeService) {
    $scope.collegeInfo.url = $scope.rootPath + "query";
    $scope.page.title = "基础信息查看";

    
    collegeService.queryStats().then(function(colleges) {
        $scope.collegeList = colleges;
    });
});