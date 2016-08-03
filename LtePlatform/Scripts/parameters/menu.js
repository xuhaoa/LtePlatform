angular.module('parameters.menu', ['app.common'])
    .controller("menu.root", function($scope) {
        $scope.menuTitle = "功能列表";
    })
    .controller("menu.cdma", function($scope, $stateParams, networkElementService, menuItemService) {
        $scope.menuTitle = $stateParams.name + "详细信息";

        menuItemService.updateMenuItem($scope.menuItems, 1,
            $stateParams.name + "CDMA基础信息",
            $scope.rootPath + "btsInfo" + "/" + $stateParams.btsId + "/" + $stateParams.name);
        $scope.menu.accordions[$stateParams.name + "CDMA基础信息"] = true;

        networkElementService.queryCdmaSectorIds($stateParams.name).then(function(result) {
            angular.forEach(result, function(sectorId) {
                menuItemService.updateMenuItem($scope.menuItems, 1,
                    $stateParams.name + "-" + sectorId + "小区信息",
                    $scope.rootPath + "cdmaCellInfo" + "/" + $stateParams.btsId + "/" + $stateParams.name + "/" + sectorId,
                    $stateParams.name + "CDMA基础信息");
            });
        });
    })
    .controller("menu.lte", function($scope, $stateParams, networkElementService, menuItemService) {
        $scope.menuTitle = $stateParams.name + "详细信息";

        menuItemService.updateMenuItem($scope.menuItems, 1,
            $stateParams.name + "LTE基础信息",
            $scope.rootPath + "eNodebInfo" + "/" + $stateParams.eNodebId + "/" + $stateParams.name);
        $scope.menu.accordions[$stateParams.name + "LTE基础信息"] = true;

        networkElementService.queryCellSectorIds($stateParams.name).then(function(result) {
            angular.forEach(result, function(sectorId) {
                menuItemService.updateMenuItem($scope.menuItems, 1,
                    $stateParams.name + "-" + sectorId + "小区信息",
                    $scope.rootPath + "cellInfo" + "/" + $stateParams.eNodebId + "/" + $stateParams.name + "/" + sectorId,
                    $stateParams.name + "LTE基础信息");
            });
        });
    })
    .controller("menu.town", function($scope, $stateParams, menuItemService) {
        $scope.menuTitle = $stateParams.city + $stateParams.district + $stateParams.town + "基础信息";

        menuItemService.updateMenuItem($scope.menuItems, 0,
            $stateParams.city + $stateParams.district + $stateParams.town + "LTE基站列表",
            $scope.rootPath + "eNodebList" + "/" + $stateParams.city + "/" + $stateParams.district + "/" + $stateParams.town);
        menuItemService.updateMenuItem($scope.menuItems, 0,
            $stateParams.city + $stateParams.district + $stateParams.town + "CDMA基站列表",
            $scope.rootPath + "btsList" + "/" + $stateParams.city + "/" + $stateParams.district + "/" + $stateParams.town);
    });
