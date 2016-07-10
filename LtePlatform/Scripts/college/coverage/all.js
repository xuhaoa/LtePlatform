app.controller("all.coverage", function($scope, collegeMapService, collegeService) {
    $scope.page.title = "校园覆盖";
    $scope.dtInfos = [];
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
        data: $scope.dtInfos
    };

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