angular.module('myApp', ["parameters.import.index"])
    .controller("import.eNodebs", function($scope, $uibModal, $log, appFormatService, basicImportService) {
        $scope.editENodeb = function(item, index) {
            if (!item.dateTransefered) {
                item.openDate = appFormatService.getDate(item.openDate);
                item.dateTransefered = true;
            }

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/appViews/Parameters/Import/EditENodebDialog.html',
                controller: 'import.eNodebs.dialog',
                size: 'lg',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            });
            modalInstance.result.then(function(result) {
                $scope.postSingleENodeb(result, index);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.postSingleENodeb = function(item, index) {
            basicImportService.dumpOneENodebExcel(item).then(function(result) {
                if (result) {
                    $scope.importData.newENodebs.splice(index, 1);
                    $scope.importData.updateMessages.push({
                        contents: "完成一个LTE基站'" + item.name + "'导入数据库！",
                        type: "success"
                    });
                } else {
                    $scope.importData.updateMessages.push({
                        contents: "LTE基站'" + item.name + "'导入数据库失败！",
                        type: "error"
                    });
                }
            }, function(reason) {
                $scope.importData.updateMessages.push({
                    contents: "LTE基站'" + item.name + "'导入数据库失败！原因是：" + reason,
                    type: "error"
                });
            });

        };
    })
    .controller('import.eNodebs.dialog', function($scope, $uibModalInstance, item) {
        $scope.item = item;
        $scope.dateOpened = false;

        $scope.ok = function() {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }).controller("import.btss", function($scope, $uibModal, $log, appFormatService, basicImportService) {
        $scope.editBts = function(item, index) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/appViews/Parameters/Import/EditBtsDialog.html',
                controller: 'import.btss.dialog',
                size: 'lg',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            });
            modalInstance.result.then(function(result) {
                $scope.postSingleBts(result, index);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.postSingleBts = function(item, index) {
            basicImportService.dumpOneBtsExcel(item).then(function(result) {
                if (result) {
                    $scope.importData.newBtss.splice(index, 1);
                    $scope.importData.updateMessages.push({
                        contents: "完成一个CDMA基站'" + item.name + "'导入数据库！",
                        type: "success"
                    });
                } else {
                    $scope.importData.updateMessages.push({
                        contents: "CDMA基站'" + item.name + "'导入数据库失败！",
                        type: "error"
                    });
                }
            }, function(reason) {
                $scope.importData.updateMessages.push({
                    contents: "CDMA基站'" + item.name + "'导入数据库失败！原因是：" + reason,
                    type: "error"
                });
            });
        };
    })
    .controller('import.btss.dialog', function($scope, $uibModalInstance, item) {
        $scope.item = item;
        $scope.dateOpened = false;

        $scope.ok = function() {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("eNodeb.lonLat", function($scope, neGeometryService) {
        $scope.newENodebLonLatEdits = neGeometryService.queryENodebLonLatEdits($scope.importData.newENodebs);

        $scope.postENodebLonLat = function() {
            neGeometryService.mapLonLatEdits($scope.importData.newENodebs, $scope.newENodebLonLatEdits);
        };

    })
    .controller("bts.lonLat", function($scope, neGeometryService) {
        $scope.newBtsLonLatEdits = neGeometryService.queryBtsLonLatEdits($scope.importData.newBtss);

        $scope.postBtsLonLat = function() {
            neGeometryService.mapLonLatEdits($scope.importData.newBtss, $scope.newBtsLonLatEdits);
        };

    })
    .controller("import.cells", function($scope, $uibModal, $log, basicImportService) {
        $scope.editCell = function(item, index) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/appViews/Parameters/Import/EditCellDialog.html',
                controller: 'import.cells.dialog',
                size: 'lg',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            });
            modalInstance.result.then(function(result) {
                $scope.postSingleCell(result, index);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.postSingleCell = function(item, index) {
            basicImportService.dumpOneCellExcel(item).then(function(result) {
                if (result) {
                    $scope.importData.newCells.splice(index, 1);
                    $scope.importData.updateMessages.push({
                        contents: "完成一个LTE小区'" + item.eNodebId + "-" + item.sectorId + "'导入数据库！",
                        type: "success"
                    });
                } else {
                    $scope.importData.updateMessages.push({
                        contents: "LTE小区'" + item.eNodebId + "-" + item.sectorId + "'导入数据库失败！",
                        type: "error"
                    });
                }
            }, function(reason) {
                $scope.importData.updateMessages.push({
                    contents: "LTE小区'" + item.eNodebId + "-" + item.sectorId + "'导入数据库失败！原因是：" + reason,
                    type: "error"
                });
            });

        };
    })
    .controller('import.cells.dialog', function($scope, $uibModalInstance, item) {
        $scope.item = item;
        $scope.dateOpened = false;

        $scope.ok = function() {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("cell.lonLat", function($scope, neGeometryService) {
        $scope.newCellLonLatEdits = neGeometryService.queryCellLonLatEdits($scope.importData.newCells);

        $scope.postCellLonLat = function() {
            neGeometryService.mapLonLatEdits($scope.importData.newCells, $scope.newCellLonLatEdits);
        };

    })
    .controller("import.cdmaCells", function($scope, $uibModal, $log, basicImportService) {
        $scope.editCdmaCell = function(item, index) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: '/appViews/Parameters/Import/EditCdmaCellDialog.html',
                controller: 'import.cdmaCells.dialog',
                size: 'lg',
                resolve: {
                    item: function() {
                        return item;
                    }
                }
            });
            modalInstance.result.then(function(result) {
                $scope.postSingleCdmaCell(result, index);
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.postSingleCdmaCell = function(item, index) {
            basicImportService.dumpOneCdmaCellExcel(item).then(function(result) {
                if (result) {
                    $scope.importData.newCdmaCells.splice(index, 1);
                    $scope.importData.updateMessages.push({
                        contents: "完成一个CDMA小区'" + item.btsId + "-" + item.sectorId + "'导入数据库！",
                        type: "success"
                    });
                } else {
                    $scope.importData.updateMessages.push({
                        contents: "CDMA小区'" + item.btsId + "-" + item.sectorId + "'导入数据库失败！",
                        type: "error"
                    });
                }
            }, function(reason) {
                $scope.importData.updateMessages.push({
                    contents: "CDMA小区'" + item.btsId + "-" + item.sectorId + "'导入数据库失败！原因是：" + reason,
                    type: "error"
                });
            });

        };
    })
    .controller('import.cdmaCells.dialog', function($scope, $uibModalInstance, item) {
        $scope.item = item;
        $scope.dateOpened = false;

        $scope.ok = function() {
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
    .controller("cdmaCell.lonLat", function ($scope, neGeometryService) {
        $scope.newCdmaCellLonLatEdits
            = neGeometryService.queryCdmaCellLonLatEdits($scope.importData.newCdmaCells);

        $scope.postCdmaCellLonLat = function () {
            neGeometryService.mapLonLatEdits($scope.importData.newCdmaCells, $scope.newCdmaCellLonLatEdits);
        };

    })
    .controller('eNodeb.vanished', function ($scope, networkElementService) {
        $scope.vanishedENodebs = [];
        var data = $scope.importData.vanishedENodebIds;
        for (var i = 0; i < data.length; i++) {
            networkElementService.queryENodebInfo(data[i]).then(function (result) {
                $scope.vanishedENodebs.push(result);
            });
        }
    })
    .controller('bts.vanished', function ($scope, networkElementService) {
        $scope.vanishedBtss = [];
        var data = $scope.importData.vanishedBtsIds;
        for (var i = 0; i < data.length; i++) {
            networkElementService.queryBtsInfo(data[i]).then(function (result) {
                $scope.vanishedBtss.push(result);
            });
        }
    })
    .controller('cell.vanished', function ($scope, networkElementService) {
        $scope.vanishedCells = [];
        var data = $scope.importData.vanishedCellIds;
        for (var i = 0; i < data.length; i++) {
            networkElementService.queryCellInfo(data[i].cellId, data[i].sectorId).then(function (result) {
                $scope.vanishedCells.push(result);
            });
        }
    })
    .controller('cdmaCell.vanished', function ($scope, networkElementService) {
        $scope.vanishedCdmaCells = [];
        var data = $scope.importData.vanishedCdmaCellIds;
        for (var i = 0; i < data.length; i++) {
            networkElementService.queryCdmaCellInfoWithType(data[i].cellId, data[i].sectorId, data[i].cellType).then(function (result) {
                $scope.vanishedCdmaCells.push(result);
            });
        }
    });