﻿app.controller("workitem.city", function ($scope, workitemService) {
    $scope.page.title = "精确覆盖优化工单一览";
    var lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 100);
    $scope.beginDate = {
        value: lastWeek,
        opened: false
    };
    $scope.endDate = {
        value: new Date(),
        opened: false
    };
    $scope.showDetails = function() {
        workitemService.queryPreciseDateSpan($scope.beginDate.value, $scope.endDate.value).then(function(views) {
            $scope.viewItems = views;
        });
    };
    $scope.showDetails();
});