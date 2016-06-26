angular.module('customer.module', ["ui.bootstrap", 'myApp.region'])
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
    .directive('vipDemandList', function(customerRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                items: '='
            },
            templateUrl: customerRoot + 'vip/DemandList.html'
        };
    });