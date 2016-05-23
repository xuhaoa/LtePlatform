angular.module('rutrace.module', ['kpi.workitem', "ui.bootstrap"])
    .constant('htmlRoot', 'directives/rutrace/')
    .directive('topCell', function(workitemService, htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                rootPath: '=',
                topCells: '=currentCells',
                beginDate: '=',
                endDate: '=',
                updateMessages: '='
            },
            templateUrl: htmlRoot + 'TopCell.Tpl.html',
            link: function(scope, element, attrs) {
                scope.createWorkitem = function(cell) {
                    workitemService.constructPreciseItem(cell, scope.beginDate.value, scope.endDate.value).then(function(result) {
                        if (result) {
                            scope.updateMessages.push({
                                cellName: result
                            });
                            cell.hasWorkItems = true;
                        }
                    });
                };
            }
        };
    })
    .directive('coverageTable', function($uibModal, $log, htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                coverageList: '=',
                dialogTitle: '=',
                cellId: '=',
                sectorId: '='
            },
            templateUrl: htmlRoot + 'CoverageTable.Tpl.html',
            link: function(scope, element, attrs) {
                scope.showDetails = function(date) {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: '/appViews/Rutrace/Coverage/DetailsChartDialog.html',
                        controller: 'coverage.details.dialog',
                        size: 'lg',
                        resolve: {
                            dialogTitle: function() {
                                return scope.dialogTitle;
                            },
                            cellId: function() {
                                return scope.cellId;
                            },
                            sectorId: function() {
                                return scope.sectorId;
                            },
                            date: function() {
                                return date;
                            }
                        }
                    });

                    modalInstance.result.then(function(info) {
                        console.log(info);
                    }, function() {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                }
            }
        }
    })
    .directive('districtStatTable', function(htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                overallStat: '=',
                rootPath: '='
            },
            templateUrl: htmlRoot + 'DistrictStatTable.Tpl.html'
        };
    })
    .directive('townStatTable', function(htmlRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                overallStat: '='
            },
            templateUrl: htmlRoot + 'TownStatTable.Tpl.html'
        };
    });