angular.module('workitem.module', ['kpi.workitem'])
    .constant('workitemRoot', '/directives/workitem/')
    .directive('workitemTable', function(workitemRoot, workItemDialog) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                viewItems: '=',
                queryWorkItems: '&'
            },
            templateUrl: workitemRoot + 'WorkItem.Tpl.html',
            link: function(scope, element, attrs) {
                scope.feedback = function(view) {
                    workItemDialog.feedback(view, scope.queryWorkItems);
                };
                scope.showDetails = function(view) {
                    workItemDialog.showDetails(view, scope.queryWorkItems);
                };
            }
        };
    })
    .directive('platformAndFeedbackInfo', function(workitemRoot, workItemDialog, workitemService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                currentView: '=',
                serialNumber: '='
            },
            templateUrl: workitemRoot + 'PlatformAndFeedbackInfo.html',
            link: function(scope, element, attrs) {
                scope.feedback = function() {
                    workItemDialog.feedback(scope.currentView, scope.updateWorkItems);
                };
                scope.$watch('currentView', function (view) {
                    if (view) {
                        scope.platformInfos = workItemDialog.calculatePlatformInfo(view.comments);
                        scope.feedbackInfos = workItemDialog.calculatePlatformInfo(view.feedbackContents);
                    }
                });
                
                scope.updateWorkItems = function() {
                    workitemService.querySingleItem(scope.serialNumber).then(function(result) {
                        scope.currentView = result;
                    });
                };
            }
        };
    })
    .directive('workItemDetails', function(workitemRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                currentView: '=',
            },
            templateUrl: workitemRoot + 'WorkItem.Details.html',
            transclude: true
        };
    })
    .directive('preciseWorkItemCells', function(workitemRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                cells: '=',
            },
            templateUrl: workitemRoot + 'precise/Cell.html',
            transclude: true
        };
    })
    .directive('coverageWorkItemDialogCells', function (workitemRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                cells: '=',
            },
            templateUrl: workitemRoot + 'precise/CoverageCell.html',
            transclude: true
        };
    });