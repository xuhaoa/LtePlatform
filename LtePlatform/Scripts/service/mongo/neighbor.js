angular.module('neighbor.mongo', ['myApp.url'])
    .factory('neighborMongoService', function($q, $http, $uibModal, $log, appUrlService) {
        return {
            queryNeighbors: function (eNodebId, sectorId) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('NeighborCellMongo'),
                    params: {
                        eNodebId: eNodebId,
                        sectorId: sectorId
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                    .error(function (reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            queryReverseNeighbors: function(destENodebId, destSectorId) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appUrlService.getApiUrl('NeighborCellMongo'),
                    params: {
                        destENodebId: destENodebId,
                        destSectorId: destSectorId
                    }
                }).success(function (result) {
                    deferred.resolve(result);
                })
                    .error(function (reason) {
                        deferred.reject(reason);
                    });
                return deferred.promise;
            },
            dumpMongoDialog: function(cell, beginDate, endDate) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Interference/DumpCellMongoDialog.html',
                    controller: 'dump.cell.mongo',
                    size: 'lg',
                    resolve: {
                        dialogTitle: function () {
                            return cell.name + "-" + cell.sectorId + "干扰数据导入";
                        },
                        eNodebId: function () {
                            return cell.eNodebId;
                        },
                        sectorId: function () {
                            return cell.sectorId;
                        },
                        pci: function () {
                            return cell.pci;
                        },
                        begin: function () {
                            return beginDate;
                        },
                        end: function () {
                            return endDate;
                        }
                    }
                });

                modalInstance.result.then(function (info) {
                    console.log(info);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            },
            showPreciseDialog: function(precise) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Map/PreciseSectorMapInfoBox.html',
                    controller: 'map.precise.dialog',
                    size: 'sm',
                    resolve: {
                        dialogTitle: function() {
                            return precise.eNodebName + "-" + precise.sectorId + "精确覆盖率指标";
                        },
                        precise: function() {
                            return precise;
                        }
                    }
                });
                modalInstance.result.then(function(sector) {
                    console.log(sector);
                }, function() {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            },
            showNeighborDialog: function (neighbor) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: '/appViews/Rutrace/Map/NeighborMapInfoBox.html',
                    controller: 'map.neighbor.dialog',
                    size: 'sm',
                    resolve: {
                        dialogTitle: function () {
                            return neighbor.cellName + "小区信息";
                        },
                        neighbor: function () {
                            return neighbor;
                        }
                    }
                });
                modalInstance.result.then(function (nei) {
                    console.log(nei);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            }
        };
    });