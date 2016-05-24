app.controller('map.building.dialog', function ($scope, $uibModalInstance, building, dialogTitle) {
    $scope.building = building;
    $scope.dialogTitle = dialogTitle;

    $scope.ok = function () {
        $uibModalInstance.close($scope.building);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});