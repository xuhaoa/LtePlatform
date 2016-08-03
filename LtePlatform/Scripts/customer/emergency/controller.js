angular.module('customer.emergency', ['app.common'])
    .controller('fiber.new.dialog', function($scope, $uibModalInstance,
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
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("emergency.list", function($scope, customerDialogService, customerQueryService) {
        $scope.page.title = "应急需求";
        $scope.construct = function() {
            customerDialogService.constructEmergencyCommunication(
                $scope.city, $scope.district, $scope.type, $scope.page.messages, $scope.query);
        };
        $scope.query = function() {
            customerQueryService.queryAll($scope.beginDate.value, $scope.endDate.value).then(function(items) {
                $scope.items = items;
            });
        };

        customerQueryService.queryVehicleTypeOptions().then(function(options) {
            $scope.type = {
                options: options,
                selected: options[0]
            };
        });
        $scope.query();
    })
    .controller('emergency.new.dialog', function($scope, $uibModalInstance, customerQueryService,
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
            otherDescription: "此次活动为佛山市南海区政府组织的一次大型文化活动，是宣传天翼品牌的重要场合。",
            townId: 1
        };

        $scope.ok = function() {
            $scope.dto.demandLevelDescription = $scope.demandLevel.selected;
            $scope.dto.beginDate = $scope.itemBeginDate.value;
            $scope.dto.endDate = $scope.itemEndDate.value;
            $scope.dto.vehicularTypeDescription = $scope.vehicularType.selected;
            $scope.dto.transmitFunction = $scope.transmitFunction.selected;
            $scope.dto.district = $scope.district.selected;
            $scope.dto.town = $scope.town.selected;
            $scope.dto.electricSupply = $scope.electricSupply.selected;
            $uibModalInstance.close($scope.dto);
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }).controller("emergency.process", function($scope, $routeParams,
        customerQueryService,
        emergencyService,
        customerDialogService) {

        $scope.canGoNextStep = false;
        $scope.fiberList = [];

        $scope.query = function() {
            customerQueryService.queryOneEmergency($routeParams.id).then(function(item) {
                $scope.item = item;
                if ($scope.item.nextStateDescription) {
                    $scope.processInfo = "已完成" + $scope.item.nextStateDescription;
                } else {
                    $scope.processInfo = "";
                }
            });
            emergencyService.queryProcessList($routeParams.id).then(function(list) {
                $scope.processItems = list;
            });
        };

        $scope.createProcess = function() {
            emergencyService.createProcess($scope.item).then(function(process) {
                if (process) {
                    process.processInfo = $scope.processInfo;
                    emergencyService.updateProcess(process).then(function() {
                        $scope.query();
                    });
                }
            });
        };
        $scope.queryFiberItems = function() {
            emergencyService.queryFiberList($routeParams.id).then(function(list) {
                $scope.fiberList = list;
            });
        };

        $scope.createFiber = function() {
            customerDialogService.constructFiberItem($routeParams.id, $scope.fiberList.length, function(item) {
                $scope.canGoNextStep = true;
                $scope.fiberList.push(item);
            }, $scope.page.messages);
        };

        $scope.$watch('item.nextStateDescription', function(state) {
            $scope.canGoNextStep = state && (state !== '光纤起单' || $scope.fiberList.length > 0);
        });

        $scope.query();
        $scope.queryFiberItems();
    });