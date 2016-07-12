angular.module('customer.module', ["ui.bootstrap", 'myApp.region', 'customer.service'])
    .value('customerRoot', '/directives/customer/')
    .directive('emergencyCommunicationList', function(customerRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                items: '=',
                rootPath: '='
            },
            templateUrl: customerRoot + 'emergency/CommunicationList.html'
        };
    })
    .directive('emergencyProcessList', function (customerRoot) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                items: '='
            },
            templateUrl: customerRoot + 'emergency/ProcessList.html'
        };
    })
    .directive('fiberItemList', function (customerRoot, emergencyService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                items: '='
            },
            templateUrl: customerRoot + 'emergency/FiberList.html',
            link: function(scope, element, attrs) {
                scope.finish = function(item) {
                    emergencyService.finishFiberItem(item).then(function() {
                        item.finishDate = new Date();
                    });
                };
            }
        };
    })
    .directive('vipDemandList', function(customerRoot, customerDialogService) {
        return {
            restrict: 'ECMA',
            replace: true,
            scope: {
                items: '=',
                city: '=',
                district: '=',
                messages: '=',
                rootPath: '=',
                displayFinishedItem: '='
            },
            templateUrl: customerRoot + 'vip/DemandList.html',
            link: function(scope, element, attrs) {
                scope.supplement = function(view) {
                    customerDialogService.supplementVipDemandInfo(view, scope.city, scope.district, scope.messages,
                        function() {
                            view.isInfoComplete = true;
                        });
                };
            }
        };
    })
    .value('processTypeDictionay', {
        "通信车申请": 'default',
        "光纤起单": 'danger',
        "电源准备": 'primary',
        "光纤调通": 'warning',
        "通信车就位": 'info',
        "通信车开通": 'primary',
        "优化测试": 'info',
        "完成": 'success'
    })
    .directive('emergencyProcessState', function(processTypeDictionay) {
        return {
            restrict: 'A',
            scope: {
                state: '='
            },
            template: '<span>{{state}}</span>',
            link: function(scope, element, attrs) {
                element.addClass('label');
                
                scope.$watch("state", function (state, oldState) {
                    if (oldState) {
                        element.removeClass('label-' + processTypeDictionay[oldState]);
                    }
                    if (state) {
                        var type = processTypeDictionay[state] || 'primary';
                        element.addClass('label-' + type);
                    }
                });
            }
        };
    });