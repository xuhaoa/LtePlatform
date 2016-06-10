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
    });