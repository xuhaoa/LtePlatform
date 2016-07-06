app.controller("emergency.process", function ($scope, $routeParams,
    customerQueryService,
    emergencyService) {
    
    $scope.query = function() {
        customerQueryService.queryOneEmergency($routeParams.id).then(function (item) {
            $scope.item = item;
        });
        emergencyService.queryProcessList($routeParams.id).then(function(list) {
            console.log(list);
        });
    };

    $scope.query();
});