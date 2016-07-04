app.controller("emergency.process", function ($scope, $routeParams, customerQueryService) {
    
    $scope.query = function() {
        customerQueryService.queryOneEmergency($routeParams.id).then(function (item) {
            $scope.item = item;
        });
    };

    $scope.query();
});