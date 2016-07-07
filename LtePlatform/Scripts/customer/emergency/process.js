﻿app.controller("emergency.process", function ($scope, $routeParams,
    customerQueryService,
    emergencyService) {

    $scope.canGoNextStep = false;
    
    $scope.query = function() {
        customerQueryService.queryOneEmergency($routeParams.id).then(function (item) {
            $scope.item = item;
            if ($scope.item.nextStateDescription) {
                $scope.processInfo = "已完成" + $scope.item.nextStateDescription;
            } else {
                $scope.processInfo = "";
            }
        });
        emergencyService.queryProcessList($routeParams.id).then(function(list) {
            $scope.processItems = list;
        });
    };

    $scope.createProcess = function() {
        emergencyService.createProcess($scope.item).then(function(process) {
            if (process) {
                process.processInfo = $scope.processInfo;
                emergencyService.updateProcess(process).then(function() {
                    $scope.query();
                });
            }
        });
    };

    $scope.createFiber = function() {
        $scope.canGoNextStep = true;
    };

    $scope.$watch('item.nextStateDescription', function(state) {
        $scope.canGoNextStep = state && state !== '光纤起单';
    });

    $scope.query();
    emergencyService.queryFiberList($routeParams.id).then(function(list) {
        console.log(list);
    });
});