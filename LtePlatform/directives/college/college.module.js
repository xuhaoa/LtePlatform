angular.module('college.module', [])
    .value('collegeRoot', '/directives/college/')
    .directive('collegeDtList', function(collegeRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                colleges: '='
            },
            templateUrl: collegeRoot + 'Dt.Tpl.html'
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