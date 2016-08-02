angular.module("myApp", ['app.common'])
    .config([
        '$routeProvider', function($routeProvider) {
            var viewDir = "/appViews/Parameters/Import/";
            $routeProvider
                .when('/', {
                    templateUrl: viewDir + "Index.html",
                    controller: "import.index"
                })
                .when('/eNodebInfos', {
                    templateUrl: viewDir + "ENodebInfos.html",
                    controller: "import.eNodebs"
                })
                .when('/eNodebLonLat', {
                    templateUrl: viewDir + "ENodebLonLatTable.html",
                    controller: "eNodeb.lonLat"
                })
                .when('/cellInfos', {
                    templateUrl: viewDir + "CellInfos.html",
                    controller: "import.cells"
                })
                .when('/cellLonLat', {
                    templateUrl: viewDir + "CellLonLatTable.html",
                    controller: "cell.lonLat"
                })
                .when('/vanishedENodebInfos', {
                    templateUrl: viewDir + "VanishedENodebs.html",
                    controller: "eNodeb.vanished"
                })
                .when('/vanishedCellInfos', {
                    templateUrl: viewDir + "VanishedCellInfos.html",
                    controller: "cell.vanished"
                })
                .when('/btsInfos', {
                    templateUrl: viewDir + "BtsInfos.html",
                    controller: "import.btss"
                })
                .when('/btsLonLat', {
                    templateUrl: viewDir + "BtsLonLatTable.html",
                    controller: "bts.lonLat"
                })
                .when('/cdmaCellInfos', {
                    templateUrl: viewDir + "CdmaCellInfos.html",
                    controller: "import.cdmaCells"
                })
                .when('/cdmaCellLonLat', {
                    templateUrl: viewDir + "CdmaCellLonLatTable.html",
                    controller: "cdmaCell.lonLat"
                })
                .when('/vanishedBtsInfos', {
                    templateUrl: viewDir + "VanishedBtss.html",
                    controller: "bts.vanished"
                })
                .when('/vanishedCdmaCellInfos', {
                    templateUrl: viewDir + "VanishedCdmaCellInfos.html",
                    controller: "cdmaCell.vanished"
                })
                .otherwise({
                    redirectTo: '/'
                });
        }
    ])
    .run(function($rootScope, basicImportService) {
        $rootScope.rootPath = "/Parameters/BasicImport#/";
        $rootScope.importData = {
            newENodebs: [],
            newCells: [],
            newBtss: [],
            newCdmaCells: [],
            vanishedENodebIds: [],
            vanishedCellIds: [],
            vanishedBtsIds: [],
            vanishedCdmaCellIds: [],
            updateMessages: []
        };

        $rootScope.closeAlert = function(index) {
            $rootScope.importData.updateMessages.splice(index, 1);
        };

        basicImportService.queryENodebExcels().then(function(data) {
            $rootScope.importData.newENodebs = data;
        });
        basicImportService.queryCellExcels().then(function(data) {
            $rootScope.importData.newCells = data;
        });
        basicImportService.queryBtsExcels().then(function(data) {
            $rootScope.importData.newBtss = data;
        });
        basicImportService.queryCdmaCellExcels().then(function(data) {
            $rootScope.importData.newCdmaCells = data;
        });
        basicImportService.queryCellCount().then(function(data) {
            $rootScope.importData.cellCount = data;
        });
        basicImportService.queryCdmaCellCount().then(function(data) {
            $rootScope.importData.cdmaCellCount = data;
        });
        basicImportService.queryVanishedENodebs().then(function(data) {
            $rootScope.importData.vanishedENodebIds = data;
        });
        basicImportService.queryVanishedCells().then(function(data) {
            $rootScope.importData.vanishedCellIds = data;
        });
        basicImportService.queryVanishedBtss().then(function(data) {
            $rootScope.importData.vanishedBtsIds = data;
        });
        basicImportService.queryVanishedCdmaCells().then(function(data) {
            $rootScope.importData.vanishedCdmaCellIds = data;
        });
    })
    .controller("import.index", function($scope, basicImportService) {
        $scope.newENodebsImport = true;
        $scope.newCellsImport = true;
        $scope.newBtssImport = true;
        $scope.newCdmaCellsImport = true;

        $scope.postAllENodebs = function() {
            if ($scope.importData.newENodebs.length > 0) {
                basicImportService.dumpMultipleENodebExcels($scope.importData.newENodebs).then(function(result) {
                    $scope.importData.updateMessages.push({
                        contents: "完成LTE基站导入" + result + "个",
                        type: 'success'
                    });
                    $scope.importData.newENodebs = [];
                });
            }
        };

        $scope.postAllBtss = function() {
            if ($scope.importData.newBtss.length > 0) {
                basicImportService.dumpMultipleBtsExcels($scope.importData.newBtss).then(function(result) {
                    $scope.importData.updateMessages.push({
                        contents: "完成CDMA基站导入" + result + "个",
                        type: 'success'
                    });
                    $scope.importData.newBtss = [];
                });
            }
        };

        $scope.postAllCells = function() {
            if ($scope.importData.newCells.length > 0) {
                basicImportService.dumpMultipleCellExcels($scope.importData.newCells).then(function(result) {
                    $scope.importData.updateMessages.push({
                        contents: "完成LTE小区导入" + result + "个",
                        type: 'success'
                    });
                    $scope.importData.newCells = [];
                });
            }
        };

        $scope.postAllCdmaCells = function() {
            if ($scope.importData.newCdmaCells.length > 0) {
                basicImportService.dumpMultipleCdmaCellExcels($scope.importData.newCdmaCells).then(function(result) {
                    $scope.importData.updateMessages.push({
                        contents: "完成CDMA小区导入" + result + "个",
                        type: 'success'
                    });
                    $scope.importData.newCdmaCells = [];
                });
            }
        };

        $scope.updateLteCells = function() {
            if ($scope.importData.cellCount > 0) {
                basicImportService.updateLteCells().then(function(result) {
                    $scope.importData.updateMessages.push({
                        contents: "完成LTE小区导入" + result + "个",
                        type: 'success'
                    });
                });
            }
        };

        $scope.importLteRrus = function() {
            if ($scope.importData.cellCount > 0) {
                basicImportService.dumpLteRrus().then(function(result) {
                    $scope.importData.updateMessages.push({
                        contents: "完成LTE RRU导入" + result + "个",
                        type: 'success'
                    });
                });
            }
        };

        $scope.importCdmaRrus = function() {
            if ($scope.importData.cdmaCellCount > 0) {
                basicImportService.dumpCdmaRrus().then(function(result) {
                    $scope.importData.updateMessages.push({
                        contents: "完成CDMA RRU导入" + result + "个",
                        type: 'success'
                    });
                });
            }
        };

        $scope.vanishENodebs = function() {
            basicImportService.vanishENodebIds($scope.importData.vanishedENodebIds).then(function() {
                $scope.importData.updateMessages.push({
                    contents: "完成消亡LTE基站：" + $scope.importData.vanishedENodebIds.length,
                    type: 'success'
                });
                $scope.importData.vanishedENodebIds = [];
            });
        };

        $scope.vanishBtss = function() {
            basicImportService.vanishBtsIds($scope.importData.vanishedBtsIds).then(function() {
                $scope.importData.updateMessages.push({
                    contents: "完成消亡CDMA基站：" + $scope.importData.vanishedBtsIds.length,
                    type: 'success'
                });
                $scope.importData.vanishedBtsIds = [];
            });
        };

        $scope.vanishCells = function() {
            basicImportService.vanishCellIds($scope.importData.vanishedCellIds).then(function() {
                $scope.importData.updateMessages.push({
                    contents: "完成消亡LTE小区：" + $scope.importData.vanishedCellIds.length,
                    type: 'success'
                });
                $scope.importData.vanishedCellIds = [];
            });
        };

        $scope.vanishCdmaCells = function() {
            basicImportService.vanishCdmaCellIds($scope.importData.vanishedCdmaCellIds).then(function() {
                $scope.importData.updateMessages.push({
                    contents: "完成消亡CDMA小区：" + $scope.importData.vanishedCdmaCellIds.length,
                    type: 'success'
                });
                $scope.importData.vanishedCdmaCellIds = [];
            });
        };
    });