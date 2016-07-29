app.controller("kpi.workitem", function ($scope, workitemService, workItemDialog, appRegionService, menuItemService) {
    $scope.page.title = "工单总览";
    
    $scope.query = function () {
        workitemService.queryWithPaging($scope.viewData.currentState.name, $scope.viewData.currentType.name).then(function(result) {
            angular.forEach(result, function(view) {
                view.detailsPath = $scope.rootPath + "details/" + view.serialNumber;
            });
            $scope.viewItems = result;
        });
    };

    $scope.updateSectorIds = function() {
        workitemService.updateSectorIds().then(function (result) {
            $scope.page.messages.push({
                contents: "一共更新扇区编号：" + result + "条",
                type: "success"
            });
        });
    };

    appRegionService.initializeCities().then(function (result) {
        appRegionService.queryDistricts(result[0]).then(function (districts) {
            angular.forEach(districts, function(district) {
                menuItemService.updateMenuItem($scope.menuItems, 1,
                    "工单统计-" + district,
                    $scope.rootPath + "stat/" + district);
            });
        });
    });
    $scope.query();
});
