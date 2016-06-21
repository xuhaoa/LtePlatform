app.controller('emergency.new.dialog', function($scope, $uibModalInstance) {
    $scope.dialogTitle = dialogTitle;
    $scope.message = "";

    $scope.ok = function() {
        $uibModalInstance.close($scope.message);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});