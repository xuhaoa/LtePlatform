app.controller('complain.supplement.dialog', function ($scope, $uibModalInstance, item) {
    $scope.dialogTitle = item.serialNumber + "工单信息补充";

    $scope.item = item;

    $scope.ok = function () {
        $uibModalInstance.close($scope.item);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});