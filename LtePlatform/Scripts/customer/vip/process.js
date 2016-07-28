app.controller("vip.process", function ($scope, $routeParams, customerQueryService, emergencyService) {
    
    $scope.query = function() {
        customerQueryService.queryOneVip($routeParams.number).then(function(item) {
            $scope.item = item;
            if ($scope.item.nextStateDescription) {
                $scope.processInfo = "已完成" + $scope.item.nextStateDescription;
            } else {
                $scope.processInfo = "";
            }
            customerQueryService.queryMarketThemeOptions().then(function(options) {
                $scope.marketTheme = {
                    options: options,
                    selected: item.marketThemeDescription
                };
            });
        });
        emergencyService.queryVipProcessList($routeParams.number).then(function(items) {
            $scope.processItems = items;
        });
    };

    $scope.createProcess = function () {
        emergencyService.createVipProcess($scope.item).then(function (process) {
            if (process) {
                process.beginInfo = $scope.processInfo;
                emergencyService.updateVipProcess(process).then(function () {
                    $scope.query();
                });
            }
        });
    };
    $scope.save=function() {
        $scope.item.marketThemeDescription = $scope.marketTheme.selected;
        customerQueryService.updateVip($scope.item).then(function() {
            $scope.page.messages.push({
                type: 'success',
                contents: '完成政企需求工单：' + $scope.item.serialNumber
            });
        });
    }

    $scope.query();
});