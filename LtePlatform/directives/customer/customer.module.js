angular.module('customer.module', ["ui.bootstrap", 'myApp.region', 'customer.service'])
    .value('customerRoot', '/directives/customer/')
    .directive('emergencyCommunicationList', function(customerRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                items: '='
            },
            templateUrl: customerRoot + 'emergency/CommunicationList.html'
        };
    })
    .directive('vipDemandList', function(customerRoot, customerDialogService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                items: '=',
                city: '=',
                district: '='
            },
            templateUrl: customerRoot + 'vip/DemandList.html',
            link: function(scope, element, attrs) {
                scope.supplement = function(view){
                    customerDialogService.supplementVipDemandInfo(view, scope.city, scope.district);
                };
            }
        };
    });