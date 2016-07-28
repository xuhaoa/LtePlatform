app.controller("complain.process", function ($scope, $routeParams, customerQueryService, complainService) {
    
    $scope.query = function() {
        customerQueryService.queryOneComplain($routeParams.number).then(function (item) {
            $scope.item = item;
            if ($scope.item.nextStateDescription) {
                $scope.processInfo = "已完成" + $scope.item.nextStateDescription;
            } else {
                $scope.processInfo = "";
            }
        });
        complainService.queryComplainProcessList($routeParams.number).then(function (items) {
            $scope.processItems = items;
        });
    };

    $scope.createProcess = function () {
        complainService.createComplainProcess($scope.item).then(function (process) {
            if (process) {
                process.beginInfo = $scope.processInfo;
                complainService.updateComplainProcess(process).then(function () {
                    $scope.query();
                });
            }
        });
    };
    $scope.save=function() {
        complainService.updateComplain($scope.item).then(function () {
            $scope.page.messages.push({
                type: 'success',
                contents: '完成10000号投诉工单：' + $scope.item.serialNumber
            });
        });
    }

    $scope.query();
});