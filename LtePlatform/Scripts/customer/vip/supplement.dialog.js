app.controller('vip.supplement.dialog', function($scope, $uibModalInstance, customerQueryService,
    dialogTitle, view, city, district) {
    $scope.dialogTitle = dialogTitle;
    $scope.view = view;
    $scope.city = city;
    $scope.district = district;
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.ok = function () {
        $scope.view.district=$scope.district.selected;
        $scope.view.town=$scope.town.selected;
        $uibModalInstance.close($scope.view);
    };
});