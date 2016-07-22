app.controller('year.info.dialog', function ($scope, $uibModalInstance, name, year, item) {
	$scope.dialogTitle = name + year + "年校园信息补充";
	$scope.dto = item;
    console.log($scope.dto);
	$scope.beginDate = {
		value: item.oldOpenDate,
		opened: false
	};
	$scope.endDate = {
		value: item.newOpenDate,
		opened: false
	};

    $scope.ok = function () {
        $uibModalInstance.close($scope.dto);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});