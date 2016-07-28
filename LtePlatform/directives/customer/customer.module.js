angular.module('customer.module', ['customer.emergency', 'customer.vip', 'customer.complain'])
    .constant('customerRoot', '/directives/customer/');

angular.module('customer.emergency', ['customer.service'])
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

    .controller('EmergencyProcessController', function($scope) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'processTime', name: '处理时间', cellFilter: 'date: "yyyy-MM-dd HH:mm:ss"' },
                { field: 'processPerson', name: '处理人' },
                { field: 'processStateDescription', name: '处理步骤' },
                { field: 'processInfo', name: '反馈信息' }
            ],
            data: []
        };
    })
    .directive('emergencyProcessList', function ($compile) {
        return {
            restrict: 'EA',
            controller: 'EmergencyProcessController',
            replace: true,
            scope: {
                items: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })

    .controller('VipProcessController', function ($scope) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'beginTime', name: '开始时间', cellFilter: 'date: "yyyy-MM-dd HH:mm:ss"' },
                { field: 'contactPerson', name: '发起人' },
                { field: 'vipStateDescription', name: '处理步骤' },
                { field: 'beginInfo', name: '建单信息' },
                { field: 'processPerson', name: '处理人' },
                { field: 'processInfo', name: '处理信息' }
            ],
            data: []
        };
    })
    .directive('vipProcessList', function ($compile) {
        return {
            restrict: 'EA',
            controller: 'VipProcessController',
            replace: true,
            scope: {
                items: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })

    .controller('FiberItemController', function($scope, emergencyService) {
        $scope.finish = function(item) {
            emergencyService.finishFiberItem(item).then(function() {
                item.finishDate = new Date();
            });
        };
    })
    .directive('fiberItemList', function (customerRoot) {
        return {
            controller: 'FiberItemController',
            restrict: 'ECMA',
            replace: true,
            scope: {
                items: '='
            },
            templateUrl: customerRoot + 'emergency/FiberList.html'
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
    })
    .value('vipTypeDictionay', {
        "预处理": 'default',
        "现场测试": 'danger',
        "测试评估": 'primary',
        "优化调整": 'warning',
        "新增资源": 'info',
        "通信车需求": 'primary',
        "保障结论": 'info'
    })
    .directive('vipProcessState', function (vipTypeDictionay) {
        return {
            restrict: 'A',
            scope: {
                state: '='
            },
            template: '<span>{{state}}</span>',
            link: function (scope, element, attrs) {
                element.addClass('label');

                scope.$watch("state", function (state, oldState) {
                    if (oldState) {
                        element.removeClass('label-' + vipTypeDictionay[oldState]);
                    }
                    if (state) {
                        var type = vipTypeDictionay[state] || 'primary';
                        element.addClass('label-' + type);
                    }
                });
            }
        };
    });

angular.module('customer.vip', ['customer.service'])
    .controller('VipDemandController', function($scope, customerDialogService) {
        $scope.supplement = function(view) {
            customerDialogService.supplementVipDemandInfo(view, $scope.city, $scope.district, $scope.messages,
                function() {
                    view.isInfoComplete = true;
                });
        };
    })
    .directive('vipDemandList', function(customerRoot) {
        return {
            controller: 'VipDemandController',
            restrict: 'EA',
            replace: true,
            scope: {
                items: '=',
                city: '=',
                district: '=',
                messages: '=',
                rootPath: '='
            },
            templateUrl: customerRoot + 'vip/DemandList.html'
        };
    });

angular.module('customer.complain', ['customer.service'])
    .controller('ComplainPositionController', function ($scope, customerDialogService) {
        $scope.gridOptions = {
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            columnDefs: [
                { field: 'serialNumber', name: '工单编号' },
                { field: 'city', name: '城市' },
                { field: 'district', name: '区域' },
                { field: 'buildingName', name: '楼宇名称' },
                { field: 'roadName', name: '路名' },
                { field: 'longtitute', name: '经度', cellFilter: 'number: 4' },
                { field: 'lattitute', name: '纬度', cellFilter: 'number: 4' },
                { field: 'sitePosition', name: '附近站点' },
                { name: '匹配位置', cellTemplate: '<button class="btn btn-default" ng-click="grid.appScope.match(row.entity)">匹配</button>' }
            ],
            data: []
        };
        $scope.match = function(item) {
            customerDialogService.supplementComplainInfo(item, function() {
                $scope.messages.push({
                    type: 'success',
                    contents: '完成抱怨量工单' + item.serialNumber + '的信息补充！'
                });
                $scope.query();
            });
        };
    })
    .directive('complainPositionList', function ($compile) {
        return {
            controller: 'ComplainPositionController',
            restrict: 'EA',
            replace: true,
            scope: {
                items: '=',
                messages: '=',
                query: '&'
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions" ui-grid-pagination style="height: 800px"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    });