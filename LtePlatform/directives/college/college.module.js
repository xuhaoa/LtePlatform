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
    });