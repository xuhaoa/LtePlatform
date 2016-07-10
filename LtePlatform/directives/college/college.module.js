angular.module('college.module', ['ui.grid'])
    .value('collegeRoot', '/directives/college/')
    .directive('collegeDtList', function() {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                colleges: '='
            },
            template: '<div ui-grid="gridOptions"></div>',
            link: function (scope, element, attrs) {
                scope.gridOptions = {
                    columnDefs: [
                        { field: 'name', name: '校园名称' },
                        { field: 'area', name: '区域面积（平方米）', cellFilter: 'number: 2' },
                        { field: 'centerX', name: '中心经度', cellFilter: 'number: 4' },
                        { field: 'centerY', name: '中心纬度', cellFilter: 'number: 4' },
                        { field: 'file2Gs', name: '2G文件数' },
                        { field: 'file3Gs', name: '3G文件数' },
                        { field: 'file4Gs', name: '4G文件数' }
                    ],
                    data: []
                };
                scope.$watch(scope.colleges, function(colleges) {
                    if (colleges) {
                        scope.gridOptions.data = colleges;
                    }
                });
            }
        };
    })
    .value('collegeInfrastructurePath', '/appViews/College/Infrastructure/')
    .directive('collegeStatTable', function (collegeRoot, collegeInfrastructurePath, $uibModal, $log) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                collegeList: '='
            },
            templateUrl: collegeRoot + 'stat/Table.html',
            link: function(scope, element, attrs) {
                scope.showENodebs = function(name) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: collegeInfrastructurePath + 'ENodebDialog.html',
                        controller: 'eNodeb.dialog',
                        size: 'sm',
                        resolve: {
                            dialogTitle: function() {
                                return name + "-" + "LTE基站信息";
                            },
                            name: function() {
                                return name;
                            }
                        }
                    });
                    modalInstance.result.then(function(info) {
                        console.log(info);
                    }, function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                scope.showCells = function(name) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: collegeInfrastructurePath + 'LteCellDialog.html',
                        controller: 'cell.dialog',
                        size: 'sm',
                        resolve: {
                            dialogTitle: function() {
                                return name + "-" + "LTE小区信息";
                            },
                            name: function() {
                                return name;
                            }
                        }
                    });
                    modalInstance.result.then(function(info) {
                        console.log(info);
                    }, function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                scope.showBtss = function(name) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: collegeInfrastructurePath + 'BtsDialog.html',
                        controller: 'bts.dialog',
                        size: 'sm',
                        resolve: {
                            dialogTitle: function() {
                                return name + "-" + "CDMA基站信息";
                            },
                            name: function() {
                                return name;
                            }
                        }
                    });
                    modalInstance.result.then(function(info) {
                        console.log(info);
                    }, function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                scope.showCdmaCells = function(name) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: collegeInfrastructurePath + 'CdmaCellDialog.html',
                        controller: 'cdmaCell.dialog',
                        size: 'sm',
                        resolve: {
                            dialogTitle: function() {
                                return name + "-" + "CDMA小区信息";
                            },
                            name: function() {
                                return name;
                            }
                        }
                    });
                    modalInstance.result.then(function(info) {
                        console.log(info);
                    }, function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                scope.showLteDistributions = function(name) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: collegeInfrastructurePath + 'DistributionDialog.html',
                        controller: 'lte.distribution.dialog',
                        size: 'sm',
                        resolve: {
                            dialogTitle: function() {
                                return name + "-" + "LTE室分信息";
                            },
                            name: function() {
                                return name;
                            }
                        }
                    });
                    modalInstance.result.then(function(info) {
                        console.log(info);
                    }, function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

                scope.showCdmaDistributions = function(name) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: collegeInfrastructurePath + 'DistributionDialog.html',
                        controller: 'cdma.distribution.dialog',
                        size: 'sm',
                        resolve: {
                            dialogTitle: function() {
                                return name + "-" + "CDMA室分信息";
                            },
                            name: function() {
                                return name;
                            }
                        }
                    });
                    modalInstance.result.then(function(info) {
                        console.log(info);
                    }, function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                };

            }
        };
    });