angular.module('customer.vip', ['app.common'])
    .controller("vip.list", function ($scope, customerDialogService, customerQueryService) {
        $scope.page.title = "政企支撑";
        $scope.construct = function() {
            customerDialogService.constructEmergencyCommunication(
                $scope.city, $scope.district, $scope.type, $scope.page.messages, $scope.query);
        };
        $scope.query = function() {
            customerQueryService.queryAllVip($scope.beginDate.value, $scope.endDate.value).then(function(items) {
                $scope.items = items;
            });
        };

        customerQueryService.queryNetworkTypeOptions().then(function(options) {
            $scope.type = {
                options: options,
                selected: options[2]
            };
        });
        $scope.query();
    })
    .controller("vip.process", function($scope, $routeParams, customerQueryService, emergencyService) {

        $scope.query = function() {
            customerQueryService.queryOneVip($routeParams.number).then(function(item) {
                $scope.item = item;
                if ($scope.item.nextStateDescription) {
                    $scope.processInfo = "已完成" + $scope.item.nextStateDescription;
                } else {
                    $scope.processInfo = "";
                }
                customerQueryService.queryMarketThemeOptions().then(function(options) {
                    $scope.marketTheme = {
                        options: options,
                        selected: item.marketThemeDescription
                    };
                });
            });
            emergencyService.queryVipProcessList($routeParams.number).then(function(items) {
                $scope.processItems = items;
            });
        };

        $scope.createProcess = function() {
            emergencyService.createVipProcess($scope.item).then(function(process) {
                if (process) {
                    process.beginInfo = $scope.processInfo;
                    emergencyService.updateVipProcess(process).then(function() {
                        $scope.query();
                    });
                }
            });
        };
        $scope.save = function() {
            $scope.item.marketThemeDescription = $scope.marketTheme.selected;
            customerQueryService.updateVip($scope.item).then(function() {
                $scope.page.messages.push({
                    type: 'success',
                    contents: '完成政企需求工单：' + $scope.item.serialNumber
                });
            });
        }

        $scope.query();
    })
    .controller('vip.supplement.dialog', function($scope, $uibModalInstance,
        customerQueryService, appFormatService,
        dialogTitle, view, city, district) {
        $scope.dialogTitle = dialogTitle;
        $scope.view = view;
        $scope.city = city;
        $scope.district = district;
        $scope.matchFunction = function(text) {
            return $scope.view.projectName.indexOf(text) >= 0 || $scope.view.projectContents.indexOf(text) >= 0;
        };
        $scope.matchDistrictTown = function() {
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
        $scope.ok = function() {
            $scope.view.district = $scope.district.selected;
            $scope.view.town = $scope.town.selected;
            $uibModalInstance.close($scope.view);
        };
    });