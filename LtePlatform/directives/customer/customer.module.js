angular.module('customer.module', ['customer.emergency', 'customer.vip', 'customer.complain'])
    .constant('customerRoot', '/directives/customer/');

angular.module('customer.emergency', ['customer.service'])
    .controller('EmergencyCommunicationController', function($scope) {
        $scope.gridOptions = {
            columnDefs: [
                { field: 'projectName', name: '项目名称' },
                { field: 'beginDate', name: '开始日期', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'endDate', name: '结束日期', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'demandLevelDescription', name: '需求等级' },
                { field: 'vehicularTypeDescription', name: '通信车类型' },
                { field: 'expectedPeople', name: '预计人数' },
                {
                    name: '工单处理',
                    cellTemplate:'<a ng-href="{{grid.appScope.rootPath}}emergency/process/{{row.entity.id}}" class="btn btn-sm btn-success">{{row.entity.currentStateDescription}}</a>'
                }
            ],
            data: []
        };
    })
    .directive('emergencyCommunicationList', function ($compile) {
        return {
            restrict: 'EA',
            controller: 'EmergencyCommunicationController',
            replace: true,
            scope: {
                items: '=',
                rootPath: '='
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

    .controller('ComplainListController', function ($scope) {
        $scope.gridOptions = {
            paginationPageSizes: [20, 40, 60],
            paginationPageSize: 20,
            columnDefs: [
                { field: 'serialNumber', name: '序列号' },
                { field: 'beginTime', name: '受理时间', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'buildingName', name: '楼宇名称' },
                { field: 'roadName', name: '道路名称' },
                { field: 'complainSourceDescription', name: '投诉来源' },
                { field: 'networkTypeDescription', name: '网络类型' },
                {
                    name: '工单处理',
                    cellTemplate: '<a ng-href="{{grid.appScope.rootPath}}complain/process/{{row.entity.serialNumber}}" class="btn btn-sm btn-success">{{row.entity.currentStateDescription}}</a>'
                }
            ],
            data: []
        };
    })
    .directive('complainList', function ($compile) {
        return {
            restrict: 'EA',
            controller: 'ComplainListController',
            replace: true,
            scope: {
                items: '=',
                rootPath: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions" ui-grid-pagination style="height: 600px"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })
    
    .controller('BranchListController', function ($scope) {
        $scope.gridOptions = {
            paginationPageSizes: [20, 40, 60],
            paginationPageSize: 20,
            columnDefs: [
                { field: 'serialNumber', name: '序列号' },
                { field: 'beginDate', name: '受理时间', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'subscriberInfo', name: '用户信息' },
                { field: 'managerInfo', name: '客户经理' },
                { field: 'complainContents', name: '投诉内容' },
                { field: 'solveFunctionDescription', name: '处理措施' }
            ],
            data: []
        };
    })
    .directive('branchList', function ($compile) {
        return {
            restrict: 'EA',
            controller: 'BranchListController',
            replace: true,
            scope: {
                items: '=',
                rootPath: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions" ui-grid-pagination style="height: 600px"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })

    .controller('OnlineListController', function ($scope) {
        $scope.gridOptions = {
            paginationPageSizes: [20, 40, 60],
            paginationPageSize: 20,
            columnDefs: [
                { field: 'serialNumber', name: '序列号' },
                { field: 'beginDate', name: '受理时间', cellFilter: 'date: "yyyy-MM-dd"' },
                { field: 'address', name: '投诉地址' },
                { field: 'complainCategoryDescription', name: '投诉类型' },
                { field: 'phenomenon', name: '投诉现象' },
                { field: 'followInfo', name: '跟进信息' },
                { field: 'dutyStaff', name: '值班人员' }
            ],
            data: []
        };
    })
    .directive('onlineList', function ($compile) {
        return {
            restrict: 'EA',
            controller: 'OnlineListController',
            replace: true,
            scope: {
                items: '=',
                rootPath: '='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.initialize = false;
                scope.$watch('items', function (items) {
                    scope.gridOptions.data = items;
                    if (!scope.initialize) {
                        var linkDom = $compile('<div ui-grid="gridOptions" ui-grid-pagination style="height: 600px"></div>')(scope);
                        element.append(linkDom);
                        scope.initialize = true;
                    }
                });
            }
        };
    })

    .controller('EmergencyProcessController', function ($scope) {
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