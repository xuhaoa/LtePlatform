app.controller('emergency.new.dialog', function ($scope, $uibModalInstance, customerQueryService,
    dialogTitle, city, district, vehicularType) {
    $scope.dialogTitle = dialogTitle;
    $scope.message = "";
    $scope.city = city;
    $scope.district = district;
    $scope.vehicularType = vehicularType;

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
    customerQueryService.queryDemandLevelOptions().then(function(options) {
        $scope.demandLevel = {
            options: options,
            selected: options[0]
        };
    });
    var transmitOptions = customerQueryService.queryTransmitFunctionOptions();
    $scope.transmitFunction = {
        options: transmitOptions,
        selected: transmitOptions[0]
    };
    var electrictOptions = customerQueryService.queryElectricSupplyOptions();
    $scope.electricSupply = {
        options: electrictOptions,
        selected: electrictOptions[0]
    };

    $scope.ok = function() {
        $uibModalInstance.close($scope.message);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});