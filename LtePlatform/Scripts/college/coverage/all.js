angular.module('college.coverage', ['app.common'])
    .controller("all.coverage", function($scope, collegeMapService, collegeDtService) {
        $scope.page.title = "校园覆盖";
        $scope.dtInfos = [];

        $scope.query = function() {
            angular.forEach($scope.dtInfos, function(info) {
                collegeDtService.updateFileInfo(info, $scope.beginDate.value, $scope.endDate.value);
            });
        };

        collegeMapService.showDtInfos($scope.dtInfos, $scope.beginDate.value, $scope.endDate.value);
    });