app.controller('emergency.new.dialog', function($scope, $uibModalInstance, dialogTitle) {
    $scope.dialogTitle = dialogTitle;
    $scope.message = "";
    var firstDay = new Date();
    firstDay.setDate(firstDay.getDate() + 7);
    var nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 14);
    $scope.itemBeginDate = {
        value: firstDay,
        opened: false
    };
    $scope.itemEndDate = {
        value: nextDay,
        opened: false
    };

    $scope.ok = function() {
        $uibModalInstance.close($scope.message);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});