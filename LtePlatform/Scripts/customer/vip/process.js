app.controller("vip.process", function ($scope, $routeParams, customerQueryService) {
    
    $scope.query = function() {
        customerQueryService.queryOneVip($routeParams.number).then(function(item) {
            $scope.item = item;
            customerQueryService.queryMarketThemeOptions().then(function(options) {
                $scope.marketTheme = {
                    options: options,
                    selected: item.marketThemeDescription
                };
            });
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