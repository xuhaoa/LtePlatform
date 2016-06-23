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
    $scope.dto = {
        projectName: "和顺梦里水乡百合花文化节",
        expectedPeople: 500000,
        vehicles: 1,
        area: "万顷洋园艺世界",
        department: "南海区分公司客响维护部",
        person: "刘文清",
        phone: "13392293722",
        vehicleLocation: "门口东边100米处",
        otherDescription: "此次活动为佛山市南海区政府组织的一次大型文化活动，是宣传天翼品牌的重要场合。"
    };

    $scope.ok = function() {
        $uibModalInstance.close($scope.dto);
    };
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});