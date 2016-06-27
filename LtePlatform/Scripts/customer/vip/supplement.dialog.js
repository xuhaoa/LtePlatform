app.controller('vip.supplement.dialog', function($scope, $uibModalInstance, customerQueryService,
    dialogTitle, view, city, district) {
    $scope.dialogTitle = dialogTitle;
    $scope.view = view;
    $scope.city = city;
    $scope.district = district;
});