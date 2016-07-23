app.controller('year.info.dialog', function ($scope, $uibModalInstance, appFormatService,
    name, year, item) {
	$scope.dialogTitle = name + year + "年校园信息补充";
	$scope.dto = item;
	$scope.beginDate = {
	    value: appFormatService.getDate(item.oldOpenDate),
		opened: false
	};
	$scope.endDate = {
	    value: appFormatService.getDate(item.newOpenDate),
		opened: false
	};
	$scope.beginDate.value.setDate($scope.beginDate.value.getDate() + 365);
    $scope.endDate.value.setDate($scope.endDate.value.getDate() + 365);

	$scope.ok = function () {
	    $scope.dto.oldOpenDate = $scope.beginDate.value;
	    $scope.dto.newOpenDate = $scope.endDate.value;
	    $scope.dto.year = year;
        $uibModalInstance.close($scope.dto);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});