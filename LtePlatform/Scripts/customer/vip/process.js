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

    $scope.query();
});