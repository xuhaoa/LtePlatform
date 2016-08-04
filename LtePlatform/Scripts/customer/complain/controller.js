angular.module('customer.complain', ['app.common'])
    .controller('complain.adjust', function($scope, complainService) {
        $scope.page.title = "抱怨量信息校正";
        $scope.items = [];

        $scope.query = function() {
            complainService.queryPositionList($scope.beginDate.value, $scope.endDate.value).then(function(list) {
                $scope.items = list;
            });
        };

        $scope.query();
    })
    .controller("complain.list", function($scope, complainService, customerQueryService) {
        $scope.page.title = "10000号投诉";
        $scope.query = function() {
            complainService.queryAll($scope.beginDate.value, $scope.endDate.value).then(function(items) {
                $scope.items = items;
            });
        };

        customerQueryService.queryNetworkTypeOptions().then(function(options) {
            $scope.type = {
                options: options,
                selected: options[0]
            };
        });
        $scope.query();
    })
    .controller("complain.branch", function($scope, complainService, customerQueryService) {
        $scope.page.title = "分公司投诉";
        $scope.query = function() {
            complainService.queryBranchList($scope.beginDate.value, $scope.endDate.value).then(function(items) {
                $scope.items = items;
            });
        };

        customerQueryService.queryNetworkTypeOptions().then(function(options) {
            $scope.type = {
                options: options,
                selected: options[0]
            };
        });
        $scope.query();
    })
    .controller("complain.online", function($scope, complainService, customerQueryService) {
        $scope.page.title = "在线支撑";
        $scope.query = function() {
            complainService.queryOnlineList($scope.beginDate.value, $scope.endDate.value).then(function(items) {
                $scope.items = items;
            });
        };

        customerQueryService.queryNetworkTypeOptions().then(function(options) {
            $scope.type = {
                options: options,
                selected: options[0]
            };
        });
        $scope.query();
    })
    .controller("complain.process", function($scope, $routeParams, customerQueryService, complainService) {

        $scope.query = function() {
            customerQueryService.queryOneComplain($routeParams.number).then(function(item) {
                $scope.item = item;
                if ($scope.item.nextStateDescription) {
                    $scope.processInfo = "已完成" + $scope.item.nextStateDescription;
                } else {
                    $scope.processInfo = "";
                }
            });
            complainService.queryComplainProcessList($routeParams.number).then(function(items) {
                $scope.processItems = items;
            });
        };

        $scope.createProcess = function() {
            complainService.createComplainProcess($scope.item).then(function(process) {
                if (process) {
                    process.beginInfo = $scope.processInfo;
                    complainService.updateComplainProcess(process).then(function() {
                        $scope.query();
                    });
                }
            });
        };
        $scope.save = function() {
            complainService.updateComplain($scope.item).then(function() {
                $scope.page.messages.push({
                    type: 'success',
                    contents: '完成10000号投诉工单：' + $scope.item.serialNumber
                });
            });
        }

        $scope.query();
    })
    .controller('complain.supplement.dialog', function($scope, $uibModalInstance,
        appRegionService, appFormatService, baiduMapService, parametersMapService, parametersDialogService, item) {
        $scope.dialogTitle = item.serialNumber + "工单信息补充";

        $scope.item = item;
        appRegionService.initializeCities().then(function(cities) {
            $scope.city.options = cities;
            $scope.city.selected = cities[0];
            appRegionService.queryDistricts($scope.city.selected).then(function(districts) {
                $scope.district.options = districts;
                $scope.district.selected = (item.district) ? item.district.replace('区', '') : districts[0];
                baiduMapService.initializeMap("map", 11);
                baiduMapService.addCityBoundary("佛山");
                if (item.longtitute && item.lattitute) {
                    var marker = baiduMapService.generateMarker(item.longtitute, item.lattitute);
                    baiduMapService.addOneMarker(marker);
                    baiduMapService.setCellFocus(item.longtitute, item.lattitute, 15);
                }
                if (item.sitePosition) {
                    parametersMapService.showElementsWithGeneralName(item.sitePosition,
                        parametersDialogService.showENodebInfo, parametersDialogService.showCellInfo);
                }
            });
        });

        $scope.matchTown = function() {
            var town = appFormatService.searchPattern($scope.town.options, item.sitePosition);
            if (town) {
                $scope.town.selected = town;
                return;
            }
            town = appFormatService.searchPattern($scope.town.options, item.buildingName);
            if (town) {
                $scope.town.selected = town;
                return;
            }
            town = appFormatService.searchPattern($scope.town.options, item.roadName);
            if (town) {
                $scope.town.selected = town;
            }
        };

        $scope.ok = function() {
            $scope.item.district = $scope.district.selected;
            $scope.item.town = $scope.town.selected;
            $uibModalInstance.close($scope.item);
        };
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("daily.stat", function($scope) {
        $scope.page.title = "客服指标统计分析";
    });