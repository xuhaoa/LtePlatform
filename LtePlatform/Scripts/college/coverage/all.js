app.controller("all.coverage", function($scope, collegeMapService, collegeService) {
    $scope.page.title = "校园覆盖";
    $scope.dtInfos = [];

    $scope.query = function() {
        angular.forEach($scope.dtInfos, function(college) {
            var range = {
                west: college.centerX - 0.03,
                east: college.centerX + 0.03,
                south: college.centerY - 0.03,
                north: college.centerY + 0.03
            };
            collegeService.queryRaster('2G', range, $scope.beginDate.value, $scope.endDate.value).then(function(files) {
                college.file2Gs = files.length;
            });
            collegeService.queryRaster('3G', range, $scope.beginDate.value, $scope.endDate.value).then(function(files) {
                college.file3Gs = files.length;
            });
            collegeService.queryRaster('4G', range, $scope.beginDate.value, $scope.endDate.value).then(function(files) {
                college.file4Gs = files.length;
            });
        });
    };

    collegeMapService.showDtInfos($scope.dtInfos, $scope.query);
});