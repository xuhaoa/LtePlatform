app.controller('vip.supplement.dialog', function ($scope, $uibModalInstance,
    customerQueryService, appFormatService,
    dialogTitle, view, city, district) {
    $scope.dialogTitle = dialogTitle;
    $scope.view = view;
    $scope.city = city;
    $scope.district = district;
    $scope.matchFunction = function(text) {
        return $scope.view.projectName.indexOf(text) >= 0 || $scope.view.projectContents.indexOf(text) >= 0;
    };
    $scope.matchDistrictTown = function () {
        var districtOption = appFormatService.searchText($scope.district.options, $scope.matchFunction);
        if (districtOption) {
            $scope.district.selected = districtOption;
        }
    };
    $scope.$watch('town.selected', function() {
        var townOption = appFormatService.searchText($scope.town.options, $scope.matchFunction);
        if (townOption) {
            $scope.town.selected = townOption;
        }
    });

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.ok = function () {
        $scope.view.district=$scope.district.selected;
        $scope.view.town=$scope.town.selected;
        $uibModalInstance.close($scope.view);
    };
});