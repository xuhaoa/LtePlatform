app.controller('fiber.new.dialog', function ($scope, $uibModalInstance,
    dialogTitle, id, num) {
    $scope.dialogTitle = dialogTitle;

    $scope.item = {
        id: 0,
        emergencyId: id,
        workItemNumber: "FS-Fiber-" + new Date().getYear() + "-" + new Date().getMonth() + "-" + new Date().getDate() + "-" + num,
        person: "",
        beginDate: new Date(),
        finishDate: null
    };

    $scope.ok = function() {
        $uibModalInstance.close($scope.item);
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});