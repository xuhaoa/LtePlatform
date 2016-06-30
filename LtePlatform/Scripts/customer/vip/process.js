app.controller("vip.process", function ($scope, $routeParams, customerQueryService) {
    
    $scope.query = function() {
        customerQueryService.queryOneVip($routeParams.number).then(function(item) {
            $scope.item = item;
        });
    };

    $scope.query();
});